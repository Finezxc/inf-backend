import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { UserAuth } from '../auth/decorators/user-auth.decorator';
import { ResponseType } from '../common/types/response.type';
import { IdType } from '../common/types/id-type.type';
import { ApiTags } from '@nestjs/swagger';
import { StorageService } from './services/storage.service';
import { UserRoleEnum } from '../common/enums/user-role.enum';

@ApiTags(`storage`)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('responder-confirmation-documents/:docId')
  @UserAuth()
  async responderCredentialDocument(
    @Res() response: ResponseType,
    @Param('docId', new ParseIntPipe()) docId: IdType,
  ) {
    await this.storageService.getResponderCredentialDocumentFile(
      docId,
      response,
    );
  }

  @Get('verifier-confirmation-documents/:docId')
  @UserAuth()
  async verifierCredentialDocument(
    @Res() response: ResponseType,
    @Param('docId', new ParseIntPipe()) docId: IdType,
  ) {
    await this.storageService.getVerifierCredentialDocumentFile(
      docId,
      response,
    );
  }

  @Get('attachment/:docId')
  @UserAuth(UserRoleEnum.Responder)
  async attachment(
    @Res() response: ResponseType,
    @Param('docId', new ParseIntPipe()) docId: IdType,
  ) {
    await this.storageService.getAttachmentDocument(docId, response);
  }
}
