import { User } from '../user/models';
import { Params } from '../../http/client';
import { Brand } from '../product/models';

export interface Follows {
  id: string;
  user_follower?: User;
  user_following?: User;
  brand?: Brand;
  type_follow?: string;
  followed?: boolean;
}

export interface FollowsArgs extends Params {
  following_id: string;
  type_follow: string;
}
