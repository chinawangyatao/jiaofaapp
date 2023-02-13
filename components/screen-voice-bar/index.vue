<template>
	<view class="voice">
		<view class="bar">
			<view class="display alert_item_center space-between">
				<view class="input_z display alert_item_center">
					<image src="../../static/search.png"></image>
					<input type="text" @keyboardheightchange="keyboardheightchange" focus @blur="blur" auto-blur="true" placeholder="请输入关键字" :value="text" @input="input" />
					<view v-show="text.length>0" @click="clear" class="uni-icon uni-icon-clear" style="position: absolute;right: 140upx;"></view>
				</view>
				<view class="text" @click="exit">搜索</view>
			</view>
		</view>
		<view v-if="isHeight" :style="isHeight?'margin-top: 43vh;':'margin-top: 70vh;'" @touchstart="video" @touchend="hide">
			<view class="video">
				<view>
					<view class="icon—fal" v-if="isVoice">
						<image src='../../static/page/voice/yy2.png'></image>
					</view>
					<view class="icon—true" v-else>
						<image src='../../static/page/voice/yy.png'></image>
					</view>
				</view>
			</view>
			<view style="text-align: center;" class="voice-btn-txt">按住说话</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVoice: false,
				value: '',
				isHeight:true,
			}
		},
		props: {
			text:{
				type:String,
				default:''
			}
		},
		methods: {
			video() {
				this.isVoice = true
				let options = {
					continue: true,
					engine: 'baidu',
					lang: 'zh-cn',
					punctuation: true,

				}
				//#ifndef H5
				plus.speech.startRecognize(options,
					(res) => {
						console.log(res)
						this.text = this.text + res
						this.isVoice = false
						this.inputVal()
						plus.speech.stopRecognize();
					},
					(res) => {
						this.isVoice = false
						plus.speech.stopRecognize();
					}
				)
				//#endif
			},
			hide() {
				this.isVoice = false
			},
			input(e){
				this.value = e.target.value
				this.$emit('input',this.value)
			},
			inputVal(){
				this.value=this.text
				this.$emit('input',this.value)
			},
			exit(){
				// this.text=""
				this.value=this.text
				this.$emit('inputUpvoice')
			},
			blur(){
			},
			keyboardheightchange(obj){
				if(obj.detail.height===0){
					this.isHeight=false
				}else{
					this.isHeight=true
				}
			},
			clear(){
				this.$emit('clearKey')
				/* this.value=this.text */				
			}
		}
	}
</script>

<style scoped lang="scss">
	.voice {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background: #F1F3F3;
		z-index: 99;

		.bar {
			box-sizing: border-box;
			background: url(../../static/header-bg.png) no-repeat;
			height: 128upx;
			width: 100vw;
			padding: 67rpx 24rpx 20rpx;
			box-sizing: border-box;
			height: 146upx;
			display: flex;
			justify-content: space-between;
			.input_z {
				background: #FFFFFF;
				border-radius: 12upx;
				width: 80vw;
				margin-right: 20upx;
				input{
					height: 60upx;
					margin-right: 20upx;
				}
				image {
					width: 30upx;
					height: 30upx;
					margin: 0 10upx;
				}
			}

			.text {
				color: #FFFFFF;
			}
		}
	}

	.video {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon—fal {
		background: #1C82D4;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;

		image {
			width: 40upx;
			height: 56upx;
		}
	}

	.icon—true {
		background: #FFFFFF;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;

		image {
			width: 40upx;
			height: 56upx;
		}
	}

	.voice-btn-txt {
		font-size: 30rpx;
		margin-top: 12rpx;
		color: #B3B3B3;
	}
	.textarea {
		border: 1px solid #CCCCCC;
		background: #FFFFFF;
		width: 95vw;
		height: 50vh;
		margin: 30upx auto 15vh;
		border-radius: 16upx;
	}
</style>
