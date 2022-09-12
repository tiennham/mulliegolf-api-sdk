import { AbstractAuthAdapter } from './adapter';
import * as utils from '../../../utils';
import { AuthToken } from '../../../http/client';
import { OAuth2Token, SocialLoginParams, AppleLoginParams } from '../models';

export class Oauth2Auth extends AbstractAuthAdapter {
  public async login(username: string, password: string): Promise<OAuth2Token> {
    const data = { username, password };
    const r = await this.client.post<OAuth2Token>('/o/token/', data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    const config = this.client.getApiConfig();
    const json: string = await config.session.get(config.authSessionKey);
    const token = utils.tryParseJson(json) as OAuth2Token;
    if (!token || !token.access_token) {
      return null;
    }
    if (!token || !token.access_token) {
      return null;
    }
    return token;
  }

  public async refreshToken(): Promise<void> {
    const token = await this.getAuthToken();
    if (!token) {
      return;
    }
    const data = { refresh_token: token.refresh_token };
    const r = await this.client.post<void>('/o/token/', data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public facebookLogin(_params: SocialLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public connectFacebook(_params: SocialLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public googleLogin(_params: SocialLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public twitterLogin(_params: SocialLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public linkedInLogin(_params: SocialLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public appleLogin(_params: AppleLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public appleWebLogin(_params: AppleLoginParams): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
