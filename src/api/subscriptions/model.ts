import { Params } from '../../http/client';

export interface SuccessMessage {
  success: boolean;
}

export interface Provider {
  provider_id: string;
  provider: string;
}

export interface Package {
  id: string;
  title: string;
  level: number;
  number_listing: number;
  month: number;
  amount: number;
  description: string;
  transaction_fee: number;
  transaction_revenue: number;
  shipping_waive: number;
  providers: Array<Provider>;
}

export interface SubscriptionArgs extends Params {
  receipt_token?: string;
  provider?: string;
  provider_id?: string;
  payload?: string;
  level?: number;
}

export interface SubscriptionTranstraction {
  id: string;
  amount: number;
  month: number;
  status: string;
  provider_id: string;
  provider: string;
  subscription_package: Package;
}

export interface SubscriptionInfo {
  subscription?: boolean;
  cancel_subscription?: boolean;
  expire_date?: string;
  transaction?: SubscriptionTranstraction;
  package: Package;
}

export interface SubscriptionSetting {
  tier_plan: boolean;
}
