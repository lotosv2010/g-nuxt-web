export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    if(store?.state?.user?.user?.token) {
      config.headers.Authorization = `Token ${store?.state?.user?.user?.token}`;
    }
    return config;
  })
}