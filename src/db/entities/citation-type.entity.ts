import { Entity, OneToMany } from 'typeorm';

import { BaseEnumEntity } from 'db/entities/base-enum.entity';
import { CitationTypeEnum } from 'common/enums/citation-type.enum';
import { CitationFieldEntity } from './citation-field.entity';
import { Citation } from './citation.entity';

@Entity({ name: 'citation_types' })
export class CitationTypeEntity extends BaseEnumEntity<CitationTypeEnum> {
  @OneToMany(
    () => CitationFieldEntity,
    (citationField) => citationField.citationType,
  )
  citationFields: CitationFieldEntity[];

  @OneToMany(() => Citation, (citation) => citation.citationType)
  citations: Citation[];
}
