<template>
  <div class="container has-text-centered">
    <h1 class="title">{{decodedQuestion}}</h1>
    <p class="subtitle">{{ questions[round].category }}</p>
    <ul>
      <li v-for="(choice, idx) in choices" :key="idx">
        <button @click="answer(choice)" :disabled="isPaused" :class="btnClasses(choice)">{{ decode(choice.text) }}</button>
      </li>
    </ul>
    <button class="button is-primary" v-if="isPaused" @click="advance">Next</button>
  </div>
</template>

<script>
  import {
    htmlEntity
  } from '.././htmlEntityMixin'
  
  export default {
    mixins: [htmlEntity],
    computed: {
      choices() {
        return this.questions[this.round].choices
      },
      // Decode HTML entities in question. Based on htmlEntity mixin
      decodedQuestion() {
        return this.decode(this.questions[this.round].question)
      },
      isPaused() {
        return this.$store.state.isPaused
      },
      mode() {
        return this.$store.getters.mode
      },
      // Access questions from store
      questions() {
        return this.$store.state.questions
      },
      // Access round from store
      round() {
        return this.$store.getters.round
      },
      maxrounds() {
        return this.$store.getters.maxrounds
      },
      turn() {
        return this.$store.getters.turn
      }
    },
    methods: {
      // Reset board, present next question
      advance() {
        // Proceed if less than 10 rounds
        if (this.round <= (this.maxrounds - 1)) {
          this.$store.commit('pauseGame')
          this.$store.commit('incrementRound')
        }
      },
      btnClasses(choice) {
        return {
          button: true,
          'is-rounded': true,
          'btn-choice': true,
          block: true,
          ...choice.classes
        }
      },
      // Resolve answer
      answer(choice) {
        // Pause game state (effects buttons)
        this.$store.commit('pauseGame', 'pause')
        // Apply button styles for correct / incorrect
        this.$store.commit('styleButtons')
        // Check mode for payload
        let mode;
        // if (this.mode || this.turn === 'playerOne') {
        //   mode = 'playerOne'
        // } else if (this.turn === 'playerTwo') {
        //   mode = 'playerTwo'
        // }
        mode = 'playerOne'
        // Check for correct answer and score
        if (choice.answer) {
          // Score correctly
          this.$store.commit('score', {
            true: true,
            mode
          })
          // Call down the stars!
          // this.$store.dispatch('starPower')
        } else {
          // Score incorrectly
          this.$store.commit('score', {
            false: false,
            mode
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
