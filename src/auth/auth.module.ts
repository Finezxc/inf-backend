import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAuthGuard } from 'auth/guards/user-auth.guard';
import { UserAuthService } from 'auth/services/user-auth.service';
import { AccountModule } from 'account/account.module';
import { CommonModule } from 'common/common.module';
import { SessionsService } from 'auth/services/sessions.service';
import { UserRolesGuard } from 'auth/guards/user-roles.guard';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { NosisStrategy } from './strategy/nosis.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    forwardRef(() => AccountModule),
    CommonModule,
    TypeOrmModule.forFeature([UserRoleEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [],
  providers: [
    UserAuthGuard,
    UserAuthService,
    SessionsService,
    UserRolesGuard,
    NosisStrategy,
  ],
  exports: [
    UserAuthService,
    SessionsService,
    TypeOrmModule.forFeature([UserRoleEntity]),
    JwtModule,
  ],
})
export class AuthModule {}
