<template>
	<view class="container" style="position: absolute;" v-show="showMask" :style="{'z-index':index}">
		<view v-if="dispatchx" class="mask" :style="{'opacity': maskVal}" @click="hide"></view>
		<view class="main" :class="{radios:isRadios}" :style="{transform: `translateY(${transY}rpx)`,'height': height,'position':position,'top':top,'bottom':bottom,'background':background,'z-index':index}"
		 @transitionend="onTransitionend">
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
		props: {
			speed: {
				type: String,
				default: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
			},
			height: {
				type: String,
				default: ''
			},
			maskVal: {
				type: Number,
				default: 0.6
			},
			position: {
				type: String,
				default: 'fixed'
			},
			dispatchx: {
				type: Boolean,
				default: true
			},
			top:{
				type:String,
				default:''
			},
			bottom:{
				type:String,
				default:''
			},
			background:{
				type:String,
				default:'#fff'
			},
			index:{
				type: Number,
				default: 99	
			},
			isRadios:{
				type: Boolean,
				default: true
			},
			isTavBar:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showMask: false,
				transY: this.height,
			}
		},
		methods: {
			show() {
				this.showMask = true
				setTimeout(() => {
					this.transY = 0
				}, 17)

			},
			hide() {
				this.transY = 500
				//不使用显示、隐藏的方式，改为改变index-z
				/* if(this.isTavBar){
					setTimeout(()=>{
						uni.showTabBar()
					},500)
				} */
				
			},
			onTransitionend() {
				if (!this.transY) return;
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
		background-color: rgb(0, 0, 0);
	}

	.main {
		bottom: 0;
		left: 0;
		width: 100vw;		
		transition: transform 0.4s;
		overflow: auto;
	}
	.radios{
		border-radius: 20rpx 20rpx 0 0;
	}
</style>
