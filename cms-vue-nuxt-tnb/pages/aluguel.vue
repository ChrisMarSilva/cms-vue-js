<template>
  <main>
    <v-container>
      <h1>Aluguel</h1>
      <hr>
      <br>
      <AluguelGrid />
      <AluguelModal />
    </v-container>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {

  name: 'AluguelPage',

  head () {
    return {
      title: 'Aluguel'
    }
  },

  computed: {
    ...mapGetters('login', ['email', 'senha'])
  },

  mounted () {
    // if (this.token === '') {
    //   this.$router.push('login')
    //   return
    // }
    // if (isDev) {
    //   this.modificarEmail('eve.holt@reqres.in')
    //   this.modificarSenha('cityslicka')
    //   this.realizarLogin({ email: this.email, password: this.senha })
    // }
  },

  methods: {
    // ...mapActions('login', ['modificarEmail', 'modificarSenha', 'realizarLogin']),
    ...mapActions('aluguel', ['listar', 'salvar', 'atualizar', 'apagar'])
  }

}
</script>
