import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitationTypesService } from 'citation-types/services/citation-types.service';
import { CitationTypesController } from 'citation-types/citation-types.controller';
import { CitationTypeEntity } from 'db/entities/citation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitationTypeEntity])],
  controllers: [CitationTypesController],
  providers: [CitationTypesService],
  exports: [CitationTypesService],
})
export class CitationTypesModule {}
