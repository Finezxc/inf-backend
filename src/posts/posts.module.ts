import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from 'posts/posts.controller';
import { PostsService } from 'posts/services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [],
})
export class PostsModule {}
