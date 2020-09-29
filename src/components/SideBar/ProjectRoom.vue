<template>
  <div class="project-room" v-bind:class="{ active: this.active }" v-on:click="changeActiveRoom(id)">
    <div class="room-icon">
      <img src="../../assets/record.svg" alt="Project Logo" />
    </div>
    <div>
      <span>{{ this.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectRoom",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    id: Number,
    name: String
  },
  methods: {
    changeActiveRoom(id) {
      this.$store.dispatch("changeRoom", id);
    }
  },
};
</script>

<style scoped lang="scss">
@import "./side-bar.scss";
</style>
