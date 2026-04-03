import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'scriptorium-processor',
  extensions: ['.md'],
  transform(file) {
    // 1. Transformer de Datas (PT-BR)
    const formatDate = (dateVal: any) => {
        if (!dateVal) return dateVal;
        try {
            const dateStr = String(dateVal);
            if (/[a-zA-Z]/.test(dateStr)) return dateStr;
            const [year, month, day] = dateStr.split('T')[0].split('-').map(n => parseInt(n));
            const date = new Date(year, month - 1, day, 12, 0, 0);
            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch { return dateVal; }
    }

    if (file.createdAt) file.createdAt = formatDate(file.createdAt);
    if (file.updatedAt) file.updatedAt = formatDate(file.updatedAt);

    // 2. Transformer de Slugs Automático
    const slugify = (text: string) => {
        return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-')
            .replace(/^-+/, '').replace(/-+$/, '');
    }

    // Gera slug para autores a partir do 'name'
    if (file.name && !file.slug) {
        file.slug = slugify(file.name);
    }
    
    // Gera slug para posts a partir do 'title' (se não for o stem do arquivo)
    if (file.title && !file.slug) {
        file.slug = slugify(file.title);
    }

    return file;
  }
})
