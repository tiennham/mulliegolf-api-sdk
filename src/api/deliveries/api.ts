import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import {
  RateServiceArgs,
  ProviderShipment,
  CreateShipment,
  Delivery,
  TrackingNumber,
  TrackingNumberArgs,
  AddTrackingArgs,
  DeliveryArgs,
  RateServiceInfo,
  ServiceInfoArgs,
  ServiceShippingMethod,
} from './models';

export class DeliveriesApi {
  public constructor(public readonly client: ApiClient) {}

  public async getRateService(args: RateServiceArgs): Promise<ServiceShippingMethod> {
    const url = `/deliveries/service/`;
    return this.client.post(url, args, {}, true);
  }

  public async getServiceInfo(args: ServiceInfoArgs): Promise<RateServiceInfo> {
    const url = `/deliveries/service-info/`;
    return this.client.post(url, args, {}, true);
  }

   public async createDelivery(args: DeliveryArgs): Promise<Delivery> {
    const url = `/deliveries/`;
    return this.client.post(url, args, {}, true);
  }

  public async getProvider(page = 1, limit = 20): Promise<Pagination<ProviderShipment>> {
    const params = { page, limit };
    const url = `/deliveries/provider/`;
    return this.client.get(url, params);
  }

  public createShipment(args: CreateShipment): Promise<Delivery> {
    const url = `/deliveries/shipment/`;
    return this.client.post(url, args, {}, true);
  }

  public trackingNumber(args: TrackingNumberArgs): Promise<TrackingNumber> {
    const url = `/deliveries/tracking-number/`;
    return this.client.post(url, args, {}, true);
  }

  public addTrackingNumber(args: AddTrackingArgs): Promise<Delivery> {
    const url = `/deliveries/add-tracking-number/`;
    return this.client.post(url, args, {}, true);
  }

  public async getDeliveryDetail(id: string): Promise<Delivery> {
    const uri = `/deliveries/${id}/`;
    return this.client.get(uri);
  }
}
