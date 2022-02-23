import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseOwnershipTypesService } from 'response-ownership-types/services/response-ownership-types.services';
import { ResponseOwnershipTypesController } from 'response-ownership-types/response-ownership-types.controller';
import { ResponseOwnershipTypeEntity } from 'db/entities/response-ownership-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseOwnershipTypeEntity])],
  controllers: [ResponseOwnershipTypesController],
  providers: [ResponseOwnershipTypesService],
  exports: [ResponseOwnershipTypesService],
})
export class ResponseOwnershipTypesModule {}
