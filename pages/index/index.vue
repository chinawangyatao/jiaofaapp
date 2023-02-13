<template>
	<view class="index">
		<view class="img">
			<view class="title">首页</view>
			<view class="display alert_item_center" style="justify-content: center;">
				<view style="margin-right: 80upx;">
					<view class="rate_outer_ring">
						<view class="rate_point_ring">
							<view class="rate_icon">
								<!-- @touchstart="touchLineA" -->
								<qiun-data-charts type="ring" :eopts="opts" :chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" :tooltipShow="false"/>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<image class="icon_image" src="../../static/page/index/maintenance_timeliness.png"></image>
					<view  style="margin-top: -20upx;text-align: left;">
						<text class="text-style">86.34</text><span style="margin-left: 6upx;">%</span></view>
					<view class="buttom" style="text-align: left;">维修及时率<text style="margin-left: 20upx;">近1个月</text></view>
					<image class="icon_image" src="../../static/page/index/maintenance_timeliness.png"
						style="top:-40upx"></image>
				</view>
			</view>

		</view>
		<view class="index_bg display alert_item_center">
			<view v-for="(item,index) in workbenchList" :key="index"
				style="text-align: center;margin-bottom: 50upx;text-align: center;" 
				:style="{'margin-right': ((index+1)%4===0 ? '':'63upx')}" 
				@click="routerView(item.url)">
				<image :src="'../../static/page/index/workbench/'+item.icon+'.png'"></image>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
		<view class="display alert_item_center notification_reminder_title space-between">
			<view class="display alert_item_center">
				<view class="tz">通知提醒</view>
				<view class="score">{{$store.state.message.upMessageSum}}</view>
			</view>
			<view class="display alert_item_center" @click="routerView('/pages/notificationReminder/index')">
				<view class="more" style="margin-right: 10upx;">更多</view>
				<view class="more">
					<image style="width: 10px;height: 10px;" src='../../static/page/diseaseAdd/arrow_right.png'>
					</image>
				</view>
			</view>
		</view>
		<view class="notification_reminder_main display" @click="routerView('/pages/notificationReminder/index')">
			<view style="margin-top: 20upx;margin-right: 32upx;">
				<view class="yuan"></view>
				<view class="xian"></view>
				<view class="yuan"></view>
			</view>
			<view>
				<!-- {{$store.state.message.messageListIndex}} -->
				<view class="text" style="margin-bottom: 32upx;" v-for="(item,index) in $store.state.message.messageListIndex" :key="index">
					<!-- <span>10-19 19:35</span> -->
					<span>{{item.remindTime}}</span>
					<text>{{item.messageTitle}}</text>
				</view>
			</view>
		</view>

	</view>
</template>


