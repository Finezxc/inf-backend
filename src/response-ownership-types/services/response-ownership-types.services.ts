import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseOwnershipTypeEntity } from 'db/entities/response-ownership-type.entity';
import { ArrayResponse } from 'common/responses/array.response';

@Injectable()
export class ResponseOwnershipTypesService {
  constructor(
    @InjectRepository(ResponseOwnershipTypeEntity)
    private responseOwnershipTypesRepo: Repository<ResponseOwnershipTypeEntity>,
  ) {}

  async getResponseOwnershipTypes(): Promise<
    ArrayResponse<ResponseOwnershipTypeEntity>
  > {
    const items = await this.responseOwnershipTypesRepo.find();
    return { items };
  }
}
