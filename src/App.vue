<template>
  <div id="main-container">
    <app-header />
    <div id="current-view-container" class="container is-fluid">
      <component :is="currentView"></component>
    </div>
    <app-footer />
    <app-info />
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Starting from './components/Starting.vue'
  import Info from './components/Info.vue'
  
  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
      'app-info': Info,
      'app-starting': Starting
    },
    computed: {
      currentView() {
        return this.$store.state.currentView;
      }
    },
    methods: {
      aboutToggle() {
        this.$store.commit('showMore');
      }
    }
  }
</script>

<style lang="scss">
  @import "main.scss";

  html, body, #main-container {
    height: 100%;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  #current-view-container {
    min-height: 100%;
    margin-bottom: -150px;
  }
</style>
