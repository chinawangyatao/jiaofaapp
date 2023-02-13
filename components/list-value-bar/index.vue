<template>
	<view>
		<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 324upx);">
			<view v-if="dataList && dataList.length>0" class="content" v-for="(item,index) in dataList" :key="index" @click="roter(item)">
				<view class="state">
					<view class="title">
						<view v-if="isHidden" :style="{'background':backgroundLink(item[param[0]])}" class="details">
							{{item[param[1]]}} 
						</view>
						<text :class="isHidden ? 'titelText' : 'titelText1'">{{item[param[2]]}}</text>
					</view>
				</view>
				<view class="equipment">
					
					<view class="eqTxt" style="margin-top: 16upx;">
						<text :class="paramName.length==0 ? 'ftxt' : 'ftxtw'">{{(paramName.length==0 || paramName[3] == '') ? '时间:' : paramName[3]}}</text>
						<view>{{item[param[3]]}}</view>
					</view>
					<view class="eqTxt" style="margin-top: 16upx;">
						<text :class="paramName.length==0 ? 'ftxt' : 'ftxtw'">{{(paramName.length==0 || paramName[5] == '') ? '类型:' : paramName[5]}}</text>
						<view v-if="param[5] === 'diseasetypeName'">{{item[param[5]]}}</view>
						<view v-else>{{item[param[5]]}}-{{item[param[6]]}}</view>
					</view>
					<view class="eqTxt" style="margin-top: 16upx;">
						<text :class="paramName.length==0 ? 'ftxt' : 'ftxtw'">{{(paramName.length==0 || paramName[4] == '') ? '位置:' : paramName[4]}}</text>
						<view class="ftxt1">{{item[param[4]]}}</view>
					</view>					
				</view>
			</view>
			<view  v-if="errorStatus == 'noData'" style="display: flex;flex-direction: column;align-items: center;padding-top: 258upx;">
				<text style="font-size: 32upx;color: #666666;">没有找到相关数据</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
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
					//以前
					let lsParam = JSON.parse(this.oldParamTobe)
					//现在
					let param = val
					let up = false
					Object.keys(lsParam).map(key=>{
						if(lsParam[key]!==param[key]){
							if(key!=='pageNo' && key!=='timestamp' && key!=='device' && key!=='ver'){
								up = true  //进入赛选，pagelist清空
							}
						}
					})
					//console.log(lsParam,up)
					//alert(up)
					if(up){
						//alert("zheli1")
						this.urlRquest()
					}else{
						//alert("zheli2")
						//翻页
						this.urlRquest(true)
					}
					
				},
				deep:true,
			},
			dataList:{
				deep:true,
				handler(val,oldval){
					this.createStore(this.dataList,this.type)
				}
			},
			url:{
				deep:true,
				handler(val,oldval){
					//alert("url这里感觉不应该是true")
					this.urlRquest(true)
				}
			}
		},
		data(){
			return {
				//这个如果切换tab会不会干扰
				total: 0,
				moreStatus: 'init',
				waitflag: false,
				errorStatus: null,
				dataList:[],
				oldParamTobe:[]
			}
		},
		created() {
			this.urlRquest()
		},
		methods: {
			scrolltolower() {
				let flag = this.moreStatus === 'noMore' ? true : this.waitflag
				this.$emit('scrolltolower',flag)
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
			roter(item){
				this.$emit('rouer',item)
			},
			urlRquest(turnpage){
				if(!this.waitflag){					
					this.waitflag =  true
					this.oldParamTobe = JSON.stringify(this.paramTobe)
					
					this.$api.send({
						url: this.url,
						method: 'post',
						data: this.paramTobe,
						success:(res)=>{
							if(res.code===200){
								
								let datal = res.data.list
								
								if(datal && datal.length > 0){
									datal.map(item => {
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
								}
								
								if(turnpage){
									//alert("turnpage if="+turnpage)
									//如果不是滚动翻页，不应该连接
									//如果获得的list是空，则当前页应该减1
									if(datal){
										//不加这个if，病害库会出现数据重复的情况
										if(this.paramTobe.pageNo != 1){
											this.dataList = this.dataList.concat(datal)
										}else{
											this.dataList = datal//此句可以去除，然后上边的if和上上的if合并
										}
										
									}
								}else{
									//alert("turnpage else="+turnpage)
									this.total = res.data.total
									this.dataList = datal								
								}
								
								//if(this.dataList && this.dataList.length > 0){
									//this.errorStatus = null;
								//}else{
									//初始化没有数据的情况
									//this.errorStatus = 'noData';
								//}
								//初始化没有数据的情况
								this.errorStatus = this.dataList && this.dataList.length > 0 ? null : 'noData'
								//后台请求回来的total有bug不知道为什么
								//this.moreStatus = this.total <= this.dataList.length ? 'noMore' : 'more' 
								
								this.moreStatus = datal && datal.length >= 20 ? 'more' : 'noMore'
								//alert(this.moreStatus)
								this.waitflag = false
							}
						}
					})
				}else{
					//console.info("请等待，其实我希望两个tab切换的时候，能够抛弃")
				}
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
</style>
