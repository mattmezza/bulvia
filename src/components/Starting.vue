<template>
  <section class="section has-text-centered">
    <div class="container">
      <h1 class="title">Start a new game</h1>
      <h2 class="subtitle">
        Choose a difficulty and enter your nickname
      </h2>
      <app-game-settings />
      <app-name-input label="Nickname" placeholder="Choose your nickname!" maxlength="15" player="playerOne" />
      <transition name="fade" mode="out-in">
        <app-name-input v-if="multiplayer" label="Nickname second player" placeholder="Player 2, choose your nickname!" maxlength="15" player="playerTwo" />
      </transition>
      <transition name="fade" mode="out-in">
        <a v-if="playable" class="button is-primary is-rounded is-large" @click="startGame()">Start the game 🏁</a>
      </transition>
      <app-leadersboard />
    </div>
  </section>
</template>

<script>
import GameSettings from './GameSettings.vue'
import NameInput from './NameInput.vue'
import Leadersboard from './Leadersboard.vue'

export default {
  components: {
    'app-game-settings': GameSettings,
    'app-name-input': NameInput,
    'app-leadersboard': Leadersboard
  },
  computed: {
    nicknameMario () {
      return this.$store.state.scores['playerOne'].nickname
    },
    nicknameLuigi () {
      return this.$store.state.scores['playerTwo'].nickname
    },
    multiplayer () {
      return !this.$store.getters.solo
    },
    playable () {
      if (this.$store.getters.solo) {
        return this.nicknameMario.length > 1
      } else {
        return this.nicknameMario.length > 1 && this.nicknameLuigi.length > 1
      }
    }
  },
  methods: {
    startGame () {
      this.$store.dispatch('startGame')
      this.$store.commit('pauseGame')
    }
  }
}
</script>
