import { OmitType } from '@nestjs/swagger';
import { PlatformSettingsResponse } from './platform-settings.response';

export class UpdateSettingResponse extends OmitType(PlatformSettingsResponse, [
  'id',
] as const) {}
