/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import Vuex from "vuex";
import router from '../router'
import store from '../store'
import PrimeVue from 'primevue/config';

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(Vuex)
    .use(store)
    .use(PrimeVue)
}
