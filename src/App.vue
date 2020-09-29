<template>
  <div id="app">
    <div class="main" v-bind:class="{ active: toolbarStatus }">
      <Header />
    </div>
    <SideBar />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header/Header.vue";
import SideBar from "@/components/SideBar/SideBar.vue";

export default {
  beforeCreate() {
    this.$store.dispatch("setInitialValue");
  },
  computed: {
    toolbarStatus: function () {
      return this.$store.getters.getActiveToolBar;
    },
  },
  components: {
    Header,
    SideBar
  }
};
</script>

<style>
@import "./app.scss";
</style>
