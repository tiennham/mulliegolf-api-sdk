import { SlideScreenType } from './enum';

export interface IBannerContent {
  id: string;
  name: string;
  title: string;
  is_display: boolean;
  index: number;
  url: string;
  screen_type: SlideScreenType;
  screen_data: string;
  screen_data_json: ScreenDataJSON;
}

export interface ScreenDataJSON {
  category_name: string;
  category_id: string;
  attributes?: any;
}
