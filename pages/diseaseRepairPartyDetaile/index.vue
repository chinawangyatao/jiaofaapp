<template>
	<view class="index-wrap">
		<tabs-bar @tavbar="tavbar" :title="name" :tabs="tabs" :tabsValue="tabsValue" @screen="screen" :right="rightFlag"></tabs-bar>
		<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 250upx);">
			<view v-if="tabsValue === 2">
				<view class="order-state">
					<view class="order-text">
						<text class="des-item-txt">工单状态:</text>
						<view class="state-wrap" :class="detaileData.class">{{detaileData.status_text}}</view>
					</view>
					<view class="order-content">
						<view class="order-content-item">
							<text class="content-item-txt">工单编号:</text>
							<text class="content-item-value">{{itemDetaileData.repairCode}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">病害名称:</text>
							<text class="content-item-value">{{itemDetaileData.diseName}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">病害位置:</text>
							<text class="content-item-value">{{itemDetaileData.locationDesc}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">病害类型:</text>
							<text class="content-item-value">{{itemDetaileData.diseasetypeName}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">完成期限:</text>
							<text class="content-item-value">{{itemDetaileData.planDoneDate}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">处理要求:</text>
							<text class="content-item-value">{{itemDetaileData.assignRemark}}</text>
						</view>
						<view class="order-content-item">
							<text class="content-item-txt">预计工程量:</text>
							<text class="content-item-value">{{itemDetaileData.planQuanttityDesc}}</text>
						</view>
					</view>
				</view>
				<view class="repair-record" :style="repairRecordList.length > 0 ? 'padding-bottom: 26upx' : 'padding-bottom: 0'">
					<view class="record-title display alert_item_center space-between" :style="repairRecordList.length > 0 ? '' : 'border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;'">
						<text class="des-item-txt">维修记录</text>
					</view>
					<view v-for="item in repairRecordList" :key="item.id" :class="isDailyRepair ? 'record-item-wrap' : 'record-item-wrap2'">						
						<view :style="isDailyRepair ? 'height: 120upx;': 'height: 16upx;'" class="display alert_item_center space-between">
							<view v-if="isDailyRepair" class="record-item-text">{{item.repairDate && item.repairDate.split(' ')[0]}} 日维修</view>
							<image  v-if="isDailyRepair"  :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;" @click="openRecordDetaile(item)"></image>
						</view>	
						<view v-show="item.open" style="padding-bottom: 30upx;">
							<!-- border-bottom: 1upx solid rgb(213,213,213); -->
							<view  v-if="isDailyRepair"  style="display: flex;padding-bottom: 44upx;">
								<view>时间：</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeStartBean}}</view>
								<view style="color: #999;">至</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeEndBean}}</view>
							</view>							
							<!-- padding-bottom: 44upx; -->
							<view v-if="!isDailyRepair" style="font-size: 30upx;color: #383838;display: flex;padding-top: 22upx">
								<view style="color: #767676;">维修日期：</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeStart && item.repairDailyTimeStart.split(' ')[0]}}</view>
								<view style="color: #999;">至</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeEnd && item.repairDailyTimeEnd.split(' ')[0]}}</view>
							</view>	
							
							<!-- <view style="font-size: 34upx;color: #383838;margin-top: 46upx;margin-bottom: -16upx;">附件</view> -->
							<view style="font-size: 30upx;color: #383838;margin-top: 30upx;">
								<!-- <main-bar-inter :name="'安全照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailySafeEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">安全照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailySafeEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工前照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyBeforeEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工前照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyBeforeEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工中照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyMidEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工中照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyMidEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工后照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyAfterEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工后照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyAfterEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
								</view>
							</view>
							<!-- <main-bar-inter :name="'施工内容'" :vm="'190upx'">
								<view>{{item.repairDailyContent}}</view>
							</main-bar-inter> -->
							<!-- <main-bar-inter :name="''" :vm="'0upx'">
								<view class="file" style="width: 180upx;position: absolute;">施工内容：</view>
								style="margin-left: 58upx;"
								<view>{{item.repairDailyContent}}</view>
							</main-bar-inter> -->
							<view style="margin-top: 42upx;display: flex;">
								<!-- font-size: 28upx;color: #767676; margin: 13px 0;-->
								<view style="margin: 13px 0;font-size: 30upx;color: #767676;width: 200upx;">完成工程量：</view>
								<view style="font-size: 30upx;margin: 13px 0;width: 420upx;">{{item.repairDailyContent}}</view>
							</view>
							<!-- <main-bar-inter :name="'维修坑槽长度'" :vm="'190upx'">
								<view>{{item.splength}}</view>
							</main-bar-inter>
							<main-bar-inter :name="'维修坑槽宽度'" :vm="'190upx'">
								<view>{{item.spwidth}}</view>
							</main-bar-inter> -->
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabsValue === 1">
				<view class="order-state-two">
					<view class="order-text">
						<text class="des-item-txt">工单状态:</text>
						<view class="state-wrap" :class="detaileData.class">{{detaileData.status_text}}</view>
					</view>
				</view>
				<view class="order-state-two" v-if='transitionList.length > 0'>
					<!--暂时隐藏 <view class="record-title display alert_item_center space-between">
						<text class="des-item-txt">转序信息</text>
					</view> -->
					<view v-for="(item, index) in transitionList" class="transition-item" style="padding: 36upx;">
						<view style="height: 110upx;" class="display">
							<view class="display alert_item_center" :class="item.status_text === '未提交' ? 'tran-no' : 'tran-ing'" style="width: 90upx;height: 34upx;font-size: 24upx;border-radius: 4upx;justify-content: center;color: #ffffff;margin-top: 4upx;">{{item.status_text}}</view>
							<view style="margin-left: 10upx;width: 480upx;font-size: 30upx;color: #383838;">转序节点{{index + 1}}: {{item.sequenceName}}</view>
							<image :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;margin-top: 8upx;" @click="openTransitionDetaile(item)"></image>
						</view>
						<view v-if="item.open">
							<!-- <main-bar-inter :name="'转序图片'" :isDis='true'>
								<view @click="screen">
									<upload-image-bar @deleteVideoClick="function(index) {deleteTranClick(index, item)}" :file='item.sequsenceEnclosureRemoteListT' @updateImage="function(list) {updateImageTransition(list, item)}" :isUpdate="item.used"></upload-image-bar>
								</view>
							</main-bar-inter> -->
							<view style="margin-top: 42upx;padding-bottom: 40upx;">
								<upload-image-bar :width="186" @deleteVideoClick="function(index) {deleteTranClick(index, item)}" :file='item.sequsenceEnclosureRemoteListT' @updateImage="function(list) {updateImageTransition(list, item)}" :isUpdate="item.used"></upload-image-bar>
							</view>
						</view>
						<view v-show="item.open">
							<!-- <view class="transition-detaile">
								<view style="font-size: 22upx;color: #aaa;">转序流程详情</view>
								<image src="../../static/page/arrow-right.png" style="width: 20upx;height: 20upx;margin-left: 10upx;"></image>
							</view> -->
						</view>
					</view>
				</view>
				<!-- <view class="display alert_item_center space-between bottom-btn-wrap">
					<view class="btn-item" style="border: 1px solid #3695e2;color: #1890FF;">驳回</view>
					<view class="btn-item" style="color: #fff;background: #1890FF;">通过</view>
				</view> -->
			</view>
			<view v-if="tabsValue === 3">
				<view class="repair-record">
					<view class="record-title display alert_item_center space-between">
						<text class="des-item-txt" style="color: #1c82d4;font-size: 30upx;">记录</text>
					</view>
					<view style="margin-top: 20upx;margin-right: 32upx;margin-left: 26upx;">
						<view v-for="(item, index) in logData" :key="item.id" style="color: #383838;">
							<view style="display: flex;align-items: center;">
								<view :class="index === 0 ? item.className + 'E' : item.className" class="yuan"></view>
								<view style="margin-left: 30upx;font-family: 'pingfangMediumBold';font-size: 30upx;" :style="index === 0 ? 'color: #515151;' : 'color: #959595;'">{{item.operationContext}}</view>
							</view>
							<view style="display: flex;padding-left: 18upx;">
								<view class="xian" v-if="index !== (logData.length - 1)"></view>
								<view style="font-size: 30upx;color: #696969;" :class="index !== (logData.length - 1) ? 'hasLeft' : 'noLeft'">
									<view style="margin-left: 48upx;margin-top: 20upx;">由【{{item.operationTrueName}}】{{item.operationContext === '整改' ? '驳回整改' : item.operationContext}}</view>
									<view style="margin-left: 48upx;margin-top: 12upx;">{{item.keyTime}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view style="margin-top: 20upx;margin-right: 32upx;margin-left: 20upx;">
					<view v-for="item in logData" :key="item.id" style="color: #383838;">
						<view style="display: flex;align-items: center;">
							<view class="yuan"></view>
							<view style="margin-left: 10upx;">{{item.keyTime}}</view>
							<view style="margin-left: 10upx;">【{{item.operationContext}}】</view>
						</view>
						<view style="display: flex;">
							<view class="xian"></view>
							<view style="margin-left: 10upx;">操作人：{{item.operationTrueName}}</view>
						</view>
					</view>
				</view> -->
			</view>
		</scroll-view>
		<radion-button-bar v-if="isHidden" :list="list" :title="title" @getvalue="getvalue" :id="id" />
	</view>
</template>

<script>
	import TabsBar from '@/components/tabs-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import RadionButtonBar from '@/components/radio-button-bar/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	export default{
		components: {
			TabsBar, MainBarInter, RadionButtonBar, uploadImageBar
		},
		data(){
			return {
				name: '维修详情',
				rightFlag: false,
				tabs: [/* 暂时隐藏{
						id: 1,
						name: '转序信息'
					}, */
					{
						id: 2,
						name: '病害信息'
					},
					{
						id: 3,
						name: '流程信息'
					},
				],
				tabsValue: 2,
				bottomTabs: [{
						id: 1,
						name: '工程量信息'
					},
					{
						id: 2,
						name: '人机料量信息'
					}],
				bottomTabsValue: 1,
				detaileData: {},
				repairRecordList: [
					// {
					// 	id: 1,
					// 	date: '2021-11-11 日维修',
					// 	open: false
					// },
					// {
					// 	id: 2,
					// 	date: '2021-11-12 日维修',
					// 	open: false
					// }
				],
				transitionList: [
					// {
					// 	id: 1,
					// 	name: '转序节点1 名称名称名称',
					// 	open: false,
					// 	state: '通过'
					// },
					// {
					// 	id: 2,
					// 	name: '转序节点2 名称名称名称',
					// 	open: false,
					// 	state: '通过'
					// }
				],
				isHidden: false,
				//如果改为true，咱支持日常维修（通用），改为false则只上传维修的整体的信息（青岛）
				isDailyRepair: false,
				list: [],
				id: 0,
				title: '',
				contractName: '',//合同
				contractList: [
					/* {
						id: 1,
						name: '合同1'
					},
					{
						id: 2,
						name: '合同2'
					} */
				],
				checklistName: '',//清单
				checklist: [
					/* {
						id: 1,
						name: '清单1'
					},
					{
						id: 2,
						name: '清单2'
					} */
				],
				engineerList: [
					/* {
						id: 1
					} */
				],
				matRepairRectificationEnclosureList: [],
				isUpdate: false,
				file: [],
				itemDetaileData: {
					matDisease: {},
					matDiseasetypeAcceList: {},
					matDiseasetypeSafeList: {},
					matRepairAccEnclosureList: {},
					matRepairDailyList: {},
					matRepairMaterialRelList: {},
					matRepairMeasureList: {},
					matRepairRectificationEnclosureList: {},
					matRepairSequsenceRelList: {},
				},
				logData: []
			}
		},
		methods:{
			tavbar(id) {
				this.tabsValue = id
			},
			tavbarBottom(id) {
				this.bottomTabsValue = id
			},
			screen(){
			},
			openRecordDetaile(item) {
				let _this = this
				_this.repairRecordList.map(items => {
					if (items.id === item.id) {
						items.open = !items.open
						if (items.open) {
							_this.$api.send({
							     url: `/repair/matRepairDaily/getById?id=${items.id}`,
							     method: 'get',
							     success:(res)=>{
									  _this.$set(items, 'matRepairDailySafeEnclosureList', res.data.matRepairDailySafeEnclosureList)
									  _this.$set(items, 'matRepairDailyBeforeEnclosureList', res.data.matRepairDailyBeforeEnclosureList)
									  _this.$set(items, 'matRepairDailyMidEnclosureList', res.data.matRepairDailyMidEnclosureList)
									  _this.$set(items, 'matRepairDailyAfterEnclosureList', res.data.matRepairDailyAfterEnclosureList)
							     },
							     fail:(res)=>{
							      console.log(res,"+++++++++++++++++++++++++++++")
							     }
							})
						}
					} else {
						items.open = false
					}
				})
			},
			opentransitionDetaile(item) {
				let _this = this
				_this.transitionList.map(itemData => {
					if (item.id === itemData.id) {
						itemData.open = !itemData.open
						if (itemData.open) {
							_this.$api.send({
							     url: `/repair/matRepairSequsenceRel/getById?id=${itemData.id}`,
							     method: 'get',
							     success:(res)=>{
									 console.log(res,"+++++++++++++++++++++++++++++")
									 itemData.sequsenceEnclosureRemoteList = res.data.sequsenceEnclosureRemoteList
									 itemData.sequsenceEnclosureRemoteListT = JSON.parse(JSON.stringify(res.data.sequsenceEnclosureRemoteList))
							     },
							     fail:(res)=>{
							      console.log(res,"+++++++++++++++++++++++++++++")
							     }
							})
						}
					} else {
						itemData.open = false
					}
				})
			},
			getvalue(index, title) {
				if (title === '选择合同') {
					this.contractName = this.list[index].name
				} else {
					this.checklistName = this.list[index].name
				}
				this.isHidden = false
			},
			showContractList() {
				this.isHidden = true
				this.title = '选择合同'
				this.list = this.contractList
			},
			showChecklist() {
				this.isHidden = true
				this.title = '选择清单'
				this.list = this.checklist
			},
			scrolltolower() {
			},
			deleteVideoClick() {
			},
			updateImage() {},
			getDiseaseMessageAndRepairing(id) {
			    let _this = this
			    _this.$api.send({
			         url: `/repair/matRepair/getDiseaseMessageAndRepairing?id=${id}&user=jf001`,
			         method: 'get',
			         success:(res)=>{
						console.log(res,"+++++++++++++")
						if (res.data.id) {
							_this.getLog(res.data.id,res.data.diseaseId)
						}
						_this.itemDetaileData = res.data
						_this.transitionList = res.data.matRepairSequsenceRelList ? res.data.matRepairSequsenceRelList : []
						if (_this.transitionList.length < 1) {
							_this.tabs = [{id: 2,name: '病害信息'},{id: 3,name: '流程信息'}]
							_this.tavbar(2)
						}
						_this.repairRecordList = res.data.matRepairDailyList ? res.data.matRepairDailyList : []
						/* _this.repairRecordList && _this.repairRecordList.map(item => {
							_this.$set(item, 'open', false)
						}) */			
						//alert("不知道哪个页面调用")
						//如果是空的且是日常维修模式需要先点开一个空的addRepairRecord
						if(!_this.isDailyRepair && _this.repairRecordList.length == 0){//新增的情况							   
							_this.addRepairRecord()
						}else{//编辑的情况
							  _this.repairRecordList && _this.repairRecordList.map(item => {	
								  _this.$set(item, 'open', false)
								  if(!_this.isDailyRepair){									 
									  //如果存在日常维修且是日常维修模式，则默认展开
									  _this.openRecordDetaile(item)
								  }
							  })
						}		
						
			         },
			         fail:(res)=>{
			          console.log(res,"+++++++++++++++++++++++++++++")
			         }
			    })
				_this.$api.send({
				     url: `/repair/matRepairSequsenceRel/getSequsenceRelListByRepairId?repairId=${_this.itemDetaileData.id}`,
				     method: 'get',
				     success:(res)=>{
						  console.log(res,"+++++++++++++")
						  _this.transitionList = res.data
						  _this.transitionList.map((item, index) => {
							  _this.$set(item, 'open', false)
							  _this.$set(item, 'sequsenceEnclosureRemoteListT', [])
							  _this.$set(item, 'used', false)
						  })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			getLog(id,diseaseId) {
				let _this = this
				_this.$api.send({
				     url: `/repair/matBusinessLog/getByForeignId?foreignId=${id}&diseaseId=${diseaseId}`,
				     method: 'get',
				     success:(res)=>{
						  console.log(res,"+++++++++++++")
						  _this.logData = res.data
						  _this.logData.map(item => {
						  	switch(item.operationType) {
						  	  case '01':
						  	  _this.$set(item, 'className', 'operaOne')
						  	  break;
						  	  case '02':
						  	  _this.$set(item, 'className', 'operaOne')
						  	  break;
						  	  case '03':
						  	  _this.$set(item, 'className', 'operaOne')
						  	  break;
						  	  case '04':
						  	  _this.$set(item, 'className', 'operaOne')
						  	  break;
						  	  case '05':
						  	  _this.$set(item, 'className', 'operaFive')
						  	  break;
						  	  case '06':
						  	  _this.$set(item, 'className', 'operaSix')
						  	  break;
						  	  case '07':
						  	  _this.$set(item, 'className', 'operaSeven')
						  	  break;
							  case '08':
							  _this.$set(item, 'className', 'operaEight')
							  break;
						  	}
						  })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			}
		},
		onLoad:function(option) {
			this.detaileData = JSON.parse(option.item)
			this.getDiseaseMessageAndRepairing(this.detaileData.id)
		},
		onBackPress() {
			if (this.isHidden) {
				this.isHidden = false
				return true
			}
		},
	}
</script>

<style scoped lang="scss">
	.index-wrap{
		background: $font-color3;
		height: 100vh;
		overflow: hidden;
	}
	.order-state{
		width: 702upx;
		min-height: 481upx;
		background: #fff;
		border-radius: 16upx;
		margin: 16upx auto;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		.order-text{
			display: flex;
			align-items: center;
			height: 95upx;
			width: 100%;
			padding-left: 24upx;
			.des-item-txt{
				font-size: 30upx;
				color: #000;
			}
		}
		.order-content{
			height: calc(100% - 95upx);
			padding-top: 30upx;
			box-sizing: border-box;
			padding-left: 24upx;
			padding-bottom: 24upx;
			background: #f6f6f6;
			border-bottom-left-radius: 16upx;
			border-bottom-right-radius: 16upx;
			.order-content-item{
				display: flex;
				align-items: center;
				margin-bottom: 16upx;
				.content-item-txt{
					width: 150upx;
					font-size: 30upx;
					color: #767676;
				}
				.content-item-value{
					max-width: 515upx;
					font-size: 30upx;
					color: #383838;
				}
			}
		}
	}
	.repair-record{
		width: 702upx;
		// height: 421upx;
		background: #fff;
		border-radius: 16upx;
		margin: 16upx auto;
		padding-bottom: 26upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		background: #f6f6f6;
		.record-title{
			height: 95upx;
			padding-left: 24upx;
			padding-right: 24upx;
			font-size: 30upx;
			color: #000;
			background: #fff;
			border-top-left-radius: 16upx;
			border-top-right-radius: 16upx;
			margin-bottom: 6upx;
		}
		.record-item-wrap{
			width: 654upx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 16upx;
			margin: 0 auto;
			margin-top: 26upx;
			padding: 0 36upx;
			box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
			.record-item-text{
				font-size: 30upx;
				color: #383838;
				font-family: 'pingfangMediumBold';
			}
		}
		.record-item-wrap2{
			box-sizing: border-box;
			padding-left: 24upx;
			padding-right: 24upx;			
		}
	}
	.state-wrap{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90upx;
		height: 34upx;
		border-radius: 4upx;
		color: #ffffff;
		font-size: 24upx;
		margin-left: 10upx;
	}
	.repair-record-bottom{
		width: 702upx;
		background: #fff;
		border-radius: 16upx;
		box-sizing: border-box;
		margin: 16upx auto;
		// padding-left: 24upx;
		// padding-right: 24upx;
		padding-bottom: 26upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		background: #f6f6f6;
	}
	.bottom-tabs-wrap{
		display: flex;
		align-items: center;
		width: 100%;
		height: 95upx;
		box-sizing: border-box;
		padding-left: 24upx;
		padding-right: 24upx;
		background-color: #fff;
		border-top-left-radius: 16upx;
		border-top-right-radius: 16upx;
		.tabs{
			width: 95vw;
			.text {
				min-width: 140rpx;
				padding: 0 10rpx;
				height: 50upx;
				line-height: 50upx;
				color: #3695e2;
				text-align: center;
				font-size: 26upx;
				margin-right: 20upx;
				
			}
			.text_true{
				background-color: #3695e2;
				border-radius: 25rpx;
				color: #fff;
			}
		}
	}
	.engineer-item{
		width: 654upx;
		min-height: 197upx;
		background: #fff;
		border-radius: 16upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
		padding: 18upx 36upx 30upx 35upx;
	}
	.bottom-btn-wrap{
		width: 618upx;
		height: 95upx;
		margin: 0 auto;
		.btn-item{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 290upx;
			height: 93upx;
			border-radius: 10upx;
			font-size: 40upx;
		}
	}
	.order-state-two{
		width: 702upx;
		background: #f6f6f6;
		border-radius: 16upx;
		box-sizing: border-box;
		padding-bottom: 30upx;
		margin: 16upx auto;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		.record-title{
			height: 95upx;
			padding-left: 24upx;
			padding-right: 24upx;
			font-size: 30upx;
			color: #000;
			background: #fff;
			border-top-left-radius: 16upx;
			border-top-right-radius: 16upx;
			margin-bottom: 6upx;
		}
		.order-text{
			display: flex;
			align-items: center;
			height: 95upx;
			width: 100%;
			padding-left: 24upx;
			box-sizing: border-box;
			border-radius: 16upx 16upx 0 0;
			background: #fff;
			.des-item-txt{
				font-size: 30upx;
				color: #000;
			}
		}
		.transition-item{
			width: 654upx;
			background: #fff;
			border-radius: 16upx;
			box-sizing: border-box;
			margin-top: 30upx;
			margin-left: 24upx;
			padding-left: 36upx;
			padding-right: 36upx;
			.tran-pass{
				background-color: #00C44E;
			}
			.tran-no{
				background-color: #E4831A;
			}
			.tran-ing{
				background-color: #00C952;
			}
			.transition-detaile{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin: 0 auto;
				width: 582upx;
				height: 80upx;
				margin-top: 40upx;
				border-top: 1upx dotted #dcdcdc;
			}
		}
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
	.item-complate{
		background-color: #b4b4b4;
	}
	
	.yuan {
		width: 44upx;
		height: 44upx;
	}
	.operaOne{
		background: url(../../static/page/send.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaOneE{
		background: url(../../static/page/sendB.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaFive{
		background: url(../../static/page/send.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaFiveE{
		background: url(../../static/page/sendB.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaSix{
		background: url(../../static/page/accept.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaSixE{
		background: url(../../static/page/acceptB.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaSeven{
		background: url(../../static/page/turn.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaSevenE{
		background: url(../../static/page/turnB.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaEight{
		background: url(../../static/page/rect.png) no-repeat;
		background-size: 100% 100%;
	}
	.operaEightE{
		background: url(../../static/page/rectB.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.xian {
		width: 1upx;
		height: 140upx;
		margin-left: 5upx;
		border-left: 1upx solid rgb(215, 215, 215);
	}
	.hasLeft{
	}
	.noLeft{
		margin-left: 6upx;
	}
</style>
