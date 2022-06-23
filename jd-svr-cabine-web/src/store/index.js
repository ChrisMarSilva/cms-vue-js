import { createStore } from "vuex";

export default createStore({

  state: {
    count: 0,
  },

  mutations: {
    decrementAdd: state => state.count--,
    incrementDel: state => state.count++,
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    increment2 (state, n) {
      state.count += n // store.commit('increment', 10)
    },
    increment3 (state, payload) {
      state.count += payload.amount // store.commit('increment', {      amount: 10})
    },
  },

  getters: {
    counter: state => state.count,
    count: state => {
      return state.count
    },
    count2: (state) => () => {
      return state.count
    },
  },

  actions: {
    decrement: ({ commit }) => commit('decrement'),
    increment: context => context.commit('increment'),
  },

  modules: {

  },

});
