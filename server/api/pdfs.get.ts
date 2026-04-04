import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'posts')
    .where('categories', 'LIKE', '%PDF%')
    .select('id', 'title', 'author', 'slug')
    .all();
});
