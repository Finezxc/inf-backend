import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citation } from '../db/entities/citation.entity';
import { CitationService } from './services/citation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Citation])],
  providers: [CitationService],
  exports: [CitationService],
})
export class CitationModule {}
