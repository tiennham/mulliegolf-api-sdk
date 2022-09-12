import * as io from 'socket.io-client';

export enum SocketEventName {
  Join = 'join',
  Connect = 'connect',
  Disconnect = 'disconnect',
  Unauthorized = 'unauthorized',
  Error = 'error',
  Close = 'close',
  Userstate = 'userstate',
  Subscribe = 'channel:subscribe',
  Unsubscribe = 'channel:unsubscribe',
  Typing = 'typing',
}

export interface UserState {
  id: string;
  online: boolean;
  lastActive?: string;
}

interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
}

export interface Typing {
  channelId: string;
  user: User;
}

export type EventListener<T> = (payload: T) => void;

export class SocketIO {
  private static _instance?: SocketIO;
  private socket: SocketIOClient.Socket | null;
  private constructor() {
    this.socket = null;
  }

  static instance(): SocketIO {
    if (!SocketIO._instance) {
      SocketIO._instance = new SocketIO();
    }
    return SocketIO._instance;
  }

  get id(): string | null {
    if (!this.connected || !this.socket) {
      return null;
    }
    return this.socket.id;
  }

  get connected(): boolean {
    if (this.socket && this.socket.connected) {
      return true;
    }
    return false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  disconnect(): void {
    this.close();
  }

  connect(url: string, jwt: string): void {
    if (this.isConnected()) {
      this.close();
    }
    this.socket = io(url, {
      transports: ['websocket'],
    });
    this.socket.on(SocketEventName.Connect, () => this.onConnect(jwt));
    this.socket.on(SocketEventName.Error, (e: Error) => this.onError(e));
    this.socket.on(SocketEventName.Disconnect, () => this.onDisconnect());
  }

  private onConnect(jwt: string) {
    this.socket?.emit(SocketEventName.Join, jwt);
  }

  private onDisconnect() {
    this.socket?.removeAllListeners();
    this.socket = null;
  }

  private onError(err: Error) {
    console.log(`Error: ${this.id}`, err);
  }

  on<T>(eventName: string, listener: EventListener<T>): void {
    if (!this.socket) {
      return;
    }
    this.socket.on(eventName, listener);
  }

  emit(eventName: string, payload: unknown): this {
    if (!this.connected) {
      return this;
    }
    this.socket?.emit(eventName, payload);
    return this;
  }

  /**
   * Add an event handler for given eventName
   *
   * @param {string} eventName
   * @param {function|object} listener a function or an instance of ISocketEventListener
   */
  addEventListener<T>(eventName: string, listener: EventListener<T>): this {
    if (!eventName || !this.socket) {
      return this;
    }
    this.socket.addEventListener(eventName, listener);
    return this;
  }

  removeEventListener<T>(eventName: string, listener: EventListener<T>): this {
    if (this.socket?.hasListeners(eventName)) {
      this.socket.removeListener(eventName, listener);
    }
    return this;
  }

  /**
   * Subscriber to get user state (Online/Offline, Last active time)
   * @param userId string
   * @param listener EventListener
   */
  addUserStateListener<T>(userId: string, listener: EventListener<T>): this {
    const event = `${SocketEventName.Userstate}:${userId}`;
    this.on(event, listener);
    this.emit(SocketEventName.Userstate, userId);
    return this;
  }

  removeUserStateListener<T>(userId: string, listener: EventListener<T>): this {
    const event = `${SocketEventName.Userstate}:${userId}`;
    return this.removeEventListener(event, listener);
  }

  subscribe(channelId: string): this {
    this.emit(SocketEventName.Subscribe, channelId);
    return this;
  }

  unsubscribe(channelId: string): this {
    this.emit(SocketEventName.Unsubscribe, channelId);
    return this;
  }
}
