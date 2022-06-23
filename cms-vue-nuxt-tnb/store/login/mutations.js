export default {

  LOGIN_LIMPAR (state) {
    state.email = ''
    state.senha = ''
    state.id = -1
    state.nome = ''
    state.tipo = ''
    state.foto = ''
    state.token = ''
    state.loading = false
    state.erro = ''
  },

  LOGIN_SET_EMAIL (state, payload) {
    state.email = payload
  },

  LOGIN_SET_SENHA (state, payload) {
    state.senha = payload
  },

  LOGIN_SET_LOADING (state, payload) {
    state.id = -1
    state.nome = ''
    state.tipo = ''
    state.foto = ''
    state.token = ''
    state.loading = payload
    state.erro = ''
  },

  LOGIN_SET_ERRO (state, payload) {
    state.id = -1
    state.nome = ''
    state.tipo = ''
    state.foto = ''
    state.token = ''
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
  },

  LOGIN_SET_DADOS (state, payload) {
    state.id = payload.Id
    state.nome = payload.Nome
    state.email = payload.Email
    state.tipo = payload.Tipo
    state.foto = payload.Foto
    state.token = 'token' // payload.token
    state.loading = false
    state.erro = ''
  }

}
