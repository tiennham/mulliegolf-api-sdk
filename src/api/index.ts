import { ApiConfiguration } from '../http/config';
import { ApiClient } from '../http/client';
import { UserApi } from './user';
import { AbstractAuthAdapter } from './auth/adapter/adapter';
import { authFactory } from './auth';

import { ContactApi } from './contact';
import { NotificationApi } from './notification';
import { StartupApi } from './startup';
import registerChatApi, { ChatApi } from './chat';
import { TwoFactorAuthApi } from './otp_auth';
import { AbstractUploadAdapter } from './upload/adapter/adapter';
import { uploadFileFactory } from './upload';
import { FeedApi } from './feeds';
import { ProductApi } from './product';
import { PolicyApi } from './policy';
import { OfferApi } from './offer';
import { BannerApi } from './banner';
import { OrderApi } from './order';
import { AWSUploadFile } from './upload/adapter/aws';
import { UserBlockApi } from './userBlock';
import { FollowsApi } from './follows';
import { PaymentApi } from './payment';
import { DeliveriesApi } from './deliveries';
import { RatingApi } from './rating';
import { SubscriptionApi } from './subscriptions';

export const createApiClient = (config: ApiConfiguration): ApiClient => {
  const client = new ApiClient(config);
  return client;
};

export class Api {
  public readonly user: UserApi;
  public readonly auth: AbstractAuthAdapter;
  public readonly otpAuth: TwoFactorAuthApi;
  public readonly contact: ContactApi;
  public readonly notification: NotificationApi;
  public readonly startup: StartupApi;
  public readonly chat: ChatApi;
  public readonly uploadFile: AbstractUploadAdapter;
  public readonly uploadS3: AWSUploadFile;
  public readonly feeds: FeedApi;
  public readonly product: ProductApi;
  public readonly policy: PolicyApi;
  public readonly offer: OfferApi;
  public readonly banner: BannerApi;
  public readonly order: OrderApi;
  public readonly userBlock: UserBlockApi;
  public readonly follows: FollowsApi;
  public readonly payment: PaymentApi;
  public readonly deliveries: DeliveriesApi;
  public readonly rating: RatingApi;
  public readonly subscription: SubscriptionApi;

  public constructor(public readonly client: ApiClient) {
    // APIs
    this.auth = authFactory(this.client);
    this.otpAuth = new TwoFactorAuthApi(this.client);

    // @todo: find a better option to set up authentication for ApiClient
    this.client.setAuthenticator(this.auth);

    this.user = new UserApi(this.client);
    this.contact = new ContactApi(this.client);
    this.notification = new NotificationApi(this.client);
    this.startup = new StartupApi(this.client);
    this.feeds = new FeedApi(this.client);
    this.product = new ProductApi(this.client);
    this.policy = new PolicyApi(this.client);
    this.offer = new OfferApi(this.client);
    this.uploadFile = uploadFileFactory(this.client);
    this.uploadS3 = new AWSUploadFile(this.client);
    this.chat = registerChatApi(this.client);
    this.banner = new BannerApi(this.client);
    this.order = new OrderApi(this.client);
    this.userBlock = new UserBlockApi(this.client);
    this.follows = new FollowsApi(this.client);
    this.payment = new PaymentApi(this.client);
    this.deliveries = new DeliveriesApi(this.client);
    this.rating = new RatingApi(this.client);
    this.subscription = new SubscriptionApi(this.client);
  }
}
