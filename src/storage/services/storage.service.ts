import { Injectable } from '@nestjs/common';
import type { Readable } from 'stream';
import * as AWS from 'aws-sdk';
import { sanitize } from 'sanitize-filename-ts';

import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { StorageItemRepository } from 'storage/repositories/storage-item.repository';
import { BucketStoragePathsEnum } from 'storage/enums/bucket-storage-paths.enum';
import { ConfigService } from '@nestjs/config';
import { CryptoUtilsService } from 'common/services/crypto-utils.service';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { IdType } from '../../common/types/id-type.type';
import { ResponseType } from '../../common/types/response.type';
import { Repository } from 'typeorm';
import { ResponderCredentialDocument } from '../../db/entities/responder-credential-document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifierCredentialDocument } from '../../db/entities/verifier-credential-document.entity';

interface ICreateStorageItemData {
  fileStream: Readable;
  fileName: string;
  storagePath: BucketStoragePathsEnum;
}

@Injectable()
export class StorageService {
  private s3: AWS.S3;

  constructor(
    private storageItemRepo: StorageItemRepository,
    private configService: ConfigService,
    private cryptoUtilsService: CryptoUtilsService,
    @InjectRepository(ResponderCredentialDocument)
    private responderDocumentsRepo: Repository<ResponderCredentialDocument>,
    @InjectRepository(VerifierCredentialDocument)
    private verifierDocumentsRepo: Repository<VerifierCredentialDocument>,
  ) {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: configService.get<string>(ConfigEnvEnum.APP_AWS_KEY_ID),
        secretAccessKey: configService.get<string>(
          ConfigEnvEnum.APP_AWS_SECRET,
        ),
      },
    });
  }

  private createStorageItem(
    fileName: string,
    storagePath: BucketStoragePathsEnum,
  ) {
    return this.storageItemRepo.create({
      originalFileName: fileName,
      storedFileName: sanitize(
        `${this.cryptoUtilsService.generateUUID()}__${fileName}`,
      ),
      storagePath,
    });
  }

  private toObjectKey(storageItem: StorageItemEntity) {
    return storageItem.storagePath + storageItem.storedFileName;
  }

  /**
   * Saves file on the S3, inserts StorageItem with URL of the file to DB.
   * @param fileStream stream for the data that should be saved on the bucket
   * @param fileName
   * @param storagePath path on the bucket
   */
  async upload(params: ICreateStorageItemData): Promise<StorageItemEntity> {
    const { fileName, fileStream, storagePath } = params;

    const storageItem = this.createStorageItem(fileName, storagePath);

    await this.s3
      .upload({
        Bucket: this.configService.get<string>(
          ConfigEnvEnum.APP_AWS_BUCKET_NAME,
        ),
        Key: this.toObjectKey(storageItem),
        Body: fileStream,
      })
      .promise();

    return await this.storageItemRepo.save(storageItem);
  }

  async uploadMultiple(
    storageItemInputs: ICreateStorageItemData[],
  ): Promise<StorageItemEntity[]> {
    // TODO: find other SDK with option to batch requests instead of this crap
    return Promise.all(storageItemInputs.map((input) => this.upload(input)));
  }

  async remove(storageItem: StorageItemEntity, { removeFromDB = false } = {}) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.get<string>(
          ConfigEnvEnum.APP_AWS_BUCKET_NAME,
        ),
        Key: this.toObjectKey(storageItem),
      })
      .promise();

    if (removeFromDB) {
      await this.storageItemRepo.remove(storageItem);
    }
  }

  async removeMultiple(
    storageItems: StorageItemEntity[],
    { removeFromDB = false } = {},
  ) {
    await this.s3
      .deleteObjects({
        Bucket: this.configService.get<string>(
          ConfigEnvEnum.APP_AWS_BUCKET_NAME,
        ),
        Delete: {
          Objects: storageItems.map((item) => ({
            Key: this.toObjectKey(item),
          })),
        },
      })
      .promise();

    if (removeFromDB) {
      await this.storageItemRepo.remove(storageItems);
    }
  }

  createReadStream(storageItem?: StorageItemEntity) {
    if (!storageItem) return null;

    const object = this.s3.getObject({
      Bucket: this.configService.get<string>(ConfigEnvEnum.APP_AWS_BUCKET_NAME),
      Key: storageItem.storagePath + storageItem.storedFileName,
    });

    // TODO: pass cache-control headers (ETag) to controllers

    return object.createReadStream();
  }

  async getById(id: IdType) {
    return this.storageItemRepo.findOneOrFail(id);
  }

  /**
   * TODO: All the methods bellow MUST NOT be in this service. It's a DDD violation.
   */

  async getResponderCredentialDocumentFile(
    responderCredentialDocumentId: IdType,
    response: ResponseType,
  ) {
    const document = await this.responderDocumentsRepo.findOneOrFail({
      where: { id: responderCredentialDocumentId },
      relations: ['storageItem'],
    });
    response.setHeader(
      'Content-Disposition',
      document.storageItem.originalFileName,
    );

    const stream = this.createReadStream(document.storageItem);

    stream.pipe(response);
  }

  async getVerifierCredentialDocumentFile(
    verifierCredentialDocumentId: IdType,
    response: ResponseType,
  ) {
    const document = await this.verifierDocumentsRepo.findOneOrFail({
      where: { id: verifierCredentialDocumentId },
      relations: ['storageItem'],
    });
    response.setHeader(
      'Content-Disposition',
      document.storageItem.originalFileName,
    );

    const stream = this.createReadStream(document.storageItem);
    stream.pipe(response);
  }

  async getAttachmentDocument(documentId: IdType, response: ResponseType) {
    const document = await this.storageItemRepo.findOneOrFail({
      where: { id: documentId },
    });
    response.setHeader('Content-Disposition', document.originalFileName);
    const stream = this.createReadStream(document);
    stream.pipe(response);
  }

  async getVerifierCredentialDocumentByStorageId(id: IdType) {
    return this.verifierDocumentsRepo.findOne({ storageItemId: id });
  }

  async getResponderCredentialDocumentByStorageId(id: IdType) {
    return this.responderDocumentsRepo.findOne({ storageItemId: id });
  }
}
