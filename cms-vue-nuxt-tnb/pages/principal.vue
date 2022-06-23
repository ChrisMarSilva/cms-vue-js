<template>
  <div>
    <h1>principal</h1>

    <br>

    <form>
      <v-text-field v-model="message" label="texto" required />
      <v-btn depressed color="primary" @click.stop.prevent="sendMessage">
        <v-icon left>
          mdi-refresh
        </v-icon>
        Send
      </v-btn>
    </form>
    <div v-if="showMsg">
      <h3>Message in a WebSocket</h3>
      <pre>{{ rcvMessage }}</pre>
      <v-btn depressed color="primary" @click="showMsg = !showMsg">
        <v-icon left>
          mdi-refresh
        </v-icon>
        Dismiss
      </v-btn>
    </div>

    <br>

    <h1>PORTFÓLIO</h1>
    <p>Erro: {{ portfolioErro }}</p>
    <p>Tot. Invest: R$ {{ portfolioTotInvest }}</p>
    <p>Tot. Atual: R$ {{ portfolioTotAtual }}</p>
    <p>Tot. Valoriz: R$ {{ portfolioTotValoriz }} ({{ portfolioPercValoriz }}%)</p>
    <ul id="example-1">
      <li v-for="item in portfolioLista" :key="item.AtvId">
        {{ item.AtvTipoInvest }} - {{ item.AtvCodigo }} - {{ item.AtvQtde }} - R$ {{ item.AtvTotInvest }} - R$ {{ item.AtvTotAtual }} - R$ {{ item.AtvTotValoriz }} ({{ item.AtvPercValoriz }}%)
      </li>
    </ul>

    <br>

    <h1>APURAÇÃO SOBRE OPERAÇÕES MENSAIS</h1>
    <p>Erro: {{ apuracoesErro }}</p>
    <p>Lista: {{ apuracoesLista }}</p>

    <br>

    <h1>OPERAÇÕES REALIZADAS NO MÊS</h1>
    <p>Erro: {{ operacoesErro }}</p>
    <p>Lista: {{ operacoesLista }}</p>

    <br>

    <h1>MEUS PROVENTOS A RECEBER</h1>
    <p>Erro: {{ proventosAReceberErro }}</p>
    <p>Lista: {{ proventosAReceberLista }}</p>

    <br>

    <h1>DIVULGAÇÃO DE PROVENTOS NO MÊS</h1>
    <p>Erro: {{ proventosDivulgadosErro }}</p>
    <p>Lista: {{ proventosDivulgadosLista }}</p>

    <br>

    <h1>FATOS RELEVANTES NO MÊS</h1>
    <p>Erro: {{ fatosErro }}</p>
    <p>Lista: {{ fatosLista }}</p>

    <br>

    <h1>NOTÍCIAS DO DIA</h1>
    <p>Erro: {{ noticiaErro }}</p>
    <ul id="example-1">
      <li v-for="item in noticiaLista" :key="item[0]">
        {{ item[2] }} - {{ item[1] }} - {{ item[3] }} - {{ item[4] }}
      </li>
    </ul>

    <br>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
