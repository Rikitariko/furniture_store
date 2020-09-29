<template>
  <div class="header">
    <div class="logo">
      <img class="logo-img" src="../../assets/logo.png" alt="logo" />
    </div>
    <div class="header-right">
      <div class="login-box">
        <img class="login-icon" src="../../assets/loginIcon.png" alt="login" />
      </div>
      <div class="side-bar-icon-box" v-on:click="toggleRightPanel()">
        <div class="side-bar-icon"></div>
      </div>

    </div>
  </div>
</template>

<script>
import "./header.scss";

export default {
  name: "Header",
  methods: {
    toggleRightPanel() {
      this.$store.dispatch("toggleRightPanel");
    }
  },
}
</script>

<style scoped lang="scss">
  @import "./header.scss";
</style>