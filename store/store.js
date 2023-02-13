import Vue from "vue"
import Vuex from 'vuex'
import message from './modules/message.js'
import image from './modules/image.js'
import diseaseList from './modules/diseaseList'
import user from './modules/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		message,
		image,
		diseaseList,
		user
	}
})

export default store