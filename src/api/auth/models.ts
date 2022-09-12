import { Params } from '../../http/client';

export interface SocialLoginParams extends Params {
  access_token: string;
  token_secret?: string;
  code?: string;
  provider?: string;
}

export interface AuthorizationHeaders extends Params {
  Authorization: string;
}
export interface AppleLoginParams extends Params {
  code: string;
  first_name?: string;
  last_name?: string;
}

export interface UserRegisterParams {
  username?: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
}

export interface JwtToken {
  refresh: string;
  access: string;
  enabled_2fa: boolean;
  expires_in: number;
}

export interface TwitterAuthorization {
  url: string;
}

export interface OAuth2Token {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
}

export interface ApiKey {
  key: string;
}
