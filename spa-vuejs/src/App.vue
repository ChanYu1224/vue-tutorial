<template>
  <div class="main">
    <router-view name="header"></router-view>
    <transition name="fade" mode="out-in" @before-enter="beforeEnter">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  methods:{
    beforeEnter(){
      this.$root.$emit('triggerScroll') //main.jsのVueインスタンスを指す
    }
  }
}
</script>

<style>
.main{
  margin: auto;
  width: 700px;
}
.link{
  font-size: 20px;
  margin-right: 5px;
}
.link--active{
  background: pink;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.5s;
}
</style>
