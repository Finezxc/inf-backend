import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString } from 'class-validator';

export class Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class DocumentType {
  @ApiProperty()
  id: number;
}

export class StorageItem {
  @ApiProperty()
  storedFileName: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  storagePath: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;
}

export class CredentialDocuments {
  @ApiProperty()
  description: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: DocumentType })
  documentType: DocumentType;

  @ApiProperty({ type: StorageItem })
  storageItem: StorageItem;

  @ApiProperty()
  documentTypeId: number;

  @ApiProperty()
  storageItemId: number;

  @ApiProperty()
  id: number;
}
export class RegistrationCompletionResponse {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsString()
  linkedInProfileUrl: string;

  @ApiProperty()
  @IsString()
  cryptoCurrencyWalletAddress: string;

  @ApiProperty({ type: [CredentialDocuments] })
  @IsArray()
  credentialDocuments: CredentialDocuments[];

  @ApiProperty({ type: [Category] })
  categories: Category[];
}
