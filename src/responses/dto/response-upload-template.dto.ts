import { MemoryStoredFile } from 'nestjs-form-data';

import { ResponseFile } from '../../common/decorators/response-file.decorator';

export class ResponseUploadTemplateDto {
  @ResponseFile()
  template: MemoryStoredFile;
}
