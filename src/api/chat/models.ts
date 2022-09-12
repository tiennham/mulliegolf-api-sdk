import { ProductMessage } from '../product/models';

export enum ChannelType {
  ONE_ONE = 'ONE-ONE',
  GROUP = 'GROUP',
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  PRODUCT = 'PRODUCT',
}

export enum ChannelUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum MessageStatus {
  SENT = 'SENT',
  SEEN = 'SEEN',
}

export interface User {
  id: string;
  avatar?: string;
  display_name?: string;
  verified_merchant: boolean;
}

export interface Participant {
  id: string;
  user_id: string;
  role: ChannelUserRole;
  user?: User;
  avatar?: string;
  removable?: string;
}

export interface LastMessage {
  id: string;
  type: MessageType;
  content: string;
  created: Date | string;
}

export interface Channel {
  id: string;
  name: string;
  display_name?: string;
  avatar: string;
  modified: Date | string;
  last_message?: LastMessage;
  last_message_time?: Date | string;
  type: ChannelType;
  badge?: number;
  friend?: User;
  status_block?: string;
  is_removed?: boolean;
}

export interface CreateChannelArgs extends Channel {
  first_message: Message;
}

export interface IAsset {
  id: string;
  file_path: string;
  thumb_path?: string;
  url?: string;
  thumb_url?: string;
}

export interface Message {
  id: string;
  type: MessageType;
  sender: User;
  content: string;
  product?: ProductMessage;
  status: MessageStatus;
  modified: Date | string;
  assets: Array<IAsset>;
}

export interface CreateChannelPayload {
  name?: string; // this field is not mandary on API
  avatar?: string;
  participant_ids: Array<string>;
  message: FirstMessagePayload;
}

export interface FirstMessagePayload {
  type: MessageType;
  content: string[] | string;
}

export interface UpdateChannelPayload {
  name?: string;
  avatar?: string;
}

export interface ExistChannelResponse {
  channel_id?: string;
}

export interface MessagePayload {
  channel_id: string;
  message: TextMessagePayload | MediaMessagePayload | ProductMessagePayLoad;
}

export interface TextMessagePayload {
  type: MessageType;
  content: string;
}

export interface MediaMessagePayload {
  type: MessageType;
  content: string[];
}

export interface ProductMessagePayLoad {
  type: MessageType.PRODUCT;
  content: string;
}

export enum StatusBlock {
  BLOCKED = 'BLOCKED',
  BLOCKING = 'BLOCKING',
  NONE = '',
}
