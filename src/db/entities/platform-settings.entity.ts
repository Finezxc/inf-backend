import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity('platform_settings')
export class PlatformSettingsEntity extends BaseEntity {
  /**
   *
   */
  @Column('text')
  customization: string;
  /**
   *
   */
  @Column('float')
  value: number;
}
