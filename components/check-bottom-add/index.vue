<template>
	<view class="check-bottom">
		<view class="display alert_item_center space-between" style="height: 160upx;">
			<view class="name">{{name}}</view>
			<image src="../../static/page/diseaseAdd/add_disease_location.png" @click="commit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			}
		},
		methods:{
			commit(){
				this.$emit('commit')
			}
		}
	}
</script>

<style scoped lang="scss">
	.check-bottom {
		background: #FFFFFF;
		height: 160upx;
		border-radius: 25upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		padding: 0 36upx;

		.name {
			font-size: 36upx;
			color: rgb(30, 133, 217);
			font-family: 'pingfangMediumBold';
		}

		image {
			width: 80upx;
			height: 80upx;
		}
	}
</style>