<script>
	import uCharts from '@/utils/u-charts.js'
	import  {
			urls,
			api
	} from '../../config/UrlKey.js'
	import {getPersonal,jurisdictionList} from '@/utils/jurisdictionUtils'
	export default {
		data() {
			return {
				workbenchList: [
					{
						name: '病害上报',
						icon: 'disease_entry',
						url: '/pages/diseaseAdd/index?name=病害上报'
					},
					{
						name: '病害库',
						icon: 'disease_bank',
						url: '/pages/diseaseBank/index'
					},
					{
						name: '病害维修',
						icon: 'disease_maintenance',
						url: '/pages/diseaseRepair/index'
					},
					{
						name: '病害护理',
						icon: 'disease_maintenance',
						url: '/pages/diseaseNurse/diseaseNurse'
					},
					{
							name: '开始巡查',
							icon: 'star_patrol',
							url: '/pages/startPatrol/index'
						},
						{
							name: '巡查记录',
							icon: 'patrol_record',
							url: '/pages/patrolRecordList/index'
						},
					// {
					// 	name: '历史工作',
					// 	icon: 'historical_work',
					// 	url: ''
					// },
					// {
					// 	name: '占位功能',
					// 	icon: 'space_occupying_function',
					// 	url: ''
					// },
					// {
					// 	name: '全部',
					// 	icon: 'whole',
					// 	url: ''
					// },
				],
				// 277
				chartsDataPie2: {
					"series": [{
						"labelLine": {
							"normal": {
								"show": false,

							}
						},
						 
						avoidLabelOverlap: false,
						"roundCap": true,
						"data": [{
								"value": 86.34, 
								itemStyle: {
									normal: {
										color: { // 完成的圆环的颜色
											borderWidth: 2,
										    shadowBlur: 20,
											colorStops: [{
												offset: 0,
												color: '#1dcaa7' // 0% 处的颜色
											}, {
												offset: 1,
												color: '#57fff5' // 100% 处的颜色
											}]
										},
									}
								}
							},
							{
								"value": 13.66
							},
						],
					}]
				},
				opts: {
					legend: {
						show: false,
					}
				},
				messageList:[],
			}
		},
		methods: {
			routerView(url) {
				//console.log("跳转的页面为:" + url)
				const _this = this
				// if(url==='/pages/diseaseAdd/index'){
				// 	uni.chooseImage({
				// 		count: 3,
				// 		success: (res) => {
				// 			let image = []
				// 			const files = res.tempFiles;
				// 			for (let i = 0; i < files.length; i++) {
				// 				let obj = new Object();
				// 				obj.name = 'file' + i;
				// 				obj.uri = files[i].path;
				// 				image.push(obj);
				// 			}
				// 			// uni.navigateTo({
				// 			// 	url
				// 			// }) 
				// 			const uploadTask = uni.uploadFile({
				// 				url: urls.baseUpload,
				// 				files: image,
				// 				success: (fileDate) => {
				// 					let res = JSON.parse(fileDate.data)
				// 					if(res.code===200){
				// 						let data = res.data.map(item=>({...item,modifyType:1}))
				// 						_this.$store.commit('image/addImage',data)
				// 						uni.navigateTo({
				// 							url
				// 						})
				// 					}
									
				// 				},
				// 				file: (res) => {}
				// 			});
					
				// 		}
				// 	})
				// }else 
				if(url==='/pages/startPatrol/index'){
					this.startTaskOrEndTask()
				}else{
					uni.navigateTo({
						url
					})
				}
			},
			startTaskOrEndTask(){
				this.$api.send({
					url:"/inspect/task/startTaskOrEndTask",
					method:'get',
					success:(res)=>{
						if(res.code===200){
							if(res.msg==='startTask'){
								uni.navigateTo({
									url:'/pages/startPatrol/index'
								}) 
							}else{
								let url = '/pages/endPatrol/index'
								uni.navigateTo({
									url:`${url}?id=${res.data.id}&title=${res.data.name}`
								})									
							}
						}
					}
				})				
			},
		}, 
		onLoad() {  
			this.$store.dispatch('message/getMessageAct',1)
			this.$store.dispatch('message/unreadMessageSum')
			setInterval(()=>{
				this.$store.dispatch('message/unreadMessageSum')
			},500000)
			if(uni.getStorageSync("jurisdiction")===jurisdictionList[2]){
				this.workbenchList = [
					{
						name: '病害上报',
						icon: 'disease_entry',
						url: '/pages/diseaseAdd/index?name=病害上报'
					},
					{
						name: '病害库',
						icon: 'disease_bank',
						url: '/pages/diseaseBank/index'
					},
					{
						name: '病害维修',
						icon: 'disease_maintenance',
						url: '/pages/diseaseRepair/index'
					},
					{
						name: '病害护理',
						icon: 'disease_maintenance',
						url: '/pages/diseaseNurse/diseaseNurse'
					},
					{
						name: '',
						icon: '',
						url: ''
					},
					{
						name: '',
						icon: '',
						url: ''
					},
				]
			}else if(uni.getStorageSync("jurisdiction")===jurisdictionList[3]){
				this.workbenchList = [
					{
						name: '病害维修',
						icon: 'disease_maintenance',
						url: '/pages/diseaseRepair/index'
					},
					{
						name: '',
						icon: '',
						url: ''
					},
					{
						name: '',
						icon: '',
						url: ''
					},
					{
						name: '',
						icon: '',
						url: ''
					},
					{
						name: '',
						icon: '',
						url: ''
					},
				]
			}
		} 
	}
