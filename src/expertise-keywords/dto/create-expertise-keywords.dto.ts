import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExpertiseKeywordsDto {
  @ApiProperty({ nullable: true, type: [String] })
  @IsString({ each: true })
  keywords?: string[];
}
