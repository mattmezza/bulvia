<template>
  <b-field id="input" :label="label" :type="type" :message="message()">
    <b-input v-model.lazy="nickname" :placeholder="placeholder" :maxlength="maxlength"></b-input>
  </b-field>
</template>

<script>
import _ from 'lodash'

export default {
  props: [
    'label',
    'placeholder',
    'maxlength',
    'player'
  ],
  computed: {
    type () {
      if (this.nickname.length === 0) {
        return ''
      }
      return this.nickname.length > 1 ? `is-success` : `is-danger`
    },
    nickname: {
      get () {
        return this.$store.state.scores[this.player].nickname
      },
      set (value) {
        this.$store.commit('updateNickname', {newNickname: value, player: this.player})
      }
    }
  },
  methods: {
    message () {
      const good = _.shuffle(['just sounds wonderful...', 'that\'s a great choice!', 'looks good!'])[0]
      const bad = _.shuffle(['too short...', 'this one\'s taken...', 'dude seriously??'])[0]
      if (this.nickname.length === 0) {
        return 'Please, choose your nickname'
      }
      return this.nickname.length > 1 ? `Whooa, '${this.nickname}' ${good}` : `Whoops, ${bad}`
    }
  }
}
</script>

<style scoped>
#field {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
