import { ChannelApi } from './channel';
import { MessageApi } from './message';
import { FriendApi } from './friend';
import { SocketListener } from './socket';
import { ApiClient } from '../../http/client';

export interface ChatApi {
  channel: ChannelApi;
  message: MessageApi;
  friend: FriendApi;
  socket: SocketListener;
}

export default (client: ApiClient): ChatApi => {
  return {
    channel: new ChannelApi(client),
    message: new MessageApi(client),
    friend: new FriendApi(client),
    socket: SocketListener.instance(),
  };
};
