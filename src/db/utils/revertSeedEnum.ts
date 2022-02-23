import type { QueryBuilder } from 'typeorm';

export async function revertSeedEnum<EntityType>(
  entity: EntityType,
  queryBuilder: QueryBuilder<EntityType>,
  data: Array<{ name: string }>,
) {
  await queryBuilder
    .delete()
    .from(entity as any)
    .where('name IN (:...names)', {
      names: data.map((en) => en.name),
    })
    .execute();
}
