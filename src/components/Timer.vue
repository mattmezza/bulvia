<template>
  <section class="section is-small is-marginless is-paddingless">
    <div class="content">
      <h1 id="timer" @click="startTimer()">{{secondsLeft}}.{{centsLeft}}</h1>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      timerHandle: null,
      each: 10
    }
  },
  computed: {
    secondsLeft () {
      return Math.floor(this.$store.state.seconds[this.$store.state.difficulty] / 1000)
    },
    millisLeft () {
      return this.$store.state.seconds[this.$store.state.difficulty] - (this.secondsLeft * 1000)
    },
    centsLeft () {
      return (this.$store.state.seconds[this.$store.state.difficulty] - (this.secondsLeft * 1000)) / 10
    },
    isRunning () {
      return this.$store.state.timerRunning
    }
  },
  methods: {
    startTimer () {
      this.timerHandle = setInterval(() => {
        if (!this.isRunning) {
          return
        }
        if (this.secondsLeft === 0 && this.millisLeft === 0) {
          this.stopTimer()
          this.elapsed()
          return
        }
        this.$store.commit('millisElapsed', this.each)
      }, this.each)
    },
    stopTimer () {
      clearInterval(this.timerHandle)
    },
    elapsed () {
      this.$store.commit('pauseGame', 'pause')
      this.$store.commit('gameOver')
      this.$store.commit('isGameOver')
    }
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {
    this.stopTimer()
  }
}
</script>

<style scoped>
#timer {
  margin-top: 15px;
}
</style>
