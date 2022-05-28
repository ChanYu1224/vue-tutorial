<template>
  <div>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム：</label>
    <input id="name" type="text" v-model="name">
    <br><br>
    <label for="comment">コメント：</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <div v-for="post in posts" :key="post.name">
      <div>名前：{{post.fields.name.stringValue}}</div>
      <div>コメント：{{post.fields.comment.stringValue}}</div>
      <br><br>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return{
      name: "",
      comment: "",
      posts:[],
    }
  },
  computed:{
    idToken(){
      return this.$store.getters.idToken
    }
  },
  created(){
    this.updateComment()
  },
  methods:{
    createComment(){
      var request = {
        fields: {
          name: {
            stringValue: this.name
          },
          comment:{
            stringValue: this.comment
          },
        },
      }
      var header = {
        headers:{
          Authorization: `Bearer ${this.idToken}`
        },
      }
      axios.post('/comments', request, header)

      this.name = "";
      this.comment = "";
      this.updateComment();
    },
    updateComment(){
      const header = {
        headers:{
          Authorization: `Bearer ${this.idToken}`
        }
      }
      axios.get('/comments', header)
      .then(response => {
        this.posts = response.data.documents
      });
    }
  }
}
</script>
