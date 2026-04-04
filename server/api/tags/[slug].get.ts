import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;
  
  // Select fields needed for PostPreview
  const posts = await queryCollection(event, 'posts')
    .where('categories', 'LIKE', `%"${slug}"%`)
    .select('id', 'title', 'description', 'slug', 'imgUrl', 'categories')
    .all();

  const tag = await queryCollection(event, 'tags')
    .where('slug', '=', slug)
    .select('id', 'title', 'description')
    .first();



  if (posts.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tag not found or has no posts',
    });
  }

  return {
    tag,
    posts
  };
});
