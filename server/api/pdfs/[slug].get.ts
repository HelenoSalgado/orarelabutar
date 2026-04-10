import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'O identificador é obrigatório',
    });
  }

  const pdf = await queryCollection(event, 'pdfs')
    .where('slug', '=', slug)
    .first();

  if (!pdf) {
    throw createError({
      statusCode: 404,
      statusMessage: 'PDF não encontrado',
    });
  }

  return pdf;
});
