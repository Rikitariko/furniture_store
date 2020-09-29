<template>
  <div class="side-bar" v-bind:class="{ active: toolbarStatus }">
    <ProjectTab
      v-for="(item, index) in projects"
      v-bind:key="item.room"
      v-bind:active="activeProject === index"
      v-bind:id="index"
    />
  </div>
</template>

<script>
import ProjectTab from "@/components/SideBar/ProjectTab.vue";
export default {
  name: "SideBar",
  components: {
    ProjectTab
  },
  computed: {
    toolbarStatus: function() {
      return this.$store.getters.getActiveToolBar;
    },
    projects: function() {
      console.log("///");
      console.log(this.$store.getters.getProjects);
      return this.$store.getters.getProjects;
    },
    activeProject: function() {
      return this.$store.getters.getActiveProject;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./side-bar.scss";
</style>
