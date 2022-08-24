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
            <li>That email is already taken</li>
          </ul>
          <form>
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password">
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
export default {
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'Login';
    },
    btnText() {
      return this.isLogin ? 'Sign in' : 'Sign up';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>