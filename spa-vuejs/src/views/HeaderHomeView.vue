<template>
  <div>
    <nav>
      <h2>Home</h2>
      <router-link to="/" class="link" active-class="link--active" exact>Home</router-link>
      <router-link :to="{name: 'user-id-profile', params:{id:1}, hash:'#next-user'}" class="link" active-class="link--active">Users</router-link>
    </nav>
    <button @click="increment(1)">+1</button>
    <button @click="decrement(1)">-1</button>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  methods:{
    ...mapActions("count", ["increment", "decrement"])
  }
}
</script>

<style>

</style>