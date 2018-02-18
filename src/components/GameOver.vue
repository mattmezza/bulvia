<template>
  <b-modal active :width="640" scroll="keep" canCancel="x" animation="fade">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <img src="../assets/bg.jpg" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media-content has-text-centered">
          <p class="title is-4">Game Over</p>
          <p class="subtitle is-6">Player `{{ winner }}` won!</p>
        </div>
        <hr />
        <div class="content has-text-centered">
          <p>You scored a total of {{points}} points, congratulations, you are a great player!</p>
          <button class="button is-primary" @click="newGame(true)">New Game</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  export default {
    computed: {
      winner() {
        return this.$store.state.winner
      },
      points() {
        return this.$store.state.scores[winner].total
      }
    },
    methods: {
      newGame(payload) {
        this.$store.commit('resetGame');
        if (payload) {
          this.$store.commit('newGame');
        } else {
          this.$store.dispatch('startGame');
        }
      }
    }
  }
</script>
