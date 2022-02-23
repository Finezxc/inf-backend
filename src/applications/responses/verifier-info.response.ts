import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString } from 'class-validator';
import { UserApprovalStatusEntity } from '../../db/entities/user-approval-status.entity';
import { ExpertiseKeywordEntity } from '../../db/entities/expertise-keyword.entity';

export class VerifierInfoResponse {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsString()
  areaOfExpertise: string;

  @ApiProperty()
  @IsArray()
  keywords: ExpertiseKeywordEntity[];

  @ApiProperty()
  @IsArray()
  roles: [];

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsArray()
  documents: [];

  @ApiProperty()
  @IsString()
  socialMedia: string;

  @ApiProperty()
  approvalStatus: UserApprovalStatusEntity;
}
