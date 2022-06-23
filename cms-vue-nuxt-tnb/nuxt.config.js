import colors from 'vuetify/es5/util/colors'

export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - TamoNaBalsa',
    title: 'TamoNaBalsa',
    htmlAttrs: {
      // lang: 'en'
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    token: process.env.TNB_VUE_TOKEN
  },

  privateRuntimeConfig: {

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: {
    dirs: [
      '~/components',
      '~/components/gerenciamento'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
    // baseURL: 'http://127.0.0.1:5001/'
    // baseURL: 'https://reqres.in/api/'
    // baseURL: 'https://jsonplaceholder.typicode.com/'
    // baseURL: process.env.API_URL
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/login', method: 'post', propertyName: 'token' },
  //         user: { url: '/users/2', method: 'get', propertyName: null }
  //       }
  //     }
  //   },
  //   redirect: {
  //     home: '/teste_index'
  //   }
  // },

  moment: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
    timezone: true,
    defaultTimezone: 'America/Sao_Paulo'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    // middleware: 'autenticacao'
  }

}
