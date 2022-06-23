
export default {

  // -----------

  PRINCIPAL_PORTFOLIO_SET_LOADING (state, payload) {
    state.portfolioLista = []
    state.portfolioLoading = payload
    state.portfolioErro = ''
  },

  PRINCIPAL_PORTFOLIO_SET_ERRO (state, payload) {
    state.portfolioLista = []
    state.portfolioLoading = false
    if (payload.response) {
      state.portfolioErro = payload.response.status + ' - ' + payload.response.data.error
    } else if (payload.request) {
      state.portfolioErro = payload.request.status + ' - ' + payload.request.response
    } else if (payload.message) {
      state.portfolioErro = payload.message
    } else {
      state.portfolioErro = payload
    }
  },

  PRINCIPAL_PORTFOLIO_SET_DADOS (state, payload) {
    state.portfolioLista = payload
    state.portfolioLoading = false
    state.portfolioErro = ''
  },

  // -----------

  PRINCIPAL_APURACAO_SET_LOADING (state, payload) {
    state.apuracoesLista = []
    state.apuracoesLoading = payload
    state.apuracoesErro = ''
  },

  PRINCIPAL_APURACAO_SET_ERRO (state, payload) {
    state.apuracoesLista = []
    state.apuracoesLoading = false
    try {
      if (payload.response) {
        state.apuracoesErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.apuracoesErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.apuracoesErro = payload.message
      } else {
        state.apuracoesErro = payload
      }
    } catch (err) {
      state.apuracoesErro = payload
    }
  },

  PRINCIPAL_APURACAO_SET_DADOS (state, payload) {
    state.apuracoesLista = payload
    state.apuracoesLoading = false
    state.apuracoesErro = ''
  },

  // -----------

  PRINCIPAL_OPERACAO_SET_LOADING (state, payload) {
    state.operacoesLista = []
    state.operacoesLoading = payload
    state.operacoesErro = ''
  },

  PRINCIPAL_OPERACAO_SET_ERRO (state, payload) {
    state.operacoesLista = []
    state.operacoesLoading = false
    try {
      if (payload.response) {
        state.operacoesErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.operacoesErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.operacoesErro = payload.message
      } else {
        state.operacoesErro = payload
      }
    } catch (err) {
      state.operacoesErro = payload
    }
  },

  PRINCIPAL_OPERACAO_SET_DADOS (state, payload) {
    state.operacoesLista = payload
    state.operacoesLoading = false
    state.operacoesErro = ''
  },

  // -----------

  PRINCIPAL_PROVENTOS_A_RECEBER_SET_LOADING (state, payload) {
    state.proventosAReceberLista = []
    state.proventosAReceberLoading = payload
    state.proventosAReceberErro = ''
  },

  PRINCIPAL_PROVENTOS_A_RECEBER_SET_ERRO (state, payload) {
    state.proventosAReceberLista = []
    state.proventosAReceberLoading = false
    try {
      if (payload.response) {
        state.proventosAReceberErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.proventosAReceberErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.proventosAReceberErro = payload.message
      } else {
        state.proventosAReceberErro = payload
      }
    } catch (err) {
      state.proventosAReceberErro = payload
    }
  },

  PRINCIPAL_PROVENTOS_A_RECEBER_SET_DADOS (state, payload) {
    state.proventosAReceberLista = payload
    state.proventosAReceberLoading = false
    state.proventosAReceberErro = ''
  },

  // -----------

  PRINCIPAL_PROVENTOS_DIVULGADOS_SET_LOADING (state, payload) {
    state.proventosDivulgadosLista = []
    state.proventosDivulgadosLoading = payload
    state.proventosDivulgadosErro = ''
  },

  PRINCIPAL_PROVENTOS_DIVULGADOS_SET_ERRO (state, payload) {
    state.proventosDivulgadosLista = []
    state.proventosDivulgadosLoading = false
    try {
      if (payload.response) {
        state.proventosDivulgadosErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.proventosDivulgadosErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.proventosDivulgadosErro = payload.message
      } else {
        state.proventosDivulgadosErro = payload
      }
    } catch (err) {
      state.proventosDivulgadosErro = payload
    }
  },

  PRINCIPAL_PROVENTOS_DIVULGADOS_SET_DADOS (state, payload) {
    state.proventosDivulgadosLista = payload
    state.proventosDivulgadosLoading = false
    state.proventosDivulgadosErro = ''
  },

  // -----------

  PRINCIPAL_FATOS_SET_LOADING (state, payload) {
    state.fatosLista = []
    state.fatosLoading = payload
    state.fatosErro = ''
  },

  PRINCIPAL_FATOS_SET_ERRO (state, payload) {
    state.fatosLista = []
    state.fatosLoading = false
    try {
      if (payload.response) {
        state.fatosErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.fatosErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.fatosErro = payload.message
      } else {
        state.fatosErro = payload
      }
    } catch (err) {
      state.fatosErro = payload
    }
  },

  PRINCIPAL_FATOS_SET_DADOS (state, payload) {
    state.fatosLista = payload
    state.fatosLoading = false
    state.fatosErro = ''
  },

  // -----------

  PRINCIPAL_NOTICIA_SET_LOADING (state, payload) {
    state.noticiaLista = []
    state.noticiaLoading = payload
    state.noticiaErro = ''
  },

  PRINCIPAL_NOTICIA_SET_ERRO (state, payload) {
    state.noticiaLista = []
    state.noticiaLoading = false
    try {
      if (payload.response) {
        state.noticiaErro = payload.response.status + ' - ' + payload.response.data.error
      } else if (payload.request) {
        state.noticiaErro = payload.request.status + ' - ' + payload.request.response
      } else if (payload.message) {
        state.noticiaErro = payload.message
      } else {
        state.noticiaErro = payload
      }
    } catch (err) {
      state.noticiaErro = payload
    }
  },

  PRINCIPAL_NOTICIA_SET_DADOS (state, payload) {
    state.noticiaLista = payload
    state.noticiaLoading = false
    state.noticiaErro = ''
  }

  // -----------

}
