<template>
	<view class="startPatrol header-top-height">
		<header-bar :left="true" :name="'修改密码'"></header-bar>
		<view class="content">
			<view class="msg">
				<text class="msg-text">当前密码</text>
				<input class="msg-input" v-model="oldPassword" type="text" placeholder="请输入当前密码" password="true" />
			</view>
			<view class="msg1">
				<view>
					<text class="msg-text">新密码</text>
					<input class="msg-input" v-model="newPassword" type="text" placeholder="请输入当前密码" password="true" />
				</view>
				<view class="confirm">
					<text class="msg-text">确认密码</text>
					<input class="msg-input" v-model="newPassword1" type="text" placeholder="请输入当前密码" password="true" />
				</view>
			</view>
			<!-- <view class="tip"><text>请输入英文加数字组合密码，长度为6-32位</text></view> -->
			<view class="buttoms1" style="margin-top: 200upx;" type="primary" @tap="submit()">确定</view>
		</view>
	</view>
</template>

<script>
	import { sha256 } from 'js-sha256'
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				newPassword1: ''
			}
		},
		methods:{
			submit(){
				const {oldPassword,newPassword,newPassword1} = this
				console.log(oldPassword,newPassword,newPassword1)
				if(!oldPassword && !newPassword && !newPassword1){
					uni.showToast({
						title:'密码不能为空！',
						icon: 'none',
						duration: 3000
					})
					return
				}
				if(newPassword!==newPassword1){
					uni.showToast({
						title:'两次输入的密码不一致！',
						icon: 'none',
						duration: 3000
					})
					return
				}
				this.$api.send({
					url:'/sys-auth/user/change_password',
					method:"post",
					data:{
						oldPassword:sha256(oldPassword),
						newPassword:sha256(newPassword)
					},
					success:(res)=>{
						if(res.code===200){
							uni.showToast({
								title:res.msg,
								icon: 'none',
								duration: 3000
							})
							uni.navigateBack({
							    delta: 1
							});
						}else{
							uni.showToast({
								title:res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.startPatrol {
		overflow: hidden;
	}

	.content {
		margin-top: 24upx;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		.msg {
			font-size: 30upx;
			width: 700upx;
			height: 90upx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 25upx;
		}

		.msg1 {
			font-size: 30upx;
			width: 700upx;
			background-color: #fff;
			padding: 0 25upx;
			margin-top: 16upx;

			view {
				height: 90upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.confirm {
				border-top: 1upx solid #e4e4e4;
			}
		}
	}

	.msg-text {
		color: #000;
	}

	.msg-input {
		text-align: right;
		color: rgb(138, 138, 138);
		width: 560upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;
	}

	.tip {
		width: 700upx;
		padding: 0 25upx;
		margin-top: 10upx;
		font-size: 28upx;
		color: rgb(138, 138, 138);
		text-align: left;
	}

	// .btn {
	// 	width: 600upx;
	// 	height: 75upx;
	// 	font-size: 38upx;
	// 	text-align: center;
	// 	line-height: 75upx;
	// 	margin-top: 200upx;
	// 	background-color: #349fe5;
	// 	border: none;
	// 	color: #fff;
	// 	border-radius: 10upx;
	// }
</style>
