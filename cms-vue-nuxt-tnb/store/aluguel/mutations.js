export default {

  ALUGUEL_SET_ATIVOS (state, payload) {
    state.ativos = payload
  },

  ALUGUEL_SET_GRID (state) {
    state.loading = false
    state.erro = ''
  },

  ALUGUEL_SET_VISIBLE (state, payload) {
    state.visible = payload
  },

  ALUGUEL_SET_LOADING (state, payload) {
    state.loading = payload
    state.erro = ''
  },

  ALUGUEL_SET_ERRO (state, payload) {
    state.loading = false
    if (payload.response) {
      state.erro = payload.response.status + ' - ' + payload.response.data.error
    } else if (payload.request) {
      state.erro = payload.request.status + ' - ' + payload.request.response
    } else if (payload.message) {
      state.erro = payload.message
    } else {
      state.erro = payload
    }
  }

}
