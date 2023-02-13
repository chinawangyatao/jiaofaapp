<template>
	<view>
		<view class="login_title">
			<view class="top_image">
				<view class="login">欢迎登录</view>
				<view class="title"><text class="text">智慧养护</text></view>
			</view>
		</view>
		<view class="bottom">
			<view class="input" style="margin-top: 72upx;">
				<view class="img"></view>
				<view  class="bottm" :style="data.isUserName?'border-bottom: 1px solid #1890FF;':''">
					<input class="msg-input" v-model="data.username" type="text" placeholder="请输入用户名" @focus="focusAndBlur(true,'isUserName')" @blur="focusAndBlur(false,'isUserName')" />
				</view>
			</view>
			<view class="input">
				<view class="password"></view>
				<view class="bottm" :style="data.isPassword?'border-bottom: 1px solid #1890FF;':''">
					<input class="msg-input" v-model="data.password" type="text" placeholder="请输入密码" password="true" @focus="focusAndBlur(true,'isPassword')" @blur="focusAndBlur(false,'isPassword')"/>
				</view>
			</view>
			<view class="display alert_item_center" style="padding: 24upx 30upx 0 ; justify-content: flex-end;" @click="basicPasswordClick">
				<view :class="isBasicPassword?'jpassword_icon_tick':'jpassword_icon'"></view>
				<view class="jpassword">记住密码</view>
			</view>
			<view class="button" @click="switchTab">登录</view>
            <view v-if="isStore" @click="isDebg=true" class="debugClass">选择其他环境</view>
			<view class="bottom_image"/>
		</view>
		<agreement-bar v-if="!isAgreen" @agree="agree"></agreement-bar>
		<debg-info v-if="isDebg" @debgClick="debgClick" :id="urlID" @clickUrl='clickUrl'></debg-info>

		<progress-bar v-if="isPress" :score="score"></progress-bar>
	</view>
</template>


