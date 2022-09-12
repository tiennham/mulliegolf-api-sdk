import { AbstractAuthAdapter } from './adapter';
import * as utils from '../../../utils';
import { AuthToken } from '../../../http/client';
import { SocialLoginParams, ApiKey, AppleLoginParams } from '../models';

export class TokenAuth extends AbstractAuthAdapter {
  public async login(username: string, password: string): Promise<ApiKey> {
    const data = { email: username, password };
    const r = await this.client.post<ApiKey>('/auth/login/', data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    const config = this.client.getApiConfig();
    const json: string = await config.session.get(config.authSessionKey);
    const token = utils.tryParseJson(json) as ApiKey;
    if (!token || !token.key) {
      return null;
    }
    return {
      token_type: 'Bearer',
      access_token: token.key,
    };
  }

  public async refreshToken(): Promise<void> {
    return;
  }

  public async facebookLogin(data: SocialLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/facebook/`;
    const r = await this.client.post<ApiKey, SocialLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async connectFacebook(data: SocialLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/facebook/connect/`;
    return this.client.post<ApiKey, SocialLoginParams>(uri, data);
  }

  public async googleLogin(data: SocialLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/google/`;
    const r = await this.client.post<ApiKey, SocialLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async twitterLogin(data: SocialLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/twitter/`;
    const r = await this.client.post<ApiKey, SocialLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async linkedInLogin(data: SocialLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/linkedin/`;
    const r = await this.client.post<ApiKey, SocialLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async appleLogin(data: AppleLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/apple/`;
    const r = await this.client.post<ApiKey, AppleLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async appleWebLogin(data: AppleLoginParams): Promise<ApiKey> {
    const uri = `/social-auth/apple-web/`;
    const r = await this.client.post<ApiKey, AppleLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }
}
