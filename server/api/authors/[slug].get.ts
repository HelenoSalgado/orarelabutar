import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  const [author, posts] = await Promise.all([
    queryCollection(event, 'authors').path(`/authors/${slug}`)
    .select('title', 'description', 'imgUrl', 'slug')
    .first(),
    queryCollection(event, 'posts').where('slug', '=', slug)
    .select('author', 'title', 'description', 'slug', 'imgUrl')
    .all()
  ]);

  if (!author) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Author not found',
    });
  }

  return {
    author,
    posts
  };
});
