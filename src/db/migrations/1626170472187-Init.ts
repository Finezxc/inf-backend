import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1626170472187 implements MigrationInterface {
  name = 'Init1626170472187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "responder-payment-strategies" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_342deaf8fea1230c7faf39b71c3" UNIQUE ("name"), CONSTRAINT "PK_a481c9cb665b1529b1beb9fe8ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin-payment-settings" ("id" SERIAL NOT NULL, "defaultReward" double precision NOT NULL, "defaultTimeLimit" double precision NOT NULL, "platformFeeFactor" double precision NOT NULL, "verifierRewardFactor" double precision NOT NULL, "responderRewardFactor" double precision NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isCurrent" boolean NOT NULL, "responderPaymentStrategyId" bigint, CONSTRAINT "PK_2a31a938efaaa976466be1db9e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "citation_types" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_76d87bb2064a3b99d32a1f4c3bc" UNIQUE ("name"), CONSTRAINT "PK_57b2c7c66d45b224323d9fad650" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "citations" ("id" SERIAL NOT NULL, "doiOrIsbn" text, "author" text, "title" text, "publisher" text, "publicationYear" integer, "fullName" text, "jobTitle" text, "jobCompany" text, "contactInformation" text, "websiteUrl" text, "writtenJustification" text, "citationTypeId" bigint, CONSTRAINT "PK_3ac0e933616c270f79f04cfc9fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "credential_document_types" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_1669b181e8f270b104c07291120" UNIQUE ("name"), CONSTRAINT "PK_ddc787c31247ff42e24071a4c43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" bigint NOT NULL, "name" text NOT NULL, "symbolNative" text NOT NULL, "symbol" text NOT NULL, "namePlural" text NOT NULL, "code" text NOT NULL, "decimalDigits" smallint NOT NULL, "rounding" double precision NOT NULL, CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dispute_statuses" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_15668f79e388e9979ab1be441ff" UNIQUE ("name"), CONSTRAINT "PK_a36f6a78306e566282301b24d92" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "request_statuses" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_a55d6860e990474e9c7ce216681" UNIQUE ("name"), CONSTRAINT "PK_ef199681a6c0dbabd29c07fa9f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specific_categories" ("id" SERIAL NOT NULL, "userDefinedCategory" text, "categoryId" integer, CONSTRAINT "UQ_a84cb9cb9db43fed7474c307adb" UNIQUE ("categoryId", "userDefinedCategory"), CONSTRAINT "PK_8963a6fe93ca9bf9fd4ef0b24d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_4a77d431a6b2ac981c342b13c94" UNIQUE ("name"), CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "storage_items" ("id" SERIAL NOT NULL, "storedFileName" text NOT NULL, "originalFileName" text NOT NULL, "storagePath" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d11b74b2f352470d444a04fea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "responder_credential_documents" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "documentTypeId" bigint, "storageItemId" integer, "userId" integer, CONSTRAINT "REL_c4f6dab996a515803615d47f77" UNIQUE ("storageItemId"), CONSTRAINT "PK_f10c49300c62db4a3bdc2793ac5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "verifier_credential_documents" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "documentTypeId" bigint, "storageItemId" integer, "userId" integer, CONSTRAINT "REL_6963fa5c1456ad80d6c1a8c12a" UNIQUE ("storageItemId"), CONSTRAINT "PK_8083fac277821b815c91a67d65c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_approval_statuses" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_72ce9ba6789db70858e66ed211d" UNIQUE ("name"), CONSTRAINT "PK_f4bec68e95a6df3bd93b88b974d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "verifications" ("id" SERIAL NOT NULL, "verificationResult" boolean NOT NULL, "assignedReward" double precision, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2127ad1b143cf012280390b01d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expertise_keywords" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_abd245df25ac2b98393aeb58e29" UNIQUE ("name"), CONSTRAINT "PK_ba785c4e607d327a377ccdd798c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHash" text NOT NULL, "firstName" text, "lastName" text, "bio" text, "jobTitle" text, "location" text, "linkedInProfileUrl" text, "cryptoCurrencyWalletAddress" text, "rating" double precision NOT NULL, "birthDate" TIMESTAMP WITH TIME ZONE, "lastSignedIn" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isEmailConfirmed" boolean NOT NULL, "isRegistrationCompleted" boolean NOT NULL, "emailConfirmationToken" text, "passwordResetConfirmationToken" text, "approvalStatusId" bigint, "profilePictureId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_f127c2c8d3618ee635c96c68c4" UNIQUE ("profilePictureId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" SERIAL NOT NULL, "requesterId" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "reward" double precision NOT NULL, "inflationAdjustmentYears" integer array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "timeLimit" integer NOT NULL, "statusId" bigint, "verifierId" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "response_ownership_types" ("id" bigint NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_0ed2477d971d8904516109bd54c" UNIQUE ("name"), CONSTRAINT "PK_2937ca3999a15b2d3d21b7ee472" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "responses" ("id" SERIAL NOT NULL, "assignedReward" double precision, "rating" double precision NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "requestId" integer, "userId" integer, "verificationId" integer, "ownershipId" bigint, "responderPaymentStrategyId" bigint, CONSTRAINT "REL_db8782c65da799b68e80268c1f" UNIQUE ("verificationId"), CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "disputes" ("id" SERIAL NOT NULL, "reason" text NOT NULL, "description" text NOT NULL, "requesterId" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "resolvedAt" TIMESTAMP WITH TIME ZONE, "statusId" bigint, "responseId" integer, "adminId" integer, CONSTRAINT "PK_3c97580d01c1a4b0b345c42a107" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_expertise_keywords_expertise_keywords" ("usersId" integer NOT NULL, "expertiseKeywordsId" integer NOT NULL, CONSTRAINT "PK_46c8e7ab88416a622ecf6e02ff4" PRIMARY KEY ("usersId", "expertiseKeywordsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_89fdf84a24341598634887ab5d" ON "users_expertise_keywords_expertise_keywords" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d62abcdf074a73e3d07f03f5ef" ON "users_expertise_keywords_expertise_keywords" ("expertiseKeywordsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_user_roles" ("usersId" integer NOT NULL, "userRolesId" bigint NOT NULL, CONSTRAINT "PK_d4c62f3329838d0bac89b10e6ff" PRIMARY KEY ("usersId", "userRolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d8dbd66a19f280ebe60f6d58cf" ON "users_roles_user_roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a988e00cc9d657c69783f6330" ON "users_roles_user_roles" ("userRolesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_categories_specific_categories" ("usersId" integer NOT NULL, "specificCategoriesId" integer NOT NULL, CONSTRAINT "PK_acd31642b3800498d76f2fa6261" PRIMARY KEY ("usersId", "specificCategoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28f04aac4d9b5b98f2eae40930" ON "users_categories_specific_categories" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0162d4b3815f8187600625cdd9" ON "users_categories_specific_categories" ("specificCategoriesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "requests_categories_specific_categories" ("requestsId" integer NOT NULL, "specificCategoriesId" integer NOT NULL, CONSTRAINT "PK_b7ed7dcd39bd4d4d786d8ad2624" PRIMARY KEY ("requestsId", "specificCategoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a90b4613bfdaf71177bc4f150a" ON "requests_categories_specific_categories" ("requestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_badc08b6c94acf53775605d100" ON "requests_categories_specific_categories" ("specificCategoriesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "requests_currencies_currencies" ("requestsId" integer NOT NULL, "currenciesId" bigint NOT NULL, CONSTRAINT "PK_88f09de96b50491544dc7fdffe1" PRIMARY KEY ("requestsId", "currenciesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29632edf9440119e1b73998c14" ON "requests_currencies_currencies" ("requestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e2e35b601c2e7c79ed7a8bb63" ON "requests_currencies_currencies" ("currenciesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "requests_expertise_keywords_expertise_keywords" ("requestsId" integer NOT NULL, "expertiseKeywordsId" integer NOT NULL, CONSTRAINT "PK_eedd2538e9151d8d822a7cca4c0" PRIMARY KEY ("requestsId", "expertiseKeywordsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_662d9c407b02745fd4206ba8cf" ON "requests_expertise_keywords_expertise_keywords" ("requestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30354c50657839cd69766ef4e5" ON "requests_expertise_keywords_expertise_keywords" ("expertiseKeywordsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "responses_citations_citations" ("responsesId" integer NOT NULL, "citationsId" integer NOT NULL, CONSTRAINT "PK_bc24f496cd1c613d74fb2d8173f" PRIMARY KEY ("responsesId", "citationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b483d6fe61474aede51b82c692" ON "responses_citations_citations" ("responsesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f319b565aa2346bc6550a969a4" ON "responses_citations_citations" ("citationsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "responses_attachments_storage_items" ("responsesId" integer NOT NULL, "storageItemsId" integer NOT NULL, CONSTRAINT "PK_0fbf98a0139291ba9229975c2c4" PRIMARY KEY ("responsesId", "storageItemsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9092e354189c176b2a2acae62f" ON "responses_attachments_storage_items" ("responsesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1a69fe6b4d5a9b501dd3aedc98" ON "responses_attachments_storage_items" ("storageItemsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "admin-payment-settings" ADD CONSTRAINT "FK_b5102ead8936c77310c3f2afe96" FOREIGN KEY ("responderPaymentStrategyId") REFERENCES "responder-payment-strategies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "citations" ADD CONSTRAINT "FK_1d17e6f61b16084d4cdf5c142ac" FOREIGN KEY ("citationTypeId") REFERENCES "citation_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specific_categories" ADD CONSTRAINT "FK_9445c4398a63f53afb465a740d9" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" ADD CONSTRAINT "FK_c6d6b932ce9bf31ec59e9289059" FOREIGN KEY ("documentTypeId") REFERENCES "credential_document_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" ADD CONSTRAINT "FK_c4f6dab996a515803615d47f77c" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" ADD CONSTRAINT "FK_7b16d0b90158dd0ece9166f091d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" ADD CONSTRAINT "FK_fb9b9415b6bb9ec69be05722a71" FOREIGN KEY ("documentTypeId") REFERENCES "credential_document_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" ADD CONSTRAINT "FK_6963fa5c1456ad80d6c1a8c12a8" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" ADD CONSTRAINT "FK_2045f6d02d693295ac67cda7c21" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7a00fa6c87020ca2d66763ffbc0" FOREIGN KEY ("approvalStatusId") REFERENCES "user_approval_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_f127c2c8d3618ee635c96c68c4b" FOREIGN KEY ("profilePictureId") REFERENCES "storage_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9f15400a45ecf9f33fb2a85e824" FOREIGN KEY ("statusId") REFERENCES "request_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_0dfd4c546684adef7b5756a0cca" FOREIGN KEY ("verifierId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_e12eba131b70eacfee49c2ac411" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_a9814d310833f66dab2c24314d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_db8782c65da799b68e80268c1f8" FOREIGN KEY ("verificationId") REFERENCES "verifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_cbed3fa31fe03675b5e6284dbe6" FOREIGN KEY ("ownershipId") REFERENCES "response_ownership_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_f02d457db1a700a0e426da101c1" FOREIGN KEY ("responderPaymentStrategyId") REFERENCES "responder-payment-strategies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" ADD CONSTRAINT "FK_de2700f506629ae07e5a3176607" FOREIGN KEY ("statusId") REFERENCES "dispute_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" ADD CONSTRAINT "FK_2edc290bc4a2ece40b6597bcd31" FOREIGN KEY ("responseId") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" ADD CONSTRAINT "FK_3df24b76cd525b41390bb7efb99" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_expertise_keywords_expertise_keywords" ADD CONSTRAINT "FK_89fdf84a24341598634887ab5d7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_expertise_keywords_expertise_keywords" ADD CONSTRAINT "FK_d62abcdf074a73e3d07f03f5efb" FOREIGN KEY ("expertiseKeywordsId") REFERENCES "expertise_keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_user_roles" ADD CONSTRAINT "FK_d8dbd66a19f280ebe60f6d58cfa" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_user_roles" ADD CONSTRAINT "FK_4a988e00cc9d657c69783f63300" FOREIGN KEY ("userRolesId") REFERENCES "user_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_categories_specific_categories" ADD CONSTRAINT "FK_28f04aac4d9b5b98f2eae409309" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_categories_specific_categories" ADD CONSTRAINT "FK_0162d4b3815f8187600625cdd94" FOREIGN KEY ("specificCategoriesId") REFERENCES "specific_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_categories_specific_categories" ADD CONSTRAINT "FK_a90b4613bfdaf71177bc4f150aa" FOREIGN KEY ("requestsId") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_categories_specific_categories" ADD CONSTRAINT "FK_badc08b6c94acf53775605d1002" FOREIGN KEY ("specificCategoriesId") REFERENCES "specific_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_currencies_currencies" ADD CONSTRAINT "FK_29632edf9440119e1b73998c148" FOREIGN KEY ("requestsId") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_currencies_currencies" ADD CONSTRAINT "FK_1e2e35b601c2e7c79ed7a8bb632" FOREIGN KEY ("currenciesId") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_expertise_keywords_expertise_keywords" ADD CONSTRAINT "FK_662d9c407b02745fd4206ba8cfe" FOREIGN KEY ("requestsId") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_expertise_keywords_expertise_keywords" ADD CONSTRAINT "FK_30354c50657839cd69766ef4e5e" FOREIGN KEY ("expertiseKeywordsId") REFERENCES "expertise_keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" ADD CONSTRAINT "FK_b483d6fe61474aede51b82c692d" FOREIGN KEY ("responsesId") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" ADD CONSTRAINT "FK_f319b565aa2346bc6550a969a46" FOREIGN KEY ("citationsId") REFERENCES "citations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" ADD CONSTRAINT "FK_9092e354189c176b2a2acae62f9" FOREIGN KEY ("responsesId") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" ADD CONSTRAINT "FK_1a69fe6b4d5a9b501dd3aedc98c" FOREIGN KEY ("storageItemsId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" DROP CONSTRAINT "FK_1a69fe6b4d5a9b501dd3aedc98c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" DROP CONSTRAINT "FK_9092e354189c176b2a2acae62f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" DROP CONSTRAINT "FK_f319b565aa2346bc6550a969a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" DROP CONSTRAINT "FK_b483d6fe61474aede51b82c692d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_expertise_keywords_expertise_keywords" DROP CONSTRAINT "FK_30354c50657839cd69766ef4e5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_expertise_keywords_expertise_keywords" DROP CONSTRAINT "FK_662d9c407b02745fd4206ba8cfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_currencies_currencies" DROP CONSTRAINT "FK_1e2e35b601c2e7c79ed7a8bb632"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_currencies_currencies" DROP CONSTRAINT "FK_29632edf9440119e1b73998c148"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_categories_specific_categories" DROP CONSTRAINT "FK_badc08b6c94acf53775605d1002"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_categories_specific_categories" DROP CONSTRAINT "FK_a90b4613bfdaf71177bc4f150aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_categories_specific_categories" DROP CONSTRAINT "FK_0162d4b3815f8187600625cdd94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_categories_specific_categories" DROP CONSTRAINT "FK_28f04aac4d9b5b98f2eae409309"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_user_roles" DROP CONSTRAINT "FK_4a988e00cc9d657c69783f63300"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_user_roles" DROP CONSTRAINT "FK_d8dbd66a19f280ebe60f6d58cfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_expertise_keywords_expertise_keywords" DROP CONSTRAINT "FK_d62abcdf074a73e3d07f03f5efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_expertise_keywords_expertise_keywords" DROP CONSTRAINT "FK_89fdf84a24341598634887ab5d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" DROP CONSTRAINT "FK_3df24b76cd525b41390bb7efb99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" DROP CONSTRAINT "FK_2edc290bc4a2ece40b6597bcd31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disputes" DROP CONSTRAINT "FK_de2700f506629ae07e5a3176607"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_f02d457db1a700a0e426da101c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_cbed3fa31fe03675b5e6284dbe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_db8782c65da799b68e80268c1f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_a9814d310833f66dab2c24314d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_e12eba131b70eacfee49c2ac411"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_0dfd4c546684adef7b5756a0cca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_9f15400a45ecf9f33fb2a85e824"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_f127c2c8d3618ee635c96c68c4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7a00fa6c87020ca2d66763ffbc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" DROP CONSTRAINT "FK_2045f6d02d693295ac67cda7c21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" DROP CONSTRAINT "FK_6963fa5c1456ad80d6c1a8c12a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifier_credential_documents" DROP CONSTRAINT "FK_fb9b9415b6bb9ec69be05722a71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" DROP CONSTRAINT "FK_7b16d0b90158dd0ece9166f091d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" DROP CONSTRAINT "FK_c4f6dab996a515803615d47f77c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responder_credential_documents" DROP CONSTRAINT "FK_c6d6b932ce9bf31ec59e9289059"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specific_categories" DROP CONSTRAINT "FK_9445c4398a63f53afb465a740d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citations" DROP CONSTRAINT "FK_1d17e6f61b16084d4cdf5c142ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin-payment-settings" DROP CONSTRAINT "FK_b5102ead8936c77310c3f2afe96"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_1a69fe6b4d5a9b501dd3aedc98"`);
    await queryRunner.query(`DROP INDEX "IDX_9092e354189c176b2a2acae62f"`);
    await queryRunner.query(`DROP TABLE "responses_attachments_storage_items"`);
    await queryRunner.query(`DROP INDEX "IDX_f319b565aa2346bc6550a969a4"`);
    await queryRunner.query(`DROP INDEX "IDX_b483d6fe61474aede51b82c692"`);
    await queryRunner.query(`DROP TABLE "responses_citations_citations"`);
    await queryRunner.query(`DROP INDEX "IDX_30354c50657839cd69766ef4e5"`);
    await queryRunner.query(`DROP INDEX "IDX_662d9c407b02745fd4206ba8cf"`);
    await queryRunner.query(
      `DROP TABLE "requests_expertise_keywords_expertise_keywords"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_1e2e35b601c2e7c79ed7a8bb63"`);
    await queryRunner.query(`DROP INDEX "IDX_29632edf9440119e1b73998c14"`);
    await queryRunner.query(`DROP TABLE "requests_currencies_currencies"`);
    await queryRunner.query(`DROP INDEX "IDX_badc08b6c94acf53775605d100"`);
    await queryRunner.query(`DROP INDEX "IDX_a90b4613bfdaf71177bc4f150a"`);
    await queryRunner.query(
      `DROP TABLE "requests_categories_specific_categories"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_0162d4b3815f8187600625cdd9"`);
    await queryRunner.query(`DROP INDEX "IDX_28f04aac4d9b5b98f2eae40930"`);
    await queryRunner.query(
      `DROP TABLE "users_categories_specific_categories"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_4a988e00cc9d657c69783f6330"`);
    await queryRunner.query(`DROP INDEX "IDX_d8dbd66a19f280ebe60f6d58cf"`);
    await queryRunner.query(`DROP TABLE "users_roles_user_roles"`);
    await queryRunner.query(`DROP INDEX "IDX_d62abcdf074a73e3d07f03f5ef"`);
    await queryRunner.query(`DROP INDEX "IDX_89fdf84a24341598634887ab5d"`);
    await queryRunner.query(
      `DROP TABLE "users_expertise_keywords_expertise_keywords"`,
    );
    await queryRunner.query(`DROP TABLE "disputes"`);
    await queryRunner.query(`DROP TABLE "responses"`);
    await queryRunner.query(`DROP TABLE "response_ownership_types"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "expertise_keywords"`);
    await queryRunner.query(`DROP TABLE "verifications"`);
    await queryRunner.query(`DROP TABLE "user_approval_statuses"`);
    await queryRunner.query(`DROP TABLE "verifier_credential_documents"`);
    await queryRunner.query(`DROP TABLE "responder_credential_documents"`);
    await queryRunner.query(`DROP TABLE "storage_items"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "specific_categories"`);
    await queryRunner.query(`DROP TABLE "request_statuses"`);
    await queryRunner.query(`DROP TABLE "dispute_statuses"`);
    await queryRunner.query(`DROP TABLE "currencies"`);
    await queryRunner.query(`DROP TABLE "credential_document_types"`);
    await queryRunner.query(`DROP TABLE "citations"`);
    await queryRunner.query(`DROP TABLE "citation_types"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "admin-payment-settings"`);
    await queryRunner.query(`DROP TABLE "responder-payment-strategies"`);
  }
}
