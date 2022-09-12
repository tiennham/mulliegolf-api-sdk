import { ApiClient } from '../../http/client';
import { Contact, SyncContactParams, CreateContactParams, UpdateContactParams } from './models';
import { Pagination } from '../../type';

export class ContactApi {
  public constructor(public readonly client: ApiClient) {}
  public async list(q?: string, page = 1, limit = 20): Promise<Pagination<Contact>> {
    const params = { search: q, page, limit };
    return this.client.get('/contacts/', params);
  }

  public async sync(params: SyncContactParams): Promise<unknown> {
    return this.client.post<unknown, SyncContactParams>('/contacts/sync/', params, {});
  }

  public async get(id: string): Promise<Contact> {
    const uri = `/contacts/${id}/`;
    return this.client.get(uri);
  }

  public async create(params: CreateContactParams): Promise<Contact> {
    const uri = `/contacts/`;
    return this.client.post<Contact, CreateContactParams>(uri, params);
  }

  public async update(id: string, params: UpdateContactParams): Promise<Contact> {
    const uri = `/contacts/${id}/`;
    return this.client.patch<Contact, UpdateContactParams>(uri, params);
  }

  public async delete(id: string): Promise<void> {
    const uri = `/contacts/${id}/`;
    return this.client.delete(uri);
  }

  public async getFavorites(q?: string, page = 1, limit = 20): Promise<Pagination<Contact>> {
    const params = { search: q, page, limit };
    return this.client.get('/contacts/favorites/', params);
  }

  public async favorite(id: string): Promise<void> {
    const uri = `/contacts/${id}/favorites/`;
    return this.client.put(uri);
  }

  public async unfavorite(id: string): Promise<void> {
    const uri = `/contacts/${id}/favorites/`;
    return this.client.delete(uri);
  }
}
