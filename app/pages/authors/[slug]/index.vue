<template>
    <main v-if="author">
       <div class="biograpy">
        <article>
          <div class="biograpy-box-image">
            <NuxtImg 
               :src="'/img/'+author.imgUrl" 
               :alt="author.name"
               width="800px" 
               height="400px"
               sizes="xs:320px, sm:640px, md:768px"
            />
          </div>
          <h1>{{author.name}}</h1>
          <ContentRenderer :value="author" />
        </article>
        <hr>
        <Shared 
         :slug="'author/'+author.slug"
         :description="author.biograpy"
       />
       </div>
    </main>

    <section v-if="posts?.length">
      <h2>
        <IconsUser/>
        <span>Deste Autor</span>
      </h2>
      <div class="grid-container">
        <PostRelation v-for="post in posts" :key="post.id"
         :title="post.title"
         :img-url="post.imgURL"
         :slug="post.slug"
        />
      </div>
    </section>

    <section>
      <h1> 
        <IconsUsers/>
        <span>Autores</span>
      </h1>
      <div class="container-authors">
        <AuthorPreview />
      </div>
    </section>

    <section>
    </section>
</template>

<script setup lang="ts">
import config from '~/config';

const slug = useRoute().params.slug as string;

const { data: author } = await useAsyncData(`author-page-${slug}`, () => 
  queryCollection('authors').path(`/authors/${slug}`).first()
);

const { data: posts } = await useAsyncData(`author-posts-${slug}`, () => 
  queryCollection('posts').where('authorSlug', '=', slug).all()
);

const title = computed(() => `Orar e Labutar | ${author.value?.name}`);

useSeoMeta({
  title: () => title.value,
  ogTitle: () => title.value,
  description: () => author.value?.biograpy,
  ogDescription: () => author.value?.biograpy,
  ogImage: () => `${config.baseURL}/img/${author.value?.imgUrl}`,
  twitterTitle: () => title.value,
  twitterDescription: () => author.value?.biograpy,
  twitterImage: () => `${config.baseURL}/img/${author.value?.imgUrl}`,
}, {
  mode: 'server',
});
</script>

<style scoped>
.container-authors{
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
}
</style>
