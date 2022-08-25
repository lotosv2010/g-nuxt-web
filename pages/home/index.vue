<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" exact :class="{ active: tab === 'your_feed' }" :to="{
                  name: 'Home',
                  query: {
                    tab: 'your_feed'
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" exact :class="{ active: tab === 'global_feed' }" :to="{
                  name: 'Home',
                  query: {
                    tab: 'global_feed'
                  }
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" :class="{ active: tab === 'tag' }" exact :to="{
                  name: 'Home',
                  query: {
                    tab: 'tag',
                    tag
                  }
                }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'Profile',
                params: {
                  username: article?.author?.username
                }
              }">
                <img :src="article?.author?.image" v-if="article?.author?.image" />
                <Logo class="avatar" v-else />
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name: 'Profile',
                  params: {
                    username: article?.author?.username
                  }
                }">
                  {{ article?.author?.username }}
                </nuxt-link>
                <span class="date">{{ article?.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article?.favorited, disabled: article?.isDisabled }"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article?.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'Article',
              params: {
                slug: article?.slug
              }
            }" class="preview-link">
              <h1>{{ article?.title }}</h1>
              <p>{{ article?.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item active" :class="{ active: i === page }" v-for="i in totalPage" :key="i">
                <nuxt-link class="page-link" :to="{
                  name: 'Home',
                  query: {
                    page: i,
                    tag: $route.query?.tag,
                    tab
                  }
                }">{{ i }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link class="tag-pill tag-default" v-for="tag in tags" :key="tag" :to="{
                name: 'Home',
                query: {
                  tag,
                  page: $route.query?.page,
                  tab: 'tag'
                }
              }">{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  async asyncData({ $axios, query, store }) {
    const pageSize = 20;
    const page = +(query?.page ?? 1);
    const tag = query?.tag;
    const tab = query?.tab ?? 'global_feed';
    const params = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };
    const [{ articlesCount, articles }, { tags }] = await Promise.all([
      store.state?.user?.user && tab === 'your_feed' ?
        $axios.$get('/api/articles/feed', {
          params
        })
      : $axios.$get('/api/articles', {
          params: {
            ...params,
            tag
          }
        }),
      $axios.$get('/api/tags')
    ])
    return {
      articlesCount,
      articles,
      page,
      pageSize,
      tags,
      tag,
      tab
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
    ...mapState('user', ['user'])
  },
  // TODO 监听 query 改变，重新调用接口
  watchQuery: ['page', 'tag', 'tab'],
  methods: {
    async favorite(slug) {
      try {
        await this.$axios.$post(`/api/articles/${slug}/favorite`);
      } catch (error) {
        console.error(error)
      }
    },
    async unfavorite(slug) {
      try {
        await this.$axios.$delete(`/api/articles/${slug}/favorite`);
      } catch (error) {
        console.error(error)
      }
    },
    async onFavorite(article) {
      if(article.isDisabled) return;
      article.isDisabled = true; // 防抖
      if(article?.favorited) { // 取消点赞
        await this.unfavorite(article?.slug);
      } else { // 点赞
        await this.favorite(article?.slug);
      }
      article.favoritesCount = article?.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1;
      article.favorited = !article.favorited;
      article.isDisabled = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .article-preview {
    .article-meta {
      .avatar {
        display: inline-block;
        vertical-align: middle;
        height: 32px;
        width: 32px;
        border-radius: 30px;
      }
    }
  }
}
</style>
