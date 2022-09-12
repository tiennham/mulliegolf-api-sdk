import { ApiClient, Params } from '../../http/client';
import {
  Channel,
  Participant,
  CreateChannelArgs,
  ExistChannelResponse,
  CreateChannelPayload,
  UpdateChannelPayload,
} from './models';
import { Pagination } from '../../type';
import { User } from '../user/models';

export class ChannelApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(q?: string, page = 1, limit = 20): Promise<Pagination<Channel>> {
    const params = { search: q, page, limit };
    return this.client.get('/chat/channels/', params);
  }

  public async get(id: string): Promise<Channel> {
    const uri = `/chat/channels/${id}/`;
    return this.client.get(uri);
  }

  public async existOneOne(userId: string): Promise<ExistChannelResponse> {
    const uri = `/chat/channels/one-one/${userId}/exists/`;
    return this.client.get(uri);
  }

  public async create(data: CreateChannelPayload): Promise<CreateChannelArgs> {
    return this.client.post<CreateChannelArgs, CreateChannelPayload>('/chat/channels/', data);
  }

  public async update(id: string, data: UpdateChannelPayload): Promise<Channel> {
    const uri = `/chat/channels/${id}/`;
    return this.client.patch<Channel, UpdateChannelPayload>(uri, data);
  }

  public async removeChannel(id: string): Promise<void> {
    const uri = `/chat/channels-remove/`;
    const params = {
      channel_id: id
    }
    return this.client.post(uri, params);
  }

  public async delete(id: string): Promise<void> {
    const uri = `/chat/channels/${id}/`;
    return this.client.delete(uri);
  }

  public async friends(channelId?: string, q?: string, page = 1, limit = 20): Promise<Pagination<User>> {
    const params: Params = { search: q, page, limit };
    if (channelId) {
      params['channel_id'] = channelId;
    }
    return this.client.get('/chat/channels/friends/', params);
  }

  public async participants(channelId: string, q?: string, page = 1, limit = 20): Promise<Pagination<Participant>> {
    const uri = `/chat/channels/${channelId}/members/`;
    const params = { search: q, page, limit };
    return this.client.get(uri, params);
  }

  public async addMembers(channelId: string, memberIds: Array<string>): Promise<void> {
    const uri = `/chat/channels/${channelId}/members/`;
    const data = {
      ids: memberIds,
    };
    return this.client.post(uri, data);
  }

  public async removeMembers(channelId: string, memberIds: Array<string>): Promise<void> {
    const uri = `/chat/channels/${channelId}/members/delete/`;
    const data = {
      ids: memberIds,
    };
    return this.client.post(uri, data);
  }

  public async leave(channelId: string): Promise<void> {
    const uri = `/chat/channels/${channelId}/members/leave/`;
    return this.client.post(uri);
  }

  public async read(channelId: string): Promise<void> {
    const uri = `/chat/channels/${channelId}/read/`;
    return this.client.post(uri);
  }
}
