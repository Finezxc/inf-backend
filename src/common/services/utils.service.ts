import { Injectable } from '@nestjs/common';

import { UserEntity } from 'db/entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class UtilsService {
  checkIfAlreadyVisited(arr: UserEntity[], id: number): boolean {
    const listOfVisitors = arr.map((visitor) => {
      return visitor.id;
    });
    return listOfVisitors.includes(id);
  }

  checkIfExpired(creationDate: Date, timeLimit: number): boolean {
    return moment(creationDate).add(timeLimit, 'minutes') < moment();
  }
}
