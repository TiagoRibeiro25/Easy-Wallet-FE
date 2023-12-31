import './assets/css/main.css';
import './assets/css/transitions.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Vue3Marquee from 'vue3-marquee';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Marquee);

app.mount('#app');
