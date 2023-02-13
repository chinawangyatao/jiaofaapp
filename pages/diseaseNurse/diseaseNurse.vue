<!-- 病害维修列表 -->
<template>
	<view class="index-wrap">
				<tabs-bar @tavbar="tavbar" :title="name" :tabs="tabs" :tabsValue="tabsValue" @screen="screen"></tabs-bar>
				<screen-bar @screenTrue='screenTrue' :text="text" :searchTip="'病害名称、位置、工单编号'"></screen-bar>
				<n-transition ref='tk'>
					<screen-value-bar  @closeno="closeno" :actionList='actions' @cleck="cleck" @screen="screenSearch" :title="'维修状态'"></screen-value-bar>
				</n-transition>
				<screen-voice-bar :text='this.text' v-if="isVoice" @inputUpvoice='inputUpvoice' @input='input'  @clearKey="clearKey"></screen-voice-bar>
				<view style="margin-top: 120upx;">
					<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 400upx);">
						<view class="list-item" v-for="item in showList" @click='clickItem(item)'>
							<view style="display: flex;align-items: center;">
								<view class="item-state-wrap" :class="item.class">
									{{formatStatus(item.status)}}
								</view>
								<view style="width: 540upx;margin-left: 10upx;font-family: 'pingfangMediumBold';font-size: 30upx;">{{item.diseName}}</view>
							</view>
							<view class="des-wrap">
								<view class="des-item">
									<text class="des-item-txt">完成期限:</text>
									<view style="margin-left: 16upx;">{{item.planDoneDate}}</view>
								</view>
								<view class="des-item">
									<text class="des-item-txt">病害类型:</text>
									<view style="margin-left: 16upx;">{{item.diseasetypeName}}</view>
								</view>
							</view>
						</view>
						<view  v-if="errorStatus == 'noData'" style="display: flex;flex-direction: column;align-items: center;padding-top: 258upx;">
							<text style="font-size: 32upx;color: #666666;">没有找到相关数据</text>
						</view>
					</scroll-view>
				</view>
	</view>
</template>

