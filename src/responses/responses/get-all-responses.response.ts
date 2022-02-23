import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

import { ResponseEntity } from 'db/entities/response.entity';
import { IdType } from 'common/types/id-type.type';
import { UserEntity } from 'db/entities/user.entity';
import { VerificationEntity } from 'db/entities/verification.entity';
import { Citation } from 'db/entities/citation.entity';
import { ResponseAttachmentDocumentEntity } from '../../db/entities/response-attachment-document.entity';
import { StorageItemEntity } from '../../db/entities/storage-item.entity';

export class ResponseOfResponderResponse {
  @ApiProperty()
  id: IdType;

  @ApiProperty()
  assignedReward: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  requestId: IdType;

  @ApiProperty()
  requestTitle: string;

  @ApiProperty()
  requestDescription: string;

  @ApiProperty()
  responseAttachmentDocuments: ResponseAttachmentDocumentEntity[];

  @ApiProperty()
  storageItem: StorageItemEntity;

  @ApiPropertyOptional()
  user?: UserEntity;

  @ApiPropertyOptional()
  verification?: VerificationEntity;

  @ApiPropertyOptional()
  citations?: Citation[];

  @ApiPropertyOptional()
  meta?: IPaginationMeta;

  static fromResponse(response: ResponseEntity) {
    const {
      id,
      assignedReward,
      rating,
      storageItem,
      responseAttachmentDocuments,
      justification,
      citations,
    } = response;

    const {
      id: requestId,
      description: requestDescription,
      title: requestTitle,
    } = response.request;

    return {
      id,
      assignedReward,
      rating,
      requestId,
      requestTitle,
      requestDescription,
      storageItem,
      responseAttachmentDocuments,
      justification,
      citations,
    };
  }
}
