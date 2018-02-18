<template>
  <div>
    <button v-if="!isVisible" id="info-btn" @click="show" class="button is-info is-rounded"><i class="material-icons">info_outline</i></button>
    <b-modal :active.sync="isVisible" :width="640" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-2by1">
            <img src="../assets/bg.jpg" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="../assets/me.jpg" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Matteo Merola</p>
              <p class="subtitle is-6">@mattmezza</p>
            </div>
          </div>
          <div class="content">
            An easy to play Trivia game powered by Open Trivia, showcasing <a>bulma.io</a> and <a>vuejs</a>.
            <a>#css</a> <a>#responsive</a> <a>#webpack</a>
            <br>
            <small>Copyright &copy; {{ when }} &mdash; All rights reserved</small>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false,
      when: new Date().getFullYear()
    }
  },
  methods: {
    show () {
      this.isVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
#info-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 10px 10px 10px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}
</style>
