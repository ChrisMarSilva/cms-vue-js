export const state = () => ({
  paisesFavoritos: []
})

export const getters = {
  favoritos (state) {
    return state.paisesFavoritos
  },
  totalFavoritos (state) {
    return state.paisesFavoritos.length
  }
}

export const mutations = {
  addFavorito (state, payload) {
    state.paisesFavoritos.push({ ...payload })
  },
  delFavorito (state, payload) {
    state.paisesFavoritos.splice(state.paisesFavoritos.indexOf(payload), 1)
    // state.paisesFavoritos = state.paisesFavoritos.filter(x => x.id !== payload)
  }
}

export const actions = {
  adicionarFavorito ({ commit }, payload) {
    commit('addFavorito', payload)
  },
  removerFavorito ({ commit }, payload) {
    commit('delFavorito', payload)
  }
}
