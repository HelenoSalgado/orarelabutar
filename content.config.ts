import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Transformer de Data Robusto para Nuxt Content v3 (Zod)
const humanizeDate = (val: any) => {
  if (!val) return val;
  const dateStr = String(val);
  
  // Se já contém letras (meses por extenso), ignoramos
  if (/[a-zA-Z]/.test(dateStr)) return dateStr;

  try {
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      const date = new Date(year, month, day, 12, 0, 0);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        imgURL: z.string().optional(),
        author: z.string(),
        collection: z.string().optional(),
        categories: z.array(z.string()).optional(),
        createdAt: z.string().optional().transform(humanizeDate),
        updatedAt: z.string().optional().transform(humanizeDate),
        slug: z.string().optional(),
        file: z.string().optional(), // Campo para nome do arquivo PDF
      })
    }),
    authors: defineCollection({
      type: 'page',
      source: 'authors/**/*.md',
      schema: z.object({
        name: z.string(),
        imgUrl: z.string().optional(),
        avatarUrl: z.string().optional(),
        biograpy: z.string().optional(),
        slug: z.string().optional(),
        createdAt: z.string().optional().transform(humanizeDate),
      })
    })
  }
})
