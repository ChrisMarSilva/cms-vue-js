<template>
  <div>
    <h1>Paises Favoritos ( {{ totalFavoritos }} )</h1>
    <ul>
      <li v-for="pais in favoritos" :key="pais.id">
        <nuxt-link :to="'/paises/' + pais.id">
          {{ pais.nome }}
        </nuxt-link>
        <v-btn depressed color="error" @click="removerFavorito(pais.id)">
          Dell Favorito
        </v-btn>
      </li>
    </ul>
    <div>content: {{ content }}</div>
    <button @click="refresh">
      Refresh
    </button>
    <LoadingBar />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FavoritoPage',
  loading: '~/components/LoadingBar.vue',
  asyncData () {
    return { content: 'Created at: ' + new Date() }
  },
  computed: {
    ...mapGetters('paises', ['favoritos', 'totalFavoritos'])
  },
  beforeMount () {
    // window.alert('hello');
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    })
  },
  methods: {
    ...mapActions('paises', ['removerFavorito']),
    refresh () {
      this.$nuxt.refresh()
    }
  }
}
</script>
