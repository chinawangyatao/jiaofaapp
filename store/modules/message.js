import { getMessage,unreadMessageSum } from '@/services/message.js';
const message = {
	state:{
		messageList:[],
		messageListIndex:[],
		upMessageSum:0
	},
	actions:{
		async getMessageAct({commit},payload){
			let request = await getMessage({"pageNo": payload,"pageSize": 10})
			commit('getMessageActType',{data:request.data.data.list,pageNo:payload})
		},
		async unreadMessageSum({commit},payload){
			let request = await unreadMessageSum()
			commit('unreadMessageSumList',request.data.data)
		}
	},
	mutations:{
		getMessageActType(state,{data,pageNo}){
			if(pageNo===1){
				state.messageList=[]
			}
			state.messageList = state.messageList.concat(data)
			let messageListIndex = data.filter(item=>item.isRead==="0")
			state.messageListIndex =messageListIndex.slice(0,2)
		},
		unreadMessageSumList(state,data){
			state.upMessageSum = data.unreadMessageSum
		}
	},
	namespaced: true
}

export default message