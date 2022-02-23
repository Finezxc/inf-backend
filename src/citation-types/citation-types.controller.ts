import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CitationTypesService } from 'citation-types/services/citation-types.service';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { ArrayResponse } from 'common/responses/array.response';

@ApiTags(`citation-types`)
@Controller('citation-types')
export class CitationTypesController {
  constructor(private citationTypesService: CitationTypesService) {}

  @UserAuth()
  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async getCitationTypes(): Promise<ArrayResponse<EnumItemResponse>> {
    return this.citationTypesService.getCitationTypes();
  }
}
