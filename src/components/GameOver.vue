<template>
  <b-modal active :width="640" scroll="keep" animation="fade">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <img src="../assets/bg.jpg" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media-content has-text-centered">
          <p class="title is-4">Game Over</p>
          <p class="subtitle is-6">
            {{playerOne.nickname}} scored {{playerOne.total}}<span v-if="!solo">, {{playerTwo.nickname}} scored {{playerTwo.total}}</span>.
          </p>
        </div>
        <hr />
        <div class="content has-text-centered">
          <button class="button is-primary is-rounded" @click="newGame(true)">New Game</button>
          <button class="button is-primary is-rounded is-inverted" @click="newGame(false)">Rematch</button>
        </div>
        <div class="content has-text-centered">
          <p>👇 Here's the current leaders board 👇</p>
          <app-leadersboard />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Leadersboard from './Leadersboard.vue'
export default {
  components: {
    'app-leadersboard': Leadersboard
  },
  computed: {
    solo () {
      return this.$store.state.solo
    },
    playerOne () {
      return this.$store.state.scores.playerOne
    },
    playerTwo () {
      return this.$store.state.scores.playerTwo
    }
  },
  methods: {
    newGame (payload) {
      this.$store.commit('resetGame')
      if (payload) {
        this.$store.commit('newGame')
      } else {
        this.$store.dispatch('startGame')
      }
    }
  }
}
</script>
