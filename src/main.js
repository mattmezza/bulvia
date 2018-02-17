import Vue from 'vue'
import Buefy from 'buefy'
import VueResource from 'vue-resource'
import App from './App.vue'
import {
  store
} from './store/store'

Vue.use(Buefy)
Vue.use(VueResource)

// eslint-disable-next-line
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
