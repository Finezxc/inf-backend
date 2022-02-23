import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import { promisify } from 'util';
import { SessionType } from 'common/types/session.type';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { JwtService } from '@nestjs/jwt';

const RedisStore = connectRedis(session);

@Injectable()
export class SessionsService {
  private redisClient: redis.RedisClient;
  private redisStore: typeof RedisStore;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.redisClient = redis.createClient({
      host: this.configService.get<string>(ConfigEnvEnum.REDIS_HOST),
    });

    this.redisStore = new RedisStore({
      client: this.redisClient,
      disableTouch: true,
      host: this.configService.get<string>(ConfigEnvEnum.REDIS_HOST),
    });
  }

  get store() {
    return this.redisStore;
  }

  async removeUserSessions(): Promise<boolean> {
    const destroy = promisify(this.redisStore.destroy).bind(this.redisStore);
    const sessions = await promisify(this.store.all).bind(this.store)();
    let isRemoved = false;

    for (const session of sessions as SessionType[]) {
      if (session.userData.token) {
        const destroyed = await destroy(session.id);

        if (typeof destroyed !== 'number') {
          throw destroyed;
        }

        isRemoved = true;
      }
    }

    return isRemoved;
  }
}
