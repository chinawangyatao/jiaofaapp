<template>
	<view class="voice">
		<header-bar :name="title"></header-bar>
		<!-- <screen-bar></screen-bar> -->
		<view style="overflow: hidden;">
			<scroll-view scroll-y style="height:calc(100vh - 300upx)">
				<view  id="zzc_content">
					<view v-for="(item,index) in threeList" :key="index" style="margin-bottom: 20upx;">
						<view  class="zcont space-between" @click="check(item,index)">
							<view class="display alert_item_center">
								<image v-if="item.checkList.length>0" src="../../static/page/diseaseAdd/arrow_right.png" style="width:18upx;height: 18upx;" mode=""></image>
								<text>{{item.name}}</text>
							</view>
							<image v-if="item.isChecked" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
							
						</view>
						<view class="main"  v-if="item.isOpen">
							<view  v-for="(it,i) in item.checkList" :key="i">
								<three-bar :item="it"  :index="i"></three-bar>
							</view>
						</view>
						
					</view>
				</view>				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import ScreenBar from '../screen-bar/index.vue'
	import ThreeBar from '../three-bar/index.vue'
	export default {
		components: {
			ScreenBar,
			ThreeBar
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			threeList:{
				type:Array,
				default:()=>{
					return []
				}
			},
		},
		methods:{
			check(item,index){
				if(item.checkList.length>0){
					this.threeList[index].isOpen = !item.isOpen
				}else{
					item.isChecked = !item.isChecked
					
			
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.voice {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background: #F1F3F3;
		z-index: 99;
		margin-top: 128upx;
		background: $font-color3;
		height: calc(100vh - 128upx);
		overflow: hidden;
	}
	#zzc_content {
		margin-top: 20upx;
		list-style: none;
	
		.zcont {
			width: 702upx;
			margin: 0 auto;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			padding: 20upx 20upx 20upx 0;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			text {
				margin-left: 20upx;
			}
	
			image {
				margin-left: 20upx;
			}
		}
		.main{
			background: rgb(242,244,243); 
			border-radius: 0 0 20upx 20upx;
			box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
			width: 702upx;
			margin: 0 auto;
			padding-left: 50upx;
			box-sizing: border-box;
		}
	}
</style>
