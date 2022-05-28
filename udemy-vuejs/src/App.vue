<template>
  <div>
    <LikeHeader>
      <h3>はじめまして</h3>
    </LikeHeader>
    <LikeNumber :total-number="number" @my-click="incrementnumber"></LikeNumber>
    <button @click="currentComponent = 'HomeComponent'">Home</button>
    <button @click="currentComponent = 'AboutComponent'">About</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <div>
      <h2>イベントのフォーム</h2>

      <EventTitle v-model="eventData.title"></EventTitle>      

      <label for="maxNumber">最大人数</label>
      <input id="maxNumber" type="number" v-model.number="eventData.maxNumber">
      <p>{{ eventData.maxNumber }}</p>

      <label for="hostName">主催者</label>
      <input id="hostName" type="text" v-model.trim="eventData.hostName">
      <p>{{ eventData.hostName }}</p>

      <label for="detail"></label>
      <textarea name="" id="detail" cols="30" rows="10" v-model="eventData.detail"></textarea>
      <p style="white-space: pre;">{{ eventData.detail }}</p>

      <input id="isPrivate" type="checkbox" v-model="eventData.isPrivate">
      <label for="isPrivate">非公開</label>

      <p>参加条件</p>
      <input type="checkbox" id="10th" value="10代" v-model="eventData.target">
      <label for="10th">10代</label>
      <input type="checkbox" id="20th" value="20代" v-model="eventData.target">
      <label for="20th">20代</label>
      <input type="checkbox" id="30th" value="30代" v-model="eventData.target">
      <label for="30th">30代</label>
      <p>{{ eventData.target }}</p>

      <p>参加費</p>
      <input type="radio" id="free" value="無料" v-model="eventData.price">
      <label for="free">無料</label>
      <input type="radio" id="paid" value="有料" v-model="eventData.price">
      <label for="paid">有料</label>
      <p>{{ eventData.price }}</p>

      <p>開催場所</p>
      <select v-model="eventData.location">
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <p>{{ eventData.location }}</p>
    </div>
  </div>
</template>

<script>
import LikeHeader from "./components/LikeHeader.vue"
import LikeNumber from "./components/LikeNumber.vue"
import HomeComponent from "./components/HomeComponent.vue"
import AboutComponent from "./components/AboutComponent.vue"
import EventTitle from "./components/EventTitle.vue"

export default {
  data(){
    return{
      number : 14,
      currentComponent: 'HomeComponent',
      locations: [
        "東京",
        "大阪",
        "名古屋",
      ],
      eventData:{
        title: "",
        maxNumber: 0,
        hostName: "",
        eventData: "",
        isPrivate: false,
        target: [],
        price: "",
        location: "",
      }
    }
  },
  components:{
    LikeHeader,
    LikeNumber,
    HomeComponent,
    AboutComponent,
    EventTitle,
  },
  methods:{
    incrementnumber(value){
      this.number = value
    }
  }
}
</script>

<style scoped>
h1 {
  color:red;
}
</style>