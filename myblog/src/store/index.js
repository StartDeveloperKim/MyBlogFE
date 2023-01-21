import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null
  },
  getters: {
    isAdmin (state) {
      return state.role === 'ROLE_ADMIN'
    },
    isGuest (state) {
      return state.role === 'ROLE_GUEST'
    }
  },
  mutations: {
    setRole (state, _role) {
      state.role = _role
    }
  },
  actions: {
    setRole: ({ commit }, _role) => {
      commit('setRole', _role)
    }
  },
  modules: {
  }
})
