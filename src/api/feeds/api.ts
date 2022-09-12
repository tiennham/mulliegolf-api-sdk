import { ApiClient } from '../../http/client';
import {
  Feed,
  FeedArgs,
  IFeedSearch,
  Post,
  SearchArgs,
  LikePostArgs,
  Comment,
  CommentArgs,
  PostArgs,
  LikeCommentArgs,
  UpdateLastSeenArgs,
  SearchCommentArgs,
  FavouriteCategory,
  HeaderPreferences,
  ValuePreferences,
  FeedDetailArgs,
} from './models';
import { Pagination } from '../../type';
import { SimpleUser, PostTypeFollowFavourite } from '../user/models';

export class FeedApi {
  public constructor(public readonly client: ApiClient) {}

  public async getFeed(): Promise<Feed> {
    return this.client.get('/feeds/');
  }

  public async updateFeed(args: FeedArgs): Promise<Feed> {
    const uri = `/feeds/`;
    return this.client.put(uri, args);
  }

  public async updateUserFeed(args: FeedDetailArgs): Promise<Feed> {
    const uri = `/feeds/detail/`;
    return this.client.put(uri, args);
  }

  public async getPosts(page = 1, limit = 20): Promise<Pagination<Post>> {
    const params = { page, limit };
    return this.client.get('/feeds/news-feed/', params);
  }

  public async getRecommendPosts(): Promise<Array<Post>> {
    return this.client.get('/feeds/recommends/');
  }

  public async search(params?: SearchArgs): Promise<IFeedSearch> {
    const uri = `/feeds/search/`;
    return this.client.get(uri, params, true);
  }

  public async toggleLikePost(args: LikePostArgs): Promise<void> {
    const uri = `/feeds/like-post/`;
    return this.client.post(uri, args);
  }

  public async getUsersLikePost(post_id: string, page = 1, limit = 20): Promise<Pagination<SimpleUser>> {
    const params = { page, limit };
    return this.client.get(`/feeds/post/${post_id}/likes/`, params);
  }

  public async getListComment(params?: SearchCommentArgs): Promise<Pagination<Comment>> {
    return this.client.get(`/feeds/comment/`, params);
  }

  public async createComment(args: CommentArgs): Promise<Comment> {
    const uri = `/feeds/comment/`;
    return this.client.post(uri, args);
  }

  public async updateComment(args: CommentArgs, comment_id: string): Promise<Comment> {
    const uri = `/feeds/comment/${comment_id}/`;
    return this.client.patch(uri, args);
  }

  public async deleteComment(comment_id: string): Promise<any> {
    const uri = `/feeds/comment/${comment_id}/`;
    return this.client.delete(uri);
  }

  public async getCommentDetail(comment_id: string): Promise<Comment> {
    const uri = `/feeds/comment/${comment_id}/`;
    return this.client.get(uri);
  }

  public async getPost(post_id: string): Promise<Post> {
    const uri = `/feeds/post/${post_id}/`;
    return this.client.get(uri);
  }

  public async createPost(params: PostArgs): Promise<Post> {
    const uri = `/feeds/post/`;
    return this.client.post(uri, params);
  }

  public async updatePost(post_id: string, params: PostArgs): Promise<any> {
    const uri = `/feeds/post/${post_id}/`;
    return this.client.patch(uri, params);
  }

  public async deletePost(post_id: string): Promise<void> {
    const uri = `/feeds/post/${post_id}/`;
    return this.client.delete(uri);
  }

  public async toggleLikeComment(args: LikeCommentArgs): Promise<void> {
    const uri = `/feeds/like-comment/`;
    return this.client.post(uri, args);
  }

  public async getUsersLikeComment(comment_id: string, page = 1, limit = 20): Promise<Pagination<SimpleUser>> {
    const params = { page, limit };
    return this.client.get(`/feeds/comment/${comment_id}/likes/`, params);
  }

  public async getPostTypeFavouriteOrFollow(): Promise<PostTypeFollowFavourite> {
    return this.client.get(`/feeds/recommends-follow-like/`);
  }

  public async updateLastSeenPost(args: UpdateLastSeenArgs): Promise<void> {
    return this.client.patch(`/feeds/recommends-follow-like/update/`, args);
  }

  public async getFavouriteCategory(): Promise<Array<FavouriteCategory>> {
    return this.client.get(`/feeds/favourite-category/`);
  }

  public async getHeaderPreferences(): Promise<Array<HeaderPreferences>> {
    return this.client.get(`/feeds/header-preferences/`);
  }

  public async getValuePreferences(): Promise<Array<ValuePreferences>> {
    return this.client.get(`/feeds/value-preferences/`);
  }
}
