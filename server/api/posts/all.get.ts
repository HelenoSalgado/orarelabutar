import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'posts')
  .select('id', 'title', 'imgUrl', 'slug', 'dateFormatted', 'description', 'author')
  .all();
});