const isDev = process.env.NODE_ENV === 'development'
export default {

  name: 'PrincipalPage',

  data () {
    return {
      message: 'Chris MarSil',
      socket: null,
      rcvMessage: '',
      showMsg: false
    }
  },

  computed: {

    ...mapGetters('login', ['email', 'nome', 'tipo', 'foto']),
    ...mapGetters('principal', ['portfolioLista', 'portfolioLoading', 'portfolioErro']),
    ...mapGetters('principal', ['apuracoesLista', 'apuracoesLoading', 'apuracoesErro']),
    ...mapGetters('principal', ['operacoesLista', 'operacoesLoading', 'operacoesErro']),
    ...mapGetters('principal', ['proventosAReceberLista', 'proventosAReceberLoading', 'proventosAReceberErro']),
    ...mapGetters('principal', ['proventosDivulgadosLista', 'proventosDivulgadosLoading', 'proventosDivulgadosErro']),
    ...mapGetters('principal', ['fatosLista', 'fatosLoading', 'fatosErro']),
    ...mapGetters('principal', ['noticiaLista', 'noticiaLoading', 'noticiaErro']),

    portfolioListaAcao () {
      return _.filter(this.portfolioLista, value => value.AtvTipoInvest === 'ACAO')
    },

    portfolioTotInvest () {
      const vm = this
      let TotInvest = 0.0
      _.forEach(this.portfolioLista, function (value) {
        TotInvest += parseFloat(vm.getValDecimal(value.AtvTotInvest))
      })
      return this.getMascaraValor(TotInvest)
    },

    portfolioTotAtual () {
      const vm = this
      let TotAtual = 0.0
      _.forEach(this.portfolioLista, function (value) {
        TotAtual += parseFloat(vm.getValDecimal(value.AtvTotAtual))
      })
      return this.getMascaraValor(TotAtual)
    },

    portfolioTotValoriz () {
      const vm = this
      let TotValoriz = 0.0
      _.forEach(this.portfolioLista, function (value) {
        TotValoriz += parseFloat(vm.getValDecimal(value.AtvTotValoriz))
      })
      return this.getMascaraValor(TotValoriz)
    },

    portfolioPercValoriz () {
      const vm = this
      let TotInvest = 0.0
      let TotValoriz = 0.0
      let PercValoriz = 0.00
      _.forEach(this.portfolioLista, function (value) {
        TotInvest += parseFloat(vm.getValDecimal(value.AtvTotInvest))
        TotValoriz += parseFloat(vm.getValDecimal(value.AtvTotValoriz))
      })
      if (TotValoriz !== 0.0 && TotInvest > 0.0) {
        PercValoriz = (TotValoriz / TotInvest) * 100
      }
      return this.getMascaraValor(PercValoriz)
    }

  },

  mounted () {
    this.buscarDadosPortfolio()
    // this.buscarDadosApuracao()
    // this.buscarDadosOperacao()
    // this.buscarDadosProventosAReceber()
    // this.buscarDadosProventosDivulgados()
    // this.buscarDadosFatos()
    // this.buscarDadosNoticias()
    // this.socket = new WebSocket('ws://localhost:9100/socket')
    // this.socket.onmessage = (msg) => {
    //   this.acceptMsg(msg)
    // }
  },

  methods: {

    ...mapActions('principal', ['buscarPortfolio', 'buscarApuracao', 'buscarOperacao', 'buscarProventosAReceber', 'buscarProventosDivulgados', 'buscarFatos', 'buscarNoticias']),

    sendMessage () {
      this.buscarDadosPortfolio()
      // const msg = { Greeting: this.message }
      // this.socket.send(JSON.stringify(msg))
    },

    acceptMsg (msg) {
      // this.rcvMessage = msg.data + '\n' + this.rcvMessage
      // this.showMsg = true
    },

    getValDecimal (value) {
      try {
        value = value.replace(/\./g, '').replace(',', '.')
        value = parseFloat(value).toFixed(2) || 0
        // if (!isNumber(value)) {
        //   return 0
        // }
        return value
      } catch (error) {
        return 0
      }
    },

    getFormacataoInteiro (value) {
      return String(value).split('').reverse().join('').split(/(\d{3})/).filter(Boolean).join('.').split('').reverse().join('')
    },

    getMascaraValor (value) {
      return value.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',00', '') // return value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
    },

    async buscarDadosPortfolio () {
      const logName = 'PORTFOLIO'
      this.logIni(logName)
      try {
        await this.buscarPortfolio()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosApuracao () {
      const logName = 'APURACAO'
      this.logIni(logName)
      try {
        await this.buscarApuracao()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosOperacao () {
      const logName = 'OPERACAO'
      this.logIni(logName)
      try {
        await this.buscarOperacao()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosProventosAReceber () {
      const logName = 'PROVENTOS_A_RECEBER'
      this.logIni(logName)
      try {
        await this.buscarProventosAReceber()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosProventosDivulgados () {
      const logName = 'PROVENTOS_DIVULGADOS'
      this.logIni(logName)
      try {
        await this.buscarProventosDivulgados()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosFatos () {
      const logName = 'FATOS'
      this.logIni(logName)
      try {
        await this.buscarFatos()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarDadosNoticias () {
      const logName = 'NOTICIA'
      this.logIni(logName)
      try {
        await this.buscarNoticias()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    logIni (name) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.time(name + ' - TEMPO')
      }
    },
    logFim (name) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.timeEnd(name + ' - TEMPO')
      }
    },
    logInfo (name) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.info(name, this.$moment().format('DD/MM/YYYY hh:mm:ss,SSS'))
      }
    },
    logErro (name, err) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.error(name + ' - ERRO', err)
      }
    }

  }

}
</script>
