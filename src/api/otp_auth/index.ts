import { ApiClient, AuthToken } from '../../http/client';
import { OtpDevice, EnableOTPParams, LoginOTPParams } from './models';

export class TwoFactorAuthApi {
  public constructor(public readonly client: ApiClient) {}

  // setup login with OTP: request to update user.enabled_2fa = true
  public async setup(): Promise<OtpDevice> {
    return this.client.post<OtpDevice>('/otp/2fa/');
  }

  // enable login with OTP: update user.enabled_2fa = true
  public async enable(params: EnableOTPParams): Promise<AuthToken> {
    const r = await this.client.patch<AuthToken, EnableOTPParams>('/otp/2fa/', params);
    this.client.authenticator?.setAuthToken(r);
    return r;
  }

  // disable login with OTP: update user.enabled_2fa = false
  public async disable(): Promise<AuthToken> {
    const r = await this.client.delete<AuthToken>('/otp/2fa/');
    this.client.authenticator?.setAuthToken(r);
    return r;
  }

  //login OTP: verify token
  public async login(params: LoginOTPParams): Promise<AuthToken> {
    const r = await this.client.post<AuthToken, LoginOTPParams>('/otp/2fa/login/', params);
    this.client.authenticator?.setAuthToken(r);
    return r;
  }
}
