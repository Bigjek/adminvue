const posts = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    posts: ({ data }) => (data)
  },
  mutations: {
    addBlogPost(state, post) {
      state.data.push(post)
    }
  },
  actions: {
    fetchBlogs({ state, rootGetters }) {
      const { $http } = rootGetters
      $http.get('blog').then(response => {
        state.data = response.body
      }, response => { console.error(response) })
    },
    fetchInBlogs({ state, rootGetters, commit }, dataparams) {
      const { $http } = rootGetters
      $http.post('blog', dataparams).then((response) => {
      }, response => { console.error('нет ', dataparams) })
    }
  }
}
export default posts
