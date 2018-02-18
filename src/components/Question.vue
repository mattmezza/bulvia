<template>
  <div class="container has-text-centered">
    <h1 class="title">{{decodedQuestion}}</h1>
    <hr />
    <p class="subtitle"><strong>Category</strong><br />{{ questions[round].category }}</p>
    <ul>
      <li v-for="(choice, idx) in choices" :key="idx">
        <button @click="answer(choice)" :disabled="isPaused" :class="btnClasses(choice)">{{ decode(choice.text) }}</button>
      </li>
    </ul>
    <hr />
    <button class="button is-primary is-rounded" v-if="isPaused && !isGameOver" @click="advance">Next</button>
    <app-timer />
  </div>
</template>

<script>
import {
  htmlEntity
} from '.././htmlEntityMixin'
import Timer from './Timer.vue'

export default {
  components: {
    'app-timer': Timer
  },
  mixins: [htmlEntity],
  computed: {
    choices () {
      return this.questions[this.round].choices
    },
    // Decode HTML entities in question. Based on htmlEntity mixin
    decodedQuestion () {
      return this.decode(this.questions[this.round].question)
    },
    isPaused () {
      return this.$store.state.isPaused
    },
    isGameOver () {
      return this.$store.state.isGameOver
    },
    solo () {
      return this.$store.getters.solo
    },
    // Access questions from store
    questions () {
      return this.$store.state.questions
    },
    // Access round from store
    round () {
      return this.$store.getters.round
    },
    maxrounds () {
      return this.$store.getters.maxrounds
    },
    turn () {
      return this.$store.getters.turn
    }
  },
  methods: {
    // Reset board, present next question
    advance () {
      if (this.round <= this.maxrounds) {
        this.$store.commit('incrementRound')
        this.$store.commit('pauseGame')
      }
    },
    btnClasses (choice) {
      return {
        button: true,
        'is-rounded': true,
        'btn-choice': true,
        block: true,
        ...choice.classes
      }
    },
    // Resolve answer
    answer (choice) {
      // Pause game state (effects buttons)
      this.$store.commit('pauseGame', 'pause')
      // Apply button styles for correct / incorrect
      this.$store.commit('styleButtons')
      // Check mode for payload
      let player
      if (this.solo || this.turn === 'playerOne') {
        player = 'playerOne'
      } else if (this.turn === 'playerTwo') {
        player = 'playerTwo'
      }
      // Check for correct answer and score
      if (choice.answer) {
        // Score correctly
        this.$store.commit('score', {
          correct: true,
          player
        })
        // Call down the stars!
        // this.$store.dispatch('starPower')
      } else {
        // Score incorrectly
        this.$store.commit('score', {
          correct: false,
          player
        })
      }
      // Check if game is over
      this.$store.commit('isGameOver')
    }
  }
}
</script>

<style lang="css" scoped>
  .subtitle {
    font-size: smaller;
  }

  .btn-choice {
    width: 100%;
    margin: 5px auto;
  }
</style>
