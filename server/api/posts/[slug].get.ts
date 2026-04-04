import type { AuthorsCollectionItem, PostsCollectionItem } from "@nuxt/content";
import { queryCollection, queryCollectionItemSurroundings } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;

  const [post, surroundings] = await Promise.all([
    queryCollection(event, 'posts')
      .where('slug', '=', slug)
      .select('id', 'imgUrl', 'slug', 'dateFormatted', 'description', 'author', 'body')
      .first(),
    queryCollectionItemSurroundings(event, 'posts', slug)
  ]);

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    });
  }

  // Fetch author details
  let author = null;
  if (post.author) {
    author = await queryCollection(event, 'authors')
      .where('title', 'LIKE', post.author)
      .select('id', 'title', 'slug', 'imgUrl')
      .first();
  }

  // Fetch related posts (same author)
  let related: PostsCollectionItem[] = [];
  if (post.author) {
    const allRelated = await queryCollection(event, 'posts')
      .where('author', '=', post.author)
      .limit(4)
      .all();
    related = allRelated.filter(p => p.slug !== slug).slice(0, 3);
  }

  return {
    post,
    surroundings,
    author,
    related
  } as {
    post: PostsCollectionItem;
    surroundings: PostsCollectionItem[];
    author: AuthorsCollectionItem | null;
    related: PostsCollectionItem[];
  };
});
