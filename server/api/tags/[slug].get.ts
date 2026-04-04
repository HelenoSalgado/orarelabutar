import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;
  
  const allPosts = await queryCollection(event, 'posts').all();
  const posts = allPosts.filter(p => p.categories?.includes(slug));

  if (posts.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tag not found or has no posts',
    });
  }

  // Create a virtual tag object for the frontend
  const tag = {
    name: slug,
    description: `Manuscritos marcados com #${slug}`
  };

  return {
    tag,
    posts
  };
});
