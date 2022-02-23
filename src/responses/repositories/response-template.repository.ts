import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { ResponseTemplateEntity } from '../../db/entities/response-template.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@Injectable()
@EntityRepository(ResponseTemplateEntity)
export class ResponseTemplateRepository extends BaseRepository<ResponseTemplateEntity> {}
