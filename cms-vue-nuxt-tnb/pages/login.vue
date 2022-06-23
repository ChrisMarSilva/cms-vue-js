<template>
  <main>
    <v-container>
      <h1>Login</h1>
      <hr>
      <br>
      <v-row>
        <v-col cols="6" md="3">
          <v-text-field
            v-model="emailNovo"
            label="E-mail"
            required
          />
        </v-col>
        <v-col cols="4" md="3">
          <v-text-field
            v-model="senhaNova"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            label="Senha"
            required
            @click:append="show = !show"
          />
        </v-col>
        <v-col cols="4" md="3">
          <v-btn
            depressed
            color="primary"
            :disabled="loading"
            @click="onLogin"
          >
            <v-icon left>
              mdi-refresh
            </v-icon>
            Logar
          </v-btn>
        </v-col>
      </v-row>
      <p>Erro: {{ erro }}</p>
    </v-container>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const isDev = process.env.NODE_ENV === 'development'
export default {

  name: 'LoginPage',

  layout: 'auth',

  data () {
    return {
      show: false
    }
  },

  computed: {

    ...mapGetters('login', ['email', 'senha', 'token', 'loading', 'erro']),

    emailNovo: {
      get () {
        return this.email // return this.$store.state.user.id;
      },
      set (value) {
        this.modificarEmail(value) // this.$store.commit("user/setId", value);
      }
    },

    senhaNova: {
      get () {
        return this.senha
      },
      set (value) {
        this.modificarSenha(value)
      }
    }

  },

  mounted () {
    this.limpar()
    // if(!process.client) return;
    // Do not run on server
    // if (process.server) {
    //   return
    // }
    //    if (user) {
    //   if (route.path == '/login' || route.path == '/user/temporary') {
    //     return redirect('/')
    //   }
    //   return
    // }
    //   if (!user) {
    //   return redirect('/login')
    // }
    const email = this.$auth.$storage.getLocalStorage('email')
    const password = this.$auth.$storage.getLocalStorage('password')
    this.modificarEmail(email)
    this.modificarSenha(password)
    if (email && password) {
      this.onLogin() // this.$store.commit('myMutation',savedData)
    }
  },

  methods: {

    ...mapActions('login', ['limpar', 'modificarEmail', 'modificarSenha', 'realizarLogin']),

    async onLogin () {
      const logName = 'LOGIN'
      this.logIni(logName)
      try {
        this.$auth.$storage.setLocalStorage('email', this.email) // JSON.stringify(this.email)
        this.$auth.$storage.setLocalStorage('password', this.senha) // JSON.stringify(this.senha)
        const data = { email: this.email, password: this.senha }
        await this.realizarLogin(data)
        if (this.token !== '') {
          await this.$router.push('/principal')
        }
      } catch (err) {
        this.logErro(logName, err)
      } finally {
        this.logFim(logName)
      }
    },

    onLogout () {
      this.$auth.$storage.removeLocalStorage('email')
      this.$auth.$storage.removeLocalStorage('password')
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
