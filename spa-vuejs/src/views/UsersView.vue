<template>
  <div>
    <h3>Users</h3>
    <button @click="toHome">Homeのページへ行く</button>
    <p></p>
    <router-link to="/users/1">ユーザ1</router-link>
    <router-link to="/users/2">ユーザ2</router-link>
    <hr>
    <h3>User No.{{ id }}</h3>
    <router-link :to="{name: 'user-id-profile', params:{id:Number(id)+1}, query:{lang:'ja', page:Number(id)+1}, hash:'#next-user'}">次のユーザ</router-link>
    <router-view></router-view>
    <div style="height: 700px;"></div>
    <router-link id="next-user" :to="{name: 'user-id-profile', params:{id:Number(id)+1}, query:{lang:'ja', page:Number(id)+1}, hash:'#next-user'}">次のユーザ</router-link>
    <div style="height: 1400px"></div>
  </div>
</template>

<script>
export default {
  props:[
    'id',
  ],
  methods:{
    toHome(){
      this.$router.push('/')
    }
  },
  
}
</script>