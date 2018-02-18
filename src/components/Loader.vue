<template lang="html">
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          Loading...
        </p>
        <transition name="fade" mode="out-in">
          <p class="subtitle" v-show="show">{{ message[counter] }}</p>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        counter: -1,
        message: ["Doin' the worm", "Fetchin' your trivia", 'Massaging brain tissue'],
        show: false
      }
    },
    methods: {
      delayIncrement() {
        const vm = this;
        return new Promise(function(resolve, reject) {
          setTimeout(() => {
            if (vm.counter >= vm.message.length) {
              vm.counter = -1;
            }
            vm.incrementCounter(vm.counter);
            console.log(vm.counter);
            resolve()
          }, 2000);
        });
      },
      delayToggle() {
        const vm = this;
        return new Promise(function(resolve, reject) {
          vm.show = vm.toggle(vm.show)
          resolve()
        });
      },
      incrementCounter(counter) {
        return counter += 1
      },
      loopMessage() {
        setTimeout(() => {
          if (this.counter >= this.message.length - 1) {
            this.counter = -1
          }
          this.counter += 1
        }, 500)
        setTimeout(() => {
          this.show = true
        }, 1500)
        setTimeout(() => {
          this.show = false
        }, 5000)
      },
      toggle(value) {
        return value = !value;
      }
    },
    created() {
      // TODO: refactor initial timing
      this.loopMessage()
      // TODO: refactor loops
      setInterval(() => {
        this.loopMessage()
      }, 5000)
    }
  }
</script>
