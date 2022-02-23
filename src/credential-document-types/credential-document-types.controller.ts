import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CredentialDocumentTypesService } from 'credential-document-types/services/credential-document-types.service';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { WithArrayResponse } from 'common/mixins/with-array-response.mixin';
import { ArrayResponse } from 'common/responses/array.response';

@ApiTags(`credential-document-types`)
@Controller('credential-document-types')
export class CredentialDocumentTypesController {
  constructor(
    private credentialDocumentTypesService: CredentialDocumentTypesService,
  ) {}

  @UserAuth()
  @Get()
  @ApiOkResponse({ type: WithArrayResponse(EnumItemResponse) })
  @ApiBadRequestResponse()
  async getCredentialDocumentTypes(): Promise<ArrayResponse<EnumItemResponse>> {
    return this.credentialDocumentTypesService.getCredentialDocumentTypes();
  }
}
