import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { IsImageFile } from 'common/decorators/is-image-file.decorator';
import { MemoryStoredFile } from 'nestjs-form-data';
import { SpecificCategoryDto } from 'categories/dto/specific-category.dto';
import { ToNumber } from 'common/decorators/to-number.decorator';

export class CreateEvaluationRequestInterestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assetName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assetDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsImageFile({ each: true, nullable: true })
  @IsOptional()
  assetPictures?: MemoryStoredFile[];

  @ApiProperty({ type: [SpecificCategoryDto] })
  @ValidateNested({ each: true })
  @Type(() => SpecificCategoryDto)
  @ArrayNotEmpty()
  categories: SpecificCategoryDto[];

  @ApiProperty()
  @ToNumber()
  @IsNumber()
  estimatedPrice: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  invitedBy?: string;
}
