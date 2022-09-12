import { Params } from '../../http/client';

export interface Rating {
  id: string;
  rate: number;
  assessor_id: string;
  order_id: string;
  note?: string;
}

export interface RatingArgs extends Params {
  rate: number;
  order_id: string;
  note?: string;
}
