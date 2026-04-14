export const useShareMedia = (slug: string, description: string) => {
  const config = useRuntimeConfig();
  const slugShared = `${config.public.site.url}/${slug}/`;

  const x = () => `https://twitter.com/intent/tweet?url=${encodeURIComponent(slugShared)}&text=${encodeURIComponent(description)}`;
  const facebook = () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(slugShared)}`;
  const linkedin = () => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(slugShared)}`;
  const whatsapp = () => `https://api.whatsapp.com/send?text=${encodeURIComponent(slugShared)}`;
  const telegram = () => `https://t.me/share/url?url=${encodeURIComponent(slugShared)}&text=${encodeURIComponent(description)}`;
  const pocket = () => `https://getpocket.com/save?url=${encodeURIComponent(slugShared)}`;

  return {
    x,
    facebook,
    linkedin,
    whatsapp,
    telegram,
    pocket
  };
};
