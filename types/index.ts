export interface TPost {
    id: number;
    attributes: {
      slug: string;
      title: string;
      description: string;
      content: string;
      imgURL: string;
      authorId: string;
      profile: TProfile;
      categories: TCategory[];
      navigatorSlug: {
        before?: string;
        next?: string;
      };
      createdAt: Date;
      updatedAt: Date
    }
};

export interface TLike{
   canonicalUrl: string;
   likes: number;
};

export interface User {
    id: number;
    email: string;
    username: string;
    name: string;
    jobTitle: string;
    password: string;
    posts: TPost[];
    profile?: TProfile;
    createdAt: Date;
    updatedAt: Date
}

export interface TProfile {
    id: number;
    attributes: {
      name: string;
      imgUrl: string;
      avatarUrl: string;
      biograpy: string;
      posts: TPostPreview[];
      slug: string;
      createdAt: string
    }
}

export interface TPostProfile {
  data: {
    id: number;
    attributes: {
      name: string;
      imgUrl: string;
      biograpy: string;
      posts: TPostPreview[];
      slug: string;
      createdAt: string
    }
  }
}

export interface TCategory {
    id: number;
    attributes: {
      name: string;
      description: string;
      posts: {
        data: TPost[]
      }
    }
}

export interface Slug {
  attributes: {
    slug: string;
    updatedAt: Date
  }
}

export interface TPostPreview {
    id: number;
    attributes: {
      title: string;
      description: string;
      imgURL: string;
      slug: string;
    }
}
interface CollectionPost{
  data: TPost[]
}

export interface TCollection {
  id: number;
  attributes: {
    title: string;
    author: string;
    imgUrl: string;
    slug: string;
    posts: CollectionPost
  }
}

export interface TMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number
    }
}