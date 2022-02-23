import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { OpenDisputeDto } from '../dto/open-dispute.dto';
import { ResponseRepository } from '../../responses/repositories/response.repository';
import { DisputeRepository } from '../repositories/dispute.repository';
import { DisputeStatusEnum } from '../../common/enums/dispute-status.enum';
import { PaginatedQueryDto } from '../../common/dto/paginated-query.dto';
import { DisputeDecisionDto } from '../dto/dispute-decision.dto';
import { UserRepository } from '../../account/repositories/user.repository';
import { DisputeStatusEntity } from '../../db/entities/dispute-status.entity';
import { UserPayload } from '../../common/types/user-payload.type';
import { DisputeEntity } from '../../db/entities/dispute.entity';
import { IdType } from '../../common/types/id-type.type';

@Injectable()
export class DisputesService {
  constructor(
    private responsesRepo: ResponseRepository,
    private disputeRepo: DisputeRepository,
    private userRepo: UserRepository,
  ) {}

  async openDispute(openDisputeDto: OpenDisputeDto): Promise<DisputeEntity> {
    const { requesterId, responseId, reason, description } = openDisputeDto;
    const response = await this.responsesRepo.findOneOrFail(responseId);

    if (!response) {
      throw new BadRequestException("This response doesn't exists");
    }

    const dispute = this.disputeRepo.create({
      requesterId: requesterId,
      response: { id: responseId },
      reason: reason,
      description: description,
      status: { id: DisputeStatusEnum.NotReviewed },
    });

    return this.disputeRepo.save(dispute);
  }

  async getNotReviewedDisputes(paginatedQueryDto: PaginatedQueryDto) {
    return paginate(this.disputeRepo, paginatedQueryDto, {
      where: { status: DisputeStatusEnum.NotReviewed },
      select: [
        'id',
        'requesterId',
        'reason',
        'description',
        'response',
        'createdAt',
      ],
      relations: ['response'],
    });
  }

  async getDispute(id: IdType): Promise<DisputeEntity> {
    return this.disputeRepo.findOneOrFail(id);
  }

  async decideOnDispute(
    user: UserPayload,
    disputeDecisionDto: DisputeDecisionDto,
  ) {
    const dispute = await this.disputeRepo.findOneOrFail({
      where: {
        id: disputeDecisionDto.id,
        status: DisputeStatusEnum.NotReviewed,
      },
      relations: ['status'],
    });

    const admin = await this.userRepo.findOneOrFail({
      where: { id: user.id },
    });

    dispute.status =
      disputeDecisionDto.status as unknown as DisputeStatusEntity;
    dispute.admin = admin;
    dispute.resolvedAt = new Date();

    await this.disputeRepo.save(dispute);
  }
}
