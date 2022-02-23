import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateInterestDto } from 'interests/dto/create-interest.dto';
export class ExpertiseKeyword {
  @ApiProperty()
  id: number;
}
export class CreateInterestResponse extends OmitType(CreateInterestDto, [
  'expertiseCategoryIds',
] as const) {
  @ApiProperty({ type: [ExpertiseKeyword] })
  expertiseCategories: ExpertiseKeyword;

  @ApiProperty()
  id: number;
}
