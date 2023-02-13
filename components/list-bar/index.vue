<template>
	
	
	<view>
		<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 504upx);">
			<!--<checkbox-group @change="checkboxChange">-->
			<view v-if="dataList && dataList.length>0" class="content" v-for="(item,index) in dataList" :key="index">
				<!--<view class="check"> <checkbox :value="item.id" :checked="item.checked" /></view>-->
				<label class="check">
					<radio :value="item.id" :checked="item.selected" @click="checkbox(index)" />
				</label>
				<view  @click="roter(item)">
					<view class="state">
						<view class="title">
							<view v-if="isHidden" :style="{'background':backgroundLink(item[param[0]])}" class="details">
								{{item[param[1]]}} 
							</view>
							<text :class="isHidden ? 'titelText' : 'titelText1'">{{item[param[2]]}}</text>
						</view>
					</view>
					<view class="equipment">
						<view class="eqTxt">
							<text :class="paramName.length==0 ? 'ftxt' : 'ftxtw'">{{(paramName.length==0 || paramName[3] == '') ? '时间:' : paramName[3]}}</text>
							<view>{{item[param[3]]}}</view>
						</view>
						<view class="eqTxt" style="margin-top: 16upx;">
							<text :class="paramName.length==0 ? 'ftxt' : 'ftxtw'">{{(paramName.length==0 || paramName[4] == '') ? '位置:' : paramName[4]}}</text>
							<view class="ftxt1">{{item[param[4]]}}</view>
						</view>
					</view>
				</view>
			</view>
			<!--</checkbox-group>-->
			<view  v-if="errorStatus == 'noData'" style="display: flex;flex-direction: column;align-items: center;padding-top: 258upx;">
				<text style="font-size: 32upx;color: #666666;">没有找到相关数据</text>
			</view>
			<view  v-if="errorStatus == 'noNetwork'" style="display: flex;flex-direction: column;align-items: center;padding-top: 258upx;">
				<text style="font-size: 32upx;color: #666666;">服务器异常</text>
			</view>
			<uni-load-more :status="moreStatus" :content-text="contentText" color="#007aff" />
		</scroll-view>
		
		
		<view v-show="dataList.length>0 && selected.length>=0" class="title-bar-img-bg"  style="position: absolute;bottom: 20px;bottom: 0px;width: 100%;height: 59px;background-color: #fff;">
			<view class="title-bar"  style="display: flex;">
				<view style="display: flex;"  @click="allSelect" >
					 <label style="line-height: 59px;margin-left: 20px;"> <radio value="1" :checked="selected.length === dataList.length"/>全选</label>
					 
					 <!-- 全选按钮 -->
					<!-- <label> <radio value="1" :checked="selected.size === pagesArr.length" @click="allSelect" />全选</label>-->
					 
					<!--selected.size === data.length<text class="selectAll" @tap="selectAll">全选</text>-->
					<text class="countTip" style="line-height: 59px;margin-left: 20px;">共{{selected.length}}条</text>
				</view>
				<!--<text class="title-bar-title">批量派单</text>-->
				<view class="buttoms_22"> <!-- style="margin-left: 30upx;" -->
					<text @click="warehousing()"><!-- v-if='isARole' -->
						批量派单
					</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	//import { reactive } from "vue"
	
	export default {
		props:{
			isHidden:{
				type:Boolean,
				default:true
			},
			objData:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			url:{
				type:String,
				default:''
			},
			paramTobe:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			param:{
				type:Array,
				default:()=>{
					return []
				}
			},
			paramName:{
				type:Array,
				default:()=>{
					return []
				}
			},
			type:{
				type:String,
				default:''
			}
		},
		watch:{
			paramTobe:{
				handler(val, oldVal){
					//alert("paramTobe handler 被调用")
					//以前
					let lsParam = JSON.parse(this.oldParamTobe)
					//console.info(lsParam,"lsParam========>原来的tobe参数oldParam")
					//现在
					let param = val
					//console.info(param,"param========>现在的tobe参数param")
					let up = false
					let ignore = true
					if(lsParam){
						//alert("lsParam旧非空")
						Object.keys(param).map(key=>{
							if(lsParam[key]!==param[key]){
								//alert(lsParam[key]+"参数发生改变"+key)
								if(key!=='timestamp' && key!=='device' && key!=='ver'){
									ignore = false
								}
								if(key!=='pageNo' && key!=='timestamp' && key!=='device' && key!=='ver'){
									//alert(key+"不是pageNo所以调用第一页")
									up = true  //进入赛选，pagelist清空
								}
							}
							if(key==='pageNo' && param[key] == 1 && !this.waitflag){
								//alert("第一页重新请求")
								ignore = false
								up = true
							}
						})
					}else{
						ignore = false
						up = true
					}			
					if(!ignore){						
						//console.log(lsParam,up)
						//alert("调用请求up"+up)
						if(up){
							//alert("zheli1")
							//this.urlRquest()
							this.getPageList(true)
						}else{
							//alert("zheli2")
							//this.urlRquestPageSize()
							//只有页码即翻页等情况下调用该方法
							this.getPageList(false)
						}
					}
					
				},
				deep:true,
			},
			dataList:{
				deep:true,
				handler(val,oldval){
					//alert("this.type="+this.type+this.dataList.length)
					//this.selected=[]
					this.createStore(this.dataList,this.type)
				}
			},
			url:{
				deep:true,
				handler(val,oldval){
					//this.urlRquestPageSize()
					this.getPageList(true)
				}
			}
		},
		data(){
			
			return {
				total: 0,
				moreStatus: 'init',
				waitflag: false,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: ''
				},
				errorStatus: null,
				dataList:[],
				selected:[],
				oldParamTobe: null,							
			}
		},
		created() {
			//alert("created")
			let _this = this;
			//this.urlRquest()
			//this.getPageList(true)
		},
		
		onPullDownRefresh() {
			//alert("onPullDownRefresh下拉刷新")
			console.info("onPullDownRefresh下拉刷新")
			//下拉刷新的时候请求一次数据
			this.getPageList(true);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			//alert("onReachBottom")
			console.info("onReachBottom")
			this.paramTobe.pageNo++;
			this.moreStatus = 'loading';
			this.getPageList(false);
		},
		onLoad(obj) {
			console.info("onLoad")
			//alert("onLoad")
			let _this = this;
			//this.deviceStatusName = obj.deviceStatusName;
			//this.id = obj.id;
			//this.groupType = obj.groupType;
			//this.userData = uni.getStorageSync('userData');
		},
		onReady() {
			console.info("onReady")
			//alert("onReady")
			/*_this.getPageList(true);
			uni.$on('inspectionEquipmentList', function(data) {
				console.log('监听到事件来自 inspectionEquipmentList ，携带参数 msg 为：' + data.msg);
				_this.getPageList(true);
			});*/
		},
		onUnload() {
			console.info("onUnload")
			//alert("onUnload")
			// 移除监听事件
			//uni.$off('inspectionEquipmentList');
		},
		
		methods: {
			
			
			/**selected是否存在，如果是-1则不存在即未被选中*/
			hasSelect(arr,id) {
				let _index = arr.findIndex((item,index)=>{					  
					return item.id === id
				});
			  return _index;
			},				

			// 全选与反选事件
			allSelect() {
				//alert(this.selected.length)
			    // 已经全选情况下，就是反选，全选就说明长度一样
			    if (this.selected.length === this.dataList.length) {
			        this.selected=[]; // 全部清除
			        this.dataList.forEach((element) => {
			            element.selected = false; // 全部不选，就行了
			        });
			    }
			    // 还未全选的状态下
			    else {
			        this.dataList.forEach((element, index) => {
			            // 因为可能存在部分已经选择了，所以得先判断是否已存在，不存在才需要添加
			            //if (!this.selected.has(index)) {
						//alert(this.hasSelect(this.selected,element.id))	
						if (this.hasSelect(this.selected,element.id) == -1) {
			                //this.selected.set(index, element.id); // key是对应的下标index，而value是可以自定义的
							//element.index=index
							
			                element.selected = true; // 设为选中
							this.selected.push(element)
			            }
			        });
			    }
			},
					
			// 选项框点击事件，参数是数据的下标
			checkbox(index) {
				let element = this.dataList[index]
				//alert(index)
				//alert(this.dataList[index].selected)
			    // 选中的状态下再次点击，即为取消选中
			    if (this.dataList[index].selected) {
			        this.dataList[index].selected = false;
			        //this.selected.delete(index); // 然后删除对应key即可
					let i = this.hasSelect(this.selected,element.id)
					this.selected.splice(i,1)
			    }
			    // 未选中状态下点击
			    else {
			        this.dataList[index].selected = true;
			        //this.selected.set(index, this.dataList[index].id);
					this.selected.push(element)
			    }
			},
			scrolltolower() {
				//alert("this.status="+this.status)
				let flag = this.moreStatus === 'noMore' ? true : this.waitflag
				this.$emit('scrolltolower',flag)//应该放this.waitflag
			},
			closeno(resmsg) {
				//alert("保存成功后调用关闭方法")
				this.$emit('closeno',resmsg)
				
			},
			/* 病害库和待办的维修用到 */
			backgroundLink(status){
				if(this.url.indexOf('/repair/matRepair/pageList')>-1){
					switch(status){
						/*case '1':
							return 'rgb(19, 193, 191)'
						case '2':
							return 'rgb(54,149,226)'
						case '3':
							return 'rgb(247,71,71)'
						case '4':
							return 'rgb(228, 131, 26)'
						case '5':
							return 'rgb(180, 180, 180)'
						default:
							return 'rgb(113, 71, 221)'*/							
						case '1':
							return '#14c0bf'
						case '2':
							return ' #3696e2'
						case '3':
							return '#f34648'
						case '4':
							return '#e18417'
						case '7':
							return 'rgb(228, 131, 26)'
						case '8':
							return 'rgb(175, 29, 90)'
						case '9':
							return 'rgb(241, 71, 71)'
						case '5':
							return '#b4b4b4'
						default:
							return 'rgb(113, 71, 221)'
					}
					
				}else{
					switch(status){
						case '1':
							return 'rgb(54,149,226)'
						case '2':
							return 'rgb(247,71,71)'
						case '3':
							return 'rgb(180, 180, 180)'
						default:
							return 'rgb(113, 71, 221)'
					}
				}
				
			},
			//点击条目进入详情的路由
			roter(item){
				this.$emit('rouer',item)
			},
			//合并派单的弹框
			warehousing(){
				 let _params = []
				 let _paramNames = []
				       
				this.selected.map(item => {
				  _params.push(item.id)
				  _paramNames.push(item.diseName)
				})
				var ids = _params.join(',')
				var names = _paramNames.join(',')
				if(ids){
					this.$emit('warehousing',ids,names)
				}else{
					uni.showToast({
						title: '请至少选择一条病害',
						icon: 'none',
						duration: 3000
					})
				}
				
			},
			getPageList(init,resmsg) {//true为第一页
			
				/*uni.showLoading({
					mask: true,
					title: '请稍等'
				});*/
				
				if(!this.waitflag){
					this.waitflag = true
				
					this.oldParamTobe = JSON.stringify(this.paramTobe)
					//console.info("oldParamTobe===============")
					//console.info(this.oldParamTobe)
					//let _pageNo = init ? 1 : this.paramTobe.pageNo;
					
					//alert("getPageList"+this.paramTobe.pageNo+init)
					let _this = this
					this.$api.send({
						url: this.url,
						method: 'post',
						data: this.paramTobe,
						success:(res)=>{
							if(res.code===200){
								
									
									//alert("urlRquestPageSize"+this.url)
									//如果获得的list是空，则当前页应该减1						
									let datal = res.data.list
									/*console.info(_this.paramTobe.pageNo,1888)
									console.info(datal,19999)
									console.info(datal.length,19999)
									console.info(res,19999)
									console.info(_this.url,19999)*/
									/*if(datal && datal.length > 0){
										datal.map(item => {
											//是否选中
											_this.$set(item, 'selected', false)											
										})
										_this.selected=[]
										//不加这个if，病害库会出现数据重复的情况
										if(_this.paramTobe.pageNo != 1){
											console.info(_this.paramTobe.pageNo+"-->"+res.data.list.length)
											_this.dataList = _this.dataList.concat(datal)
										}else{
											console.info(_this.paramTobe.pageNo+"->"+res.data.list.length)
											_this.dataList = datal
										}		
										
										console.info(res.data.list,19999)
										console.info(_this.dataList,17777)
									}*/
									
									if (datal.length == 0 && _this.paramTobe.pageNo == 1) {
										_this.errorStatus = 'noData';
										//alert("_this.errorStatus noData")
										_this.total = res.data.total
										_this.dataList = [];
										_this.selected=[]
									} else {
										_this.errorStatus = null;
												
										if (init == true) {//if(_this.paramTobe.pageNo === 1){
											//alert("请求第一页")
											//关闭批量派单弹框
											this.closeno(resmsg)
											_this.total = res.data.total
											_this.dataList = [];
											_this.selected=[]
											//alert("_this.total"+_this.total+_this.dataList.length+_this.selected.length)
										}
										datal.map(item => {
											//是否选中
											this.$set(item, 'selected', false)		
											switch(item.status) {
												case '1':
													this.$set(item, 'class', 'item-no-start')
													break;
												case '2':
													this.$set(item, 'class', 'item-in-repair')
													break;
												case '4':
													this.$set(item, 'class', 'item-in-rectify')
													break;
												case '3':
													this.$set(item, 'class', 'item-no-accept')
													break;
												case '5':
													this.$set(item, 'class', 'item-complate')
													break;
											}
										})
										
										
										_this.dataList = _this.dataList.concat(datal);
										
										/*
										if (datal && datal.length >= 20) {
											_this.moreStatus = 'more';
											//alert("还有更多")
										} else {
											_this.moreStatus = 'noMore';
											//alert("没有更多")
										}*/
										//上下只保留一个
										//if(this.total <= _this.dataList.length){
											//_this.moreStatus = 'noMore';
											//alert("没有更多2")
										//}else{
											//_this.moreStatus = 'more';
											//alert("还有更多2")
										//}
										_this.moreStatus = this.total <= this.dataList.length ? 'noMore' : 'more'
									
										//不加这个if，病害库会出现数据重复的情况
										/*if(_this.paramTobe.pageNo != 1){
											console.info(_this.paramTobe.pageNo+"-->"+res.data.list.length)
											_this.dataList = _this.dataList.concat(datal)
										}else{
											console.info(_this.paramTobe.pageNo+"->"+res.data.list.length)
											_this.dataList = datal
										}*/
										
									}
									/*
									if(_this.dataList && _this.dataList.length > 0){								
										_this.errorStatus = null;
									}else{
										//初始化没有数据的情况
										_this.errorStatus = 'noData';
									}
									*/	
										
											
									//uni.hideLoading();
									this.waitflag=false
							}
						},fail:(res)=>{
							//alert("404")
							//_this.errorStatus = 'noNetwork';
							//uni.hideLoading();
							this.waitflag=false
						}
					})
				
				}else{
					//this.paramTobe.pageNo = this.paramTobe.pageNo - 1
					//console.info(this.paramTobe.pageNo,"this.paramTobe.pageNo-----------")
				}
			},
			//进入初始化时调用
			urlRquest(resmsg){
				//alert("urlRquest1----")
				this.getPageList(true,resmsg)
				
			},		
			
			createStore(list,type){
				if(type && list){
					let ids = list.map(item=>item.id)
					this.$store.commit('diseaseList/updateIds',{ids,type})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@font-face {
		font-family: 'pingfangMediumBold';
		src:url('~@/static/famiy/PINGFANG+BOLD.TTF') format('truetype');
	}
	.content {
		margin: 16upx 30upx;
		padding: 26upx 24upx;
		border-radius: 12upx;
		background-color: #fff;
		position: relative;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		font-family: 'pingfangMedium';
		display: flex;
		.check {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 5px;
		
		}
		.state {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				display: flex;
				align-items: center;
				
				text{
					font-style: 30upx;
					color: rgb(56,56,56);
					// font-family: 'pingfangMediumBold';
					font-weight: 700;
				}
				view {
					color: #fff;
					border-radius: 4upx;
					font-size: 24upx;
					height: 34upx;
					padding: 0 10rpx;
					text-align: center;
					line-height: 34upx;
					background-color: rgb(180, 180, 180);
					margin-right: 10upx;
				}	
				.details {
					background-color: rgb(241, 71, 71);
					height: 34upx;
					line-height: 34upx;
					border-radius: 4upx;
					font-size: 24upx;
					width: 110upx;/* 76upx */
					
				}
				.titelText {					
					width: 550upx;
				}
				.titelText1 {					
					width: 600upx;
				}

				.work {
					background-color: rgb(54, 149, 226);
				}

				.arrive {
					background-color: rgb(113, 71, 221);
				}

				.repair {
					background-color: rgb(228, 131, 26);
				}

				.confirm {
					background-color: rgb(175, 29, 90);
				}

				.receipt {
					background-color: rgb(19, 193, 191);
				}

				.complete {
					background-color: rgb(180, 180, 180);
				}
			}

			// text {
			// 	width: 500upx;
			// 	overflow: hidden;
			// 	text-overflow: ellipsis;
			// 	white-space: nowrap;
			// 	font-size: 30upx;
			// 	font-weight: 600;
			// }
		}

		.label-width {
			width: 100upx;
		}

		.equipment {
			margin-top: 22upx;

			.eqTxt {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				line-height: 32upx;

				view {
					font-size: 26upx;
					color: #383838;
					font-weight: normal;
					text-overflow: ellipsis;
					/* white-space: nowrap; */
				}

				.ftxt {
					font-size: 26upx;
					color: rgb(118,118,118);
					width: 76upx;
				}
				.ftxtw {
					font-size: 26upx;
					color: rgb(118,118,118);
					/* width: 76upx; */
					width: 140upx;
				}	
				.ftxt1 {
					width: 550upx;
					font-size: 26upx;
					color: rgb(56,56,56);
					/* margin-right: 20upx; */
					/* margin-left: 10upx; */
				}
			}
		}

		.task {
			position: absolute;
			right: 24upx;
			bottom: 26upx;
			width: 100upx;
			// padding: 2upx 10upx;
			font-size: 26upx;
			text-align: center;
			border: #1c82d4 2upx solid;
			border-radius: 40upx;
			height: 40upx;
			line-height: 40upx;
			color: #1c82d4;
		}
	}
	.textClass{
		font-style: 30upx;
		color: rgb(56,56,56);
		font-family: 'pingfangMediumBold';
		// font-weight: 700;
	}
	
	/**
	 * 脚部
	 */
	.buttoms_22 {
		margin: 0 auto;
		width: 300upx;
		background: #3b9bff;
		text-align: center;
		line-height: 105upx;
		border-radius: 0upx;
		color: #ffffff;
		font-size: 34upx;	
		margin-right: 0upx;
	}
</style>
