<template>
	<view class="header-top-height" style=";overflow: hidden;">
		<header-bar :name="'通知提醒'"></header-bar>
		<view style="text-align: center;color: #1C82D4;line-height: 5vh;" @click="batchUpdateIsRead">一键忽略所有提醒</view>
		<view style="height: calc(95vh - 128upx);overflow: auto;">
			<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:100%;">
				<view class="display alert_item_center main space-between"
					v-for="(item,index) in $store.state.message.messageList" :key="index"
					@click="routerView(`/pages/toDoDetails/index?name=${item.messageTitle}&pushType=${item.pushType}&foreignId=${item.foreignId}&id=`+item.id,item.id)">
					<view style="margin-left: 20upx;margin-right: 10upx;">
						<image src="../../static/messages.png"></image>
					</view>
					<view style="margin-right: 10upx;" class="main-z">
						<view style="font-size: 28upx;color: #3b3b3b;font-weight: 700;margin-left: -16upx;">{{item.messageTitle}}</view>
						<view class="text">{{item.messageContext}}</view>
						<view class="span">{{item.remindTime}}</view>
					</view>
					<view class="route">
						<image src="../../static/page/right_j.png"></image>
					</view>
					<view class="dian" v-if="item.isRead==='0'"></view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				pageNo:1
			}
		},
		onLoad() {
			this.pageNo = 1
			this.$store.dispatch('message/getMessageAct',this.pageNo)
		},
		
		methods: {
			routerView(url, id) {
				//console.log("跳转的页面为:" + url)
				this.$api.send({
					url: `/app/message/updateIsRead?id=${id}`,
					method: 'get',
					success: (res) => {
						this.pageNo = 1
						this.$store.dispatch('message/getMessageAct',this.pageNo)
						this.$store.dispatch('message/unreadMessageSum')
						uni.navigateTo({
							url
						})
					}

				})

			},
			batchUpdateIsRead() {
				this.$api.send({
					url: '/app/message/batchUpdateIsRead',
					method: 'get',
					success: res => {
						this.pageNo = 1
						this.$store.dispatch('message/getMessageAct',this.pageNo)
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 3000
						})
						this.$store.dispatch('message/unreadMessageSum')
					}
				})
			},
			scrolltolower(){
				this.pageNo+=1
				this.$store.dispatch('message/getMessageAct',this.pageNo)
			},

		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 95vw;
		margin: 0 auto 20upx;
		background: #FFFFFF;
		border-radius: 16upx;
		padding: 20upx;
		box-sizing: border-box;
		position: relative;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		.main-z {
			width: calc(100% - 180upx);
		}

		.text {
			font-size: 26upx;
			color: #605f65;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 100%;
		}

		.span {
			font-size: 24upx;
			color: #949494;
			margin-right: 20upx;
		}

		image {
			width: 100upx;
			height: 100upx;
		}

		.route {
			image {
				width: 13upx;
				height: 24upx;
			}
		}
		.dian{
			width: 22upx;
			height: 22upx;
			background: red;
			border-radius: 50%;
			position: absolute;
			left: 124upx;
			top: 14upx;
		}
	}
</style>
