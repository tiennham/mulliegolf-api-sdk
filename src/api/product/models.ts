import { Params } from '../../http/client';
import { User } from '../user/models';
import { MappingType } from './enum';

export interface ProductAttribute {
  id: number;
  name: string;
  value: string;
}

export interface ProductImage {
  image_path: string;
  image_url: string;
}

export interface Product {
  id: string;
  created: string;
  modified: string;
  images: Array<ProductImage>;
  image_url: string;
  name: string;
  price: number;
  max_price?: number;
  description: string;
  condition: string;
  access: string;
  is_publish?: boolean;
  owner?: User;
  category?: Category;
  brand?: Brand;
  quantity?: number;
  personas?: Personas;
  keywords: Array<Keywords>;
  num_of_favourites: number;
  number_comment?: number;
  num_of_shares: number;
  discount_amount?: number;
  is_like?: boolean;
  is_sold?: boolean;
  percent_discount?: number;
  minimum_offer?: number;
  avg_price?: number;
  list_category?: Category[];
  last_compared_price?: number;
  attributes: Array<ProductAttribute>;
  is_drop_ship?: boolean;
  has_specification?: boolean;
  level_product?: string;
  list_child_product?: Product[];
  donate: boolean;
}

export interface ProductArgs extends Params {
  images?: Array<string>;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  condition: string;
  access: string;
  is_publish: boolean;
  personas?: string;
  keywords: Array<string>;
  quantity?: number;
  discount_amount?: number;
  percent_discount?: number;
  minimum_offer?: number;
  avg_price?: number;
  donate?: boolean;
  attributes?: Array<number>;
}

export interface MyProduct {
  id: string;
  name: string;
  images: Array<ProductImage>;
  price: number;
  max_price?: number;
  category?: Category;
  brand?: Brand;
  num_of_favourites?: number;
  number_comment?: number;
  num_of_shares?: number;
  is_like?: boolean;
  is_sold?: boolean;
  discount_amount?: number;
  percent_discount?: number;
  minimum_offer?: number;
  condition?: string;
  access?: string;
  avg_price?: number;
  attributes: Array<ProductAttribute>;
}

export interface Category {
  id: string;
  name: string;
  sub_category_type: string;
  description?: string;
  is_active?: boolean;
  parent?: string;
  image_url: string;
  is_in_feed?: boolean;
  attributes?: Array<AttributeCategory>;
}

export interface CategoryKey {
  id: string;
  key: string;
  image_url?: string;
}

export interface CategoryValue {
  id: string;
  key: string;
  value: string;
}


export interface AttributeCategory {
  key: string;
  values: Array<ValueItemAttribute>;
}

export interface ValueItemAttribute {
  id: number;
  value: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
  image_url: string;
  is_in_feed?: boolean;
  followed?: boolean;
}

export interface Keywords {
  id: string;
  name: string;
  description?: string;
}

export interface KeywordsArgs extends Params {
  name: string;
}

export interface Personas {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  is_in_feed?: boolean;
}

export interface ItemArgs extends Params {
  product: string;
}

export interface Favourite {
  id: string;
  user: string;
  product: Product;
  is_like?: boolean;
}

export interface SellerStatistic {
  num_of_active: number;
  num_of_sold: number;
  num_of_unsold: number;
  total_rate: number;
}

export interface ISimpleProduct {
  id: string;
  created: string;
  modified: string;
  image_url: string;
  name: string;
  price: number;
  max_price?: number;
  description: string;
  owner?: string;
  category?: Category;
  brand?: Brand;
  discount_amount?: number;
  condition?: string;
  minimum_offer?: number;
  access?: string;
  is_publish?: boolean;
  avg_price?: number;
  attributes: Array<ProductAttribute>;
  is_like?: boolean;
  num_of_favourites?: number;
  number_comment?: number;
  is_blocked?: boolean;
}

export interface ParamGetProduct extends Params {
  type_list?: string;
  user_id?: string;
  search?: string;
  name?: string;
  category?: string;
  brand?: string;
  personas?: string;
  keywords?: string;
  color?: string;
  size?: string;
  sort_type?: string;
  number_random?: number;
  filter_cate?: Array<FilterCate>;
  filter_brand?: Array<string>;
  condition?: string;
  filter_price?: FilterPrice;
  type_product?: string;
}

export interface ParamActive extends Params {
  is_publish: boolean;
}

export interface ParamMarkSold extends Params {
  is_sold: boolean;
}

export interface ProductOrder {
  id: string;
  created: string;
  image_url: string;
  name: string;
  price: number;
  max_price?: number;
  condition: string;
  is_publish?: boolean;
  category?: Category;
  brand?: Brand;
  personas?: Personas;
  num_of_favourites: number;
  number_comment?: number;
  num_of_shares: number;
  is_like?: boolean;
  last_compared_price?: number;
  order_detail_id: string;
  order_detail_hide_purchased: boolean;
  real_price?: number;
  order_id: string;
  order_status: string;
}

export interface SimilarProductsPriceRange {
  min_price: number;
  max_price: number;
  average_price: number;
}

export interface PriceRangeArgs extends Params {
  product_name: string;
  brand: string;
  category: string;
  condition: string;
}

export interface MappingLogic {
  brand_id?: string;
  mapping_brand?: string;
  category_id?: string;
  classification?: string;
  attributes?: string;
}

export interface MappingLogicArgs extends Params {
  mapping_type: MappingType;
  account_id: number;
  mapping_logic: Array<MappingLogic>;
}

export interface FilterCate {
  category_name: string;
  value_ids?: any;
}

export interface FilterPrice extends Params {
  from_price?: number;
  to_price?: number;
}

export interface ProductMessage {
  id: string;
  name: string;
  price?: number;
  image_url?: string;
  num_of_favourites?: number;
  number_comment?: number;
  is_like?: boolean;
  last_compared_price?: number;
  category_name?: string;
  brand_name?: string;
}
