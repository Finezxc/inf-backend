import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
