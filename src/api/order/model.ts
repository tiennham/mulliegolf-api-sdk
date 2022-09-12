import { AddressArgs } from '../user/models';
import { TransactionOrderSimple } from '../payment/model';
import { Product } from '../product/models';

export interface Order {
  id: string;
  payment_method: string;
  shipping_method: string;
  shipping_from: AddressArgs;
  recipient_name: string;
  shipping_to: AddressArgs;
  recipient_name_billing: string;
  billing_address: AddressArgs;
  delivery: Delivery[];
  order_detail: OrderDetail[];
  status: string;
  estimated_delivery: string;
  user_buy: string;
  user_sell: string;
  paid_shipping_fee: boolean;
  net_received: number;
  amount_tax: number;
  percent_tax: number;
  transaction: TransactionOrderSimple[];
  buyer_need_rate: boolean;
  seller_need_rate: boolean;
}

export interface OrderDetail {
  id: string;
  name: string;
  price: number;
  product: Product;
  price_discount: number;
  quantity: number;
  slug: string;
  image_path: string;
  image_thumb_path: string;
  description: string;
  donate?: boolean;
  is_dropship?: boolean;
  specification?: string;
  attributes_select?: AttributesProduct[];
}

export interface Delivery {
  id: string;
  method_name: string;
  subject: string;
  destination: string;
  provider: string;
  amount: number;
  tracking_number: string;
  expected_delivery: string;
  tracking_link: string;
  type_shipping: string;
}

export interface DeliveryArgs {
  provider_type: string;
  service_type: string;
  packaging_type: string;
  amount: number;
  tracking_number: string;
  expected_delivery: string;
  tracking_link: string;
  type_shipping: string;
}

export interface OrderArgs {
  delivery: DeliveryArgs;
  shipping_address: AddressArgs;
  billing_address: AddressArgs;
  lines: OrderLine[];
  amount_tax: number;
  percent_tax: number;
  hide_purchased: boolean;
}

export interface updateOrderArgs {
  shipping_address?: AddressArgs;
  billing_address?: AddressArgs;
  estimated_delivery?: string;
  hide_purchased?: boolean;
}

export enum EnumStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  PAYING = 'PAYING',
  SHIPPING = 'SHIPPING',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  REFUNDING = 'REFUNDING',
  REFUNDED = 'REFUNDED',
  RETURNED = 'RETURNED',
  DECLINED = 'DECLINED',
}

export interface updateOrderStatusArgs {
  status: EnumStatus;
}

export interface AttributesProduct {
  id?: number;
  name?: string;
  value?: string;
}

export interface OrderLine {
  product_id: string;
  quantity: number;
  offer_id?: string;
  specification?: string;
  attributes_select?: AttributesProduct[];
}

export interface TaxRateArgs {
  shipping_address: AddressArgs;
  lines: OrderLine[];
}

export interface TaxRate {
  tax_percent: number;
  tax_rate: number;
  amount_item: number;
  total_amount_item: number;
}

export interface ListDataItem {
  id: string;
  name: string;
  image_path: string;
  price: string;
  order_detail_quantity: number;
  order_shipping_to: string;
  order_billing_address: string;
  order_status: string;
  order_subtotal: number;
  order_amount_discount: number;
  order_amount_shipping: number;
  order_amount_total: number;
  order_net_received: number;
}

export interface DataAnalytics {
  revenue: number;
  avg_price_item: number;
  avg_time: number;
  money_earn_item: number;
  money_earn: number;
  total_item: number;
  list_item: ListDataItem[];
}

export interface ParamGetAnalytics {
  time_from?: string;
  time_to?: string;
  last_days?: number;
}

export interface checkDiscountArgs {
  list_product: OrderLine[];
}

export interface DiscountProduct {
  list_discount_product: listDiscountProduct[];
  total_price: number;
  total_discount: number;
}

export interface listDiscountProduct {
   product_id: string;
   product_name: string;
   discount_per_item: number;
   discount_total_item: number;
   vendor_discount: number;
   price: number;
   price_product: number;
   price_product_total: number;
}

