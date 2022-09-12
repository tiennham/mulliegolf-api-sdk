import { OfferStatus } from './enum';

export interface IOffer {
  id: string;
  product: IProductOffer;
  status: OfferStatus;
  product_id?: string;
  offer_price: number;
  previous_offer_price: number;
  owner: ISimpleUser;
  product_owner: ISimpleUser;
}

export interface IProductOffer {
  id: string;
  name: string;
  price: number;
  image_path: string;
  image_thumb_path: string;
  owner: string;
  has_specification: boolean;
}

export interface IOfferRequest {
  product_id: string;
  offer_price: number;
}

export interface ISimpleUser {
  id: string;
  avatar: string;
  name: string;
}
