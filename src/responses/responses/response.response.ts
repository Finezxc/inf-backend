import { ApiProperty } from '@nestjs/swagger';

export class Request {
  @ApiProperty()
  id: number;

  @ApiProperty()
  requesterId: number;

  @ApiProperty()
  title: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  reward: number;

  @ApiProperty()
  inflationAdjustmentYears: number[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  timeLimit: number;
}

export class Justification {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class StorageItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  storedFileName: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  storagePath: string;

  @ApiProperty()
  createdAt: Date;
}
export class CitationType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class Field {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class Citation {
  @ApiProperty({ type: CitationType })
  citationType: CitationType;

  @ApiProperty({ type: [Field] })
  fields: Field[];
}

export class ResponseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  assignedReward: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: Request })
  request: Request;

  @ApiProperty({ type: Justification })
  justification: Justification;

  @ApiProperty({ type: StorageItem })
  storageItem: StorageItem;

  @ApiProperty({ type: [Citation] })
  citations: Citation[];
}
