import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	lists: [],
  	userinfo: {}
  },
  mutations: {
  	addItem(state, value){
  		state.lists.push(value)
  	},
  	addUser(state, userinfo){
  		this.state.userinfo = userinfo
  	}
  },
  actions: {

  }
})
