import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { ResponderCredentialDocument } from 'db/entities/responder-credential-document.entity';
import { VerifierCredentialDocument } from 'db/entities/verifier-credential-document.entity';
import { UserApprovalStatusEntity } from 'db/entities/user-approval-status.entity';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { ResponseEntity } from 'db/entities/response.entity';
import { VerificationEntity } from 'db/entities/verification.entity';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CommentEntity } from './comment.entity';
import { TimestampMixin } from '../../common/models/base.model';
import { Exclude } from 'class-transformer';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'users' })
export class UserEntity extends TimestampMixin {
  @Column({ unique: true })
  email: string;

  @Column('text')
  @Exclude()
  passwordHash: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  jobTitle: string;

  @Column('text', { nullable: true })
  location: string;

  @Column('text', { nullable: true })
  linkedInProfileUrl?: string;

  @Column('text', { nullable: true })
  cryptoCurrencyWalletAddress: string;

  @ManyToMany(() => ExpertiseKeywordEntity)
  @JoinTable()
  expertiseKeywords: ExpertiseKeywordEntity[];

  @Column('float')
  rating: number;

  @Column({ type: 'timestamptz', nullable: true })
  birthDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  lastSignedIn: Date;

  @Column()
  @Exclude()
  isEmailConfirmed: boolean;

  @Column()
  @Exclude()
  isRegistrationCompleted: boolean;

  @Column('text', { nullable: true })
  @Exclude()
  emailConfirmationToken: string;

  @Column('text', { nullable: true })
  @Exclude()
  passwordResetConfirmationToken: string;

  @ManyToOne(() => UserApprovalStatusEntity)
  approvalStatus: UserApprovalStatusEntity;

  @OneToOne(() => StorageItemEntity, {
    nullable: true,
    cascade: true,
    // onDelete: 'CASCADE',
    // onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profilePicture?: StorageItemEntity;

  @ManyToMany(() => UserRoleEntity, (role) => role.users, { eager: true })
  @JoinTable()
  roles: UserRoleEntity[];

  @ManyToMany(() => CategoryEntity, { cascade: true })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => ResponseEntity, (response) => response.user, {
    cascade: true,
  })
  responses: ResponseEntity[];

  @OneToMany(() => VerificationEntity, (verification) => verification.user, {
    cascade: true,
  })
  verifications: VerificationEntity[];

  @OneToMany(() => ResponderCredentialDocument, (document) => document.user, {
    cascade: true,
  })
  responderCredentialDocuments: ResponderCredentialDocument[];

  @OneToMany(() => VerifierCredentialDocument, (document) => document.user, {
    cascade: true,
  })
  verifierCredentialDocuments: VerifierCredentialDocument[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
