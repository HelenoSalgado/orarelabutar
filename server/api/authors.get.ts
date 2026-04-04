import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'authors')
    .select('id', 'title', 'description', 'imgUrl', 'slug', 'createdAt')
    .all();
});
