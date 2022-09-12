import { Params } from '../../http/client';

export interface PreSignedUrlPost {
  url: string;
  fields: Record<string, unknown>[];
}

export interface UploadFile {
  id?: string;
  file_path: string;
}

export interface PreSignedUrlParam extends Params {
  file_name: string;
  content_type: string;
  folder: string;
  is_public: boolean;
}

export interface IPreSigneUrl {
  url: string;
  fields: any;
}

export interface IPreSigneUrlPayload {
  list_file_info: Array<{
    file_name: string;
    file_type: string;
    folder_name: string;
  }>;
}
