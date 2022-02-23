import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';

import { ResponseAttachmentDocumentEntity } from '../../db/entities/response-attachment-document.entity';

@Injectable()
@EntityRepository(ResponseAttachmentDocumentEntity)
export class ResponseAttachmentDocumentRepository extends BaseRepository<ResponseAttachmentDocumentEntity> {}
