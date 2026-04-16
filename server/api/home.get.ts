import { queryCollection } from '@nuxt/content/server';
import { slugify } from '../utils/slugify';

export default defineEventHandler(async (event) => {
  const [posts, allRelated] = await Promise.all([
    queryCollection(event, 'posts')
      .where('published', '=', true)
      .select('id', 'slug', 'imgUrl', 'title', 'description', 'createdAt')
      .order('createdAt', 'DESC')
      .all(),
    queryCollection(event, 'posts')
      .where('published', '=', true)
      .select('slug', 'collection', 'imgUrl', 'author')
      .all()
  ]);

  const collectionsMap = allRelated.reduce((acc: Record<string, { name: string, slug: string, imgUrl: string, authors: Set<string>, count: number }>, post) => {
    if (post.collection) {
      let group = acc[post.collection];
      if (!group) {
        group = {
          name: post.collection,
          slug: slugify(post.collection),
          imgUrl: post.imgUrl,
          authors: new Set(),
          count: 0
        };
        acc[post.collection] = group;
      }
      if (post.author) group.authors.add(post.author);
      group.count++;
    }
    return acc;
  }, {});

  const collections = Object.values(collectionsMap).map((c) => ({
    ...c,
    authors: Array.from(c.authors)
  }));

  return {
    posts,
    collections
  };
});
