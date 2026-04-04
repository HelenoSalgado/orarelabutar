import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'sobre')
    .select('id', 'title', 'description', 'body', 'imgUrl')
    .first();
});

