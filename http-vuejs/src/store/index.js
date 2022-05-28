import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from '../axios-auth'
import axiosRefresh from '../axios-refresh'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
  },

  getters:{
    idToken: state => state.idToken
  },

  mutations: {
    updateIdToken(state, idToken){
      state.idToken = idToken
    }
  },

  actions:{
    //アクセス時の自動ログイン処理
    async autoLogin({commit, dispatch}){
      const idToken = localStorage.getItem('idToken');
      if(!idToken) return; //idTokenが無ければログインせずに終了

      const now = new Date();
      const expiryMiliSeconds = localStorage.getItem('expiryMiliSeconds');
      const isExpired = now.getTime >= expiryMiliSeconds;
      const refreshToken = localStorage.getItem('refreshToken');
      if(isExpired){
        await dispatch('refreshIdToken', refreshToken);
      }
      else{
        const expiresInMiliSeconds = expiryMiliSeconds - now.getTime();
        setTimeout(() => {dispatch('refreshIdToken', refreshToken)}, expiresInMiliSeconds);
        commit('updateIdToken', idToken);
      }
    },

    //ログイン時の処理
    login({dispatch}, authData){
      const request = {
        email:authData.email,
        password:authData.password,
        returnSecureToken:true
      }
      axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyBdhyK4SFPKYaUNlDgyXik1IKgJD7DpZ5A',request)
      .then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/')
      })
    },

    //トークンをリフレッシュする処理
    async refreshIdToken({dispatch}, refreshToken){
      const request = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }
      await axiosRefresh.post('/token?key=AIzaSyBdhyK4SFPKYaUNlDgyXik1IKgJD7DpZ5A', request)
      .then(response => {
        dispatch('setAuthData', {
          idToken: response.data.id_token,
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_token
        });
        setTimeout(()=>{dispatch('refreshIdToken', response.data.refresh_token)}, response.data.expires_in * 1000)
      })
    },
    
    //会員登録を行う処理
    register({dispatch}, authData){
      const request = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
      axiosAuth.post('/accounts:signUp?key=AIzaSyBdhyK4SFPKYaUNlDgyXik1IKgJD7DpZ5A', request)
      .then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/')
      })
    },

    //認証情報をlocalStrageに格納する
    setAuthData({commit, dispatch}, authData){
      //期限が切れる時間を計算し、localStrageに格納
      const now = new Date();
      const expiryMiliSeconds = now.getTime() + authData.expiresIn * 1000;
      localStorage.setItem('expiryMiliSeconds', expiryMiliSeconds);

      //トークンを更新し、localStrageに格納
      commit('updateIdToken', authData.idToken)
      localStorage.setItem('idToken', authData.idToken)
      localStorage.setItem('refreshToken', authData.refreshToken)

      //トークンの期限が切れれば自動的にトークンをリフレッシュ
      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken)
      }, authData.expiresIn*1000);
    },

    //ログアウト処理
    logout({commit}){
      //store上のトークンをクリア
      commit('updateIdToken', null);
      //localStrage上のトークンを削除
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryMiliSeconds');
      localStorage.removeItem('refreshToken');
      //login画面に遷移
      router.replace('/login');
    }
  },
})