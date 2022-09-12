export interface SessionStorage {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string>;
  remove(key: string): Promise<void>;
}

export enum AuthType {
  JWT = 'jwt',
  OAUTH2 = 'oauth2',
  TOKEN = 'token',
}

export enum UploadType {
  AWS = 'aws',
  LOCAL = 'local',
}

export interface ApiConfiguration {
  baseUrl: string;
  session: SessionStorage;
  authSessionKey: string;
  userAgent?: string;
  appVersion?: string;
  deviceId?: string;
  clientId?: string;
  socketUrl?: string;
  timeout?: number;
  authType?: AuthType;
  uploadType?: UploadType;
  enableCache?: boolean;
  cacheExpiresIn?: number; // second
  platform?: string;
}
