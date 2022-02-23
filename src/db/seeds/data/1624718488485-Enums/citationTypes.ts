import type { CitationTypeEntity } from 'db/entities/citation-type.entity';

export const citationTypes: Array<
  Partial<CitationTypeEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'Literature reference',
  },
  {
    id: 2,
    name: 'Personal reference',
  },
  {
    id: 3,
    name: 'Internet source',
  },
  {
    id: 4,
    name: 'Written justification',
  },
];
