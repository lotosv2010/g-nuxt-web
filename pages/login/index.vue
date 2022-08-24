<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ btnText }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" class="nav-link active" to="/register">need an account?</nuxt-link>
            <nuxt-link v-else class="nav-link active" to="/login">Have an account?</nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(message, field) in errors">
              <li v-for="msg in message" :key="field+msg">{{ field }} {{ msg}}</li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required minlength="6">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ btnText }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 仅在客户端加载这个包
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  name: 'LoginIndex',
  middleware: ['notAuthenticated'],
  computed: {
    isLogin() {
      return this.$route.name === 'Login';
    },
    btnText() {
      return this.isLogin ? 'Sign in' : 'Sign up';
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: 'lotosv2010@163.com',
        password: '123456',
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { user } = this.isLogin ? await this.login() : await this.register();
        if(user) {
          // 存储到 vuex
          this.$store.commit('user/setUser', user);
          // 数据持久化
          Cookie.set('user', JSON.stringify(user));
          // 跳转到首页
          this.$router.push('/');
        }
      } catch (error) {
        this.errors = error?.response?.data?.errors ?? [];
      }
    },
    async login() {
      return await this.$axios.$post('/api/users/login', {
        user: this.user
      });
    },
    async register() {
      return await this.$axios.$post('/api/users', {
        user: this.user
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>