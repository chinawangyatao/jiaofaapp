<template>
	<view class="three">
		<view class="zcont space-between" @click="check(item,index)">
			<view class="display alert_item_center">
				<image v-if="item.checkList.length>0" src="../../static/page/diseaseAdd/arrow_right.png" style="width:18upx;height: 18upx;" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
			<image v-if="id===item.id" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
			
		</view>
		<view v-for="(it,i) in item.checkList" :key="it.id" style="padding: 0 0 0 40upx;" v-if="item.isOpen">
			<three-choice-bar :item="it" :index="i" @valueCli="valueCli" :id="id"></three-choice-bar>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ThreeChoiceBar",
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
			id:{ //1 单选 2多选
				type:String,
				default:""
			}
		},
		methods:{
			check(item,index){
				if(item.checkList.length>0){
					item.isOpen = !item.isOpen
				}else{
					this.$emit('valueCli',item)
				}
			},
			valueCli(item){
				this.$emit('valueCli',item)
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
			font-size: 26upx;
			color: rgb(106,106,106);
		}
		
		image {
			margin-left: 20upx;
		}
	}
</style>
