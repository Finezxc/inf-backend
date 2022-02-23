import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { EvaluationRequestInterestEntity } from 'db/entities/evaluation-request-interect.entity';
import { LeaderResponse } from 'interests/responses/leader.response';

@Injectable()
@EntityRepository(EvaluationRequestInterestEntity)
export class EvaluationRequestInterestRepository extends BaseRepository<EvaluationRequestInterestEntity> {
  async getLeaderBoard(): Promise<LeaderResponse[]> {
    const queryResult = await this.query(`
      select * from (select distinct on (evaluation_request_interests.email)
        evaluation_request_interests.email as email,
        assets_submitted,
        points,
        evaluation_request_interests."firstName" as "firstName"
      from evaluation_request_interests
      left join (
        select
          email, 
          count(email) as assets_submitted 
        from evaluation_request_interests
        group by 
          evaluation_request_interests.email
      ) as assets_query
        on assets_query.email = evaluation_request_interests.email
      left join (
        select 
          email, 
          SUM("referralUsagesCounter") as points 
        from evaluation_request_interests
        group by 
          evaluation_request_interests.email
      ) as points_query
        on points_query.email = evaluation_request_interests.email) as "q"
      order by points desc
    `);

    return queryResult.map(
      ({ email, firstName, points, assets_submitted }) =>
        new LeaderResponse({
          email,
          firstName,
          points: Number(points),
          assetsSubmitted: Number(assets_submitted),
        }),
    );
  }

  async getEvaluationRequestInterests(): Promise<
    Array<EvaluationRequestInterestEntity>
  > {
    return this.createQueryBuilder('evaluation_request_interests')
      .leftJoinAndSelect(
        'evaluation_request_interests.categories',
        'categories',
      )
      .leftJoinAndSelect(
        'evaluation_request_interests.assetPictures',
        'assetPictures',
      )
      .orderBy('evaluation_request_interests.createdAt', 'ASC')

      .getMany();
  }
}
