import { MigrationInterface, QueryRunner } from 'typeorm';

import { CitationTypeEntity } from 'db/entities/citation-type.entity';
import { citationTypes } from 'db/seeds/data/1624718488485-Enums/citationTypes';
import { applySeedEnum } from 'db/utils/applySeedEnum';
import { revertSeedEnum } from 'db/utils/revertSeedEnum';
import { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';
import { credentialDocumentTypes } from 'db/seeds/data/1624718488485-Enums/credentialDocumentTypes';
import { DisputeStatusEntity } from 'db/entities/dispute-status.entity';
import { disputeStatuses } from 'db/seeds/data/1624718488485-Enums/disputeStatuses';
import { RequestStatusEntity } from 'db/entities/request-status.entity';
import { requestStatuses } from 'db/seeds/data/1624718488485-Enums/requestStatuses';
import { ResponseOwnershipTypeEntity } from 'db/entities/response-ownership-type.entity';
import { responseOwnershipTypes } from 'db/seeds/data/1624718488485-Enums/responseOwnershipTypes';
import { UserApprovalStatusEntity } from 'db/entities/user-approval-status.entity';
import { userApprovalStatuses } from 'db/seeds/data/1624718488485-Enums/userApprovalStatuses';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { CurrencyEntity } from 'db/entities/currency.entity';
import { currencies } from 'db/seeds/data/1624718488485-Enums/currencies';
import { userRoles } from 'db/seeds/data/1624718488485-Enums/userRoles';
import { ResponderPaymentStrategy } from 'db/entities/payment-strategy.entity';
import { responderPaymentStrategies } from 'db/seeds/data/1624718488485-Enums/responderPaymentStrategies';
import { CategoryEntity } from 'db/entities/category.entity';
import { categoryTypes } from 'db/seeds/data/1624718488485-Enums/categoriesTypes';

export class Enums1624718488485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const builder = await queryRunner.manager.createQueryBuilder();

    await applySeedEnum(CitationTypeEntity, builder, citationTypes);
    await applySeedEnum(
      CredentialDocumentTypeEntity,
      builder,
      credentialDocumentTypes,
    );
    await applySeedEnum(DisputeStatusEntity, builder, disputeStatuses);
    await applySeedEnum(RequestStatusEntity, builder, requestStatuses);
    await applySeedEnum(
      ResponseOwnershipTypeEntity,
      builder,
      responseOwnershipTypes,
    );
    await applySeedEnum(
      UserApprovalStatusEntity,
      builder,
      userApprovalStatuses,
    );
    await applySeedEnum(UserRoleEntity, builder, userRoles);
    await applySeedEnum(
      ResponderPaymentStrategy,
      builder,
      responderPaymentStrategies,
    );
    await applySeedEnum(CategoryEntity, builder, categoryTypes);

    await builder.insert().into(CurrencyEntity).values(currencies).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const builder = await queryRunner.manager.createQueryBuilder();

    await revertSeedEnum(CitationTypeEntity, builder, citationTypes);
    await revertSeedEnum(
      CredentialDocumentTypeEntity,
      builder,
      credentialDocumentTypes,
    );
    await revertSeedEnum(DisputeStatusEntity, builder, disputeStatuses);
    await revertSeedEnum(RequestStatusEntity, builder, requestStatuses);
    await revertSeedEnum(
      ResponseOwnershipTypeEntity,
      builder,
      responseOwnershipTypes,
    );
    await revertSeedEnum(
      UserApprovalStatusEntity,
      builder,
      userApprovalStatuses,
    );
    await revertSeedEnum(UserRoleEntity, builder, userRoles);

    await revertSeedEnum(
      ResponderPaymentStrategy,
      builder,
      responderPaymentStrategies,
    );

    await revertSeedEnum(CategoryEntity, builder, categoryTypes);

    await builder
      .delete()
      .from(CurrencyEntity)
      .whereInIds(currencies.map((currency) => currency.id))
      .execute();
  }
}
