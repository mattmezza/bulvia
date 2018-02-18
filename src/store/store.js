import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentView: 'app-starting',
    difficulty: 'easy',
    seconds: {
      easy: 30,
      medium: 20,
      difficult: 10
    },
    username: '',
    currentCategory: { // chosen category
      name: 'Random',
      id: 9
    },
    questions: [], // current list of questions in game
    isGameOver: false, // game state
    isPaused: false,
    round: 0, // round counter, starts at 0, ends at maxrounds. Linked to display of current question
    maxrounds: 9,
    scores: {
      playerOne: {
        history: [],
        total: 0
      },
      playerTwo: {
        history: [],
        total: 0
      }
    },
    solo: true // Game mode, solo or multiplayer?
  },
  // =============== ACTIONS ===============
  actions: {
    startGame (ctx) {
      ctx.state.currentView = 'app-loader'
      // Fetch batch of questions for specific category
      let api
      // Determine if random (default) or chosen category
      if (ctx.state.currentCategory.name === 'Random') {
        api = 'https://opentdb.com/api.php?amount=10'
      } else {
        api = 'https://opentdb.com/api.php?amount=10&category=' + ctx.state.currentCategory.id
      }
      Vue.http.get(api)
      .then(response => {
        return response.json()
      })
      .then(data => {
        ctx.commit('startGame', data.results)
      })
    },
    setDifficulty (ctx, difficulty) {
      ctx.commit('difficulty', difficulty)
    }
  },
  // ========== GETTERS ============
  getters: {
    // Get solo or multiplayer
    mode: state => {
      return state.solo
    },
    round: state => {
      return state.round
    },
    maxrounds: state => state.maxrounds,
    // Determine player turn
    turn: state => {
      let check = state.round % 2
      if (check === 0 || state.round === 0) {
        return 'playerOne'
      } else {
        return 'playerTwo'
      }
    }
  },
  // ============ MUTATIONS ===============
  mutations: {
    // Set game over and show modal after 10 rounds
    isGameOver: state => {
      if (state.round === state.maxrounds) {
        state.isGameOver = true
      }
    },
    // Next round
    incrementRound: state => {
      state.round += 1
    },
    // Restart game with default state
    newGame: state => {
      state.currentCategory.name = 'Random'
      state.currentCategory.id = 9
      state.currentView = 'app-intro'
      state.solo = true
    },
    // Pause game state and disable answer buttons after submtting answer
    pauseGame: (state, payload) => {
      if (payload === 'pause') {
        state.isPaused = true
      } else {
        state.isPaused = false
      }
    },
    // Reset common default game parameters
    resetGame: state => {
      state.isGameOver = false
      state.isPaused = false
      state.questions = []
      state.round = 0
      state.scores.playerOne.total = 0
      state.scores.playerTwo.total = 0
      state.scores.playerOne.history = []
      state.scores.playerTwo.history = []
    },
    // Score after answering question
    score: (state, payload) => {
      let player = payload.mode
      if (payload.true) {
        state.scores[player].history.push({
          correct: true,
          incorrect: false
        })
        state.scores[player].total += 1
      } else {
        state.scores[player].history.push({
          correct: false,
          incorrect: true
        })
      }
    },
    // Set game mode from Starter.vue
    selectMode: (state, payload) => {
      payload === true ? state.solo = true : state.solo = false
    },
    // Set current category from Starter.vue
    setCurrentCategory: (state, payload) => {
      state.currentCategory.name = payload.name
      state.currentCategory.id = payload.id
    },
    difficulty (state, diff) {
      state.difficulty = diff
    },
    updateUsername (state, newUsername) {
      state.username = newUsername
    },
    startGame: (state, payload) => {
      // Set questions to payload from http request in startGame action
      state.questions = payload
      // Create list of incorrect choices
      state.questions.forEach(el => {
        el.choices = el.incorrect_answers.reduce((acc, item) => {
          acc.push({
            text: item,
            answer: false,
            classes: {
              incorrect: false,
              'is-danger': false
            }
          })
          return acc
        }, [])
        // Add correct answer
        el.choices.push({
          text: el.correct_answer,
          answer: true,
          classes: {
            correct: false,
            'is-success': false
          }
        })
        el.choices = _.shuffle(el.choices)
      })
      // Set view to game
      state.currentView = 'app-game'
    },
    // Apply classes, which indicate correct or incorrect, to buttons after
    // submtting answer
    styleButtons: state => {
      state.questions[state.round].choices.forEach(el => {
        if (el.answer) {
          el.classes = { correct: true, 'is-success': true }
        } else {
          el.classes = { incorrect: true, 'is-danger': true }
        }
      })
    }
  }
})
