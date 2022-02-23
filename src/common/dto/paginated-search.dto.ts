import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';

export class PaginatedSearchDto extends PaginatedQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search? = '';
}
