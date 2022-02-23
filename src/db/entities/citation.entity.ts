import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { CitationFieldEntity } from './citation-field.entity';
import { CitationTypeEntity } from './citation-type.entity';

@Entity({ name: 'citations' })
export class Citation extends BaseEntity {
  @ManyToOne(() => CitationFieldEntity)
  @JoinColumn({ name: 'citationFieldId', referencedColumnName: 'id' })
  citationField: CitationFieldEntity;

  @Column()
  value: string;

  @Column()
  citationTypeId: number;

  @Column()
  citationFieldId: number;

  @ManyToOne(() => CitationTypeEntity)
  citationType: CitationTypeEntity;

  @Column()
  responseId: number;
}
