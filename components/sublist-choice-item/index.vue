<template>
	<view class="three">
		<view class="zcont space-between" @click="check(item,index)">
			<view class="display alert_item_center">
				<image v-if="item.checkList.length>0" src="../../static/page/diseaseAdd/arrow_right.png" style="width:18upx;height: 18upx;" mode=""></image>
				<image v-else :src="id.indexOf(item.id) > -1 ? '../../static/page/accIconClick.png':'../../static/page/accIconDefault.png'" style="width: 25upx;height: 25upx;"></image>
				<view>
					<text>{{item.serviceMeaSubNo}}</text>
					<view style="display: flex;justify-content: space-between;color: #767676;">
						<text style="width: 400upx;">{{ item.name }}</text>
						<text>{{ item.serviceMeaSubUint }}</text>
					</view>
				</view>
			</view>
			
		</view>
		<view v-for="(it,i) in item.checkList" :key="it.id" style="padding: 0 0 0 40upx;" v-if="item.isOpen">
			<sub-list-item :item="it" :index="i" @valueCli="valueCli" :id="id"></sub-list-item>
		</view>
	</view>
</template>

<script>
	export default {
		name:"SubListItem",
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
				type:Array,
				default:[]
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
		background-color: #fff;
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
