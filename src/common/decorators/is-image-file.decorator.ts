import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsFile, IsFiles, HasMimeType } from 'nestjs-form-data';

export function IsImageFile({ nullable = false, each = false } = {}) {
  return applyDecorators(
    ApiProperty({ nullable, format: 'binary', type: 'string', isArray: each }),
    each ? IsFiles() : IsFile(),
    nullable ? IsOptional() : () => null,
    // MaxFileSize(Number(process.env.APP_MAX_IMAGE_FILE_SIZE)),
    HasMimeType(['image/jpeg', 'image/png', 'image/bmp'], { each }),
  );
}
