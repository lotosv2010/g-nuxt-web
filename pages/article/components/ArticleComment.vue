<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="add">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
        </div>
        <div class="card-footer">
          <img :src="user?.image" v-if="user?.image" class="comment-author-img" />
          <Logo class="comment-author-img" v-else />
          <button class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link 
            :to="{
              name: 'Profile',
              params: {
                username: comment?.author?.username
              }
            }"
            class="comment-author"
          >
            <img :src="comment?.author?.image" v-if="comment?.author?.image" class="comment-author-img" />
            <Logo class="comment-author-img" v-else />
          </nuxt-link>
          &nbsp;
          <nuxt-link 
            :to="{
              name: 'Profile',
              params: {
                username: comment?.author?.username
              }
            }"
            class="comment-author"
          >
            {{ comment?.author?.username }}
          </nuxt-link>
          <span class="date-posted">{{ comment?.createdAt | date('MMM DD, YYYY') }}</span>
          <span class="mod-options" v-if="user?.username === comment?.author?.username">
            <i class="ion-trash-a" @click="del(comment.id)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'ArticleComment',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      body: '',
      comments: []
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
      try {
        const { comments } = await this.$axios.$get(`/api/articles/${this.article?.slug}/comments`);
        this.comments = (comments ?? []).sort((a, b) => dayjs(b.createdAt) - dayjs(a.createdAt));
      } catch (error) {
        console.error(error);
      }
    },
    async add(val) {
      try {
        const { comment } = await this.$axios.$post(`/api/articles/${this.article?.slug}/comments`, {
          comment: {
            body: this.body
          }
        })
        this.comments.unshift(comment);
      } catch (error) {
        console.error(error);
      }
    },
    async del(id) {
      try {
        await this.$axios.$delete(`/api/articles/${this.article?.slug}/comments/${id}`);
        const index = this.comments.findIndex(c => c.id === id);
        this.comments.splice(index, 1)
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>