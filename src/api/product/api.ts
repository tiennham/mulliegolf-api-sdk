import { ApiClient } from '../../http/client';
import {
  Product,
  Category,
  Brand,
  Keywords,
  Personas,
  MyProduct,
  Favourite,
  ItemArgs,
  ProductArgs,
  KeywordsArgs,
  SellerStatistic,
  ISimpleProduct,
  ParamGetProduct,
  ParamActive,
  ParamMarkSold,
  ProductOrder,
  SimilarProductsPriceRange,
  PriceRangeArgs,
  MappingLogicArgs,
} from './models';
import { Pagination } from '../../type';

export class ProductApi {
  public constructor(public readonly client: ApiClient) {}

  public async getNewProducts(q?: string, page = 1, limit = 20): Promise<Pagination<Product>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/new/', params);
  }

  public async getSimilarProducts(product_id: string, search?: string, page = 1, limit = 20): Promise<Pagination<Product>> {
    const params = { search: search, page, limit };
    return this.client.get(`/products/similar/${product_id}/`, params);
  }

  public async likeItem(params: ItemArgs): Promise<Favourite> {
    const uri = '/products/like/';
    return this.client.post(uri, params, {}, true);
  }

  public async getLikedItem(
    user_id?: string,
    q?: string,
    sort_type?: string,
    type_product?: string,
    page = 1,
    limit = 20,
  ): Promise<Pagination<Favourite>> {
    const uri = '/products/like/';
    const params = { user_id: user_id, search: q, sort_type: sort_type, page, limit };
    return this.client.get(uri, params);
  }

  public async unlikeItem(product_id: string): Promise<any> {
    const uri = `/products/like/${product_id}/`;
    return this.client.delete(uri);
  }

  public async getProducts(
    q?: string,
    name?: string,
    category?: string,
    brand?: string,
    personas?: string,
    keywords?: string,
    color?: string,
    size?: string,
    page = 1,
    limit = 20,
  ): Promise<Pagination<Product>> {
    const params = {
      search: q,
      name: name,
      category__name: category,
      brand__name: brand,
      personas__name: personas,
      keywords__name: keywords,
      color: color,
      size: size,
      page,
      limit,
    };
    return this.client.get('/products/', params);
  }

  public async createProduct(args: ProductArgs): Promise<Product> {
    return this.client.post<Product, ProductArgs>('/products/list-item/', args, {}, true);
  }

  public async getMyProducts(q?: string, page = 1, limit = 20): Promise<Pagination<MyProduct>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/my/', params);
  }

  public async getProductDetail(id: string): Promise<Product> {
    const uri = `/products/${id}/`;
    return this.client.get(uri);
  }

  public async updateProduct(id: string, args: ProductArgs): Promise<Product> {
    const uri = `/products/${id}/`;
    return this.client.patch(uri, args);
  }

  public async deleteProduct(id: string): Promise<void> {
    const uri = `/products/${id}/`;
    return this.client.delete(uri);
  }

  public async getCategories(q?: string, page = 1, limit = 20): Promise<Pagination<Category>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/categories/', params);
  }

  public async getAllCategories(q?: string): Promise<Array<Category>> {
    const params = { search: q };
    return this.client.get('/products/categories/all/', params);
  }

  public async getBrands(q?: string, page = 1, limit = 20): Promise<Pagination<Brand>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/brands/', params);
  }

  public async getAllBrand(q?: string, is_favourite?: boolean): Promise<Array<Brand>> {
    const params = { search: q, is_favourite: is_favourite };
    return this.client.get('/products/brands/all', params);
  }

  public async getKeywords(q?: string, page = 1, limit = 20): Promise<Pagination<Keywords>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/keywords/', params);
  }

  public async createKeywords(args: Array<KeywordsArgs>): Promise<any> {
    return this.client.post<Keywords, Array<KeywordsArgs>>('/products/keywords/', args, {}, true);
  }

  public async getPersonas(q?: string, page = 1, limit = 20): Promise<Pagination<Personas>> {
    const params = { search: q, page, limit };
    return this.client.get('/products/personas/', params);
  }

  public async productForSell(id: string, q?: string, page = 1, limit = 20): Promise<Pagination<Product>> {
    const params = { search: q, page, limit };
    return this.client.get(`/products/sell/${id}/`, params);
  }

  public async getTrendingSearch(page = 1, limit = 20): Promise<Pagination<Keywords>> {
    const params = { page, limit };
    return this.client.get('/products/trending/', params);
  }

  public async getListProducts(
    user_id?: string,
    type_list?: string,
    type_product?: string,
    q?: string,
    page = 1,
    limit = 20,
  ): Promise<Pagination<ProductOrder>> {
    //     type_list is SOLD is get list item Sold
    //     type_list is PURCHASED is get list item Purchased
    const params = { user_id: user_id, type_list: type_list, type_product: type_product, search: q, page, limit };
    return this.client.get('/orders/users/list-item/', params);
  }

  public async getMyProductsStatistic(): Promise<SellerStatistic> {
    return this.client.get('/orders/users/statistic/');
  }

  public async shareProduct(id: string): Promise<Product> {
    const uri = `/products/share/${id}/`;
    return this.client.patch(uri, {});
  }

  public async visitProduct(id: string): Promise<Product> {
    const uri = `/products/visit/${id}/`;
    return this.client.patch(uri, {});
  }

  public async getBestSeller(req: ParamGetProduct, page = 1, limit = 20): Promise<Pagination<ISimpleProduct>> {
    const params = {
      search: req.search,
      sort_type: req.sort_type,
      filter_cate: req.filter_cate,
      filter_brand: req.filter_brand,
      condition: req.condition,
      filter_price: req.filter_price,
      type_product: req.type_product,
      page,
      limit
    };
    return this.client.get(`/orders/users/best-seller/`, params);
  }

  public async getListItem(req: ParamGetProduct, page = 1, limit = 20): Promise<Pagination<Product>> {
    //     type_list: MY: list my product,
    //                INACTIVE: list inactive product
    //                HOT_DEAL: list hot deal product,
    //                SELL: list sold product,
    //                NEW: list new product,
    //                default get list product
    const params = {
      type_list: req.type_list,
      user_id: req.user_id,
      search: req.search,
      name: req.name,
      category__name: req.category,
      brand__name: req.brand,
      personas__name: req.personas,
      keywords__name: req.keywords,
      color: req.color,
      size: req.size,
      sort_type: req.sort_type,
      number_random: req.number_random,
      filter_cate: req.filter_cate,
      filter_brand: req.filter_brand,
      condition: req.condition,
      filter_price: req.filter_price,
      type_product: req.type_product,
      page,
      limit,
    };
    const uri = `/products/list-item/`;
    return this.client.get(uri, params);
  }

  public async changeActiveProduct(id: string, args: ParamActive): Promise<Product> {
    const uri = `/products/${id}/`;
    return this.client.patch(uri, args);
  }

  public async markSoldProduct(id: string, args: ParamMarkSold): Promise<Product> {
    const uri = `/products/${id}/`;
    return this.client.patch(uri, args);
  }

  public async relistProduct(id: string): Promise<Product> {
    const uri = `/products/relist/${id}/`;
    return this.client.post(uri);
  }

  public async getRangePrice(args: PriceRangeArgs): Promise<SimilarProductsPriceRange> {
    return this.client.get(`/products/similar-price/`, args);
  }

  public async storeMappingLogic(args: MappingLogicArgs): Promise<boolean> {
    return this.client.post(`/products/mapping-logic/`, args, {}, true);
  }
}
