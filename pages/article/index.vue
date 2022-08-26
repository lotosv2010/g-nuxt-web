<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article?.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article?.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article" />
      </div>
      <article-comment :article="article" />
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import ArticleMeta from './components/ArticleMeta.vue';
import ArticleComment from './components/ArticleComment.vue';

export default {
  name: 'ArticleIndex',
  components: {
    ArticleMeta,
    ArticleComment
  },
  async asyncData({ $axios, params }) {
    const { article } = await $axios.$get(`/api/articles/${params.slug}`)
    article.body = new MarkdownIt().render(article?.body)
    return {
      article
    }
  },
  // TODO https://www.nuxtjs.cn/api/pages-head
  head() {
    return {
      title: `${this.article.title} - nuxt-web`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .avatar {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    width: 32px;
    border-radius: 30px;
  }
}
</style>