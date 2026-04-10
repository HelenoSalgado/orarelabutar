import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'tags')
    .select('id', 'title', 'description', 'slug', 'imgUrl')
    .all();
});
