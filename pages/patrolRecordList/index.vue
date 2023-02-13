<template>
	<view class="startPatrolList header-top-height">
		<header-bar :left="true" :name="'巡查记录'"></header-bar>		
		<view class="add" @click="routerView(`/pages/startPatrol/index?type=add`)">
			<view>
				<image src="../../static/add.png"></image>
				<view >新建</view>
			</view>
		</view>
		<view class="screen">
			<view class="screen_props" @click="screenTrue">
				<image src="../../static/search.png"></image>
				<text style="color: #ABABAB;">搜索</text>
			</view>
		</view>
		<view class="ba7-color" style="overflow: hidden;margin-top: 100upx;">
			<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 240upx);">
				<view class="card" v-for="(item,index) in dataListPage" :style="startRow===item.id?'border:1px solid red':''" :key="index" @click="routerView(`/pages/startPatrol/index?id=${item.id}&status=${item.status}&startTime=${getDate(item.inspectStartDate)}&endTime=${getDate(item.inspectDoneDate)}`)">
					<view class="display alert_item_center">
						<view style="margin-right: 20upx;" class="type" :style="{'background':backgroundLink(item.status)}">{{item.statusName}}</view>
						<view style="color: #383838;font-size: 30upx;" class="typeName">{{item.name}}</view>
					</view>
					<view class="display" style="margin-top: 22upx;">
						<view class="time">时间:</view>
						<view class="value">{{getDate(item.inspectStartDate)}}-<span>{{item.status==="2"?"至今":getDate(item.inspectDoneDate)}}</span></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<n-transition ref='tk'>
			<time-bar @clickQu="clickQu" @hide="$refs.tk.hide()"></time-bar>
		</n-transition>
	</view>
</template>

<script>
	import TimeBar from '@/components/time-bar/index.vue'
	import NTransition from '@/components/n-transition/n-transition.vue'
	import SelectBar from '@/components/select-bar/index.vue'
	export default {
		data() {
			let years = []
			for (let i = 1990; i <= new Date().getFullYear(); i++) {
				years.push(i)
			}
			return {
				dataList:years,
				dataValue:[1],
				pageNo:1,
				pageSize:10,
				queryTime:'',
				dataListPage:[],
				startRow:''
			}
		},
		components: {
			NTransition,
			SelectBar,
			TimeBar
		},
		onLoad() {
			this.getPageList('jz')
		},
		onShow() {
			this.getPageList('jz')
		},
		methods: {
			getPageList(type){
				this.$api.send({
					url:'/inspect/task/pageList',
					method:'POST',
					data:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						queryTime:this.queryTime
					},
					success:(res)=>{
						if(res.code===200){
							if(res.data.total===0){
								uni.showToast({
									title: '没有数据啦！',
									icon: 'none',
									duration: 3000
								})
							}else{
								if(type==='jz'){
									let list = res.data.list
									if(this.dataListPage.length>0){
										if(this.dataListPage[0].id!==list[0].id){
											if(this.pageNo===1){
												this.dataListPage =list
											}else{
												this.dataListPage = this.dataListPage.concat(list)
											}
										}
									}else{										
										this.dataListPage = this.dataListPage.concat(list)
									}
									
									
								}else{
									console.log(res)
									if(res.msg==='成功！'){
										uni.showToast({
											title: '未匹配到该查询条件！',
											icon: 'none',
											duration: 3000
										})
										this.startRow=''
									}else{
											this.startRow = res.msg
									}
								
								}
							}
						}else{
							uni.showToast({
								title: '请求失败！',
								icon: 'none',
								duration: 3000
							})
						}
					}
				})
			},
			routerView(url) {
				//console.log("跳转的页面为:" + url)
				this.pageNo=1
				uni.navigateTo({
					url
				})
			},
			scrolltolower() {
				this.pageNo+=1
				this.getPageList('jz')
			},
			screenTrue() {
				this.$refs.tk.show()
			},
			confirm(value){
				this.dataValue=value
				this.$refs.tk.hide()
			},
			cancel(){
				this.$refs.tk.hide()
			},
			backgroundLink(status){
				switch(status){
					case '1':
						return 'rgb(247,71,71)'
					case '2':
						return 'rgb(19,193,191)'
					case '3':
						return 'rgb(180, 180, 180)'
					default:
						return 'rgb(54,149,226)'
				}
			},
			clickQu(date){
				this.queryTime=date
				this.getPageList()
				this.$refs.tk.hide()
			},
			getDate(data){
				let dataTime = new Date(data)
				let housts  = dataTime.getHours(); //获取系统时，
				let minutes = dataTime.getMinutes() //获取分
				let houst = housts.toString().length > 1 ? housts.toString() : '0' + housts.toString()
				let minute = minutes.toString().length > 1 ? minutes.toString() : '0' + minutes.toString()
				return `${houst}:${minute}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.startPatrolList {		
		overflow: hidden;
	}

	.screen {
		padding-top: 20upx;
		position: fixed;
		height: 60upx;
		width: 100vw;
		left: 20upx;
		background: #F3F3F3;

		.screen_props {
			height: 60upx;
			z-index: 99;
			text-align: center;
			line-height: 60upx;
			width: calc(100vw - 40upx);
			border-radius: 15upx;
			background: #E0E0E0;
			text{
				font-size: 28upx;
			}
			image {
				width: 20upx;
				height: 20upx;
			}
		}
	}

	.card {
		background: $font-color1;
		width: 95vw;
		margin: 0 auto 0;
		border-radius: 16upx;
		padding: 26upx 24upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
	}

	.type {
		color: $font-color1;
		padding: 0 5upx;
		height: 34upx;
		line-height: 34upx;
		border-radius: 4upx;
		font-size: 24upx;
	}

	.time {
		font-size: 26upx;
		color: #767676;
	}
	.value{
		font-size: 26upx;
		color: #383838;
		margin-left: 16upx;
	}
	.add{
		background: rgb(59,155,255); 
		position: fixed;
		z-index: 99;
		bottom: 5upx;
		right: 20upx;
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			height: 60upx;
			width: 52upx;
		}
	}
	.typeName{
		font-weight: 700;
	}
	
	
	.title-bar-img-bg-select-fixed {
		background:#1890FF;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99999;
	}
	.title-bar {
		padding: 67rpx 24rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.title-bar-btn-box-left {
		width: 80rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.title-bar-btn-box-right {
		width: 80rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.title-bar .title-bar-title {
		font-size: 36rpx;
		color: #fff;
	}
</style>
