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
      statusMessage: 'Author not found',
    });
  }

  const posts = await queryCollection(event, 'posts')
    .where('author', '=', author.title)
    .select('title', 'description', 'slug', 'imgUrl')
    .all();

  return {
    author,
    posts
  };
});
