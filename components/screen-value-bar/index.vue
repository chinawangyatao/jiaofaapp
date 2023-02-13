<template>
	<view>
		<view class="no-list">
			<view class="del" @click="closeno">
				<image src="../../static/model-clone.png"></image>
			</view>
			<view class="cls">
				<view style="display: flex; align-items: center; justify-content: space-between;" >
					<text>{{title}}</text>
				</view>
				<view class="list">
					<view style="display: flex; align-items: center; justify-content: space-between;" class="actions" @click="tapno(item, index)" v-for="(item, index) in actionList" :key="index">
						<view :class="{ acc: item.selected }" class="ll">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<view class="btns" style="margin-top: 40upx;">
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
			
		},
		methods:{
			tapno(item,index){
				console.log(item,index)
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
		background-color: #fff;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		.del{
			display: flex;
			justify-content: flex-end;
			padding: 24upx 24upx 0 0;
			align-items: center;
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
	.cls {
		padding: 0 60upx;
	
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
				margin: 45upx 45upx 0 0;
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
