<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Usersのページに行く</button>
    <p>{{ doubleCount }}</p>
    <p>{{ tripleCount }}</p>
    <input type="text" v-model="message"/>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("count", ["doubleCount", "tripleCount"]), //スプレッド演算子でmapGettersを既存のcomputedに結合
    message: {
      get() {
        return this.$store.getters.message;
      },
      set(value) {
        this.$store.dispatch("updateMessage", value);
      },
    },
  },
  methods: {
    toUsers() {
      this.$router.push({
        name: "user-id-profile",
        params: {
          //使う際は必ずnameを使っている必要がある。
          id: 1,
        },
      });
    },
  },
};
</script>