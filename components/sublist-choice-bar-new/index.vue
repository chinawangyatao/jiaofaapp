<template>
	<view class="voice">
		<header-bar :name="title"></header-bar>
		<view style="overflow: hidden;">
			<scroll-view scroll-y style="height:calc(100vh - 240upx)">
				<view  id="zzc_content">
					<view v-for="(item,index) in threeList" :key="index" style="margin-bottom: 24upx;">
						<view class="zcont space-between" :style="item.isOpen ? 'border-bottom-left-radius: 0upx;border-bottom-right-radius: 0upx;' : 'border-bottom-left-radius: 16upx;border-bottom-right-radius: 16upx;'" @click="check(item,index)">
							<view class="display alert_item_center">
								<image v-if="item.checkList.length>0" :style="item.isOpen?'transform: rotate(90deg);':''" src="../../static/page/right_j.png" style="width:13upx;height: 24upx;" mode=""></image>
								<text>{{item.name}}</text>
							</view>
							<image v-if="id===item.id" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
							
						</view>
						<view class="main" v-if="item.isOpen">
							<view  v-for="(it,i) in item.checkList" :key="it.id">
								<SublistChoiceItemNew :item="it"  :index="i" @valueCli="selectItem" :id="ids"></SublistChoiceItemNew>
							</view>
						</view>
						
					</view>
				</view>				
			</scroll-view>
		</view>
		<view style="position: fixed;height: 120upx;width: 100%;bottom: 0;display: flex;justify-content: center;align-items: center;background: #fff;">
			<view class="btn-item" style="color: #fff;background: #1890FF;" @click="addCommit">添加</view>
		</view>
	</view>
</template>

<script>
	import ScreenBar from '../screen-bar/index.vue'
	import SublistChoiceItemNew from '../sublist-choice-item-new/index.vue'
	export default {
		components: {
			ScreenBar,
			SublistChoiceItemNew
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
			id:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				ids: []
			}
		},
		mounted() {
			console.log(this.threeList)
		},
		methods:{
			check(item,index){
				if(item.checkList.length>0){
					this.threeList[index].isOpen = !item.isOpen
				}else{
					this.valueCli(item)
				}
			},
			valueCli(item){
				this.$emit('valueCli',item)
			},
			selectItem(item) {
				if (this.ids.indexOf(item.id) > -1) {
					this.ids.splice(this.ids.indexOf(item.id), 1)
				} else {
					this.ids.push(item.id)
				}
			},
			addCommit() {
				this.$emit('valueCli', this.ids)
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
		margin-top: 40upx;
		list-style: none;
	
		.zcont {
			width: 702upx;
			margin: 0 auto;
			border-top-left-radius: 16upx;
			border-top-right-radius: 16upx;
			background-color: #fff;
			padding: 20upx 20upx 20upx 0;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
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
	.btn-item{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 75upx;
		border-radius: 16upx;
		font-size: 28upx;
	}
</style>
