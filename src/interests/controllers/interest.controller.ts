import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { InterestService } from 'interests/services/interest.service';
import { CreateInterestDto } from 'interests/dto/create-interest.dto';
import { CreateInterestResponse } from 'interests/responses/create-interest.response';
import { InterestEntity } from 'db/entities/interest.entity';

@ApiTags(`Interests`)
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestService: InterestService) {}

  @ApiCreatedResponse({ type: CreateInterestResponse })
  @Post()
  create(@Body() body: CreateInterestDto): Promise<InterestEntity> {
    return this.interestService.create(body);
  }
}
