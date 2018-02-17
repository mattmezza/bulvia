<template>
  <b-field :label="label" :type="type" :message="message()">
    <b-input v-model="username" :placeholder="placeholder" :maxlength="maxlength"></b-input>
  </b-field>
</template>

<script>
  export default {
    props: [
      'label',
      'placeholder',
      'maxlength'
    ],
    data() {
      return {username: ''}
    },
    computed: {
      type () {
        return this.username.length > 1 ? `is-success` : `is-danger`
      }
    },
    methods: {
      message () { 
        return this.username.length > 1 ? `Whooa, '${this.username}' is available` : `Too short...`
      }
    }
  }
</script>
