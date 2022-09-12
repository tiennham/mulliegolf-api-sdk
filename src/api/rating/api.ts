import { ApiClient } from '../../http/client';
import { Rating, RatingArgs } from './models';

export class RatingApi {
  public constructor(public readonly client: ApiClient) {}

  public async rating(args: RatingArgs): Promise<Rating> {
    return this.client.post('/ratings/', args);
  }
}
