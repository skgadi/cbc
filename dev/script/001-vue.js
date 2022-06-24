const {
  createApp
} = Vue;
const app = createApp({
  data() {
    return {
      msg: 'Hello Vue!',
      languages: languages
    }
  }
}).mount('#gsk-app');