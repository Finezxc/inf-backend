import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { CommentsService } from './services/comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiCreatedResponse()
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentsService.createComment(createCommentDto);
  }
}
