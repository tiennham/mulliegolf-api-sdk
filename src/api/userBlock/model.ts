import { ISimpleUser } from '../offer/model';
import { ISimpleProduct } from '../product/models';

export interface Reason {
  id: string;
  name: string;
  description: string;
}

export interface Report {
  id: string;
  owner?: ISimpleUser;
  receiver: ISimpleUser;
  product: ISimpleProduct;
  reason: Reason;
  description: string;
}

export interface ReportUserRequest {
  receiver_id: string;
  reason_id: string;
  description?: string;
}

export interface ReportProductRequest {
  product_id: string;
  reason_id: string;
  description?: string;
}

export interface BlockUser {
  id: string;
  user_blocker: ISimpleUser;
  user_blocked: ISimpleUser;
}

export interface BlockUserRequest {
  user_blocked_id: string;
}
