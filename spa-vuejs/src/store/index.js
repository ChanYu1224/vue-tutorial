import Vue from "vue"
import Vuex from "vuex"
import count from "./modules/count"
import message from "./modules/message"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    count,
    message,
  }
})