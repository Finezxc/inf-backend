import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsId } from 'common/decorators/is-id.decorator';
import { IdType } from 'common/types/id-type.type';

export class CreateInterestDto {
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ type: [Number] })
  @IsId({ each: true, nullable: false })
  expertiseCategoryIds: IdType[];
}
