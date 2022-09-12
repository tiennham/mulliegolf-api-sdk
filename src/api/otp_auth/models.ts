import { Params } from '../../http/client';

export interface OtpDevice {
  qr: string;
  secret: string;
}
export interface Token {
  refresh: string;
  access: string;
  enabled_2fa: boolean;
}

export interface EnableOTPParams extends Params {
  otp: string;
}

export interface LoginOTPParams extends Params {
  otp: string;
}
