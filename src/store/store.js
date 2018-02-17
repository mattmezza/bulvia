import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentView: 'app-starting',
    difficulty: 'medium'
  },
  // =============== ACTIONS ===============
  actions: {
    startGame (ctx) {},
    setDifficulty (ctx, difficulty) {
      ctx.commit('difficulty', difficulty)
    }
  },
  // ========== GETTERS ============
  getters: {
    // Determine player turn
    turn: state => {
    }
  },
  // ============ MUTATIONS ===============
  mutations: {
    difficulty (state, diff) {
      state.difficulty = diff
    }
  }
})
