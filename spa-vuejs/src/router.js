import Vue from "vue"
import Router from "vue-router"

const Home = () => import(/*webpackChunkName: "Home"*/"./views/HomeView.vue")//遅延ローディング、動的インポート
const Users = () => import(/*webpackChunkName: "Users"*/"./views/UsersView.vue")
const UsersPost = () => import(/*webpackChunkName: "UsersPost"*/"./views/UsersPostView.vue")
const UsersProfile = () => import(/*webpackChunkName: "UsersProfile"*/"./views/UsersProfileView.vue")
const HeaderHome = () => import(/*webpackChunkName: "HeaderHome"*/"./views/HeaderHomeView.vue")
const HeaderUser = () => import(/*webpackChunkName: "HeaderUser"*/"./views/HeaderUsersView.vue")
// import Home from "./views/HomeView.vue"
// import Users from "./views/UsersView.vue"
// import UsersPost from "./views/UsersPostView.vue"
// import UsersProfile from "./views/UsersProfileView.vue"
// import HeaderHome from "./views/HeaderHomeView.vue"
// import HeaderUser from "./views/HeaderUsersView.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/', 
      components:{
        default: Home,
        header: HeaderHome,
      },
      beforeEnter(to, from, next){
        next()
      }
    },
    {
      path: '/users/:id',
      components:{
        default: Users,
        header: HeaderUser,
      },
      props: {
        default: true,
        header: false,
      },
      children:[
        {path: 'posts', component: UsersPost},
        {path: 'profile', component: UsersProfile, name: 'user-id-profile'}
      ]
    },
    {
      path: '*',
      redirect: '/',
    }
  ],
  scrollBehavior(to, from, savedPosition){
    return new Promise(resolve => {
      this.app.$root.$once('triggerScroll', ()=>{
        let position = {x: 0, y: 0}
        if(savedPosition){
          position = savedPosition
        }
        if(to.hash){
          position = {
            selector: to.hash
          }
        }
        console.log(position)
        resolve(position);
      })
    })
  }
})