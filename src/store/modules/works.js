const works = {
  namespaced: true,
  state: {
    data: {}
  },
  actions: {
    addNewWork({ state, rootGetters }, fields) {
      console.log('fields', fields)
      const { $http } = rootGetters
      $http.post('work', fields).then((response) => {
        console.error('есть ', fields)
      }, response => { console.error('нет ', fields) })
    }
  }
}

export default works
