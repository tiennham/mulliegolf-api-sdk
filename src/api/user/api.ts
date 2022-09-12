import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import {
  User,
  UserProfile,
  RegisterUserRegisterArgs,
  UpdateUserProfileArgs,
  Address,
  AddressArgs,
  Countries,
  States,
  MeInfo,
  AttributesSearchArgs,
  ChannelAdvisorAccount,
  SearchArgs,
  SimpleUser,
  UsernameByEmail,
  GhinUser,
  GhinUserArgs,
  GhinUserScoreArgs,
  GhinUserScore,
  GhinUserConfirm,
  LatLongArgs,
} from './models';

export class UserApi {
  public constructor(public readonly client: ApiClient) {}

  public async register(args: RegisterUserRegisterArgs): Promise<User> {
    return this.client.post<User, RegisterUserRegisterArgs>('/auth/registration/', args, {}, false);
  }

  public async getListUser(search?: string, page = 1, limit = 20): Promise<Pagination<User>> {
    const params = { search: search, page, limit };
    const uri = `/users/`;
    return this.client.get(uri, params);
  }

  public async me(username?: string): Promise<User> {
    return this.client.get('/users/me/', { username: username });
  }

  public async profile(): Promise<UserProfile> {
    return this.client.get('users/profile/');
  }

  public async updateProfile(data: UpdateUserProfileArgs): Promise<UserProfile> {
    const uri = '/users/profile/';
    return this.client.patch<UserProfile, UpdateUserProfileArgs>(uri, data, {});
  }

  public async getUser(id: string): Promise<UserProfile> {
    return this.client.get(`/users/${id}/`);
  }

  public async updateUser(id: string, data: UpdateUserProfileArgs): Promise<UserProfile> {
    const uri = `/users/${id}/`;
    return this.client.patch<UserProfile, UpdateUserProfileArgs>(uri, data, {});
  }

  public async existsUser(username: string): Promise<boolean> {
    const uri = `/users/exists/`;
    const r = await this.client.get<{ exists: boolean }>(uri, { username });
    return r.exists;
  }

  public async existsEmail(email: string): Promise<boolean> {
    const uri = `/users/exists/`;
    const r = await this.client.get<{ exists: boolean }>(uri, { email });
    return r.exists;
  }

  public async getAllUserAddress(): Promise<Array<Address>> {
    return this.client.get('/users/address/');
  }

  public async createUserAddress(args: AddressArgs): Promise<Address> {
    return this.client.post<Address, AddressArgs>('/users/address/', args, {}, true);
  }

  public async getUserAddress(id: string): Promise<Address> {
    const uri = `/users/address/${id}/`;
    return this.client.get(uri);
  }

  public async updateUserAddress(id: string, data: AddressArgs): Promise<Address> {
    const uri = `/users/address/${id}/`;
    return this.client.patch<Address, AddressArgs>(uri, data, {});
  }

  public async deleteUserAddress(id: string): Promise<void> {
    const uri = `/users/address/${id}/`;
    return this.client.delete(uri);
  }

  public async getCountries(q?: string, country_code?: string, page = 1, limit = 20): Promise<Pagination<Countries>> {
    const params = { search: q, country_code, page, limit };
    const uri = `/users/countries/`;
    return this.client.get(uri, params);
  }

  public async getStates(q?: string, country_code?: string, page = 1, limit = 20): Promise<Pagination<States>> {
    const params = { search: q, country_code, page, limit };
    const uri = `/users/states/`;
    return this.client.get(uri, params);
  }

  public async getMeInfo(user_id?: string): Promise<MeInfo> {
    const params = { user_id: user_id };
    const uri = `/users/me/info/`;
    return this.client.get(uri, params);
  }

  public async getCAAttributes(args: AttributesSearchArgs): Promise<Array<string>> {
    const uri = `/users/ca/attributes/`;
    return this.client.get(uri, args);
  }

  public async fetchCAAttributes(account_id: number): Promise<void> {
    const params = { account_id: account_id };
    const uri = `/users/ca/attributes/fetch/`;
    return this.client.post(uri, params, {}, true);
  }

  public async listCAAccount(): Promise<Pagination<ChannelAdvisorAccount>> {
    const uri = `/users/ca/account/`;
    return this.client.get(uri);
  }

  public async getCAAccount(account_id: number): Promise<ChannelAdvisorAccount> {
    const uri = `/users/ca/account/${account_id}/`;
    return this.client.get(uri);
  }

  public async listUsersLikeProduct(
    product_id: string,
    search?: string,
    page = 1,
    limit = 20,
  ): Promise<Pagination<User>> {
    const params = { search: search, page, limit };
    const uri = `/users/liked/${product_id}/`;
    return this.client.get(uri, params);
  }

  public async deleteUser(): Promise<void> {
    const uri = `/users/delete/`;
    return this.client.post(uri);
  }

  public async getTagUsers(params?: SearchArgs): Promise<SimpleUser> {
    const uri = `/users/tag/`;
    return this.client.get(uri, params, true);
  }

  public async getUsernameByEmail(email: string): Promise<UsernameByEmail> {
    const params = { email: email };
    const uri = `/users/username/`;
    return this.client.get(uri, params, true);
  }

  public async connectGhinUser(params: GhinUserArgs): Promise<GhinUser> {
    const uri = `/users/ghin/connect/`;
    return this.client.post(uri, params, {}, true);
  }

  public async getGhinUserDetail(user_id?: string): Promise<GhinUser> {
    const params = { user_id: user_id };
    const uri = `/users/ghin/detail/`;
    return this.client.get(uri, params, true);
  }

  public async unLinkGhinUser(): Promise<void> {
    const uri = `/users/ghin/detail/`;
    return this.client.delete(uri);
  }

  public async getGhinScore(params: GhinUserScoreArgs): Promise<GhinUserScore> {
    const uri = `/users/ghin/scores/`;
    return this.client.get(uri, params, true);
  }

  public async confirmGhinUser(): Promise<GhinUserConfirm> {
    const uri = `/users/ghin/confirm/`;
    return this.client.post(uri);
  }

  public async friendsFB(access_token?: string): Promise<Array<UserProfile>> {
    const params = { access_token: access_token };
    const uri = `/users/friends/facebook/`;
    return this.client.post(uri, params, {}, true);
  }

  public async friendsNearBy(params: LatLongArgs): Promise<Pagination<UserProfile>> {
    const uri = `/users/friends/near-by/`;
    return this.client.get(uri, params);
  }

  public async friendsMostActive(): Promise<Pagination<UserProfile>> {
    const uri = `/users/friends/most-active/`;
    return this.client.get(uri);
  }

}
