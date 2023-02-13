<template>
	<view class="voice">
		<header-bar :name="title"></header-bar>
		<!-- <screen-bar></screen-bar> -->
		<view style="overflow: hidden;">
			<scroll-view scroll-y style="height:calc(100vh - 300upx)">
				<view  id="zzc_content">
					<view v-for="(item,index) in threeList" :key="index" style="margin-bottom: 20upx;">
						<view  class="zcont space-between" :style="item.isOpen ? 'border-bottom: 1upx solid rgb(242,244,243);' : 'border-bottom: none;'" @click="check(item,index)">
							<view class="display alert_item_center">
								<image v-if="item.checkList.length > 0" src="../../static/page/diseaseAdd/arrow_right.png" :class="item.isOpen ? 'item-open' : 'item-default'"></image>
								<text>{{item.name}}</text>
							</view>
							<image v-if="id===item.id" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
							
						</view>
						<view class="main"  v-if="item.isOpen">
							<view  v-for="(it,i) in item.checkList" :key="it.id" style="border-bottom: 1upx solid rgb(242,244,243);">
								<sub-list-item :item="it"  :index="i" @valueCli="selectItem" :id="ids"></sub-list-item>
							</view>
						</view>
						
					</view>
				</view>				
			</scroll-view>
		</view>
		<view style="margin-top: 20upx;display: flex;justify-content: flex-end;margin-right: 20upx;">
			<view class="btn-item" style="border: 1px solid #3695e2;color: #1890FF;" @click="addCommit">添加</view>
		</view>
	</view>
</template>

<script>
	import ScreenBar from '../screen-bar/index.vue'
	import SubListItem from '../sublist-choice-item/index.vue'
	export default {
		components: {
			ScreenBar,
			SubListItem
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
	.item-open{
		width: 18upx;
		height: 18upx;
		transform: rotate(90deg);
	}
	.item-default{
		width: 18upx;
		height: 18upx;
	}
	.voice {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background: #F1F3F3;
		z-index: 99;
		margin-top: 160upx;
		background: $font-color3;
		height: calc(100vh - 160upx);
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
			background: #fff; 
			border-radius: 0 0 20upx 20upx;
			box-shadow: 10upx 10upx 5upx rgba(0, 0, 0, 0.1);
			width: 702upx;
			margin: 0 auto;
			// padding-left: 50upx;
			box-sizing: border-box;
		}
	}
	.btn-item{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120upx;
		height: 50upx;
		border-radius: 8upx;
		font-size: 28upx;
	}
</style>
