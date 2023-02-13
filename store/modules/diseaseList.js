const diseaseList = {
	state:{
		idsObj:{}
	},
	actions:{},
	mutations:{
		updateIds(state,data){
			const {type,ids} = data
			state.idsObj[type] = ids
		}
	},
	namespaced:true
}

export default diseaseList