<script>
	import {
		ref
	} from 'vue'
	import NTransition from '@/components/n-transition/n-transition.vue'
	import ScreenBar from '@/components/screen-bar/index.vue'
	import TabsBar from '@/components/tabs-bar/index.vue'
	import ScreenValueBar from '@/components/screen-value-bar/index.vue'
	import ScreenVoiceBar from '@/components/screen-voice-bar/index.vue'
	import request from '@/utils/Request.js';
	import {jurisdictionList} from '@/utils/jurisdictionUtils'
	export default {
		components: {
			NTransition,
			ScreenBar,
			TabsBar,
			ScreenValueBar,
			ScreenVoiceBar
		},
		data(){
			return {
				errorStatus: null,
				name:'护理维修',
				actions: [],
				tabs: [{
						id: 1,
						name: '全部1111'
					},
					{
						id: 2,
						name: '待办1111'
					},
				],
				tabsValue: 2,
				listData: [
				],
				showList: [],
				isVoice: false,
				text:"",
				personOne: true,
				personString: 'yf001',
				userRoleCode: '',
				selectValues: [],
				pageNo: 1,
				pageSize: 20,
				totalNum: 0,
			}
		},
		watch: {
			tabsValue:{
				handler(newVal, oldVal) {
					if (newVal === 2) {
						this.actions = this.personOne ? [{
							title: '未开始',
							selected: false,
							value: '1'
						}, {
							title: '维修中',
							selected: false,
							value: '2'
						}, {
							title: '整改中',
							selected: false,
							value: '4'
						}] : [{
							title: '待验收',
							selected: false,
							value: '3'
						}]
					} else {
						this.actions = [{
							title: '未开始',
							selected: false,
							value: '1'
						}, {
							title: '维修中',
							selected: false,
							value: '2'
						}, {
							title: '整改中',
							selected: false,
							value: '4'
						}, {
							title: '待验收',
							selected: false,
							value: '3'
						}, {
							title: '已完成',
							selected: false,
							value: '5'
						}]
					}
				},
				deep: true
			}
		},
		mounted() {
		},
		onLoad() {
			this.userRoleCode = uni.getStorageSync("jurisdiction")
			this.personOne = uni.getStorageSync("jurisdiction")===jurisdictionList[2]			
			this.personString = uni.getStorageSync("jurisdiction")===jurisdictionList[2] ? 'yf001' : 'jf001'
			//首先展示待办，过滤条件需要初始化
			this.actions = this.personOne ? [{
				title: '未开始',
				selected: false,
				value: '1'
			}, {
				title: '维修中',
				selected: false,
				value: '2'
			}, {
				title: '整改中',
				selected: false,
				value: '4'
			}] : [{
				title: '待验收',
				selected: false,
				value: '3'
			}]
			//onLoad和onShow都有后台请求接口的方法注释掉了一个
			//this.getListData(this.pageNo, this.pageSize, {flag: '0', searchContent: '', user: this.personString,userRoleCode: this.userRoleCode})
			
		},
		onShow() {
			this.pageNo = 1
			this.pageSize = 20
			this.getListData(this.pageNo, this.pageSize, {flag: (this.tabsValue - 1).toString(), status: this.selectValues.join(','), searchContent: '', user: this.personString,userRoleCode: this.userRoleCode})
		},
		methods:{
			getListData(pageNo, pageSize, params) {
			    let _this = this
			    _this.$api.send({
			         url: `/repair/matRepair/pageList?pageNo=${pageNo}&pageSize=${pageSize}`,
			         method: 'post',
			         data: params,
			         success:(res)=>{
			          console.log(res,"+++++++++++++")
			    	  _this.listData = res.data.list
					  _this.totalNum = res.data.total
			    		_this.listData.map(item => {
			    			switch(item.status) {
			    				case '1':
			    					_this.$set(item, 'class', 'item-no-start')
			    					_this.$set(item, 'state', '未开始')
			    				break;
			    				case '2':
			    					_this.$set(item, 'class', 'item-in-repair')
			    					_this.$set(item, 'state', '维修中')
			    				break;
			    				case '4':
			    					_this.$set(item, 'class', 'item-in-rectify')
			    					_this.$set(item, 'state', '整改中')
			    				break;
			    				case '3':
									_this.$set(item, 'class', 'item-no-accept')
									_this.$set(item, 'state', '待验收')
								break;
								case '7':
									_this.$set(item, 'class', 'item-no-accept0')
									_this.$set(item, 'state', '监理验收')
								break;
								case '8':
									_this.$set(item, 'class', 'item-no-accept1')
									_this.$set(item, 'state', '验收审核')
								break;
								case '9':
			    					_this.$set(item, 'class', 'item-no-accept2')
			    					_this.$set(item, 'state', '验收审批')
			    				break;
			    				case '5':
			    					_this.$set(item, 'class', 'item-complate')
			    					_this.$set(item, 'state', '已完成')
			    				break;
			    			}
			    		})
			    		_this.showList = JSON.parse(JSON.stringify(_this.listData))
						
						//初始化没有数据的情况
						if (_this.listData && _this.listData.length > 0) {							
							this.errorStatus = null;	
						} else {
							this.errorStatus = 'noData';					
						}
						//
						
			         },
			         fail:(res)=>{
			          console.log(res,"+++++++++++++++++++++++++++++")
			         }
			    })
			},
			formatStatus(status) {
				let _status = ''
				switch(status) {
					case '1':
					_status = '未开始'
					break;
					case '2':
					_status = '维修中'
					break;
					case '3':
					_status = '待验收'
					break;
					case '7':
					_status = '监理验收'
					break;
					case '8':
					_status = '验收审核'
					break;
					case '9':
					_status = '验收审批'
					break;
					case '4':
					_status = '整改中'
					break;
					case '5':
					_status = '已完成'
					break;
				}
				return _status
			},
			tavbar(id) {
				this.text = ''
				this.selectValues = []
				this.tabsValue = id
				this.pageNo = 1
				this.getListData(this.pageNo, this.pageSize, {flag: (id - 1).toString(), status: '', searchContent: '', user: this.personString,userRoleCode: this.userRoleCode})
			},
			screen() {
				this.$refs.tk.show()
			},
			screenSearch() {
				this.$refs.tk.hide()
				let _value = []
				this.actions.map(item => {
					if (item.selected) {
						_value.push(item.value)
					}
				})
				this.pageNo = 1
				this.selectValues = _value
				this.getListData(this.pageNo, this.pageSize, {flag: (this.tabsValue - 1).toString(), status: _value.join(','), searchContent: '', user: this.personString,userRoleCode: this.userRoleCode})
			},
			closeno() {
				this.$refs.tk.hide()
			},
			cleck(item, index) {
				this.actions[index].selected = !item.selected
			},
			screenTrue() {
				this.isVoice = true
			},
			scrolltolower() {
				if (this.pageNo * this.pageSize < this.totalNum) {
					this.pageNo = this.pageNo + 1
					let _this = this
					_this.$api.send({
					     url: `/repair/matRepair/pageList?pageNo=${_this.pageNo}&pageSize=${_this.pageSize}`,
					     method: 'post',
					     data: {flag: (_this.tabsValue - 1).toString(), status: _this.selectValues.join(','), searchContent: '', user: this.personString,userRoleCode: this.userRoleCode},
					     success:(res)=>{
							console.log(res,"+++++++++++++")
							let _resList = res.data.list
							_resList.map(item => {
								switch(item.status) {
									case '1':
										_this.$set(item, 'class', 'item-no-start')
										_this.$set(item, 'state', '未开始')
									break;
									case '2':
										_this.$set(item, 'class', 'item-in-repair')
										_this.$set(item, 'state', '维修中')
									break;
									case '4':
										_this.$set(item, 'class', 'item-in-rectify')
										_this.$set(item, 'state', '整改中')
									break;
									case '3':
										_this.$set(item, 'class', 'item-no-accept')
										_this.$set(item, 'state', '待验收')
									break;
									case '7':
										_this.$set(item, 'class', 'item-no-accept0')
										_this.$set(item, 'state', '监理验收')
									break;
									case '8':
										_this.$set(item, 'class', 'item-no-accept1')
										_this.$set(item, 'state', '验收审核')
									break;
									case '9':
										_this.$set(item, 'class', 'item-no-accept2')
										_this.$set(item, 'state', '验收审批')
									break;
									case '5':
										_this.$set(item, 'class', 'item-complate')
										_this.$set(item, 'state', '已完成')
									break;
								}
								_this.listData.push(item)
							})
							_this.showList = JSON.parse(JSON.stringify(_this.listData))
					     },
					     fail:(res)=>{
					      console.log(res,"+++++++++++++++++++++++++++++")
					     }
					})
				} else {
				}
			},
			clickItem(item) {
				//console.log(item)
				//this.personOne
				if (this.userRoleCode===jurisdictionList[2]) {//乙方
					if (item.status === '1' || item.status === '2') {
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairDetaile?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '4') {
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairDetaileRectify?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '3' || item.status === '7' || item.status === '8' || item.status === '9' || item.status === '5') {
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairDetaileFinish?item=' + encodeURIComponent(JSON.stringify(item))})
					}
				} else {//甲方
					if (item.status === '1' || item.status === '2' || item.status === '4') {
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairPartyDetaile?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '3' || (this.userRoleCode===jurisdictionList[3] && item.status === '7') //监理
						|| (this.userRoleCode===jurisdictionList[1] && item.status === '8') //工程师
						|| (this.userRoleCode===jurisdictionList[0] && item.status === '9')) {//科长
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairPartyDetaileRectify?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '7' || item.status === '8' || item.status === '9') {
						//uni.navigateTo({url: '/pages/diseaseRepairPartyDetaileRectify/index?item=' + encodeURIComponent(JSON.stringify(item))})
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairDetaileFinish?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '5') {
						uni.navigateTo({url: '/pages/diseaseNurse/diseaseRepairDetaileFinish?item=' + encodeURIComponent(JSON.stringify(item))})
					}
				}
			},
			tavbarDetaile(id) {
					this.detaileTabsValue = id
			},
			inputUpvoice() {//点取消按钮
				this.isVoice = false
				this.getListData(this.pageNo, this.pageSize, {flag: (this.tabsValue - 1).toString(), status: this.selectValues.join(','), searchContent: this.text, user: this.personString,userRoleCode: this.userRoleCode})
			},
			clearKey() {//点清空按钮，查询时再赋值，所以不需要给searchContent赋值
				this.text = ""
			},
			input(value) {
				console.log(value)
				this.text = value
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-wrap{
		background: $font-color3;
		height: 100vh;
		overflow: hidden;
	}
	.list-item{
		margin: 16upx 30upx;
		padding: 26upx 24upx;
		border-radius: 12upx;
		background-color: #fff;
		position: relative;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
	}
	.item-state-wrap{
		display: inline-block;
		align-items: center;
		justify-content: center;
		width: 110upx;
		height: 34upx;
		border-radius: 4upx;
		color: #ffffff;
		font-size: 24upx;
		text-align: center;
	}
	.item-no-start{
		background-color: #14c0bf;
	}
	.item-in-repair{
		background-color: #3696e2;
	}
	.item-in-rectify{
		background-color: #e18417;
	}
	.item-no-accept{
		background-color: #f34648;
	}
	.item-no-accept0{
		background-color: rgb(228, 131, 26);
	}
	.item-no-accept1{
		background-color: rgb(175, 29, 90);
	}
	.item-no-accept2{
		background-color: rgb(241, 71, 71);
	}			
					
	.item-complate{
		background-color: #b4b4b4;
	}
	.des-wrap{
		margin-top: 22upx;
		.des-item{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			line-height: 32upx;
			margin-top: 10upx;
			view {
				font-size: 24upx;
				color: #383838;
				font-weight: normal;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.des-item-txt{
				font-size: 24upx;
				color: #767676;
				// width: 125upx;
			}
		}
	}
</style>
