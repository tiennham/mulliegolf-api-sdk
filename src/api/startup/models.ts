export interface StartupVersion {
  minimal_version: string;
  current_version: string;
  title: string;
  message?: string;
  icon?: string;
  background?: string;
  platform: string;
  app_store_url: string;
}

export interface StartupApiResponse {
  update: StartupVersion;
}

export enum Platform {
  IOS = 'IOS',
  DROID = 'DROID'
}
