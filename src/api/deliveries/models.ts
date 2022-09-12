import { OrderLine } from '../order/model';
import { User, AddressArgs } from '../user/models';

export interface ProviderShipment {
  id: string;
  name: string;
  provider_type: string;
}

export interface commitDay {
  label: string;
  day: string;
  commitment_name: string;
}

export interface RateServiceInfo {
  service_type: string;
  service_name: string;
  packaging_type: string;
  rate_shipment: number;
  commit: commitDay;
  currency: string;
  residential: boolean;
  type_shipping: string;
  provider_id: string;
  provider_name: string;
  provider_type: string;
}

export interface ServiceShippingMethod {
  type_shipping: string;
  time_et: string;
}

export interface RateServiceArgs {
  shipping_address: AddressArgs;
  lines: OrderLine[];
  provider_type: string;
}

export interface ServiceInfoArgs {
  order_id: string;
}

export interface ShippingTransaction {
  id: string;
  approve_link: string;
}

export interface Delivery {
  id: string;
  subject: User;
  destination: User;
  order: string;
  provider: string;
  from_address: AddressArgs;
  to_address: AddressArgs;
  amount: number;
  shipment_label: string;
  invoice_label: string;
  tracking_number: string;
  status: string;
  expected_delivery: string;
  tracking_link: string;
  note: string;
  packaging_type: string;
  service_type: string;
  type_shipping: string;
  residential: boolean;
  service_name?: string;
  shipping_transaction: ShippingTransaction;
}

export interface CreateShipment {
  delivery_id: string;
}

export interface TrackingNumber {
  transactionId: string;
  output: any;
}

export interface TrackingNumberArgs {
  provider_type: string;
  tracking_number: string;
}

export interface AddTrackingArgs {
  delivery_id?: string;
  order_id?: string;
  tracking_number: string;
  service_name?: string;
  provider_id?: string;
  tracking_url?: string;
}

export interface DeliveryArgs {
  order_id: string;
  amount: number;
  provider_id: string;
  service_type: string;
  packaging_type: string;
  expected_delivery: string;
  residential: boolean;
  provider_type: string;
  return_url?: string;
  service_name?: string;
  cancel_url?: string;
}
