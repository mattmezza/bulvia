<template>
  <section class="section">
    <app-question />
    <section class="section">
      <div class="content is-small has-text-centered">
        <h4>Question {{round}} of {{maxrounds}}</h4>
        <progress class="progress is-primary" :value="round" :max="maxrounds"></progress>
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
      round() {
        return this.$store.getters.round
      },
      maxrounds () {
        return this.$store.getters.maxrounds
      }
    },
    methods: {
  
    }
  }
</script>
