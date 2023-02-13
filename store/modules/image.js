const image = {
	state:{
		imageArr:[]
	},
	mutations:{
		addImage(state,img){
			state.imageArr = img
		}
	},
	namespaced: true
}

export default image