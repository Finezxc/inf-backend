import type { Request as ExpressRequest } from 'express';

import { SessionType } from 'common/types/session.type';

export type Request = ExpressRequest & { session: SessionType };
