export default async function ({ $axios, $moment, store, redirect }) {
  try {
    const logNome = 'TNB-Request-API-Auth'
    // eslint-disable-next-line no-console
    console.log(logNome + ' - INI - ', $moment().format('DD/MM/YYYY hh:mm:ss,SSS'))
    // const isAuthenticated = store.state.authenticated
    // if (store.state.isLogado) {
    //   return redirect('/login')
    // }
    // eslint-disable-next-line no-console
    console.time(logNome + ' - TEMPO')
    // console.warn(logNome + ' - WANNING: ', mensagem)
    // console.error(logNome + ' - ERRO: ', error)
    const url = 'https://reqres.in/api/login'
    const data = { email: 'eve.holt@reqres.in', password: 'cityslicka' }
    const response = await $axios.$post(url, data)
    // const data = await axios.get('https://api.nuxtjs.dev/posts')
    // eslint-disable-next-line no-console
    console.timeEnd(logNome + ' - TEMPO')
    // eslint-disable-next-line no-console
    console.log(logNome + ' - FIM - ', $moment().format('DD/MM/YYYY hh:mm:ss,SSS'))
    // const content = await response.json();
    // response.status
    // response.data
    // response.headers
    // response.config
    if (response.token !== 'QpwL5tke4Pnpja7X4') {
      return redirect('/login')
    }
    // return $axios.$post(url, data)
    //   .then((res) => {
    //     if (res.token !== 'QpwL5tke4Pnpja7X4_') {
    //       return redirect('/login')
    //     }
    //   })
    //   .catch((error) => {
    //     or error.response
    //     error.response.data
    //     error.response.status
    //     error.response.headers
    //     error.response.config
    //     or error.request
    //     or error.message
    //     return redirect('/login')
    //   })
  } catch (error) {
    // console.log({ error }, 'middleware error');
  }
}
