<template>
	<view class="startPatrol header-top-height">
		<header-bar :left="true" :name="'管段信息'"></header-bar>
		<view class="bgs">
			<view class="bg" v-for="(item,index) in dataList" :key="item.id">
				{{item.sectionManageName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				dataList:[]
			}
		},
		onLoad(){
			this.$api.send({
				url:'/maintenance/section_manage/getSectionManage',
				method:'get',
				success:(res)=>{
					if(res.code===200){
						this.dataList = res.data
					}
				},
			})
		}
	}
</script>

<style lang="scss" scoped>
	.startPatrol {
		overflow: hidden;
	}

	.bgs {
		overflow: auto;
		height: calc(100vh - 170upx);
	}

	.bg {
		line-height: 70upx;
		background: #FFFFFF;
		padding-left: 40upx;
		font-size: 30upx;
		width: 702upx;
		height: 80upx;
		line-height:80upx;
		box-sizing: border-box;
		margin: 24upx auto 0;
		border-radius: 16upx;
	}
</style>
