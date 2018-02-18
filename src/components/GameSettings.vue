<template>
  <section class="section has-text-centered">
    <app-difficulty />
    <b-switch type="is-primary" :native-value="solo" @input="setMode">{{choice}}</b-switch>
  </section>
</template>

<script>
import Difficulty from './Difficulty.vue'
export default {
  components: {
    'app-difficulty': Difficulty
  },
  computed: {
    solo () {
      return this.$store.getters.solo
    },
    choice () {
      if (this.solo) {
        return `Single player`
      } else {
        return `Multiplayer`
      }
    }
  },
  methods: {
    setMode (multiplayer) {
      this.$store.commit('selectMode', multiplayer)
    }
  }
}
</script>
