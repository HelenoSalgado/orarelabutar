import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;
  
  const tag = await queryCollection(event, 'tags')
    .where('slug', '=', slug)
    .select('id', 'title', 'description', 'slug')
    .first();

  if (!tag) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tema não encontrado',
    });
  }

  // Select fields needed for PostPreview
  const posts = await queryCollection(event, 'posts')
    .where('categories', 'LIKE', `%"${slug}"%`)
    .where('published', '=', true)
    .select('id', 'title', 'description', 'slug', 'imgUrl', 'categories')
    .all();

  return {
    tag,
    posts
  };
});
