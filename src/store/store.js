import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import localStorage from 'store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentView: 'app-starting',
    difficulty: 'easy',
    seconds: {
      easy: 30000,
      medium: 20000,
      difficult: 10000
    },
    timerRunning: false,
    username: '',
    currentCategory: { // chosen category
      name: 'Random',
      id: 9
    },
    questions: [], // current list of questions in game
    isGameOver: false, // game state
    isPaused: false,
    round: 0, // round counter, starts at 0, ends at maxrounds. Linked to display of current question
    maxrounds: 12,
    scores: {
      playerOne: {
        nickname: '',
        history: [],
        total: 0
      },
      playerTwo: {
        nickname: '',
        history: [],
        total: 0
      }
    },
    solo: true, // Game mode, solo or multiplayer?
    leaderboard: [],
    quote: {
      quote: '',
      author: ''
    }
  },
  // =============== ACTIONS ===============
  actions: {
    startGame (ctx) {
      ctx.state.currentView = 'app-loader'
      const quoteApi = `https://talaikis.com/api/quotes/random/`
      // const quoteApi = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`
      Vue.http.get(quoteApi)
      .then(res => res.json())
      .then(data => {
        let newQuote = {
          author: data.author.trim(),
          quote: data.quote.trim()
        }
        ctx.commit('randomQuote', newQuote)
      })
      // Fetch batch of questions for specific category
      let api
      // Determine if random (default) or chosen category
      if (ctx.state.currentCategory.name === 'Random') {
        api = `https://opentdb.com/api.php?amount=${ctx.state.maxrounds}`
      } else {
        api = `https://opentdb.com/api.php?amount=${ctx.state.maxrounds}&category=${ctx.state.currentCategory.id}`
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
    },
    getLeaderboards (ctx) {
      let leaders = localStorage.get('leaders')
      if (!leaders) {
        leaders = []
      }
      ctx.commit('getLeaderboards', leaders)
    },
    addScore (ctx, {score1, score2}) {
      let leaders = localStorage.get('leaders')
      if (!leaders) {
        localStorage.set('leaders', [])
        leaders = localStorage.get('leaders')
      }
      leaders.push(score1)
      if (score2) {
        leaders.push(score2)
      }
      localStorage.set('leaders', leaders)
      ctx.commit('getLeaderboards', leaders)
    }
  },
  // ========== GETTERS ============
  getters: {
    // Get solo or multiplayer
    solo: state => {
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
    // Set game over and show modal after the rounds
    isGameOver: state => {
      if ((state.round === state.maxrounds - 1) || state.isGameOver) {
        state.isGameOver = true
      }
    },
    gameOver: state => {
      state.isGameOver = true
    },
    // Next round
    incrementRound: state => {
      state.round += 1
      state.seconds.easy = 30000
      state.seconds.medium = 20000
      state.seconds.difficult = 10000
    },
    // Restart game with default state
    newGame: state => {
      state.currentCategory.name = 'Random'
      state.currentCategory.id = 9
      state.currentView = 'app-starting'
      state.solo = true
      state.timerRunning = false
    },
    // Pause game state and disable answer buttons after submtting answer
    pauseGame: (state, payload) => {
      if (payload === 'pause') {
        state.isPaused = true
        state.timerRunning = false
      } else {
        state.isPaused = false
        state.timerRunning = true
      }
    },
    // Reset common default game parameters
    resetGame: state => {
      state.isGameOver = false
      state.isPaused = false
      state.timerRunning = false
      state.questions = []
      state.round = 0
      state.scores.playerOne.total = 0
      state.scores.playerTwo.total = 0
      state.scores.playerOne.history = []
      state.scores.playerTwo.history = []
      state.seconds.easy = 30000
      state.seconds.medium = 20000
      state.seconds.difficult = 10000
    },
    // Score after answering question
    score: (state, {correct, player}) => {
      if (correct) {
        state.scores[player].history.push({
          correct,
          incorrect: false
        })
        let multiplier = state.difficulty === 'difficult' ? 3 : (state.difficulty === 'medium') ? 1.5 : 1
        let millisLeft = state.seconds[state.difficulty]
        state.scores[player].total += Math.ceil(multiplier * (millisLeft / 1000))
      } else {
        state.scores[player].history.push({
          correct,
          incorrect: true
        })
      }
    },
    // Set game mode from Starter.vue
    selectMode: (state, payload) => {
      if (payload === true) {
        state.solo = false
        state.maxrounds *= 2
      } else {
        state.solo = true
        state.maxrounds /= 2
      }
    },
    // Set current category from Starter.vue
    setCurrentCategory: (state, payload) => {
      state.currentCategory.name = payload.name
      state.currentCategory.id = payload.id
    },
    difficulty (state, diff) {
      state.difficulty = diff
    },
    updateNickname (state, payload) {
      state.scores[payload.player].nickname = payload.newNickname
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
      state.timerRunning = true
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
    },
    millisElapsed: (state, millis) => {
      state.seconds[state.difficulty] -= millis
    },
    getLeaderboards: (state, leaders) => {
      state.leaderboard = _.reverse(_.sortBy(leaders, ['points'])).map((el, idx) => {
        return {...el, placement: idx + 1}
      }).splice(0, 10)
    },
    randomQuote: (state, quote) => {
      state.quote = quote
    }
  }
})
