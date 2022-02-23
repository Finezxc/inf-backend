import { Module } from '@nestjs/common';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './services/disputes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseRepository } from '../responses/repositories/response.repository';
import { DisputeRepository } from './repositories/dispute.repository';
import { UserRepository } from '../account/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResponseRepository,
      DisputeRepository,
      UserRepository,
    ]),
  ],
  controllers: [DisputesController],
  providers: [DisputesService],
})
export class DisputesModule {}
