export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.baseURL + config.url)
  })

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     // redirect('/400')
  //     // eslint-disable-next-line no-console
  //     console.log(error.response.message)
  //   }
  // })
}
