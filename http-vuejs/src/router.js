import Vue from 'vue'
import Router from 'vue-router'
import Comments from './views/CommentsView.vue'
import Login from './views/LoginView.vue'
import Register from './views/RegisterView.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      component: Comments,
      beforeEnter(to, from, next){
        if(store.getters.idToken){
          next();
        }
        else{
          next('/login');
        }
      }
    },
    {
      path: "/login",
      component: Login,
      beforeEnter(to, from, next){
        if(store.getters.idToken){
          next('/');
        }
        else{
          next();
        }
      }
    },
    {
      path: "/register",
      component: Register,
      beforeEnter(to, from, next){
        if(store.getters.idToken){
          next('/');
        }
        else{
          next();
        }
      }
    }
  ]
})