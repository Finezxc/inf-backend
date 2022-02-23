import { BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Model {
  @PrimaryGeneratedColumn()
  id: number;
}

export abstract class TimestampWithCreatedAtMixin extends Model {
  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'A time when an object was created',
  })
  @Exclude()
  createdAt: Date;
}

export abstract class TimestampMixin extends TimestampWithCreatedAtMixin {
  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The last updated time',
  })
  updatedAt: Date;

  @BeforeUpdate()
  public setUpdated(): void {
    this.updatedAt = new Date(Date.now());
  }
}
