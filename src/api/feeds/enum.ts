export enum TypePost {
  SHARED = 'SHARED',
  PURCHASED = 'PURCHASED',
  PRODUCT = 'PRODUCT',
  FOLLOWED = 'FOLLOWED',
  LIKE = 'LIKE',
  POST_GHIN_SCORE = 'POST_GHIN_SCORE',
  SHARED_PRODUCT = 'SHARED_PRODUCT',
  TOP_SELLER_RECOMMEND = 'TOP_SELLER_RECOMMEND',
  MULTI_TOP_SELLERS_RECOMMEND = 'MULTI_TOP_SELLERS_RECOMMEND',
  TAG_POST = 'TAG_POST',
  TAG_COMMENT_PRODUCT = 'TAG_COMMENT_PRODUCT',

  PRODUCTS_IN_BRAND = 'PRODUCTS_IN_BRAND',
  PRODUCTS_IN_CATEGORY = 'PRODUCTS_IN_CATEGORY',
  PRODUCTS_IN_PERSONAS = 'PRODUCTS_IN_PERSONAS',

  BRANDS_RECOMMEND = 'BRANDS_RECOMMEND',
  CATEGORIES_RECOMMEND = 'CATEGORIES_RECOMMEND',
  PERSONAS_RECOMMEND = 'PERSONAS_RECOMMEND',

  PRODUCTS_IN_BRAND_RECOMMEND = 'PRODUCTS_IN_BRAND_RECOMMEND',
  PRODUCTS_IN_CATEGORY_RECOMMEND = 'PRODUCTS_IN_CATEGORY_RECOMMEND',
  PRODUCTS_IN_PERSONAS_RECOMMEND = 'PRODUCTS_IN_PERSONAS_RECOMMEND',
}

export enum TypeSearchFeed {
  ALL = 'ALL',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  KEYWORD = 'KEYWORD',
  USER = 'USER',
}

export enum TypeComment {
  REPLY = 'REPLY',
  MAIN = 'MAIN',
}

export enum TypeCommentCreate {
  PRODUCT = 'PRODUCT',
  POST = 'POST',
}

export enum TypePostFollowFavourite {
  PRODUCT = 'PRODUCT',
  FOLLOW = 'FOLLOW',
}
