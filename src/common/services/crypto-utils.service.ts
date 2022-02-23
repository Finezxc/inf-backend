import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { nanoid } from 'nanoid';

@Injectable()
export class CryptoUtilsService {
  generateUUID(): string {
    return nanoid();
  }

  generateHash(source: string): Promise<string> {
    return hash(source);
  }

  verifyHash(source: string, hash: string): Promise<boolean> {
    return verify(hash, source);
  }
}
