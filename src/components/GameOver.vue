<template>
  <b-modal :active.sync="isGameOver" :width="640" scroll="clip" animation="fade">
    <div class="card">
      <section id="bg" class="section">
        <p class="title has-text-white">"{{quote.quote || 'A random quote here'}}"</p>
        <p class="subtitle has-text-white">&mdash; {{quote.author || 'A random guy\'s name here'}}</p>
      </section>
      <div class="card-content">
        <div class="media-content has-text-centered">
          <p class="title is-4">Game Over</p>
          <p v-if="draw" class="title is-5">You are even!</p>
          <p v-else class="title is-5">{{winner}} is the winner!!!</p>
          <p class="subtitle is-6">
            {{playerOne.nickname}} scored {{playerOne.total}}<span v-if="!solo">, {{playerTwo.nickname}} scored {{playerTwo.total}}</span>.
          </p>
        </div>
        <section class="section content has-text-centered">
          <button class="button is-primary is-rounded" @click="newGame(true)">New Game</button>
          <button class="button is-success is-rounded" @click="newGame(false)">Rematch</button>
          <button v-if="!areScoresSaved" class="button is-primary is-rounded is-inverted" @click="saveScore()">Save scores</button>
        </section>
        <app-leaderboard />
      </div>
    </div>
  </b-modal>
</template>

<script>
import Leaderboard from './Leaderboard.vue'
export default {
  components: {
    'app-leaderboard': Leaderboard
  },
  data () {
    return {
      areScoresSaved: false
    }
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
    },
    winner () {
      if (this.playerOne.total > this.playerTwo.total) {
        return this.playerOne.nickname
      } else if (this.playerOne.total === this.playerTwo.total) {
        return ``
      } else {
        return this.playerTwo.nickname
      }
    },
    difficulty () {
      return this.$store.state.difficulty
    },
    draw () {
      return this.playerOne.total === this.playerTwo.total
    },
    quote () {
      return this.$store.state.quote
    },
    isGameOver () {
      return this.$store.state.isGameOver
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
    },
    saveScore () {
      let {
        nickname,
        total
      } = this.playerOne
      const score1 = {
        nickname,
        date: new Date(),
        difficulty: this.difficulty,
        points: total
      }
      let score2 = null
      if (!this.solo) {
        let {
          nickname,
          total
        } = this.playerTwo
        score2 = {
          nickname,
          date: new Date(),
          difficulty: this.difficulty,
          points: total
        }
      }
      this.$store.dispatch('addScore', {
        score1,
        score2
      })
      this.scoreSaved()
    },
    scoreSaved () {
      this.areScoresSaved = true
      this.$toast.open({
        duration: 3000,
        message: `Scores saved!`,
        position: 'is-bottom',
        type: 'is-success'
      })
    }
  }
}
</script>
<style scoped>
#bg {
  background: url(../assets/bg.jpg)
}
#bg .subtitle {
  font-style: italic
}
</style>
