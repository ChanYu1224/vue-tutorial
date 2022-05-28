<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {
        firstName: 'Jack',
        lastName: 'Donald',
      }
    }
  }
}
</script>

<style scoped>
div{
  text-align: center;
}
</style>