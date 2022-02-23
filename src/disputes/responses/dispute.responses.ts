import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Status {
  @ApiProperty()
  id: number;
}

export class Response {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  assignedReward: number;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class DisputeResponses {
  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  requesterId: number;

  @ApiProperty()
  @IsObject()
  status: Status;

  @ApiProperty()
  @IsObject()
  response: Response;

  @ApiProperty()
  @IsString()
  resolvedAt: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
