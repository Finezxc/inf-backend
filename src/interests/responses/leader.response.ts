import { ResponseProperty } from 'common/decorators/response-property.decorator';
import { BaseResponse } from 'common/responses/base.response';

export class LeaderResponse extends BaseResponse<LeaderResponse> {
  @ResponseProperty()
  email: string;

  @ResponseProperty()
  firstName: string;

  @ResponseProperty()
  points: number;

  @ResponseProperty()
  assetsSubmitted: number;
}
