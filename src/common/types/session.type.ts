import type { Session as ExpressSession } from 'express-session';

export interface SessionType extends ExpressSession {
  userData?: {
    token: string;
  };
}
