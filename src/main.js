import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';  // Asegúrate de importar el router

loadFonts();

createApp(App)
  .use(router)  // Asegúrate de usar el router
  .use(vuetify)
  .mount('#app');
