import { ISimpleUser } from '../offer/model';

export interface Provider {
  id: string;
  name: string;
  provider_type: string;
}

export interface AccountMeta {
  merchant_id: string;
  tracking_id: string;
  payments_receivable?: boolean;
  primary_email_confirmed?: boolean;
  primary_email?: string;
}

export interface UserAccount {
  user: ISimpleUser;
  provider: Provider;
  meta: AccountMeta;
}

export interface Transaction {
  id: string;
  subject: string;
  destination: string;
  order: string;
  subtotal: number;
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
  amount_total: number;
  platform_fee: number;
  currency: string;
  status: string;
  balance_transaction_id: string;
  approve_link: string;
  capture_id: string;
}

export interface TransactionOrderSimple {
  id: string;
  status: string;
  platform_fee: number;
  paypal_fee: number;
  status_reason: string;
}

export interface ChargeShippingFeeTransaction {
  id: string;
  subject: string;
  order: string;
  amount: number;
  currency: string;
  status: string;
  transaction_id: string;
  capture_id: string;
  approve_link: string;
}

export interface CheckoutPayload {
  order_id: string;
  provider_type: string;
  return_url: string;
  cancel_url?: string;
}

export interface PayPalSignUpLinkRequest {
  return_url?: string;
}

export interface PayPalSignUpLink {
  redirect_link: string;
}

export interface PayPalLoginSellerRequest {
  merchant_id: string;
}
