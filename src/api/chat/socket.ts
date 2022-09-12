import { SocketIO, EventListener, Typing } from '../../socket';
import { Channel, Message } from './models';

const E_MSG_RECEIVED = 'chat:msg';
const E_MSG_UPDATED = 'chat:msg.updated';
const E_MSG_DELETED = 'chat:msg.deleted';
const E_CHANNEL_CREATED = 'chat:ch.created';
const E_CHANNEL_UPDATED = 'chat:ch.updated';
const E_CHANNEL_DELETED = 'chat:ch.deleted';
const E_CHANNEL_LEFT = 'chat:ch.left';
const E_CHANNEL_MEMBER_ADDED = 'chat:ch.add_member';
const E_CHANNEL_MEMBER_REMOVED = 'chat:ch.remove_member';
const E_CHANNEL_TYPING = 'typing';

const noop = (data: unknown): void => {
  console.log('data: ', data);
};

export class SocketListener {
  static _instance: SocketListener;

  socket?: SocketIO;

  private constructor() {
    this.socket = SocketIO.instance();
  }

  static instance(): SocketListener {
    if (!SocketListener._instance) {
      SocketListener._instance = new SocketListener();
    }
    return SocketListener._instance;
  }

  addEventListener<T>(eventName: string, listener: EventListener<T>): this {
    this.socket?.addEventListener(eventName, listener);
    return this;
  }

  on<T>(eventName: string, listener: EventListener<T>): this {
    this.socket?.on(eventName, (data: T) => void listener(data) || noop(data));
    return this;
  }

  onMessage(cb: (msg: Message) => void): this {
    return this.on(E_MSG_RECEIVED, cb);
  }

  onMessageUpdated(cb: (msg: Message) => void): this {
    return this.on(E_MSG_UPDATED, cb);
  }

  onMessageDeleted(cb: (msg: Message) => void): this {
    return this.on(E_MSG_DELETED, cb);
  }

  onChannelCreated(cb: (c: Channel) => void): this {
    return this.on(E_CHANNEL_CREATED, cb);
  }

  onChannelLeft(cb: (c: Channel) => void): this {
    return this.on(E_CHANNEL_LEFT, cb);
  }

  onChannelUpdated(cb: (c: Channel) => void): this {
    return this.on(E_CHANNEL_UPDATED, cb);
  }

  onChannelDeleted(cb: (c: Channel) => void): this {
    return this.on(E_CHANNEL_DELETED, cb);
  }

  onChannelMemberAdded(cb: (data: unknown) => void): this {
    return this.on(E_CHANNEL_MEMBER_ADDED, cb);
  }

  onChannelMemberRemoved(cb: (data: unknown) => void): this {
    return this.on(E_CHANNEL_MEMBER_REMOVED, cb);
  }

  onTyping(cb: (data: Typing) => void): this {
    this.on(E_CHANNEL_TYPING, cb);
    return this;
  }

  sendTyping(data: Typing): this {
    this.socket?.emit(E_CHANNEL_TYPING, data);
    return this;
  }

  subscribe(channelId: string): this {
    this.socket?.subscribe(channelId);
    return this;
  }

  unsubscribe(channelId: string): this {
    this.socket?.unsubscribe(channelId);
    return this;
  }
}
