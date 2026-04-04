import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  const posts = await queryCollection(event, 'posts')
    .where('collectionSlug', '=', slug)
    .where('published', '=', true)
    .select('id', 'title', 'description', 'slug', 'imgUrl', 'collection', 'author')
    .all();

  if (posts.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Collection not found',
    });
  }

  // Use metadata from the first post
  const firstPost = posts[0];
  const collection = {
    title: firstPost.collection,
    author: firstPost.author,
    imgUrl: firstPost.imgUrl,
  };

  return {
    collection,
    posts: posts.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      slug: p.slug,
      imgUrl: p.imgUrl
    }))
  };
});
