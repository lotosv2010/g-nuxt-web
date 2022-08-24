const cookieParser = process.server ? require('cookieparser') : undefined;

export const actions = {
  // ! nuxtServerInit是一个特殊的 action 方法，仅在服务端渲染期间自动调用
  // ! nuxtServer 作用初始化容器数据，传递数据给客户端
  nuxtServerInit ({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (error) {
        // No volid cookie found
      }
    }
    commit('user/setUser', user);
  }
};