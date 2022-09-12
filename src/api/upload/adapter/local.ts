import { AbstractUploadAdapter } from './adapter';
import { UploadFile } from '../models';

export class LocalUploadFileApi extends AbstractUploadAdapter {
  public async upload(
    data: FormData,
    onProgress?: (percentage: number) => void,
    isAuthenticated = true,
  ): Promise<UploadFile> {
    const res: UploadFile[] = await this.client.upload<UploadFile[]>(
      '/uploads/',
      data,
      {},
      isAuthenticated,
      onProgress,
    );
    if (Array.isArray(res) && res.length > 0) {
      return res[0];
    }
    return { file_path: '' };
  }

  public async uploadMultiFiles(
    data: FormData,
    onProgress?: (percentage: number) => void,
    isAuthenticated = true,
  ): Promise<UploadFile[]> {
    return await this.client.upload<UploadFile[]>('/uploads/', data, {}, isAuthenticated, onProgress);
  }

  public async uploadImage(
    params: FormData,
    callback?: (percentage: number) => void,
    isAuthenticated = true,
  ): Promise<UploadFile> {
    params.append('folder_name', 'photos');
    return await this.upload(params, callback, isAuthenticated);
  }

  public async uploadMultiImages(
    params: FormData,
    callback?: (percentage: number) => void,
    isAuthenticated = true,
  ): Promise<UploadFile[]> {
    params.append('folder_name', 'photos');
    return await this.uploadMultiFiles(params, callback, isAuthenticated);
  }
}
