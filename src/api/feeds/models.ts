import { Params } from '../../http/client';
import { Category, Brand, Keywords, Personas, Product, CategoryKey, CategoryValue } from '../product/models';
import { User, SimpleUser } from '../user/models';
import { TypePost, TypeComment, TypeCommentCreate, TypePostFollowFavourite } from './enum';

export interface Feed {
  id: string;
  brand?: Array<Brand>;
  category?: Array<Category>;
  personas?: Array<Personas>;
  keywords?: Array<Keywords>;
  follower?: Array<User>;
  favorite_cat?: Array<FavouriteCategory>;
  header_preferences?: Array<HeaderPreferences>;
  value_preferences?: Array<ValuePreferences>;
}

export interface MultiTopSellerPost {
  user: User;
  products: Array<Product>;
}

export interface ProductMeta {
  id: string;
  name: string;
  image_path: string;
  price: string;
}

export interface MetaDataPost {
  post_id: string;
  comment_id?: string;
  content?: string;
  product?: ProductMeta;
}

export interface Post {
  id?: string;
  type: TypePost;
  modified: string;
  owner?: User;
  brands?: Array<Brand>;
  categories?: Array<Category>;
  personas?: Array<Personas>;
  number_favourite?: number;
  number_comment?: number;
  is_like?: boolean;
  created: string;
  products?: Array<Product>;
  data?: Array<MultiTopSellerPost>;
  related_users?: Array<User>;
  metadata?: MetaDataPost;
}

export interface ValuePreferencesArgs extends Params {
  id: string;
  name: string;
  sub_cat_preferences?: CategoryValue;
  category_value: Array<CategoryValue>;
}


export interface FeedArgs extends Params {
  brand?: Array<string>;
  category?: Array<string>;
  personas?: Array<string>;
  keywords?: Array<string>;
  follower?: Array<string>;
}

export interface FeedDetailArgs extends Params {
  brand?: Array<string>;
  favorite_cat?: Array<string>;
  header_preferences?: Array<string>;
  value_preferences?: Array<ValuePreferencesArgs>;
}

export interface FollowsArgs extends Params {
  follow_id: string;
}

export interface IFeedSearch {
  brands: Array<Brand>;
  categories: Array<Category>;
  personas?: Array<Personas>;
  keywords: Array<Keywords>;
  users: Array<User>;
}

export interface SearchArgs extends Params {
  q?: string;
  type_search?: string;
  list_brand_exclude?: Array<string>;
  list_category_exclude?: Array<string>;
  list_keyword_exclude?: Array<string>;
  list_user_exclude?: Array<string>;
}

export interface LikePostArgs extends Params {
  post_id: string;
}

export interface CommentTag {
  user_id: string;
  name: string;
  blocked: boolean;
}

export interface Comment {
  id: string;
  parent_id?: string;
  owner_id?: string;
  content: string;
  type_comment: TypeCommentCreate;
  type: TypeComment;
  total_child: number;
  is_like: boolean;
  owner: SimpleUser;
  number_favorite: number;
  created?: Date | string;
  comment_tags?: Array<CommentTag>;
}

export interface CommentArgs extends Params {
  post_id?: string;
  product_id?: string;
  type: TypeComment;
  type_comment: TypeCommentCreate;
  content: string;
  user_tags: Array<string>;
  parent_id?: string;
}

export interface PostArgs extends Params {
  type: string;
  products: Array<string>;
  post_tags?: Array<string>;
  content?: string;
  score?: string;
  course_name?: string;
}

export interface LikeCommentArgs extends Params {
  comment_id: string;
}

export interface UserFollowing {
  user_id: string;
  type: TypePostFollowFavourite;
}

export interface UpdateLastSeenArgs extends Params {
  last_seen: Date | string;
  user_following: Array<UserFollowing>;
}

export interface SearchCommentArgs extends Params {
  post_id?: string;
  product_id?: string;
  comment_parent_id?: string;
  last_comment_id?: string;
  page?: number;
  limit?: number;
}


export interface FavouriteCategory {
  id: string;
  name: string;
  category?: Category;
  sub_category?: CategoryKey;
}


export interface HeaderPreferences {
  id: string;
  name: string;
  category?: Category;
  sub_category?: CategoryKey;
}


export interface ValuePreferences {
  id: string;
  name: string;
  sub_cat_preferences?: CategoryValue;
  category_value: Array<CategoryValue>;
}
