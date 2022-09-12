import { ApiClient } from '../../http/client';
import { AuthType } from '../../http/config';
import { AbstractAuthAdapter } from './adapter/adapter';
import { JwtAuth } from './adapter/jwt';
import { Oauth2Auth } from './adapter/oauth2';
import { TokenAuth } from './adapter/token';

export const authFactory = (client: ApiClient): AbstractAuthAdapter => {
  const type = client.getApiConfig().authType;
  switch (type) {
    case AuthType.OAUTH2:
      return new Oauth2Auth(client);
    case AuthType.TOKEN:
      return new TokenAuth(client);
    default:
      return new JwtAuth(client);
  }
};
