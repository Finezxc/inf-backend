import { CitationFieldEntity } from '../../../entities/citation-field.entity';
import { CitationTypeEntity } from '../../../entities/citation-type.entity';

export const citationFields: Array<
  Partial<CitationFieldEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'DOI or ISBN',
    citationType: <CitationTypeEntity>{ id: 1 },
  },
  {
    id: 2,
    name: 'Author',
    citationType: <CitationTypeEntity>{ id: 1 },
  },
  {
    id: 3,
    name: 'Title',
    citationType: <CitationTypeEntity>{ id: 1 },
  },
  {
    id: 4,
    name: 'Publisher',
    citationType: <CitationTypeEntity>{ id: 1 },
  },
  {
    id: 5,
    name: 'Year of publication ',
    citationType: <CitationTypeEntity>{ id: 1 },
  },
  {
    id: 6,
    name: 'Full name',
    citationType: <CitationTypeEntity>{ id: 2 },
  },
  {
    id: 7,
    name: 'Job title and company ',
    citationType: <CitationTypeEntity>{ id: 2 },
  },
  {
    id: 8,
    name: 'Contact information',
    citationType: <CitationTypeEntity>{ id: 2 },
  },
  {
    id: 9,
    name: 'Hyperlink to the referenced web page',
    citationType: <CitationTypeEntity>{ id: 3 },
  },
  {
    id: 10,
    name: 'Free text input',
    citationType: <CitationTypeEntity>{ id: 4 },
  },
];
