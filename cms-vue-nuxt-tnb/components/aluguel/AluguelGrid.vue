<template>
  <main>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" dark @click="abrir">
          <v-icon left>
            mdi-plus-circle-outline
          </v-icon>
          Novo Aluguel
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" md="2">
        <v-text-field v-model="filtro.dtIni" label="Data Inicial" />
      </v-col>
      <v-col cols="4" md="2">
        <v-text-field v-model="filtro.dtFim" label="Data Final" />
      </v-col>
      <v-col cols="4" md="3">
        <v-select v-model="filtro.ativo" :items="ativos" label="Ativo:" />
      </v-col>
      <v-col cols="4" md="3">
        <v-btn depressed color="primary" @click="buscarGrid">
          <v-icon left>
            mdi-refresh
          </v-icon>
          Pesquisar
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
                :loading="loading"
                :sort-by="['first_name', 'last_name']"
                :sort-desc="[false, true]"
                multi-sort
                :page.sync="datatable.page"
                :items-per-page="datatable.itemsPerPage"
                hide-default-footer
                @page-count="datatable.pageCount = $event"
              >
                <template #[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="editar(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="remover(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
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
      </v-col>
    </v-row>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const isDev = process.env.NODE_ENV === 'development'
export default {

  name: 'AluguelGridComponent',

  data () {
    return {
      // dialog: false,
      // dialogDelete: false,
      filtro: {
        dtIni: '',
        dtFim: '',
        ativo: ''
      },
      // desserts: [],
      // editedIndex: -1,
      // editedItem: {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0
      // },
      // defaultItem: {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0
      // },
      datatable: {
        search: '',
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Email', value: 'email' },
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Avatar', value: 'avatar' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    }
  },

  computed: {
    ...mapGetters('aluguel', ['ativos', 'loading', 'erro'])
    // formTitle () {
    //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    // },
  },

  // watch: {
  //   dialog (val) {
  //     val || this.close()
  //   },
  //   dialogDelete (val) {
  //     val || this.closeDelete()
  //   }
  // },

  created () {
    this.limparFiltro()
    this.buscarGrid()
  },

  mounted () {
    this.buscarAtivos()
  },

  methods: {

    ...mapActions('aluguel', ['listarAtivos', 'listarGrid', 'modificarVisible']),

    limparFiltro () {
      const dtAtual = this.$moment().format('DD/MM/YYYY')
      this.filtro.dtIni = dtAtual
      this.filtro.dtFim = dtAtual
      this.filtro.ativo = ''
    },

    abrir () {
      // this.limparModal()
      this.modificarVisible(true)
    },

    async buscarAtivos () {
      const logName = 'BUSCAR-ATIVOS'
      this.logIni(logName)
      try {
        await this.listarAtivos()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    async buscarGrid () {
      const logName = 'BUSCAR-GRID'
      this.logIni(logName)
      try {
        this.datatable.items = await this.listarGrid()
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    editar (data) {
      // this.$store.commit("user/setId", data._id);
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
    },

    remover (data) {
      // Produto.apagar(data)
      //   await this.$axios.delete("http://localhost:4000/users/" + data.id);
      // this.listar()
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialogDelete = true
    },

    deleteItemConfirm () {
      // this.desserts.splice(this.editedIndex, 1)
      // this.closeDelete()
    },

    close () {
      // this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    closeDelete () {
      // this.dialogDelete = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // },

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
