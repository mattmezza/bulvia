<template>
  <section class="section">
    <app-question />
    <section class="section">
      <div class="content is-small has-text-centered">
        <h4 v-if="!solo">{{turnNickname}}'s turn</h4>
        <h5>Question {{round + 1}} of {{maxrounds}}</h5>
        <progress class="progress is-primary" :value="round + 1" :max="maxrounds"></progress>
      </div>
    </section>
  </section>
</template>

<script>
import Question from './Question.vue'

export default {
  components: {
    'app-question': Question
  },
  computed: {
    round () {
      return this.solo ? this.$store.getters.round : Math.floor(this.$store.getters.round / 2)
    },
    maxrounds () {
      return this.solo ? this.$store.getters.maxrounds : (this.$store.getters.maxrounds / 2)
    },
    turn () {
      return this.$store.getters.turn
    },
    solo () {
      return this.$store.getters.solo
    },
    turnNickname () {
      return this.$store.state.scores[this.turn].nickname
    }
  },
  methods: {

  }
}
</script>
