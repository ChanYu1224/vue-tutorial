<template>
  <div>
    <p>favorites ({{ halfNumber }})</p>
    <button @click="increment">+1</button> 
  </div>
</template>

<script>
export default {
  props:{
    totalNumber: {
      type: Number,
      default: 5,
    },
  },
  computed:{
    halfNumber(){
      return this.totalNumber / 2
    }
  },
  methods:{
    increment(){
      this.$emit("my-click", this.totalNumber+1);//送り口
    }
  }
}
</script>

<style scoped>
div{
  background: pink;
  border: 3px solid red;
  text-align: center;
  padding: 5px;
}
</style>