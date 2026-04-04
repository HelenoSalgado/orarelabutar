import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'authors')
  .select('title', 'description', 'imgUrl', 'slug')
  .all();
});
