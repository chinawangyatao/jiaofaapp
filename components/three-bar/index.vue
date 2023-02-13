<template>
	<view class="three">
		<view class="zcont space-between" @click="check(item,index)">
			<view class="display alert_item_center">
				<image v-if="item.checkList.length>0" src="../../static/page/diseaseAdd/arrow_right.png" style="width:18upx;height: 18upx;" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
			<image v-if="item.isChecked" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
			
		</view>
		<view v-for="(it,i) in item.checkList" :key="i" style="padding: 0 0 0 40upx;" v-if="item.isOpen">
			<three-bar :item="it" :index="i"></three-bar>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ThreeBar",
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			index:{
				type:Number,
				default:0
			},
			type:{ //1 单选 2多选
				type:Number,
				default:1
			}
		},
		methods:{
			check(item,index){
				if(item.checkList.length>0){
					item.isOpen = !item.isOpen
				}else{
					item.isChecked = !item.isChecked	
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.three{
		// width: 702upx;
		margin: 0 auto;
	}
	.zcont {
		// width: 702upx;
		margin: 0 auto;
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
</style>
