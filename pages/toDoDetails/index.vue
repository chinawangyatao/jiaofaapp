<template>
	<view class="header-top-height" style="overflow: hidden;">
		<header-bar :name="'通知详情'"></header-bar>
		<view>
			<main-bar :name="diseaseBy.diseStatus" :fontSize="'30upx'">
				<view style="background: #f6f6f6;padding: 12upx 25upx 24upx">
					<view style="padding-top: 22upx;" class="display" v-for="(item,index) in detailtList" :key="index" v-if="diseaseBy[item.key]">
						<view class="name">{{item.name}}:</view>
						<view class="value">{{diseaseBy[item.key]}}</view>
					</view>
				</view>
			</main-bar>
		</view>
	</view>
</template>

<script>
	import MainBar from '@/components/main-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	export default {
		components: {
			MainBar,
			MainBarInter
		},
		data() {
			return {
				diseaseBy:{},
				detailtList: [{
						name: '名称',
						value: '隧道灭火器 葫芦岛大通 测试测试',
						key: 'diseName'
					},
					{
						name: '位置',
						value: '兴建高速-葫芦岛段',
						key: 'locationDesc'
					},
					{
						name: '现象',
						value: '其他',
						key: 'diseDecs'
					},
					{
						name: '状态',
						value: '待审批',
						key: 'diseStatus'
					},
					{
						name: '病害上报时间',
						value: 'diseSubmitDate',
						key: 'diseSubmitDate'
					},
				],
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id
			if(option.name.indexOf('病害库')>-1){
				this.$api.send({
					url: `/repair/disease/getDiseaseById?id=${option.foreignId}`,
					method: 'get',
					success: (res) => {
						if(res.code===200){
							this.diseaseBy = res.data
						}
					}
				})
			}else{
				// ?id=${option.id}&pushType=${option.pushType}&foreignId=${option.foreignId}
				this.$api.send({
					url: `/repair/matRepair/getMessageDetail`,
					method: 'post',
					data:{
						id:option.id,
						pushType:option.pushType,
						foreignId:option.foreignId
					},
					success: (res) => {
						if(res.code===200){
							this.diseaseBy = res.data.matRepair
							
							this.detailtList=[{
									name: '名称',
									value: '隧道灭火器 葫芦岛大通 测试测试',
									key: 'diseName'
								},
								{
									name: '位置',
									value: '兴建高速-葫芦岛段',
									key: 'locationDesc'
								},
								{
									name: '现象',
									value: '其他',
									key: 'diseDecs'
								},
								{
									name: '状态',
									value: '待审批',
									key: 'status_text'
								},
								{
									name: '病害上报时间',
									value: 'diseSubmitDate',
									key: 'diseSubmitDate'
								},
							]
						}
					}
				})
			}
			
		}
	}
</script>

<style scoped>
	.title {
		font-size: 30upx;
	}
	.name{
		color: #767676;
		font-size: 26upx;
		width: 164upx;
	}
	.value{
		color: #383838;
		font-size: 26upx;
		margin-left: 16upx;
		width: calc(100% - 164upx);
	}
</style>
