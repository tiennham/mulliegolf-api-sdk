import { ApiClient } from '../../http/client';
import { UploadType } from '../../http/config';
import { AbstractUploadAdapter } from './adapter/adapter';
import { LocalUploadFileApi } from './adapter/local';

export const uploadFileFactory = (client: ApiClient): AbstractUploadAdapter => {
  const type = client.getApiConfig();
  switch (type.uploadType) {
    case UploadType.AWS:
      return new LocalUploadFileApi(client);
    default:
      return new LocalUploadFileApi(client);
  }
};
