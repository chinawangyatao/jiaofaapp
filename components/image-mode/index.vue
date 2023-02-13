<template>
	<view class="container" v-show="showMask">
		<view class="mask" :style="{'opacity': maskVal}" @click="hide">
			
		</view>
		<view class="main" :style="{transform: `translateY(${transY}rpx)`,'transition-timing-function': speed,'height': height,'width':width,'bottom':bottom,'left':left,'border-radius':radius,}" @transitionend="onTransitionend">
			<slot></slot>
		</view>
	</view>
</template>

<script> 
	export default {
		/**
		 *  @ speed [String] {运动曲线}
		 *  @ height [Number] {弹框高度 单位：rpx}
		 *  @ maskVal [Number] {蒙层透明度}
		 */
		props:{
			speed:{
				type:String,
				default: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
			},
			height: {
				type:String,
				default: '500rpx'
			},
			maskVal:{
				type: Number,
				default: 0.4
			},
			width:{
				type:String,
				default: '100vw'
			},
			bottom:{
				type:String,
				default: '40vh'
			},
			left:{
				type:String,
				default: '0'
			},
			radius:{
				type:String,
				default: '0'
			},
			background:{
				type:String,
				default: '#000000'
			}
		},
		data () {
			return {
				showMask: false,
				transY: this.height
			}
		},
		methods: {
			show (isDis) {
				this.showMask = isDis
				setTimeout(() => {
					this.transY = 0
				},17)
				
			},
			hide () {
				this.transY = 500
			},
			onTransitionend () {
				if(!this.transY) return;
				this.showMask = false
			}
		}
	}
</script>

<style scoped lang="scss">
.mask {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgb(0,0,0);
}

.main {
	position: fixed;
	// background-color: #FFFFFF;
	border-radius: 0rpx 0rpx 0 0;
	transition: transform 0.4s;
	top: 10vh;
	z-index: 9999;
}
.container{
	z-index: 99;
	position: absolute;
}
</style>
