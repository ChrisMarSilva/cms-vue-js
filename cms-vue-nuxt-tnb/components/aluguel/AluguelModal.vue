<template>
  <main>
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
                  <v-text-field label="Data*" :v-model="cadastro.data" required />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="['Ativo1', 'Ativo2', 'Ativo3', 'Ativo4']" label="Ativo*" :v-model="cadastro.ativo" required />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Vlr. Bruto*" :v-model="cadastro.vlrBruto" required />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Vlr. IR" :v-model="cadastro.vlrIR" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Vlr. Líquido" :v-model="cadastro.vlrLiquido" />
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
            <v-btn color="blue darken-1" text @click="fechar">
              CANCELAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const isDev = process.env.NODE_ENV === 'development'
export default {

  name: 'AluguelModalComponent',

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
      }
    }
  },

  computed: {
    ...mapGetters('aluguel', ['visible', 'loading', 'erro'])
  },

  watch: {
    'visible' (newVal) {
      if (newVal) {
        this.limpar()
      }
    }
  },

  methods: {

    ...mapActions('aluguel', ['modificarVisible', 'listarGrid', 'salvar', 'atualizar']),

    limpar () {
      this.cadastro.id = 0
      this.cadastro.data = this.$moment().format('DD/MM/YYYY')
      this.cadastro.ativo = ''
      this.cadastro.vlrBruto = 0.0
      this.cadastro.vlrIR = 0.0
      this.cadastro.vlrLiquido = 0.0
      this.cadastro.situacao = ''
    },

    abrir () {
      this.limpar()
      this.modificarVisible(true)
    },

    fechar () {
      this.modificarVisible(false)
    },

    async salvarDados () {
      const logName = 'SALVAR-DADOS'
      this.logIni(logName)
      try {
        if (this.cadastro.id <= 0) {
          const data = { name: 'morpheus', job: 'leader' }
          await this.salvar(data)
        } else {
          const data = { name: 'morpheus', job: 'leader' }
          await this.atualizar(data)
        }
        await this.listarGrid()
        this.modificarVisible(false)
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
