export default {

  async buscarPortfolio ({ commit }, payload) {
    try {
      commit('PRINCIPAL_PORTFOLIO_SET_LOADING', true)
      // this.$axios.defaults.headers.get['Access-Control-Allow-Credentials'] = true
      // this.$axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
      // this.$axios.defaults.headers.get['Access-Control-Allow-Header'] = 'OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header'
      // this.$axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      // this.$axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
      // const data = {
      //   method: 'POST',
      //   timeout: 60000,
      //   mode: 'cors',
      //   credentials: 'include' // credentials: 'same-origin', // cms-tnb
      // withCredentials: true,
      //   auth: {
      //     username: 'usuario',
      //     password: 'password'
      //   },
      //   data: {
      //     username: 'usuario',
      //     password: 'password'
      //   },
      // headers: {
      //     'cms-tnb': 'xxxxxx',
      //     'access-token': 'xxxxxx',
      //     // 'twk_idm_key': 'xxxxxx',
      //     // 'TawkConnectionTime': 'xxxxxx',
      //     'JSESSIONID.5b339cfe': 'xxxxxx',
      //     // 'Content-Type': 'application/json;charset=UTF-8',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'X-Requested-With': 'XMLHttpRequest',
      // 'Access-Control-Allow-Credentials': true,
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header',
      // 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
      //     // 'Authorization': 'Bearer ',
      //     // 'Accept': 'application/json'
      //     // 'Cookie': 'cookie1=value; cookie2=value; cookie3=value;'
      //     // 'Connection': 'Keep-Alive',
      // },
      // responseType: 'text'
      // }
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, responseType: 'json' }
      // const response = (await this.$axios.get('portfolio/DataSetPagina', data)).data
      const response = await this.$axios.get('http://127.0.0.1:5001/principal/DataSetPagina', data)
      const resultado = response.data.data.Resultado
      // eslint-disable-next-line no-console
      console.log(resultado)
      if (resultado === 'OK') {
        const lista = response.data.data.Lista
        commit('PRINCIPAL_PORTFOLIO_SET_DADOS', lista)
      } else {
        const mensagem = response.data.data.Mensagem
        commit('PRINCIPAL_PORTFOLIO_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_PORTFOLIO_SET_ERRO', err)
    }
  },

  async buscarApuracao ({ commit }, payload) {
    try {
      commit('PRINCIPAL_APURACAO_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('apuracao/gridresumidaportipo', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_APURACAO_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_APURACAO_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_APURACAO_SET_ERRO', err)
    }
  },

  async buscarOperacao ({ commit }, payload) {
    try {
      commit('PRINCIPAL_OPERACAO_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('principal/carregaroperacoesportipos', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_OPERACAO_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_OPERACAO_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_OPERACAO_SET_ERRO', err)
    }
  },

  async buscarProventosAReceber ({ commit }, payload) {
    try {
      commit('PRINCIPAL_PROVENTOS_A_RECEBER_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('principal/carregarProventos', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_PROVENTOS_A_RECEBER_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_PROVENTOS_A_RECEBER_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_PROVENTOS_A_RECEBER_SET_ERRO', err)
    }
  },

  async buscarProventosDivulgados ({ commit }, payload) {
    try {
      commit('PRINCIPAL_PROVENTOS_DIVULGADOS_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('principal/carregarCalendario', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_PROVENTOS_DIVULGADOS_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_PROVENTOS_DIVULGADOS_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_PROVENTOS_DIVULGADOS_SET_ERRO', err)
    }
  },

  async buscarFatos ({ commit }, payload) {
    try {
      commit('PRINCIPAL_FATOS_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('principal/carregarFatosAcoes', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_FATOS_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_FATOS_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_FATOS_SET_ERRO', err)
    }
  },

  async buscarNoticias ({ commit }, payload) {
    try {
      commit('PRINCIPAL_NOTICIA_SET_LOADING', true)
      const data = { timeout: 60000, headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
      const response = (await this.$axios.get('principal/carregarNoticias', data)).data
      const resultado = response.data.Resultado
      const mensagem = response.data.Mensagem
      const lista = response.data.Lista
      if (resultado === 'OK') {
        commit('PRINCIPAL_NOTICIA_SET_DADOS', lista)
      } else {
        commit('PRINCIPAL_NOTICIA_SET_ERRO', mensagem)
      }
      return response
    } catch (err) {
      commit('PRINCIPAL_NOTICIA_SET_ERRO', err)
    }
  }

}
