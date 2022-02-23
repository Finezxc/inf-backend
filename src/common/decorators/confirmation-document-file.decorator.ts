import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsFile, MaxFileSize, HasMimeType } from 'nestjs-form-data';

export function ConfirmationDocumentFile() {
  return applyDecorators(
    ApiProperty({ format: 'binary', type: 'string' }),
    IsFile(),
    MaxFileSize(Number(process.env.APP_MAX_DOCUMENT_FILE_SIZE)),
    HasMimeType([
      'image/jpeg',
      'image/png',
      'image/bmp',
      'application/msword',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]),
  );
}
