import { ApiClient } from '../../../http/client';
import { PreSignedUrlPost, UploadFile, PreSignedUrlParam } from '../models';

export abstract class AbstractUploadAdapter {
  public constructor(public readonly client: ApiClient) {}
  public abstract upload(params: FormData, onProgress?: (percentage: number) => void): Promise<UploadFile>;

  public async preSignedUrl(params: PreSignedUrlParam): Promise<PreSignedUrlPost> {
    return await this.client.post<PreSignedUrlPost, PreSignedUrlParam>('/uploads/pre-signed-url/', params);
  }
}
