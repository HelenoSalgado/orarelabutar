import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'audios')
  .select('id', 'title', 'imgUrl', 'slug', 'description', 'duration', 'createdAt', 'dateFormatted', 'urlSourceAudio')
  .all();
});
