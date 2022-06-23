export default {

  modificarVisible ({ commit }, payload) {
    commit('ALUGUEL_SET_VISIBLE', payload)
  },

  async listarAtivos ({ commit }) {
    try {
      commit('ALUGUEL_SET_LOADING', true)
      const data = { }
      const response = (await this.$axios.get('unknown', data)).data
      const itens = response.data.map((x) => { return x.name })
      // itens.push('Todos')
      commit('ALUGUEL_SET_ATIVOS', itens)
      return itens
    } catch (err) {
      commit('ALUGUEL_SET_ERRO', err)
    }
  },

  async listarGrid ({ commit }) {
    try {
      commit('ALUGUEL_SET_LOADING', true)
      const data = { }
      const response = (await this.$axios.get('users?page=2', data)).data
      commit('ALUGUEL_SET_GRID')
      const itens = response.data
      return itens
    } catch (err) {
      commit('ALUGUEL_SET_ERRO', err)
    }
  },

  async salvar ({ commit }, payload) {
    try {
      // commit('ALUGUEL_SET_LOADING', true)
      const data = { name: payload.name, job: payload.job }
      const response = (await this.$axios.post('users', data)).data
      return response
    } catch (err) {
      commit('ALUGUEL_SET_ERRO', err)
    }
  },

  async atualizar ({ commit }, payload) {
    try {
      // commit('ALUGUEL_SET_LOADING', true)
      const data = { name: payload.name, job: payload.job }
      const response = (await this.$axios.put('users/2', data)).data
      return response
    } catch (err) {
      commit('ALUGUEL_SET_ERRO', err)
    }
  },

  async apagar ({ commit }) {
    try {
      // commit('ALUGUEL_SET_LOADING', true)
      const data = { }
      const response = (await this.$axios.delete('users/2', data)).data
      return response
    } catch (err) {
      commit('ALUGUEL_SET_ERRO', err)
    }
  }

}
