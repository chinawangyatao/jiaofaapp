<template>
	<view class="header-top-height" style="overflow: hidden;">
		<header-bar :left="true" :name="name"></header-bar>
		<main-bar :name="'巡查信息'" :paddingHidden="false" >
			<main-bar-inter :name="'巡查内容'" :isDis='true' :isDisBottom="false">
				<view class="screen" @click="screen" :style="text===''?'color:#B3B3B3':''"> 
					{{text===''?'请输入巡查内容':text}}
				</view>
			</main-bar-inter>
			
			<view class="paddingLeft" style="padding-bottom: 24upx;">
				<view class="file">照片</view>
				<upload-image-bar :isUpdate="true" :file='form.file' @updateImage="updateImage"></upload-image-bar>
			</view>
		</main-bar>
		
		
		
		<view class="botton-bg bottomFielx">
			<view class="buttoms1 " @click="commit">
				结束巡查
			</view>
		</view>
		<voice-bar ref="voice" :name="'巡查内容'" v-if="isVoiceBar" :text="text" @input='input'></voice-bar>
	</view>
</template>

<script>
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import MainBar from '@/components/main-bar/index.vue'
	import VoiceBar from '@/components/voice-bar/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	export default {
		components: {
			MainBar,
			VoiceBar,
			uploadImageBar,
			MainBarInter
		},
		data() {
			return {
				isVoiceBar: false,
				text: "",
				id:'',
				name:'结束巡查',
				form: {
					file: []
				}
			}
		},
		watch: {
			text(up, u) {
				console.log(up, u)
			}
		},
		onLoad(option){
			this.id=option.id
			this.name=option.title
		},
		methods: {
			screen() {
				this.isVoiceBar = true

			},
			input(value) {
				this.text = value
			},
			updateImage(imageArr) {
				this.form.file = imageArr
			},
			commit(){
				this.$api.send({
					url:'/inspect/task/endTask',
					method:'post',
					data:{
						enclosures:this.form.file,
						inspectContent:this.text,
						id:this.id
					},
					success:(res)=>{
						console.log(res)
						if(res.code===200){
							uni.showToast({
								title:'本次巡查结束',
								icon: 'none',
								duration: 3000
							})
							
							setTimeout(()=>{
								uni.switchTab({
								    url: '/pages/index/index'
								});
							},1000)
							
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
		},
		onBackPress() {
			if (this.isVoiceBar) {
				this.isVoiceBar = false
				console.log(this.$refs.voice.text)
				return true
			}

		},
	}
</script>


<style lang="scss">
	.screen {
		width: 100%;
		margin: -10px auto 0;
		height: 500upx;
		background: #FFFFFF;
		border-radius: 16upx;
	}

	.buttom {
		margin: 0 auto;
		width: 94vw;
		background: $uni-color-primary;
		text-align: center;
		line-height: 80upx;
		border-radius: 20upx;
		color: #ffffff;
	}
</style>
