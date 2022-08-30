export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/dayjs'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.realworld.io',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-ssr
  ssr: true, // false

  // https://nuxtjs.org/docs/configuration-glossary/configuration-target
  target: 'server', // static

  // 自定义路由规则
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除默认路由规则
      routes.splice(0);
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            // 首页
            {
              path: '', // 默认子路由
              name: 'Home',
              component: resolve(__dirname, 'pages/home/'),
            },
            // 登录
            {
              path: 'login', 
              name: 'Login',
              component: resolve(__dirname, 'pages/login/'),
            },
            // 注册
            {
              path: 'register', 
              name: 'Register',
              component: resolve(__dirname, 'pages/login/'),
            },
            // 用户设置
            {
              path: 'settings', 
              name: 'Settings',
              component: resolve(__dirname, 'pages/settings/'),
            },
            // 发布文章
            {
              path: 'editor', 
              name: 'Add',
              component: resolve(__dirname, 'pages/editor/'),
            },
            // 编辑文章
            {
              path: 'editor/:slug', 
              name: 'Editor',
              component: resolve(__dirname, 'pages/editor/'),
            },
            // 文章详情
            {
              path: 'article/:slug', 
              name: 'Article',
              component: resolve(__dirname, 'pages/article/'),
            },
            // 用户页面
            {
              path: 'profile/:username', 
              name: 'Profile',
              component: resolve(__dirname, 'pages/profile/'),
            },
            // 用户页面/喜欢的文章
            {
              path: 'profile/:username/favorites ', 
              name: 'Favorites',
              component: resolve(__dirname, 'pages/profile/'),
            }
          ]
        }
      ]);
    }
  }
}
