import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { PostsService } from 'posts/services/posts.service';
import { PostResponse } from 'posts/responses/post.response';

@ApiTags(`posts`)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  @ApiOkResponse({ type: [PostResponse] })
  public getPosts(): Promise<Array<PostResponse>> {
    return this.postsService.getPosts();
  }
}
