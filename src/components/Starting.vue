<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Start a new game</h1>
      <h2 class="subtitle">
        Choose a difficulty and enter your username
      </h2>
      <app-difficulty />
      <app-name-input label="Nickname" placeholder="Choose your nickname!" maxlength="15" />
      <transition name="fade" mode="out-in">
        <a v-if="playable" class="button is-success is-rounded is-large" @click="startGame()">Start the game, {{username}}</a>
      </transition>
    </div>
  </section>
</template>

<script>
  import Difficulty from './Difficulty.vue'
  import NameInput from './NameInput.vue'
  export default {
    components: {
      'app-difficulty': Difficulty,
      'app-name-input': NameInput
    },
    computed: {
      playable() {
        return this.$store.state.username.length > 1
      },
      username() {
        return this.$store.state.username
      }
    },
    methods: {
      startGame() {
        this.$store.dispatch('startGame')
      }
    }
  }
</script>
