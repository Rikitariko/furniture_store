<template>
  <div class="project-tab" v-bind:class="{ active: active }" v-on:click="changeActiveProject(id)">
    <div class="project-name" v-bind:class="{ active: active }">
      <div class="project-icon">
        <img src="../../assets/icon.svg" alt="Project Logo" />
      </div>
      <div>
        <span>{{ projects[this.id].name }}</span>
      </div>
    </div>
    <div  v-if="activeProject === id">
      <ProjectRoom
        v-for="room in projects[this.id].rooms"
        v-bind:key="room"
        v-bind:active="activeRoom === room.id"
        v-bind:name="room.name"
        v-bind:id="room.id"
      />
    </div>
  </div>
</template>

<script>
import ProjectRoom from "./ProjectRoom.vue";
export default {
  name: "ProjectTab",
  components: {
    ProjectRoom
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    id: Number
  },
  methods: {
    changeActiveProject(id) {
      this.$store.dispatch("changeActiveProject", id);
    }
  },
  computed: {
    projects: function() {
      return this.$store.getters.getProjects;
    },
    activeProject: function() {
      return this.$store.getters.getActiveProject;
    },
    activeRoom: function() {
      return this.$store.getters.getActiveRoom;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./side-bar.scss";
</style>
