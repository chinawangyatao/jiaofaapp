import request from '@/utils/Request.js';

export function getMessage(paylaod){
	return request.send({url:"/app/message/pageList",method:"post",data:paylaod})
}

export function unreadMessageSum(){
	return request.send({url:"/app/message/unreadMessageSum",method:"get"})
}