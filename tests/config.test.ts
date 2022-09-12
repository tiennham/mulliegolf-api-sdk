import { Api, createApiClient } from '../libs';
import { AuthType } from '../libs/http/config';
interface StringMap {
  [key: string]: string;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cache = {} as StringMap;
const config = {
  // baseUrl: 'https://mulliegolf-api.dev.goldfishcode.com/v1/',
  baseUrl: 'http://localhost:8000/v1',
  AUTH_SESSION_KEY: '',
  appVersion: '1.0.0',
  deviceId: '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/72.0.3626.101 Mobile/15E148 Safari/605.1',
  clientId: 'tenant1',
  timeout: 30 * 1000,
  session: {
    set: async (key: string, value: string) => {
      cache[key] = value;
    },

    get: async (key: string) => {
      return cache[key];
    },
    remove: async (key: string) => {
      delete cache[key];
    },
  },
  socketUrl: 'http://localhost:4000',
  authType: AuthType.JWT,
  enableCache: true,
  cacheExpiresIn: 300, // second
} as any;

export const client = createApiClient(config);
export const api = new Api(client);

client.authenticator?.setAuthToken({
  refresh_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5NzI4Mzk5MiwianRpIjoiYTE1N2FmYjI0MDFjNDdjZGIyYjJkYTQyN2YwNGNlMWIiLCJ1c2VyX2lkIjoiOGEwZWIxNWQtOWI1Yi00NjFhLTkwODMtNDRlZWM1YzYxNzgwIiwiMmZhX2RldmljZV9pZCI6IjcifQ.n_XW_k09ANFd-c7bfme40zp1Sl7yN9GiOEMTf5IA3B8DjcE8iSti2wBa3qUe2TzUU_69IRRwULHY6j-wRy5Q2R7EeI_XPHznODmxBSDfz3gaGiuET8EQysGNLqCipkOSeS5_pCWonrOTDX8hYq6Ho8k460DwNgcT9U40yaVVOYA',
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk0Njk1NTkyLCJqdGkiOiJmYWUyYTg0NjlmNDc0Y2FjYjQyZTM0NjMwOWFmMjZmOCIsInVzZXJfaWQiOiI4YTBlYjE1ZC05YjViLTQ2MWEtOTA4My00NGVlYzVjNjE3ODAiLCIyZmFfZGV2aWNlX2lkIjoiNyJ9.BLerYWjSo821KYRpOexy30QaTg2hQRY59KpDHmCa0fczpQQBhmaQr-iSU2ggzJNwOalZp54HVJ5WAIet0_26m-56LXo5tV34QjV0AT0spRDS9ExqF3wTqFz_yE0LDhn9t-22kTBOnLHiThYBo6VSUY7DBf6bSC_9ww50KCKvI5s',
  // enabled_2fa: true,
});

export const userName = 'quynh.le';
export const userEmail = 'quynh.le@yopmail.com';
export const pwd = '123456@aA';
export const testEmail = 'quynh.le@yopmail.com';
export const getAuthToken = (r: any): string => {
  switch (config.authType) {
    case AuthType.OAUTH2:
      return r['access_token'];
    case AuthType.TOKEN:
      return r['key'];
    default:
      return r['access'];
  }
};
