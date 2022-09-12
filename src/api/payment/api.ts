import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import {
  ChargeShippingFeeTransaction,
  CheckoutPayload,
  PayPalSignUpLink,
  PayPalSignUpLinkRequest,
  Provider,
  Transaction,
  UserAccount,
} from './model';

export class PaymentApi {
  public constructor(public readonly client: ApiClient) {}

  public async listProvider(page = 1, limit = 20): Promise<Pagination<Provider>> {
    const params = { page, limit };
    const uri = `/payments/providers/`;
    return this.client.get(uri, params);
  }

  public async paypalSignUpLink(payload: PayPalSignUpLinkRequest = {}): Promise<PayPalSignUpLink> {
    const uri = `/payments/paypal/sign-up-link/`;
    return this.client.post(uri, payload);
  }

  public async paypalTrackingSeller(): Promise<UserAccount> {
    const uri = `/payments/paypal/tracking-seller/`;
    return this.client.put(uri);
  }

  public async getUserAccount(page = 1, limit = 20): Promise<Pagination<UserAccount>> {
    const params = { page, limit };
    const uri = `/payments/users/accounts/`;
    return this.client.get(uri, params);
  }

  public async checkout(payload: CheckoutPayload): Promise<Transaction> {
    const uri = `/payments/checkout/`;
    return this.client.post(uri, payload);
  }

  public async capture(captureId: string): Promise<Transaction> {
    const uri = `/payments/capture/${captureId}/`;
    return this.client.put(uri);
  }

   public async captureShipping(captureId: string): Promise<ChargeShippingFeeTransaction> {
    const uri = `/payments/capture-shipping/${captureId}/`;
    return this.client.put(uri);
  }

  public async refund(captureId: string): Promise<Transaction> {
    const uri = `/payments/refund/${captureId}/`;
    return this.client.put(uri);
  }

  public async chargeShippingFee(payload: CheckoutPayload): Promise<ChargeShippingFeeTransaction> {
    const uri = `/payments/shipping-fee/checkout/`;
    return this.client.post(uri, payload);
  }

  public async purchasingShipping(order_id: string): Promise<void> {
    const uri = `/payments/purchasing-shipping/${order_id}/`;
    return this.client.get(uri);
  }
}
