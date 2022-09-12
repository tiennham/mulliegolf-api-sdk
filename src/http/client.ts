import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';
import { ApiConfiguration } from './config';
import { ApiError } from './error';
import { setupCache } from 'axios-cache-adapter';

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
}

export interface Authenticator {
  getAuthToken(): Promise<AuthToken | null>;
  getAuthHeader(): Promise<string>;
  setAuthToken(data: AuthToken): Promise<void>;
  getAuthenExpire(): Promise<number | undefined>;
  getRefreshToken(): Promise<void>;
}

export interface Params {
  [key: string]: unknown;
}

export type RequestInterceptor = (config: Partial<AxiosRequestConfig>) => Promise<AxiosRequestConfig>;
export type ResponseInterceptor = (response: AxiosResponse) => Promise<AxiosResponse>;

interface Interceptor {
  request?: RequestInterceptor;
  response?: ResponseInterceptor;
}
const TIMEOUT_REQUEST_DEFAULT = 1000 * 30; //30s
const CACHE_EXPIRES_DEFAULT = 5 * 60 * 1000; //300s

export class ApiClient {
  public authenticator?: Authenticator;
  public axiosInstance: AxiosInstance;
  private ignoreRefresh = false;

  public constructor(protected apiConfig: ApiConfiguration) {
    const cache = setupCache({
      maxAge: apiConfig.cacheExpiresIn ? apiConfig.cacheExpiresIn * 1000 : CACHE_EXPIRES_DEFAULT,
      exclude: {
        query: false,
      },
    });
    const options = {
      baseURL: apiConfig.baseUrl,
      timeout: apiConfig.timeout ?? TIMEOUT_REQUEST_DEFAULT,
      withCredentials: true,
      headers: this.headers(),
      adapter: apiConfig.enableCache ? cache.adapter : undefined,
    };

    this.axiosInstance = axios.create(options);
  }

  private headers(): Partial<AxiosRequestConfig> {
    let headers = {};
    if (this.apiConfig.userAgent) {
      headers = { ...headers, httpAgent: this.apiConfig.userAgent, httpsAgent: this.apiConfig.userAgent };
    }
    if (this.apiConfig.appVersion) {
      headers = { ...headers, 'App-Version': this.apiConfig.appVersion };
    }
    if (this.apiConfig.deviceId) {
      headers = { ...headers, 'Device-Id': this.apiConfig.deviceId };
    }
    if (this.apiConfig.clientId) {
      headers = { ...headers, 'Client-Id': this.apiConfig.clientId };
    }
    if (this.apiConfig.platform) {
      headers = { ...headers, 'Platform': this.apiConfig.platform };
    }
    return headers;
  }

  public setApiConfig(apiConfig: ApiConfiguration): void {
    this.apiConfig = apiConfig;
  }

  public getApiConfig(): ApiConfiguration {
    return this.apiConfig;
  }

  public setAuthenticator(authenticator: Authenticator): ApiClient {
    this.authenticator = authenticator;
    return this;
  }

  public setIgnoreRefresh(ignore: boolean) {
    this.ignoreRefresh = ignore;
    return this;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    if (!this.authenticator) {
      return null;
    }
    return this.authenticator.getAuthToken();
  }

  private success<T>(response: AxiosResponse): T {
    return response.data;
  }

  private error(e: AxiosError): ApiError {
    if (e.response && e.response.data) {
      const errorCode = e.response.data.code || 'unknown';
      const message = e.response.data.error_detail || e.response.data.message || e.message;
      return new ApiError(message, errorCode);
    }
    return this.handleUnknownError(e);
  }

  private handleUnknownError(e: Error) {
    return new ApiError(e.message, 'unknown');
  }

  private uri(uri: string): string {
    if (/(http(s?)):\/\//i.test(uri)) {
      return uri;
    }
    return `${this.apiConfig.baseUrl}${uri}`;
  }

  private async configs(config?: AxiosRequestConfig, isAuthenticated = true): Promise<AxiosRequestConfig> {
    const expire = await this.authenticator?.getAuthenExpire();
    const current_time = new Date();
    let expire_time;
    if (expire != undefined && !this.ignoreRefresh) {
      expire_time = new Date(expire * 1000);
      if (Date.parse(current_time.toISOString()) > Date.parse(expire_time.toISOString())) {
        await this.authenticator?.getRefreshToken();
      }
    }

    const authHeader = await this.authenticator?.getAuthHeader();
    let headers = config?.headers || {};
    if (authHeader !== '' && isAuthenticated) {
      headers = {
        ...headers,
        Authorization: authHeader,
      };
    }
    headers = { ...headers };
    return { ...config, headers };
  }

  public addInterceptor(interceptor: Interceptor): void {
    if (interceptor.request) {
      this.addRequestInterceptor(interceptor.request);
    }
    if (interceptor.response) {
      this.addResponseInterceptor(interceptor.response);
    }
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.axiosInstance.interceptors.request.use(interceptor);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.axiosInstance.interceptors.response.use(interceptor);
  }

  public async get<T>(uri: string, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.get(this.uri(uri), config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e);
    }
  }

  public async post<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.post(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e);
    }
  }

  public async patch<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.patch(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e);
    }
  }

  public async put<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.put(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e);
    }
  }

  public async delete<T>(uri: string, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.delete(this.uri(uri), config);
      return this.success(r);
    } catch (e) {
      throw this.error(e);
    }
  }

  public async upload<T, P = unknown>(
    uri: string,
    data: P,
    params: Params = {},
    isAuthenticated = true,
    onProgress?: (percentage: number) => void,
    isS3 = false,
  ): Promise<T> {
    try {
      const onUploadProgress = (progressEvent: { loaded: number; total: number }) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        const percent = Math.round((loaded / total) * 100);
        if (typeof onProgress === 'function') {
          onProgress(percent);
        }
      };
      let headers: any = { 'Content-Type': 'multipart/form-data' };
      if (isS3) {
        headers = {};
      }
      const config = await this.configs({ params, headers, onUploadProgress }, isAuthenticated);
      let r: any;
      if (isS3) {
        r = await this.axiosInstance.post(uri, data, { ...config, timeout: 0 });
      } else {
        r = await this.axiosInstance.post(this.uri(uri), data, { ...config, timeout: 0 });
      }
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e);
    }
  }
}
