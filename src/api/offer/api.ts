import { ApiClient } from '../../http/client';
import { OfferOwnerAction, ProductOwnerAction } from './enum';
import { IOffer, IOfferRequest } from './model';

export class OfferApi {
  public constructor(public readonly client: ApiClient) {}

  public async create(params: IOfferRequest): Promise<IOffer> {
    const uri = '/orders/offers/';
    return this.client.post(uri, params, {}, true);
  }

  public async getById(offerId: string, status?: string): Promise<IOffer> {
    const uri = `/orders/offers/${offerId}/`;
    return this.client.get(uri, { status: status });
  }

  public async offerOwnerAction(offerId: string, action: OfferOwnerAction): Promise<IOffer> {
    const uri = `/orders/offers/${offerId}/owner/action/`;
    return this.client.put(uri, { status: action }, {}, true);
  }

  public async productOwnerAction(offerId: string, action: ProductOwnerAction, offer_price?: number): Promise<IOffer> {
    const params: any = { status: action };
    if (offer_price && action === ProductOwnerAction.COUNTER_OFFER) {
      params['offer_price'] = offer_price;
    }
    const uri = `/orders/offers/${offerId}/productOwner/action/`;
    return this.client.put(uri, params, {}, true);
  }
}
