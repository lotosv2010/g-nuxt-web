<template>
  <div class="article-meta">
    <nuxt-link 
      :to="{
        name: 'Profile',
        params: {
          username: article?.author?.username
        }
      }"
      class="author"
    >
      <img :src="article?.author?.image" v-if="article?.author?.image" />
      <Logo class="avatar" v-else />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'Profile',
        params: {
          username: article?.author?.username
        }
      }" class="author">{{ article?.author?.username }}</nuxt-link>
      <span class="date">{{ article?.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{active: article?.author?.following}">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{ article?.author?.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{active: article?.favorited}">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article?.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>