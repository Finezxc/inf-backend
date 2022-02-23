import { MailingModule } from './../mailing/mailing.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from 'auth/auth.module';
import { AccountModule } from 'account/account.module';
import { CommonModule } from 'common/common.module';
import { StorageModule } from 'storage/storage.module';
import { ExpertiseKeywordsModule } from 'expertise-keywords/expertise-keywords.module';
import { UsersModule } from 'users/users.module';
import { CitationTypesModule } from 'citation-types/citation-types.module';
import { CurrenciesModule } from 'currencies/currencies.module';
import { CredentialDocumentTypesModule } from 'credential-document-types/credential-document-types.module';
import { ResponseOwnershipTypesModule } from 'response-ownership-types/response-ownership-types.module';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { EnvValidationSchema } from 'common/utils/joi-validation-for-env';
import { ApplicationModule } from 'applications/application.module';
import { RequestsModule } from 'requests/requests.module';
import { CategoriesModule } from 'categories/categories.module';
import { ResponsesModule } from 'responses/responses.module';
import { TemplatesModule } from 'templates/templates.module';
import { DisputesModule } from 'disputes/disputes.module';
import { CommentsModule } from 'comments/comments.module';
import { AdminModule } from '../admin/admin.module';
import configuration from '../config/configuration';
import { CitationModule } from '../citations/citation.module';
import { VerificationsModule } from '../verifications/verifications.module';
import { InterestsModule } from 'interests/interests.module';
import { PostsModule } from 'posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(ConfigEnvEnum.DB_HOST),
        port: config.get<number>(ConfigEnvEnum.DB_PORT),
        username: config.get<string>(ConfigEnvEnum.DB_USER),
        password: config.get<string>(ConfigEnvEnum.DB_PASSWORD),
        database: config.get<string>(ConfigEnvEnum.DB_NAME),
        entities: [join(__dirname, '/../../**/**.entity.js')],
        migrationsTableName: 'migrations_table',
        synchronize: false,
        migrationsRun: true,
        cli: {
          migrationsDir: 'src/db/migrations',
        },
        logging: config.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    NestjsFormDataModule,
    AuthModule,
    AccountModule,
    UsersModule,
    CommonModule,
    StorageModule,
    MailingModule,
    ExpertiseKeywordsModule,
    CitationTypesModule,
    CurrenciesModule,
    CredentialDocumentTypesModule,
    ResponseOwnershipTypesModule,
    ApplicationModule,
    RequestsModule,
    CategoriesModule,
    ResponsesModule,
    TemplatesModule,
    DisputesModule,
    CommentsModule,
    AdminModule,
    CitationModule,
    VerificationsModule,
    InterestsModule,
    PostsModule,
  ],
})
export class AppModule {}
