import { ResponseFile } from '../../common/decorators/response-file.decorator';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTemplateDto {
  @ApiProperty()
  @ResponseFile()
  template: MemoryStoredFile;
}
