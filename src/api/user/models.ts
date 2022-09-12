import { Params } from '../../http/client';
import { SearchType } from './enum';
import { ISimpleProduct } from '../product/models';

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  enabled_2fa: boolean;
  is_allow_notification?: boolean;
  address?: Array<Address>;
  date_joined?: string;
  following?: number;
  follower?: number;
  is_social?: boolean;
  is_in_feed?: boolean;
  followed?: boolean;
  is_blocked?: boolean;
  rating?: number;
  verified_merchant: boolean;
  launch_day_subscribers?: boolean;
  has_setup_feed?: boolean;
  vendor_discount?: number;
  star_rates?: number;
  num_ratings?: number;
  registration_completed?: boolean;
}

export type UserProfile = User;

export interface RegisterUserRegisterArgs extends Params {
  username?: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar?: string;
  phone?: string;
}

export interface UpdateUserProfileArgs extends Params {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  display_name?: string;
  is_allow_notification?: boolean;
  vendor_discount?: number;
  registration_completed?: number;
}

export interface Address {
  id: string;
  first_name: string;
  last_name: string;
  full_address: string;
  optional: string;
  street: string;
  phone_number: string;
  city: string;
  state: string;
  state_code: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface AddressArgs extends Params {
  is_shipping_address?: boolean;
  first_name?: string;
  last_name?: string;
  full_address?: string;
  optional?: string;
  street?: string;
  city?: string;
  state?: string;
  state_code?: string;
  zipcode?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface Countries {
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital?: string;
  currency?: string;
  currency_symbol?: string;
  latitude?: string;
  longitude?: string;
  timezones?: string;
}

export interface States {
  name: string;
  country_code: string;
  state_code: string;
  latitude?: string;
  longitude?: string;
}

export interface MeInfo {
  number_followers: number;
  number_following: number;
  number_sales: number;
  star_rates: number;
  number_ratings: number;
  number_messages: number;
  verified_merchant: boolean;
}

export interface AttributesSearchArgs extends Params {
  account_id: number;
  search_type: SearchType;
  search?: string;
  key?: string;
}

export interface ChannelAdvisorUser {
  user: User;
  labels: Array<string>;
  is_new: boolean;
}

export interface ChannelAdvisorMappingAttribute {
  mg_category_name: string;
  classification: string;
  attributes: string;
}

export interface ChannelAdvisorMappingBrand {
  mg_brand_name: string;
  mapping_brand: string;
}

export interface ChannelAdvisorAccount {
  id: number;
  name: string;
  active: boolean;
  users: Array<ChannelAdvisorUser>;
  attributes: Array<ChannelAdvisorMappingAttribute>;
  brands: Array<ChannelAdvisorMappingBrand>;
}

export interface SimpleUser {
  id: string;
  username: string;
  avatar?: string;
  number_follower?: number;
  display_name?: string;
  verified_merchant?: boolean;
  launch_day_subscribers?: boolean;
  followed?: boolean;
  type?: string;
  is_blocked?: boolean;
}

export interface SearchArgs extends Params {
  search?: string;
  user_tagged_ids?: Array<string>;
}

export interface PostTypeFollowFavourite extends SimpleUser {
  favourite?: Array<ISimpleProduct>;
  following?: Array<SimpleUser>;
}

export interface UsernameByEmail {
  username: string;
}

export interface GhinUserArgs extends Params {
    user_email: string;
    password: string;
}

export interface GhinUserScoreArgs extends Params {
    page?: number;
    per_page?: number;
    user_id?: string;
}

export interface GhinUser {
  user_email: string;
  ghin_number: string;
  name: string;
  index: string;
  low_hi_display: string;
  club: string;
  rev_date: string;
  score_posted?: string;
}

export interface GhinScore {
  id: number;
  score_day_order: number;
  adjusted_gross_score: number;
  score_type_display_short: string;
  course_name: string;
  course_rating: number;
  slope_rating: number;
  posted_at: string;
  course_display_value: string;
  ghin_course_name_display: string;
}

export interface GhinUserScore {
  user_ghin: GhinUser;
  scores: Array<GhinScore>;
}

export interface GhinUserConfirm {
  success: boolean;
}

export interface LatLongArgs extends Params {
  latitude: number;
  longitude: number;
}