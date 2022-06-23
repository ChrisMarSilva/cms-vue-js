<template>
  <main>
    <v-container>
      <h1>Aluguel</h1>
      <hr>
      <p>Email: {{ email }}</p>
      <p>Senha: {{ senha }}</p>
      <p>Token: {{ token }}</p>
      <p>Loading: {{ loading }}</p>
      <p>Erro: {{ erro }}</p>
      <br>
      <v-btn color="primary" dark @click="openDialog">
        <v-icon left>
          mdi-plus-circle-outline
        </v-icon>
        Novo Aluguel
      </v-btn>
      <v-row>
        <v-col cols="46" md="2">
          <v-text-field label="Data Inicial" />
        </v-col>
        <v-col cols="4" md="2">
          <v-text-field label="Data Final" />
        </v-col>
        <v-col cols="4" md="3">
          <v-select :items="['Ativo1', 'Ativo2', 'Ativo3', 'Ativo4']" label="Ativo:" />
        </v-col>
        <v-col cols="4" md="3">
          <v-btn depressed color="primary" @click="buscar">
            <v-icon left>
              mdi-refresh
            </v-icon>
            Pesquisar
          </v-btn>
        </v-col>
      </v-row>
      <v-card>
        <v-row justify="center">
          <v-col cols="11">
            <v-card-title>
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-text-field v-model="datatable.search" append-icon="mdi-magnify" label="Search" single-line hide-details />
            </v-card-title>
            <v-data-table
              :headers="datatable.headers"
              :items="datatable.items"
              :search="datatable.search"
              class="elevation-1"
              :loading="datatable.loading"
              :sort-by="['calories', 'fat']"
              :sort-desc="[false, true]"
              multi-sort
              :page.sync="datatable.page"
              :items-per-page="datatable.itemsPerPage"
              hide-default-footer
              @page-count="datatable.pageCount = $event"
            />
          </v-col>
        </v-row>
        <br>
        <v-row justify="center">
          <v-col cols="6">
            <v-pagination v-model="datatable.page" :length="datatable.pageCount" />
          </v-col>
        </v-row>
        <br>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="visible" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">ALUGUEL DE ATIVOS</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Data*" :value="cadastro.data" required />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="['Ativo1', 'Ativo2', 'Ativo3', 'Ativo4']" label="Ativo*" :value="cadastro.ativo" required />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Vlr. Bruto*" :value="cadastro.vlrBruto" required />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Vlr. IR" :value="cadastro.vlrIR" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Vlr. Líquido" :value="cadastro.vlrLiquido" />
                  </v-col>
                </v-row>
              </v-container>
              <small>*campo obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" dark @click="salvarDados">
                SALVAR
              </v-btn>
              <v-btn color="blue darken-1" text @click="closeDialog">
                CANCELAR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const isDev = process.env.NODE_ENV === 'development'
export default {

  name: 'AluguelPage',

  data () {
    return {
      cadastro: {
        id: 0,
        data: '',
        ativo: '',
        vlrBruto: 0.0,
        vlrIR: 0.0,
        vlrLiquido: 0.0,
        situacao: ''
      },
      datatable: {
        search: '',
        page: 1,
        loading: false,
        pageCount: 0,
        itemsPerPage: 5,
        headers: [{ text: 'userId', value: 'userId' }, { text: 'id', value: 'id' }, { text: 'title', value: 'title' }, { text: 'body', value: 'body' }],
        items: []
      }
    }
  },

  head () {
    return {
      title: 'Aluguel'
    }
  },

  computed: {
    ...mapGetters('login', ['email', 'senha', 'token', 'loading', 'erro']),
    ...mapGetters('aluguel', ['data', 'ativo', 'vlrBruto', 'vlrIR', 'vlrLiquido', 'visible', 'lista'])
  },

  created () {
  },

  mounted () {
    if (this.token === '') {
      this.$router.push('login')
      return
    }
    if (isDev) {
      this.modificarEmail('eve.holt@reqres.in')
      this.modificarSenha('cityslicka')
      const data = { email: this.email, password: this.senha }
      this.realizarLogin(data)
    }
    this.buscar()
  },

  methods: {

    ...mapActions('login', ['modificarEmail', 'modificarSenha', 'realizarLogin']),
    ...mapActions('aluguel', ['listar', 'salvar', 'atualizar', 'apagar']),

    openDialog () {
      this.limpar()
      this.modificarCadVisible(true)
    },

    closeDialog () {
      this.modificarCadVisible(false)
    },

    limpar () {
      this.cadastro.id = 0
      this.cadastro.data = ''
      this.cadastro.ativo = ''
      this.cadastro.vlrBruto = 0.0
      this.cadastro.vlrIR = 0.0
      this.cadastro.vlrLiquido = 0.0
      this.cadastro.situacao = ''
    },

    async buscar () {
      const logName = 'BUSCAR-DADOS'
      this.logIni(logName)
      // this.logInfo(logName + ' - INI - ')
      try {
        this.datatable.items = []
        this.datatable.items = await this.listar()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
        // this.logInfo(logName + ' - FIM - ')
      }
    },

    async listar () {
      // Produto.listar()
    },

    async salvar () {
      // if(!this.produto.id){
      // Produto.salvar(this.produto)
      // }else{
      // Produto.atualizar(this.produto)
      // }
      // this.listar()
    },

    async editar () {
    },

    async remover () {
      // Produto.apagar(produto)
      // this.listar()
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
