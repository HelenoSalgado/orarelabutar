import { queryCollection } from '@nuxt/content/server';
import { slugify } from '~~/server/utils/slugify';

export default defineEventHandler(async (event) => {
  const allRelated = await queryCollection(event, 'posts')
    .where('published', '=', true)
    .select('slug', 'collection', 'imgUrl', 'author')
    .all();

  const collectionsMap = allRelated.reduce((acc: Record<string, { name: string, slug: string, imgUrl: string, authors: Set<string>, count: number }>, post) => {
    if (post.collection) {
      if (!acc[post.collection]) {
        acc[post.collection] = {
          name: post.collection,
          slug: slugify(post.collection),
          imgUrl: post.imgUrl,
          authors: new Set(),
          count: 0
        };
      }
      if (post.author) acc[post.collection].authors.add(post.author);
      acc[post.collection].count++;
    }
    return acc;
  }, {});

  const collections = Object.values(collectionsMap).map((c) => ({
    ...c,
    authors: Array.from(c.authors)
  }));

  return collections;
});
