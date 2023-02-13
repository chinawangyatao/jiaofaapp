<template>
	<view>
		<view class="no-list" :style="'background:'+background">
			<view class="del" @click="closeno">
				<image src="../../static/model-clone.png"></image>
			</view>
			<view class="cls" :class="{clsPadd:isClsPadd}">
				<slot></slot>
			</view>
			<view class="btns">
				<button @click="closeno" class="quxiao" type="primary">取消</button>
				<button @tap.stop="doSearch()" class="submit" type="primary">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			actionList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			title:{
				type:String,
				default:''
			},
			background:{
				type:String,
				default:'#fff'
			},
			isClsPadd:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			tapno(item,index){
				this.$emit('cleck',item,index)
			},
			doSearch(){
				this.$emit('screen')
			},
			closeno(){
				this.$emit('closeno')
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-list {
		width: 100%;
		height: 100%;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		border-radius: 12upx 12upx 0upx 0upx;
		z-index:10;
		// position: absolute;
		// bottom: 0;
		.del{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 24upx 24upx 0 0;
			image{
				height: 36upx;
				width: 36upx;
			}
		}
		.chahao{
			background: $font-color8;
			width: 30upx;
			height: 30upx;
			line-height: 30upx;
			font-size: 25upx;
			color: #FFFFFF;
			text-align: center;
			border-radius: 50%;
		}
	}
	.clsPadd{
			padding: 0 60upx;
	}
	.cls {
	
	
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
	
			.ll {
				text-align: center;
				width: 160upx;
				height: 60upx;
				line-height: 60upx;
				border-radius: 10upx;
				background-color: #eee;
				color: #000;
				margin: 23upx 20upx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
	
			.acc {
				background-color: #3b9bff;
				color: #fff;
			}
		}
	}
	.btns {
		display: flex;
		width: 84%;
		padding: 60upx 8%;
	
		button {
			width: 296upx;
			height: 76upx;
			font-size: 36upx;
			line-height: 76upx;
			border: 2upx solid #3b9bff;
		}
		.storage {
			color: #3b9bff;
			background-color: #fff;
			border-radius: 10upx;
			// position: static;
		}
		.quxiao{
			background-color: #fff;
			color: #3b9bff;
			border-radius: 10upx;
			border: 2upx solid #3b9bff;
		}
		.submit {
			background-color: #3b9bff;
			color: #fff;
			border-radius: 10upx;
			border: 2upx solid #3b9bff;
		}
	}
</style>