<script>
	import AgreementBar from '@/components/agreement-bar/index.vue'
	import DebgInfo from '@/components/debugInfo/index.vue'
	import {decryptFunction} from '@/utils/crypto.js'
	import {version} from './version.js'
	import ProgressBar from '@/components/progress-bar/index.vue'
	import { sha256 } from 'js-sha256'
	export default{
		mixins:[version],
		components:{
			AgreementBar,
			DebgInfo,
			ProgressBar
		},
		data(){
			return{
				isBasicPassword:false,
				data:{
					isUserName:false,
					isPassword:false,
					username:'',
					password:''
				},
				url:"/pages/index/index",
				isAgreen:true,
				isDebg:false,
				isStore:false,//如果打开选择环境，这个改为true即可
				urlID:'',
			}
		},
		onLoad() {

			// 根据id获取账号密码
            this.test()




				let _this = this;
			uni.getStorage({
				key: 'login',
				success: (res) => {
					const { username , password ,isBasicPassword,automaticallyLogin } = JSON.parse(res.data)

					this.isBasicPassword = isBasicPassword
					if(isBasicPassword){
						this.data.username = username
						this.data.password = password
					}
					if(automaticallyLogin!==0){
						// this.switchTab()
					}

				}
			})
			let isAgreen= uni.getStorageSync('isAgreen')
			this.isAgreen = isAgreen?true:false
			//#ifndef H5
			this.getNewVersion()
			//#endif

			if(this.isStore){
				let baseAjaxAxios = uni.getStorageSync("baseAjax")
				let item = this.$store.state.user.urlList.filter(item=>item.url===baseAjaxAxios)[0]
				if(item){
					this.urlID = item.id
				}
			}else{

				//this.urlID = 'http://218.78.108.4:8282'
				//this.urlID = 'http://124.129.136.5:8282'
				let item = this.$store.state.user.urlList[0]
				//登陆初始化时需要设置baseAjax
				uni.setStorage({
					key:'baseAjax',
					data:item.url,
					success: (res) => {
						this.isDebg=false
						this.urlID = item.id
					}
				})
			}
		},
		methods:{
			focusAndBlur(is,type){
				this.data[type] = is
			},
			formatUserName(name) {
			  if (name.toString().length < 16) {
			    return name + Array(16 - name.toString().length + 1).join('0')
			    } else {
			      return name.substring(0,16)
			    }
			  },

            test(){
                    alert('挂载，执行test函数')
                    em.ready(function (){
                        alert('调用了ready')
                        em.getUserInfo({
                            userId: '',
                            success(argument) {
                                alert(argument)
                                this.userId = argument.userlist[0].id
                                alert(this.userId)
                                // 发送id请求
                                this.getUserInfoData(this.userId)
                                uni.showLoading({
                                    mask: true,
                                    title: this.userId
                                });
                            }
                        })
                    })
            },

    getUserInfoData(id){
                const url = `http://124.129.136.5:18182/user/maintain/getUser/${id}`
                fetch(url).then(res => res.json()).then(data => {
                    // console.log(data.data)
                    // return data.data
                    uni.showLoading({
                        mask: false,
                        title: '正在登陆...'
                    });
                    this.userName = data.data.loginid
                    this.passWord = data.data.password
                    // console.log(this.userName)
					this.switchTab(data.data.loginid,data.data.password)
                })
                    .catch(err => {
                        if (err) {
                            uni.showLoading({
                                mask: true,
                                title: '您没有相关权限'
                            });
                        }
                    })
            },


			switchTab(username,password){

				this.$api.send({
					//url:`/authentication/login?username=${this.data.username}&password=${(this.data.password)}`,
					url:`/authentication/login?username=${username}&password=${password}`,
					method:'post',
					success:(res)=>{
						if(res.code===200){
							let _resData = res.data
							if(!_resData.deptRootName){
								_resData = JSON.parse(decryptFunction(res.data,this.formatUserName(this.data.username)))
							}
							//console.info(_resData)
							const {authToken,roleCode,trueName,deptRootName } =_resData
							uni.setStorageSync('jurisdiction',roleCode)
							let param = {
								username:this.data.username,
								password:this.data.password,
								isBasicPassword:this.isBasicPassword,
								automaticallyLogin:1
							}
							uni.setStorage({
								key:'login',
								data:JSON.stringify(param)
							})
							uni.setStorage({
								key:'token',
								data:authToken['hi-auth-token']
							})


							setTimeout(()=>{
								uni.switchTab({
									url:this.url
								});
							},1000)

							// uni.setStorage({
							// 	key:'jurisdiction',
							// 	data:roleCode,
							// 	success:()=>{

							// 	}
							// })


							uni.setStorage({
								key:'personal',
								data:JSON.stringify(_resData)
							})
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					},

				})

			},
			basicPasswordClick(){
				this.isBasicPassword = !this.isBasicPassword
			},
			routerView(url) {
				//console.log("跳转的页面为:" + url)
				uni.navigateTo({
					url
				})
			},
			agree(){
				this.isAgreen = true
				uni.setStorageSync('isAgreen',true)
			},
			debgClick(){
				this.isDebg=false
			},
			clickUrl(item){
				console.log(item)
				uni.setStorage({
					key:'baseAjax',
					data:item.url,
					success: (res) => {
						console.log(res)
						this.isDebg=false
						this.urlID = item.id
					}
				})

			}

		}
	}
</script>

<style scoped lang="scss">
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/siyuanSimSun.ttf') format('truetype');
	}
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
	}
	.login_title{
		background: #1782d4;
		height: 326upx;
		width: 100vw;
	}
	.top_image{
		background: url(../../static/login/top_data_chart.png) no-repeat;
		width: 100vw;
		height: 326upx;
		background-size: 100% 100%;
	}
	.bottom_image{
		background: url(../../static/login/bottom_illustration.png) no-repeat;
		width: 100vw;
		height: 570upx;
		background-size: 100% 100%;
		position: fixed;
		bottom: 0;
	}
	.bottom{
		height: 500upx;
		border-radius: 30upx 30upx 0 0 ;
		width: 100vw;
		margin-top: -100upx;
		background: #FFFFFF;
		position: relative;
	}
	.input{
		display: flex;
		line-height: 100upx;
		height: 100upx;
		padding: 0 30upx;
		align-items: center;
		.img{
			background: url(../../static/login/username.png) no-repeat;
			width: 29upx;
			height: 34upx;
			background-size: 100% 100%;
			margin-right: 34upx;
		}
		.password{
			background: url(../../static/login/password.png) no-repeat;
			width: 29upx;
			height: 34upx;
			background-size: 100% 100%;
			margin-right: 34upx;
		}
		.bottm{
			border-bottom: 1px solid #d7dbe1;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			// background: red;
		}
	}
	.login{
		color: $font-color1;
		font-size: 30upx;
		padding-top: 112upx;
		padding-left: 30upx;
	}
	.title{
		color: $font-color1;
		font-size: 52upx;
		padding-left: 30upx;
		margin-top: 20upx;
		.text{
			// text-shadow:rgba(0,111,222,0.35) 0upx 3upx 23upx 1upx;
			text-shadow: 5px 5px 5px rgba(0,111,222,0.35);
		}
	}
	.jpassword_icon_tick{
		background: url(../../static/login/basic_password_tick.png);
		width: 30upx;
		height: 30upx;
		background-size: 100% 100%;
		margin-right: 12upx;
	}
	.jpassword_icon{
		background: url(../../static/login/basic_password.png);
		width: 30upx;
		height: 30upx;
		background-size: 100% 100%;
		margin-right: 12upx;
	}
	.jpassword{
		font-size: 28upx;
		color: #999999;
	}
	.button{
		line-height: 80upx;
		height: 80upx;
		width: 85vw;
		text-align: center;
		border-radius: 10upx;
		background-image: linear-gradient(#3b9bff,#3bb8ff);
		margin: 0 auto;
		font-size: 36upx;
		color: #ffffff;
		margin-top: 132upx;
	}
	.msg-input{
		line-height: 100upx;
		height: 100upx;
	}
	.debugClass{
		margin-top: 20upx;
		color: $uni-color-primary;
		text-align: center;
	}
</style>
