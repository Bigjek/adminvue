import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueResource)

Vue.http.options.root = '/api'

import skills from './modules/skills'
import posts from './modules/posts'
import works from './modules/works'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
})

export const store = new Vuex.Store({
  getters: {
    $http: () => (VueResource)
  },
  modules: {
    skills,
    posts,
    works
  }
})
