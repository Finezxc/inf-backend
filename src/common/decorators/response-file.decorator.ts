import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export function ResponseFile() {
  return applyDecorators(
    ApiProperty({ format: 'binary', type: 'string' }),
    IsFile(),
    MaxFileSize(Number(process.env.APP_MAX_DOCUMENT_FILE_SIZE)),
    HasMimeType([
      'text/csv',
      'text/plain',
      'application/csv',
      'text/comma-separated-values',
      'application/excel',
      'application/vnd.ms-excel',
      'application/txt',
    ]),
  );
}
