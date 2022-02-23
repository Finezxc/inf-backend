import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepo: CommentRepository) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<void> {}
}
