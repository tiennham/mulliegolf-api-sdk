import { ApiClient } from '../../http/client';
import { Message, MessagePayload } from './models';
import { Pagination } from '../../type';

export class MessageApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(channelId: string, q?: string, last_message_id?: string, page = 1, limit = 20): Promise<Pagination<Message>> {
    const params = { q, last_message_id, page, limit };
    return this.client.get(`/chat/channels/${channelId}/messages/`, params);
  }

  public async listNewMessage(channelId: string, last_message_id: string): Promise<Array<Message>> {
    const params = { last_message_id };
    return this.client.get(`/chat/channels/${channelId}/messages/new`, params);
  }

  public async get(id: string): Promise<Message> {
    const uri = `/chat/messages/${id}`;
    return this.client.get(uri);
  }

  public async send(data: MessagePayload): Promise<Message> {
    const uri = `/chat/messages/`;
    return this.client.post<Message, MessagePayload>(uri, data);
  }

  public async update(id: string, content: string): Promise<Message> {
    const uri = `/chat/messages/${id}/`;
    return this.client.patch<Message>(uri, { content: content });
  }

  public async delete(id: string): Promise<void> {
    const uri = `/chat/messages/${id}/`;
    return this.client.delete(uri);
  }

  public async read(id: string): Promise<void> {
    const uri = `/chat/messages/${id}/read/`;
    return this.client.post(uri);
  }
}
