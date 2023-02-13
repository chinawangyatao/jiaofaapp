<template>
	<view class="press">
		<view class="bg">
			<progress :percent="score" show-info stroke-width="3"></progress>
		</view>
	</view>
</template>


<script>
	export default {
		props: {
			score: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped lang="scss">
	.press {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		top: 0;
		left: 0;
	}

	.bg {
		background: #FFFFFF;
		margin-top: 40vw;
	}
</style>
