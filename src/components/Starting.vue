<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Start a new game</h1>
      <h2 class="subtitle">
        Choose a difficulty and enter your username
      </h2>
      <app-difficulty />
      <app-name-input label="Username" placeholder="Choose your username!" maxlength="30" />
    </div>
  </section>
</template>

<script>
import Difficulty from './Difficulty.vue'
import NameInput from './NameInput.vue'
export default {
  components: {
    'app-difficulty': Difficulty,
    'app-name-input': NameInput
  }
}
</script>

