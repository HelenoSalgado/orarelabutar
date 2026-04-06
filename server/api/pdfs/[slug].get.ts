import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required',
    });
  }

  const pdf = await queryCollection(event, 'pdfs')
    .where('slug', '=', slug)
    .first();

  if (!pdf) {
    throw createError({
      statusCode: 404,
      statusMessage: 'PDF not found',
    });
  }

  return pdf;
});
