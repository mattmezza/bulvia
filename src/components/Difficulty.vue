<template>
  <div class="buttons has-addons">
    <span @click="setDifficulty('easy')" :class="{button: true, 'is-success': isEasy(), 'is-selected': isEasy()}">Easy</span>
    <span @click="setDifficulty('medium')" :class="{button: true, 'is-warning': isMedium(), 'is-selected': isMedium()}">Medium</span>
    <span @click="setDifficulty('difficult')" :class="{button: true, 'is-danger': isDifficult(), 'is-selected': isDifficult()}">Difficult</span>
  </div>
</template>

<script>
export default {
  computed: {
    difficulty () {
      return this.$store.state.difficulty
    }
  },
  methods: {
    setDifficulty (difficulty) {
      console.log("difficulty", difficulty)
      this.$store.dispatch('setDifficulty', difficulty)
    },
    isDifficult () {
      return this.$store.state.difficulty === 'difficult'
    },
    isMedium () {
      return this.$store.state.difficulty === 'medium'
    },
    isEasy () {
      return this.$store.state.difficulty === 'easy'
    }
  }
}
</script>
