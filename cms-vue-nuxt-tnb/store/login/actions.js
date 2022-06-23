export default {

  limpar ({ commit }) {
    commit('LOGIN_LIMPAR')
  },

  modificarEmail ({ commit }, payload) {
    commit('LOGIN_SET_EMAIL', payload)
  },

  modificarSenha ({ commit }, payload) {
    commit('LOGIN_SET_SENHA', payload)
  },

  async realizarLogin ({ commit }, payload) {
    try {
      commit('LOGIN_SET_LOADING', true)
      const data = { timeout: 60000, params: { txtEmail: payload.email, txtSenha: payload.password } }
      // const response = await this.$axios.get('login/entrar', data)
      const response = await this.$axios.get('http://127.0.0.1:5001/login/entrar', data)
      const resultado = response.data.data.Resultado
      const mensagem = response.data.data.Mensagem
      const dados = response.data.data.Dados
      if (resultado === 'OK') {
        commit('LOGIN_SET_DADOS', dados)
      } else {
        commit('LOGIN_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('LOGIN_SET_ERRO', err)
    }
  },

  realizarLogout ({ commit }) {
    commit('LOGIN_LIMPAR')
  }

}
