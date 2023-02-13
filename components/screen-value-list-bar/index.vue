<template>
	<view>
		<view class="no-list">
			<view class="del" @click="closeno"><view  class="chahao">×</view></view>
			<view class="cls" v-for="(itme,i) in titleList" :key="i">
				<view style="display: flex; align-items: center; justify-content: space-between;" >
					<text>{{itme}}</text>
				</view>
				<view class="list">
					<view style="display: flex; align-items: center; justify-content: space-between;" class="actions" @click="tapno(item, index,i)" v-for="(item, index) in actionList[i]" :key="index">
						<view :class="{ acc: item.selected }" class="ll">{{ item.title }} 
						<!-- <text>{{item.score}}</text> -->
						</view>
					</view>
				</view>
			</view>
			<view class="btns" style="margin-top: 10upx;">
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
			titleList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			
		},
		methods:{
			tapno(item,index,i){
				console.log(item,index)
				this.$emit('cleck',item,index,i)
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
		border-radius: 12upx 12upx 0upx 0upx;
		// position: absolute;
		// bottom: 0;
		overflow: hidden;
		.del{
			display: flex;
			justify-content: flex-end;
			margin-right: 20upx;
			margin-top: 20upx;
			align-items: center;
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
		min-height: 100upx;
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
		.submit {
			background-color: #3b9bff;
			color: #fff;
			border-radius: 10upx;
		}
	}
</style>
