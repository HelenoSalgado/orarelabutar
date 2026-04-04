import type { PostsCollectionItem } from "@nuxt/content";
import { queryCollection, queryCollectionItemSurroundings } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;

  const post = await queryCollection(event, 'posts')
    .where('slug', '=', slug)
    .where('published', '=', true)
    .select('id', 'path', 'title', 'imgUrl', 'slug', 'dateFormatted', 'description', 'author', 'body', 'categories')
    .first();

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    });
  }

  const surroundings = await queryCollectionItemSurroundings(event, 'posts', post.path, {
    fields: ['id', 'title', 'slug']
  });

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
    related = (await queryCollection(event, 'posts')
      .where('author', '=', post.author)
      .where('slug', '<>', slug)
      .where('published', '=', true)
      .select('id', 'title', 'description', 'imgUrl', 'slug')
      .limit(3)
      .all()) as PostsCollectionItem[];
  }

  return {
    post,
    surroundings,
    author,
    related
  };
});
