import { ApiClient } from '../../http/client';
import {
  EnumStatus,
  Order,
  OrderArgs,
  updateOrderArgs,
  TaxRate,
  TaxRateArgs,
  DataAnalytics,
  updateOrderStatusArgs,
  ParamGetAnalytics,
  checkDiscountArgs,
  DiscountProduct,
} from './model';

export class OrderApi {
  public constructor(public readonly client: ApiClient) {}

  public async createOrder(params: OrderArgs): Promise<Order> {
    const uri = `/orders/`;
    return this.client.post(uri, params, {}, true);
  }

  public async getOrderDetail(id: string): Promise<Order> {
    const uri = `/orders/${id}/`;
    return this.client.get(uri);
  }

  public async updateOrder(id: string, params: updateOrderArgs): Promise<Order> {
    const uri = `/orders/${id}/`;
    return this.client.patch(uri, params);
  }

  public async getTaxRate(params: TaxRateArgs): Promise<TaxRate> {
    const uri = `/orders/tax-product/`;
    return this.client.post(uri, params);
  }

  public async updateOrderStatus(id: string, params: updateOrderStatusArgs): Promise<{ status: EnumStatus }> {
    const uri = `/orders/${id}/status/`;
    return this.client.put(uri, params);
  }

  public async getDataAnalytics(req: ParamGetAnalytics): Promise<DataAnalytics> {
    const params = {
      time_from: req.time_from,
      time_to: req.time_to,
      last_days: req.last_days
    }
    const uri = `/orders/analytics/`;
    return this.client.get(uri, params);
  }

  public async checkDisCount(params: checkDiscountArgs): Promise<DiscountProduct> {
    const uri = `/orders/check-discount/`;
    return this.client.post(uri, params);
  }
}
