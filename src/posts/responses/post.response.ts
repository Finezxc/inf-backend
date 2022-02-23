import { BaseResponse } from 'common/responses/base.response';
import { ResponseProperty } from 'common/decorators/response-property.decorator';

export class PostResponse extends BaseResponse<PostResponse> {
  @ResponseProperty()
  title: string;

  @ResponseProperty()
  category: [];

  @ResponseProperty()
  date: Date;

  @ResponseProperty()
  content: string;

  @ResponseProperty()
  link: string;

  @ResponseProperty()
  img: string;
}
