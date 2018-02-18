<template>
  <b-field :label="label" :type="type" :message="message()">
    <b-input v-model.lazy="username" :placeholder="placeholder" :maxlength="maxlength"></b-input>
  </b-field>
</template>

<script>
  import _ from 'lodash'
  import {
    mapState
  } from 'vuex'
  
  export default {
    props: [
      'label',
      'placeholder',
      'maxlength'
    ],
    computed: {
      type() {
        if (this.username.length === 0) {
          return ''
        }
        return this.username.length > 1 ? `is-success` : `is-danger`
      },
      username: {
        get() {
          return this.$store.state.username
        },
        set(value) {
          this.$store.commit('updateUsername', value)
        }
      }
    },
    methods: {
      message() {
        const good = _.shuffle(['just sounds wonderful...', 'that\'s a great choice!', 'looks good!'])[0]
        const bad = _.shuffle(['too short...', 'this one\'s taken...', 'dude seriously??'])[0]
        if (this.username.length === 0) {
          return 'Please, choose your nickname'
        }
        return this.username.length > 1 ? `Whooa, '${this.username}' ${good}` : `Whoops, ${bad}`
      }
    }
  }
</script>
