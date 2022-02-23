import { ResponseProperty } from 'common/decorators/response-property.decorator';
import { BaseResponse } from 'common/responses/base.response';
import { LeaderResponse } from 'interests/responses/leader.response';

export class LeaderBoardResponse extends BaseResponse<LeaderBoardResponse> {
  @ResponseProperty({ cls: LeaderResponse, each: true })
  leaders: LeaderResponse[];
}