</script>


<style lang="scss" scoped>
	@font-face {
		font-family: 'Bebasneue';
		src: url('~@/static/famiy/BEBASNEUE-REGULAR.TTF') format('truetype');
	}
	.text-style{
		font-size: 80upx;
		font-family: 'pingfangMediumBold';
		font-weight: 700;
	}
	.index {
		background: $font-color3;
		height: 100vh;
		overflow: auto;
	}

	.img {
		background: url(../../static/page/index/index_header.png) no-repeat;
		background-size: 100% 100%;
		width: 750upx;
		height: 420upx;
		text-align: center;
		padding-top: 66upx;
		color: $font-color1;
		font-size: 48rpx;

		.title {
			font-size: 38upx;
			color: $font-color1;
		}

		.icon_image {
			width: 295upx;
			height: 1upx;
		}

		.score {
			// font-size: 80upx;
			// font-family: 'Bebasneue';
			span {
				font-size: 28upx;
			}
		}

		.buttom {
			font-size: 30upx;
			color: rgb(203, 232, 255);

			span {
				font-size: 28upx;
				color: rbg(168, 217, 255);
			}
		}

		.rate_outer_ring {
			background: url(../../static/page/index/rate_outer_ring.png) no-repeat;
			width: 217upx;
			height: 217upx;
			line-height: 217upx;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.rate_point_ring {
				width: 126px;
				height: 126px;
				background: url(../../static/page/index/rate_point_ring.png) no-repeat center center;
				background-size: 60%;
			}

			.rate_icon {
				background: url(../../static/page/index/rate_icon.png) no-repeat center center;
				width: 126px;
				height: 126px;
				background-size: 60%;
				transform: rotateY(180deg);
			}
		}

	}

	.index_bg {
		flex-wrap: wrap;
		height: 397upx;
		width: 702upx;
		margin: -50px auto 0;
		border-radius: 16upx;
		background: $font-color1;
		box-sizing: border-box;
		padding: 50upx;

		image {
			width: 103upx;
			height: 97upx;
		}

		.text {
			font-size: 26upx;
			color: $font-color9;
			margin-top: -8upx;
			font-family: 'pingfangMedium';
		}
	}

	.notification_reminder_title {
		margin: 36upx auto 20upx;
		width: 95vw;

		.tz {
			font-size: 32upx;
			color: $font-color2;
			font-family: 'pingfangMedium';
		}

		.score {
			width: 34upx;
			height: 34upx;
			line-height: 34upx;
			border-radius: 6upx;
			font-size: 30upx;
			background: $font-color5;
			color: $font-color1;
			text-align: center;
			margin-left: 14upx;
		}

		.more {
			font-size: 32upx;
			color: $font-color6;

			image {
				margin-top: 5upx;
				height: 20px;
				width: 11px;
			}
		}
	}

	.notification_reminder_main {
		background: $font-color1;
		width: 95vw;
		margin: 0 auto 0;
		height: 274upx;
		border-radius: 16upx;
		padding: 30upx 30upx 0 26upx;
		box-sizing: border-box;
		line-height: 50upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		.text {
			font-size: 28upx;
			color: $font-color7;

			span {
				font-size: 28upx;
				color: $font-color8;
				margin-right: 20upx;
			}
			text{
				font-size: 28upx;
				color: rgb(56,56,56);
				font-family: 'pingfangMedium';
			}
		}

		.yuan {
			width: 11upx;
			height: 11upx;
			border-radius: 50%;
			background: rgb(26, 173, 280);
		}

		.xian {
			width: 1upx;
			height: 120upx;
			margin-left: 5upx;
			border-left: 1upx dashed rgb(215, 215, 215);
		}
	}
</style>
