import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  const author = await queryCollection(event, 'authors')
    .where('slug', '=', slug)
    .select('title', 'description', 'imgUrl', 'slug', 'body')
    .first();

  if (!author) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Autor não encontrado',
    });
  }

  const posts = await queryCollection(event, 'posts')
    .where('author', '=', author.title)
    .where('published', '=', true)
    .select('title', 'description', 'slug', 'imgUrl')
    .all();

  return {
    author,
    posts
  };
});
