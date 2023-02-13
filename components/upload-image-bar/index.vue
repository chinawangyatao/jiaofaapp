<template>
	<view :style="{width:width+'upx',height:(width/4*3)+'upx'}" class="display">
		<view v-if="isUpdate">
			<view @click="!isUpdate?'':addImage()" :style="{width:width+'upx',height:(width/4*3)+'upx'}" v-if="this.fileDate.filter(item=>item.modifyType!==2).length<3">
				<view class="imagesbo" :style="{width:width+'upx',height:(width/4*3)+'upx'}">
					<view class="uploads"></view>
				</view>
			</view>
		</view>		
		<view v-for="(item,index) in fileDate" :key="index" class="absible" :style="fileDate.length>=3?'margin-right: 20upx;':'margin-left: 20upx;'">
		<!-- <view v-for="(item,index) in this.fileDate.filter(item=>item.modifyType!==2)" :key="index" class="absible" :style="fileDate.length>=3?'margin-right: 20upx;':'margin-left: 20upx;'"> -->
			<view class="wei" v-if="item.modifyType!==2" :style="{width:width+'upx',height:(width/4*3)+'upx'}">
				<image style="margin-right: 16upx;"
					@click="hideImage(index)" :src="videoUrl(item.fileUrl)"
					:style="{width:width+'upx',height:(width/4*3)+'upx'}"
					></image>
				<image v-if="isUpdate" src="../../static/close.png" class="absoluteDele_video"
					@click="deleteVideoClick(index)">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	import ImageMode from '../image-mode/index.vue'
	import {
		urls,
		api
	} from '../../config/UrlKey.js'
	import {
		keys
	} from '@/config/StorageKey.js'
	export default {

		components: {
			ImageMode
		},
		data() {
			return {
				fileDate: [],
				image: '',
				modelsImage: false,
				top:'0',
				imgs:['https://img0.baidu.com/it/u=3119542616,1165410720&fm=26&fmt=auto']
			}
		},
		props: {
			file: {
				type: Array,
				default: function() {
					return []
				}
			},
			isUpdate: {
				type: Boolean,
				default: false
			},
			width:{
				type:Number,
				default:210
			}
		},
		watch: {
			file: {
				handler() {
					this.fileDate = this.file
					let imgs = []
					if(this.file){
						this.file.map(item=>{
							imgs.push(this.videoUrl(item.fileUrl))
						})
					}
					this.imgs = imgs
				},
				immediate: true
			},
		},
		methods: {
			addImage() {
				let baseAjaxAxios = uni.getStorageSync("baseAjax")
				if (baseAjaxAxios.indexOf('http://apiweibo.lngsyg.cn:9088/wechat-dev/') > -1) {
					baseAjaxAxios = 'http://apiweibo.lngsyg.cn:9088/wechat-dev/up-io/maintain/'
				}
				//console.log(baseAjaxAxios + urls.baseUpload)
				//if(baseAjaxAxios == ''){
					//baseAjaxAxios = 'http://218.78.108.4:8282'
					//baseAjaxAxios = 'http://124.129.136.5:8282'
				//}
				uni.chooseImage({
					count: 3 - this.fileDate.filter(item => item.modifyType !== 2).length,
					success: (res) => {
						let image = []
						const files = res.tempFiles;
						for (let i = 0; i < files.length; i++) {
							let obj = new Object();
							obj.name = 'file' + i;
							obj.uri = files[i].path;
							image.push(obj);
						}
						// console.log({file:image})
						const uploadTask = uni.uploadFile({
							url: baseAjaxAxios + urls.baseUpload,
							files: image,
							// // formData:image,
							header:{ "hi-auth-token":uni.getStorageSync(keys.token)},
							success: (fileDate) => {
								let res = JSON.parse(fileDate.data)
								let data = res.data.map(item => ({
									...item,
									modifyType: 1
								}))
								if (res.code === 200) {
									let fileList = this.fileDate
									this.$emit('updateImage', fileList.concat(data))
								}
							},
							fail: (res) => {
								uni.showToast({
									title: '网络不佳，上传失败!',
									icon: 'none',
									duration: 3000,
								})
							}
						});
					}
				})
			},
			videoUrl(urlreq) {
				let urlsa = urlreq.replace('http://10.60.5.201', urls.zhuahuanImage).replace('http://10.60.5.163', urls
					.zhuahuanImage).replace('http://10.16.101.130', urls.zhuahuanImage)
				return urlsa
			},
			deleteVideoClick(index) {
				this.$emit('deleteVideoClick', index)
			},
			hideImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imgs
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uploads {
		width: 60upx;
		height: 60upx;
		background: url('../../static/add_img_icon.png') space center;
		background-size: 100% 100%;
		// top: 0%;
		// position: relative;
		// left: 0%;
		margin: auto;
	}

	.imagesbo {
		height: 158upx;
		border: 2upx #e6e6e6 dashed;
		border-radius: 4upx;
		background-color: #f2f4f3;
		margin-right: 10upx;
		text-align: center;
		line-height: 158upx;
		display: flex;
		align-items: center;
	}

	.absoluteDele_video {
		position: absolute;
		width: 36upx;
		height: 36upx;
		/* z-index: 9; */
		/* 如果设置为9会出现下滑到保存以下后,仍然有该删除符号 */
		z-index: 0;
		right: -10upx;
		top: -18upx;
	}

	.absible {
		position: relative;
		.wei {
			// height: 158upx; 158-15  
			// width: 210upx;  190  20/4*3
			background-color: #f2f4f3;
			text-align: center;
		}
	}

	.modelsImage {
		position: fixed;
		// top: 632upx;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.25);
		z-index: 99;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
</style>
