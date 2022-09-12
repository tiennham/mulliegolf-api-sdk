import { IPreSigneUrl, IPreSigneUrlPayload, UploadFile } from '../models';
import { ApiClient } from '../../../http/client';

export class AWSUploadFile {
  public constructor(public readonly client: ApiClient) {}

  async createpreSignedUrl(data: IPreSigneUrlPayload): Promise<Array<IPreSigneUrl>> {
    const uri = '/uploads/s3/pre-signed-post-url/create';
    return await this.client.post(uri, data, {}, true);
  }

  async upload(file: any, preSignedPost: IPreSigneUrl, onProgress?: (percentage: number) => void): Promise<UploadFile> {
    const postData = new FormData();
    if (preSignedPost !== null && preSignedPost !== undefined) {
      for (const key of Object.keys(preSignedPost.fields)) {
        postData.append(key, preSignedPost.fields[key]);
      }
      postData.append('file', file);
      try {
        await this.client.upload(preSignedPost.url || '', postData, {}, false, onProgress, true);

        const key = preSignedPost.fields['key'];
        const url = preSignedPost.url + key;
        return {
          file_path: url,
        };
      } catch (err) {
        throw err;
      }
    }
    return { file_path: '' };
  }
}
