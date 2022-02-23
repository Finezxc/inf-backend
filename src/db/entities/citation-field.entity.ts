import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CitationTypeEntity } from './citation-type.entity';
import { BaseEntity } from './base-entity.entity';
import { Citation } from './citation.entity';

@Entity({ name: 'citation_fields' })
export class CitationFieldEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToOne(() => CitationTypeEntity)
  citationType: CitationTypeEntity;

  @OneToMany(() => Citation, (citation) => citation.citationField)
  citations: Citation[];
}
