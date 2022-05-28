<template>
  <div>
    <h3>ログイン</h3>
    <label for="email">Email：</label>
    <input id="email" type="text" v-model="email">
    <br><br>
    <label for="password">パスワード：</label>
    <input type="password" id="password" v-model="password">
    <br><br>
    <button @click="login">ログイン</button>
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
    login(){
      //ログインをリクエスト
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })

      //フォーム上のデータをクリア
      this.email = ""
      this.password = ""
    }
  }
}
</script>
