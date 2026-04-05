import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required',
    });
  }

  const audio = await queryCollection(event, 'audios')
    .select('id', 'title', 'imgUrl', 'slug', 'description', 'duration', 'createdAt', 'dateFormatted', 'urlSourceAudio')
    .where('slug', '=', slug)
    .first();

  if (!audio) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Audio not found',
    });
  }

  return audio;
});
