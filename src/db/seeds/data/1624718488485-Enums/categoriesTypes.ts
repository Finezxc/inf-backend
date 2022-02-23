import type { CategoryEntity } from 'db/entities/category.entity';

export const categoryTypes: Array<Partial<CategoryEntity> & { name: string }> =
  [
    {
      id: 1,
      name: 'Collectibles',
    },
    {
      id: 2,
      name: 'Real Estate',
    },
    {
      id: 3,
      name: 'Sneakers',
    },
    {
      id: 4,
      name: 'Collectible cards',
    },
    {
      id: 4,
      name: 'Art',
    },
    {
      id: 5,
      name: 'Vehicles',
    },
    {
      id: 6,
      name: 'Antiques',
    },
    {
      id: 7,
      name: 'Jewellery',
    },
    {
      id: 8,
      name: 'Watches',
    },
    {
      id: 9,
      name: 'Intellectual Property',
    },
    {
      id: 10,
      name: 'Books',
    },
    {
      id: 11,
      name: 'Other',
    },
  ];
