import { ResponseProperty } from 'common/decorators/response-property.decorator';
import { BaseResponse } from 'common/responses/base.response';

export class CreateEvaluationRequestInterestResponse extends BaseResponse {
  @ResponseProperty()
  referralLink: string;
}
