import { AbstractAuthAdapter } from './adapter';
import * as utils from '../../../utils';
import { AuthToken } from '../../../http/client';
import { SocialLoginParams, AppleLoginParams, JwtToken, TwitterAuthorization } from '../models';

export class JwtAuth extends AbstractAuthAdapter {
  public async login(username: string, password: string): Promise<JwtToken> {
    this.client.setIgnoreRefresh(true);
    const data = { email: username, password };
    const r: JwtToken = await this.client.post<JwtToken>('/token/', data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    const config = this.client.getApiConfig();
    const jwtJson: string = await config.session.get(config.authSessionKey);
    const jtwToken = utils.tryParseJson(jwtJson) as JwtToken;
    if (!jtwToken || !jtwToken.access) {
      return null;
    }
    return {
      token_type: 'Bearer',
      access_token: jtwToken.access,
      refresh_token: jtwToken.refresh,
      expires_in: jtwToken.expires_in,
    };
  }

  public async refreshToken(): Promise<void> {
    const token = await this.getAuthToken();
    if (!token) {
      return;
    }
    this.client.setIgnoreRefresh(true);
    const refresh = token.refresh_token;
    const data = { refresh };
    const r: JwtToken = await this.client.post('/token/refresh/', data, {}, false);
    await this.setAuthToken(r);
  }

  public async facebookLogin(data: SocialLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/facebook/`;
    const r = await this.client.post<JwtToken, SocialLoginParams>(uri, data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async connectFacebook(data: SocialLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/facebook/connect/`;
    return this.client.post<JwtToken, SocialLoginParams>(uri, data);
  }

  public async googleLogin(params: SocialLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/google/`;
    const r = await this.client.post<JwtToken, SocialLoginParams>(uri, params, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async twitterLogin(params: SocialLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/twitter/`;
    const r = await this.client.post<JwtToken, SocialLoginParams>(uri, params, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async twitterAuthorization(): Promise<string> {
    const uri = `/social-auth/twitter/authorization/`;
    const r = await this.client.get<TwitterAuthorization>(uri);
    return r.url;
  }

  public async linkedInLogin(params: SocialLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/linkedin/`;
    const r = await this.client.post<JwtToken, SocialLoginParams>(uri, params, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async appleLogin(params: AppleLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/apple/`;
    const r = await this.client.post<JwtToken, AppleLoginParams>(uri, params, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async appleWebLogin(params: AppleLoginParams): Promise<JwtToken> {
    const uri = `/social-auth/apple-web/`;
    const r = await this.client.post<JwtToken, AppleLoginParams>(uri, params, {}, false);
    await this.setAuthToken(r);
    return r;
  }
}
