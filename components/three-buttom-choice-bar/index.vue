<template>
	<view class="voice">
		<header-bar :name="title"></header-bar>
		<view :style="!isHide?'margin-top: 20upx;':'margin-top: 40upx;'"></view>
		<view v-if="isHidden" :style="!isHide?'height:100upx':'height:80upx'">
			<view class="search-container" style="height: 30upx;" v-if="!isHide">
				<screen-bar :text="text"  @screenTrue='screenTrue'></screen-bar>
			</view>
			<view v-else >
				<view class="screen_bg">
					<view class="icon"></view>
					<input
						class="title-bar-search-box-input"
						:focus="false"
						confirm-type="search"
						v-model="text"
						placeholder="请输入关键字"
						:adjust-position="false"
						@blur="isHide=false"
					/>
					<view v-show="text" class="delete" @click="deleteClcik"></view>
				</view>
			</view>
		</view>	
		
		<view style="overflow: hidden;" :style="!isHidden?'margin-top: 40upx;':'margin-top: 10upx;'">
			<scroll-view scroll-y style="height:calc(100vh - 138upx)">
				<view  id="zzc_content">
					<view v-for="(item,index) in threeList" :key="index" style="margin-bottom: 24upx;" class="box">
						<view  class="zcont space-between" @click="check(item,index)" :style="item.isOpen?'border-radius: 16upx 16upx 0 0;':'border-radius: 16upx;'">
							<view class="display alert_item_center">
								<image v-if="item.checkList.length>0" :style="item.isOpen?'transform: rotate(90deg);':''" src="../../static/page/right_j.png" style="width:13upx;height: 24upx;" mode=""></image>
								<text>{{item.name}}</text>
							</view>
							<image v-if="id===item.id" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
							
						</view>
						<view class="main"  v-if="item.isOpen">
							<view  v-for="(it,i) in item.checkList" :key="it.id">
								<three-choice-bar :item="it"  :index="i" @valueCli="valueCli" :id="id"></three-choice-bar>
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
	import ThreeChoiceBar from '../three-choice-bar/index.vue'
	export default {
		components: {
			ScreenBar,
			ThreeChoiceBar
		},
		data(){
			return {
				isHide:false,
				text:''
			}
		},
		watch:{
			text(){
				console.log(this.text)
				this.$emit('textScreen',this.text)
			},
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
			},
			isHidden:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			check(item,index){
				if(item.checkList.length>0){
					console.log(this.threeList)
					this.threeList.map(item=>item.isOpen=false)
					this.threeList[index].isOpen = !item.isOpen
				}else{
					this.valueCli(item)
				}
			},
			valueCli(item){
				this.$emit('valueCli',item)
			},
			screenTrue(){
				this.isHide=true
			},
			deleteClcik(){
				this.text=''
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
	.box{
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		width: 702upx;
		margin: 0 auto;
	}
	#zzc_content {
		// margin-top: 20upx;
		list-style: none;
	
		.zcont {
			width: 702upx;
			margin: 0 auto;
			border-radius: 16upx;
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
			// box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
			width: 702upx;
			margin: 0 auto;
			padding-left: 50upx;
			box-sizing: border-box;
		}
	}
	.title-bar-search-box-input {
		width: 702rpx;
		font-size: 30rpx;
	}
	.screen_bg{
		background: #ffffff;
		display: flex;
		align-items: center;
		height: 60upx;
		border-radius: 10upx;
		padding: 0 20upx 0 10upx;
		margin: 24upx auto 0;
		width: 702upx;
		box-sizing: border-box;
		
		.icon{
			background: url(../../static/screen/search.png) no-repeat;
			background-size: 100% 100%;
			width: 28upx;
			height: 28upx;
		}
		.delete{
			background: url(../../static/screen/removeorder.png);
			background-size: 100% 100%;
			height: 28upx;
			width: 28upx;
		}
	}
</style>
