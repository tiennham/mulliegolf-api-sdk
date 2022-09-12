import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import { ReasonType, ReportType } from './enum';
import { BlockUser, BlockUserRequest, Reason, Report, ReportProductRequest, ReportUserRequest } from './model';

export class UserBlockApi {
  public constructor(public readonly client: ApiClient) {}

  public async reportUser(params: ReportUserRequest): Promise<Report> {
    const payload = { ...params, report_type: ReportType.USER };
    return this.client.post('/user-blocks/reports/', payload);
  }

  public async reportProduct(params: ReportProductRequest): Promise<Report> {
    const payload = { ...params, report_type: ReportType.PRODUCT };
    return this.client.post('/user-blocks/reports/', payload);
  }

  public async listReason(reasonType?: string, page = 1, limit = 20): Promise<Pagination<Reason>> {
    const params = { page, limit, reason_type: reasonType };
    return this.client.get('/user-blocks/reasons/', params);
  }

  public async listReasonUser(page = 1, limit = 20): Promise<Pagination<Reason>> {
    const params = { page, limit, reason_type: ReasonType.USER };
    return this.client.get('/user-blocks/reasons/', params);
  }

  public async listReasonProduct(page = 1, limit = 20): Promise<Pagination<Reason>> {
    const params = { page, limit, reason_type: ReasonType.PRODUCT };
    return this.client.get('/user-blocks/reasons/', params);
  }

  public async listBlockUser(page = 1, limit = 20): Promise<Pagination<BlockUser>> {
    const params = { page, limit };
    return this.client.get('/user-blocks/blocks/', params);
  }

  public async detailBlockUser(userBlockedId: string): Promise<BlockUser> {
    return this.client.get(`/user-blocks/blocks/${userBlockedId}/`);
  }

  public async blockUser(payload: BlockUserRequest): Promise<BlockUser> {
    return this.client.post(`/user-blocks/blocks/`, payload);
  }

  public async unblockUser(userBlockedId: string): Promise<void> {
    return this.client.delete(`/user-blocks/blocks/${userBlockedId}/`);
  }
}
