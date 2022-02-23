import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../../common/types/user-payload.type';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class NosisStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('nosisKey'),
    });
  }

  public async validate(payload: UserPayload): Promise<UserPayload> {
    if (!payload.id) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
