<template>
  <div>
    <h3>登録</h3>
    <label for="email">Email：</label>
    <input id="email" type="text" v-model="email">
    <br><br>
    <label for="password">パスワード：</label>
    <input type="password" id="password" v-model="password">
    <br><br>
    <button @click="register">登録</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email: "",
      password: "",
    }
  },
  methods:{
    register(){
      //登録リクエスト
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      })
      
      //フォーム上のデータを削除
      this.email = ""
      this.password = ""
    }
  }
}
</script>
