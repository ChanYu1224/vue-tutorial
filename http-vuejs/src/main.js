import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-16c74/databases/(default)/documents"

store.dispatch('autoLogin')
.then(() => {
  new Vue({
    router: router,
    store: store,
    render: h => h(App),
  }).$mount('#app')
})
