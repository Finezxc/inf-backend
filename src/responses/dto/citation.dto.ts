import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsId } from '../../common/decorators/is-id.decorator';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { IdType } from '../../common/types/id-type.type';
import { CitationTypeEnum } from '../../common/enums/citation-type.enum';

export class Citation {
  @ApiProperty()
  @IsId()
  citationType: IdType;

  // Literature references
  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.LiteratureReference)
  @IsNotEmpty()
  doiOrIsbn: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.LiteratureReference)
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.LiteratureReference)
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.LiteratureReference)
  @IsNotEmpty()
  publisher: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.LiteratureReference)
  @IsNotEmpty()
  publicationYear: number;

  // Personal references
  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.PersonalReference)
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.PersonalReference)
  @IsNotEmpty()
  jobTitle: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.PersonalReference)
  @IsNotEmpty()
  jobCompany: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.PersonalReference)
  @IsNotEmpty()
  contactInformation: string;

  // Internet sources
  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.InternetSource)
  @IsNotEmpty()
  websiteUrl: string;

  // Written justification
  @ApiPropertyOptional()
  @ValidateIf((o) => o.citationType === CitationTypeEnum.WrittenJustification)
  @IsNotEmpty()
  writtenJustification: string;
}
