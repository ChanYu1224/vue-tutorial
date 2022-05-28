<template>
  <div>
    <button @click="show = !show">切替</button>
    <p v-if="show">HelloWorld!</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show: true,
    }
  }
}
</script>

<style>
.main{
  width: 70%;
  margin: auto;
  padding-top: 5rem;
}
</style>
