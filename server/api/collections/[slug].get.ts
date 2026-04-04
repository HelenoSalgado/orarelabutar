import { queryCollection } from '@nuxt/content/server';
import type { PostsCollectionItem } from "@nuxt/content";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  const collection = await queryCollection(event, 'posts').path(`/collections/${slug}`).first();

  if (!collection) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Collection not found',
    });
  }

  let posts: PostsCollectionItem[] = [];
  if (collection.slug) {
    posts = await queryCollection(event, 'posts').where('slug', 'IN', collection.slug).all();
  }

  return {
    collection,
    posts
  };
});
