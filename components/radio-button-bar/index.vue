<template>
	<view>
		<view class="voice">
			<header-bar :name="title"></header-bar>
			<view style="margin-top: 20upx;"></view>
			<view :style="!isHide?'height:100upx':'height:78upx'">
				<view class="search-container" v-if="!isHide">
					<screen-bar :text="text"  @screenTrue='screenTrue'></screen-bar>
				</view>
				<view v-else style="margin-bottom: 24upx;">
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
			
			
			<view style="overflow: hidden;"> 
				<scroll-view scroll-y style="height:calc(100vh - 228upx);">
					<view  id="zzc_content" style="margin-top: 10upx;">
						<view style="min-height: 100upx;" v-for="(item, index) in list" :key="index" @tap.stop="getImg(item,index)" v-if="item.id!==''">
							<view class="zcont">
								<text>{{ item.name }}</text>
								<image v-show="item.id===id" v-if="type===1" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
								<image v-show="item.isChecked" v-if="type===2" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
							</view>
							<view>
								<view v-for="(it,i) in item.checkAll" v-if="item.isOpen" :key="i" class="display space-between" style="padding: 20upx 40upx 0" @click.stop="getZ(it,i,index)">
									<view>{{it.name}}</view>
									<image v-show="it.id===id" v-if="type===1" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import ScreenBar from '../screen-bar/index.vue'
	
	export default {
		components: {
			ScreenBar
		},
		data(){
			return {
				searchContent:'',
				canclose:true,
				text:'',
				isHide:false
			}
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			title: {
				type: String,
				default: ''
			},
			id:{
				type:String,
				default:''
			},
			type:{
				type:Number,
				default:1
			}
		},
		watch:{
			text(){
				console.log(this.text)
				this.$emit('textScreen',this.text)
			},
			list:{
				handler(e,ej){
					console.log(e,ej)
				},
				deep: true
			}
		},
		methods:{
			clearKey(){},
			getImg(item,index){
				if(this.type===1){
					this.$emit('getvalue',index,this.title)
				}else{
					this.list[index].isChecked =!item.isChecked
				}
				
			},
			screenTrue(){
				this.isHide=true
			},
			getZ(item,index,i){
				this.$emit('getId',item.id)
				
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
	.bacak{
		background: #FFFFFF;
		margin-bottom: 20upx;
	}
	
	#zzc_content {
		margin-top: 20upx;
		list-style: none;
		background-color: #f1f3f3;
	
		.zcont {
			width: 702upx;
			margin: 0 auto;
			margin-bottom: 24upx;
			border-radius: 16upx;
			background-color: #fff;
			padding: 20upx 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
	
			text {
				margin-left: 20upx;
				font-size: 28upx;
				color: rgb(56,56,56);
			}
	
			image {
				margin-right: 20upx;
			}
		}
	}
	
	.search-container {
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		z-index: 99999;
		background-color: #f2f4f3;
	}
	
	.search-container>.search-input-contaner {
		border: 0;
		width: 702rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 14rpx;
		background-color: #FFFFFF;
	}
	
	.search-top-150 {
		top: 150rpx;
	}
	
	.text-area-opinion {
		min-height: 40rpx;
		background-color: #F1F3F3;
		padding: 0 40rpx;
		font-size: 26rpx;
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
		margin: 24upx auto 24upx;
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
