import Vue from 'vue'
import Vuex from 'vuex'
import info from './info' 

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
    param:{
      title: 'TODO LIST',
      search: '',
      message: null,
      grid: true,
      note: {
        id:'',
        title: '',
        edit: false,
        selected:'planned'
      },
    }
  },
  getters: {
    params(state) {
      return state.param
    }
  },
  mutations: {
 
  },
  actions: {
 
  },
  modules:{
    info
  }
});

