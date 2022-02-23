import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ResponseOwnershipTypesService } from 'response-ownership-types/services/response-ownership-types.services';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { WithArrayResponse } from 'common/mixins/with-array-response.mixin';
import { ArrayResponse } from 'common/responses/array.response';

@ApiTags(`response-ownership-types`)
@Controller('response-ownership-types')
export class ResponseOwnershipTypesController {
  constructor(
    private responseOwnershipTypesService: ResponseOwnershipTypesService,
  ) {}

  @UserAuth()
  @Get()
  @ApiOkResponse({ type: WithArrayResponse(EnumItemResponse) })
  @ApiBadRequestResponse()
  async getResponseOwnershipTypes(): Promise<ArrayResponse<EnumItemResponse>> {
    return this.responseOwnershipTypesService.getResponseOwnershipTypes();
  }
}
