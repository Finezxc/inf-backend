import type { QueryBuilder } from 'typeorm';

export async function applySeedEnum<EntityType>(
  entity: EntityType,
  queryBuilder: QueryBuilder<EntityType>,
  data: Array<EntityType>,
) {
  await queryBuilder
    .insert()
    .into(entity as any)
    .values(data)
    .execute();
}
