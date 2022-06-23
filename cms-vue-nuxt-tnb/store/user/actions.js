export default {

  async getUser ({ commit, $axios }) {
    const data = await $axios.get('')
    commit('USER_SET_USER', data)
  },

  async getUsers ({ commit, $axios }) {
    const data = await $axios.get('')
    commit('USER_SET_USERS', data)
  }

}
