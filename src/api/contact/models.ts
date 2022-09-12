import { User } from '../user/models';
import { Params } from '../../http/client';

export interface Country {
  code: string;
  name: string;
}

export interface State {
  code: string;
  name: string;
  country?: Country;
}

export interface City {
  name: string;
  lat?: number;
  lng?: number;
  state?: State;
}

export interface Contact {
  id: string;
  phone: string;
  phone1: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  friend?: User;
  note?: string;
  is_favorite: boolean;
  avatar?: string;
}

export interface SyncContactItem {
  email: string;
  phone: string;
  phone1: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  note?: string;
  avatar?: string;
}

export interface SyncContactParams extends Params {
  contacts: Array<SyncContactItem>;
}

export interface SearchContactParams extends Params {
  q?: string;
  page: number;
  limit: number;
}

export type UpdateContactParams = SyncContactItem;
export type CreateContactParams = SyncContactItem;
