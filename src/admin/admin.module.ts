import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PlatformSettingsRepository } from './repositories/platform-settings.repository';
import { RequestsModule } from '../requests/requests.module';
import { UserRepository } from '../account/repositories/user.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { StorageModule } from '../storage/storage.module';
import { ResponsesModule } from '../responses/responses.module';
import { ResponseTemplateRepository } from '../responses/repositories/response-template.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlatformSettingsRepository,
      ResponseTemplateRepository,
    ]),
    TypeOrmModule.forFeature([UserRepository]),
    RequestsModule,
    StorageModule,
    ResponsesModule,
    NestjsFormDataModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
