import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CommentEntity } from '../../db/entities/comment.entity';

@Injectable()
@EntityRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {}
