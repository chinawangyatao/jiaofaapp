<template>
	<view class="voice">
		
		<header-bar :name="name"></header-bar>
		
		<view style="margin-top: 172upx;"> 
			<textarea placeholder='请输入内容'  @keyboardheightchange="keyboardheightchange" focus='true' :style="isHeight?'margin-bottom: 9vh;':'margin-bottom: 15vh;'" class="textarea" :value="text"  cursor-spacing="5" @input="input"></textarea>
		</view>
		
		<view  @touchstart="video" @touchend="hide" v-if="isHeight">
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
	export default{
		data(){
			return {
				isVoice:false,
				value:'',
				isHeight:true
			}
		},
		props:{
			text:{
				type:String,
				default:''
			},
			name:{
				type:String,
				default:''
			},
		},
		methods:{
			video(){
				this.isVoice=true
				let options = {
					continue: true,
					engine: 'baidu',
					lang: 'zh-cn',
					punctuation: true,
				
				}
				//#ifndef H5
				plus.speech.startRecognize(options,
					(res) => {
						this.text=this.text+res
						this.isVoice=false
						this.inputVal()
						plus.speech.stopRecognize();
					},
					(res) => {
						plus.speech.stopRecognize();
						this.isVoice=false
					}
				)
				//#endif
			},
			hide(){
				this.isVoice=false
			},
			input(e){
				this.value = e.target.value
				this.$emit('input',this.value)
			},
			inputVal(){
				this.value=this.text
				this.$emit('input',this.value)
			},
			headerUni() {
				uni.navigateBack()
			},
			keyboardheightchange(obj){
				if(obj.detail.height===0){
					this.isHeight=false
				}else{
					this.isHeight=true
				}
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
			background: $uni-color-primary;
			height: 100upx;
			line-height: 100upx;
			width: 100vw;
			padding: 0 20upx;
			image {
				height: 40upx;
				width: 40upx;
			}
		}
	}

	.video {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon—fal{
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
	.textarea{
		border: 1px solid #CCCCCC;
		background: #FFFFFF;
		width: 95vw;
		height: 30vh;
		margin: 30upx auto 0;
		border-radius: 16upx;
	}
	
	.header-bar{
		position :fixed;
		top: 0;
		width: 100vw;
		z-index: 99;
		height: 60upx;
	}
	.headerBar {
		color: $font-color1;
		background: $uni-color-primary;
		text-align: center; 
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 85upx 25upx 25upx 25upx;
	}
	.headerBar image {
		height: 34upx;
		width: 19upx;
	}
</style>
