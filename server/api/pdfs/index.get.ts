import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  // Busca todos os PDFs
  const pdfs = await queryCollection(event, 'pdfs')
    .select('id', 'title', 'author', 'slug', 'imgUrl', 'description', 'categories')
    .all();

  // Busca todas as tags para validar categorias
  const tags = await queryCollection(event, 'tags')
    .select('slug')
    .all();
  
  const validTagSlugs = new Set(tags.map(t => t.slug));

  // Filtra ou anota PDFs com categorias válidas
  return pdfs.map(pdf => {
    return {
      ...pdf,
      // Apenas mantém categorias que possuem um arquivo correspondente em content/tags/
      validCategories: (pdf.categories || []).filter(cat => validTagSlugs.has(cat))
    };
  });
});
