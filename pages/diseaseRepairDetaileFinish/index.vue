<template>
	<view class="index-wrap">
		<tabs-bar @tavbar="tavbar" :title="name" :tabs="tabs" :tabsValue="tabsValue" @screen="screen" :right="rightFlag"></tabs-bar>
		<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 250upx);">
			<view v-if="tabsValue === 1">
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
							<view v-if="isDailyRepair" style="display: flex;"><!-- border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 44upx; -->
								<view>时间：</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeStartBean}}</view>
								<view style="color: #999;">至</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeEndBean}}</view>
							</view>
							
							<view v-if="!isDailyRepair" style="font-size: 30upx;color: #383838;display: flex;padding-top: 22upx"><!-- border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 44upx; -->
								<view style="color: #767676;">维修日期：</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeStart && item.repairDailyTimeStart.split(' ')[0]}}</view>
								<view style="color: #999;">至</view><view style="width: 200upx;text-align: center;">{{item.repairDailyTimeEnd && item.repairDailyTimeEnd.split(' ')[0]}}</view>
							</view>							
							<!-- <view style="font-size: 34upx;color: #383838;margin-top: 46upx;margin-bottom: -16upx;">附件</view> -->
							<view style="font-size: 30upx;color: #383838;margin-top: 30upx;">
								<!-- <main-bar-inter :name="'安全照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailySafeEnclosureList' @updateImage="function(list) {updateImageOne(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">安全照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailySafeEnclosureList' @updateImage="function(list) {updateImageOne(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工前照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyBeforeEnclosureList' @updateImage="function(list) {updateImageTwo(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工前照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyBeforeEnclosureList' @updateImage="function(list) {updateImageTwo(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工中照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyMidEnclosureList' @updateImage="function(list) {updateImageThree(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工中照片：</view>
										<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyMidEnclosureList' @updateImage="function(list) {updateImageThree(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工后照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyAfterEnclosureList' @updateImage="function(list) {updateImageFour(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工后照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='item.matRepairDailyAfterEnclosureList' @updateImage="function(list) {updateImageFour(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
							</view>
							<!-- <main-bar-inter :name="'施工内容：'" :vm="'180upx'" :isDisBottom="false">
								<view class="file" style="width: 180upx;position: absolute;">施工内容：</view>
								style="margin: 26upx 0upx 24upx -40upx;"
								<view>{{item.repairDailyContent}}</view> 
							</main-bar-inter> -->
							<view style="margin-top: 42upx;display: flex;"><!-- display: flex; -->
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
				<view class="repair-record-bottom">
					<view class="bottom-tabs-wrap">
						<view class="display alert_item_center space-between tabs">
							<text class="des-item-txt" style="font-size: 30upx;color: #000;">工程量信息</text>
							<!-- <view class="display">
								<view @click="tavbarBottom(item.id)" class="text" :class="item.id===bottomTabsValue?'text_true':''" v-for="item in bottomTabs" :key="item.id">{{item.name}}</view>
							</view> -->
						</view>
					</view>
					<view v-if="bottomTabsValue === 1" style="box-sizing: border-box;padding-left: 24upx;padding-right: 24upx;">
						<!-- <main-bar-inter :name="'合同'" :vm="'190upx'" :isDisBottom="false">
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view>{{itemDetaileData.contractName}}</view>
							</view>
						</main-bar-inter> -->
						<view style="display: flex;margin-top: 42upx;">
							<view style="width: 90upx;font-size: 30upx;color: #767676;">合同：</view>
							<view style="font-size: 30upx;color: #383838;width:560upx;">{{itemDetaileData.contractName}}</view>
						</view>
						
											
						<!-- <main-bar-inter :name="'清单'" :vm="'190upx'" :isDisBottom="false">
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view>{{itemDetaileData.relaManageUnitName}}</view>
							</view>
						</main-bar-inter> -->
						<view style="display: flex;margin-top: 24upx;">
							<view style="width: 90upx;font-size: 30upx;color: #767676;">清单：</view>
							<view style="font-size: 30upx;color: #383838;width:560upx;">{{itemDetaileData.relaManageUnitName}}</view>
						</view>
						
						<view v-if="engineerList.length > 0" style="margin: 38upx 0 30upx;" class="display alert_item_center space-between">
							<view>工程量</view>
						</view>
						<view v-for="item in engineerList" class="engineer-item">
							<view class="display alert_item_center space-between">
								<view>{{item.serviceMeaSubName}}</view>
							</view>
							<!-- <main-bar-inter :name="'申请'" :vm="'190upx'">
								<view style="display: flex;align-items: center;">
									<view style="width: 100upx;">{{item.applyNum}}</view>
									<view style="margin-left: 10upx;">{{item.serviceMeaUnit}}</view>
								</view>
							</main-bar-inter> -->
							<view style="display: flex;margin-top: 42upx;">
								<view style="font-size: 30upx;color: #767676;">申请</view>
								<view style="width: 100upx;margin-left: 24upx;">{{item.applyNum}}</view>
								<view style="margin-left: 10upx;">{{item.serviceMeaUnit}}</view>
							</view>
							
							<main-bar-inter :name="'实际'" :vm="'190upx'">
								<view style="display: flex;align-items: center;">
									<view style="width: 100upx;">{{item.acceNum}}</view>
									<view style="margin-left: 10upx;">{{item.serviceMeaUnit}}</view>
								</view>
							</main-bar-inter>
						</view>
					</view>
					<view v-if="bottomTabsValue === 2" style="box-sizing: border-box;padding-left: 24upx;padding-right: 24upx;">
						<view class="engineer-item" style="height: 197upx;" v-for="item in addBaseMaterialList">
							<main-bar-inter :name="item.name" :vm="'190upx'">
								<!-- <input style='width: 80upx;' :value="item.costNum"/> -->
								<view style='width: 80upx;'>{{item.costNum}}</view>
								<view>{{item.materialUnit}}</view>
							</main-bar-inter>
						</view>
					</view>
				</view>
				<view class="order-state-two" v-if="transitionList.length > 0">
					<!--暂时隐藏 <view class="record-title display alert_item_center space-between">
						<text class="des-item-txt">转序信息</text>
					</view> -->
					<view v-for="(item, index) in transitionList" :key="item.id" class="transition-item" style="padding: 36upx;">
						<view style="height: 110upx;" class="display">
							<view v-if="item.used || item.status === '2'" class="display alert_item_center" :class="item.status_text === '未提交' ? 'tran-no' : 'tran-ing'" style="width: 90upx;height: 34upx;font-size: 24upx;border-radius: 4upx;justify-content: center;color: #ffffff;margin-top: 4upx;">{{item.status_text}}</view>
							<view :style="(item.used || item.status === '2') ? 'width: 480upx;margin-left: 10upx;' : 'width: 570upx'" style="font-size: 30upx;color: #383838;">转序节点{{index + 1}}: {{item.sequenceName}}</view>
							<image v-if="item.used || item.status === '2'" :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;margin-top: 8upx;" @click="openTransitionDetaile(item)"></image>
						</view>
						<view v-if="item.open">
							<!-- <main-bar-inter :name="'转序图片'" :isDis='true'>
								<view @click="screen">
									<upload-image-bar :file='item.sequsenceEnclosureRemoteListT' :isUpdate="isUpdate"></upload-image-bar>
								</view>
							</main-bar-inter> -->
							<view style="margin-top: 42upx;padding-bottom: 40upx;">
								<upload-image-bar :width="186" :file='item.sequsenceEnclosureRemoteListT' :isUpdate="isUpdate"></upload-image-bar>
							</view>
						</view>
					</view>
				</view>
				<view class="repair-record" v-if="matRepairRectificationEnclosureList.length > 0">
					<view class="record-title display alert_item_center space-between">
						<text class="des-item-txt">整改信息</text>
					</view>
					<view style="padding-left: 24upx;width: 654upx;">
						<main-bar-inter :name="'整改建议：'" :vm="'190upx'" :isDisBottom='false'>
							<view>{{itemDetaileData.reformRemark}}</view>
						</main-bar-inter>
					</view>
					<!-- <view style="font-size: 34upx;color: #383838;margin-left: 24upx;margin-top: 28upx;">附件</view> -->
					<view style="font-size: 30upx;color: #383838;margin-left: 24upx;margin-top: 20upx;">
						<!-- <main-bar-inter :name="'整改后照片'" :isDis='true' :isDisBottom='false'>
							<view @click="screen">
								<upload-image-bar :file='matRepairRectificationEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
							</view>
						</main-bar-inter> -->
						<view>
							<view style="margin-bottom: 26upx;margin-top: -20upx;">整改后照片：</view>
							<!-- <view class="file">整改后照片：</view> -->
							<upload-image-bar :width="186" :file='matRepairRectificationEnclosureList' :isUpdate="isUpdate"></upload-image-bar>
						</view>
					</view>
					<view style="padding-left: 24upx;width: 654upx;">
						<main-bar-inter :name="'整改内容：'" :vm="'190upx'" :isDisBottom='false'>
							<view style="width: 400upx;">{{itemDetaileData.reformAfterRemark}}</view>
						</main-bar-inter>
					</view>
				</view>
				<view v-if='this.itemDetaileData.status != "7" && this.itemDetaileData.status != "8"' class="repair-record">
					<view class="record-title display alert_item_center space-between">
						<text class="des-item-txt">验收信息</text>
					</view>
					<view v-for="item in acceptanceList" :key="item.id" class="record-item-wrap" style="padding: 0;background: none;">
						<!-- <view style="height: 120upx;" class="display alert_item_center space-between">
							<view class="display alert_item_center" style="width: 80upx;border-radius: 16upx;border: 1px solid #1890FF;justify-content: center;">通过</view>
							<view style="margin-left: 10upx;width: 480upx;font-size: 30upx;color: #383838;">{{item.name}}</view>
							<image :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;" @click="openAcceptanceDetaile(item)"></image>
						</view> -->
						<view style="height: 120upx;background: #fff;padding: 0 36upx;border-top-left-radius: 16upx;border-top-right-radius: 16upx;" class="display alert_item_center space-between" :style="item.open ? '' : 'border-bottom-left-radius: 16upx;border-bottom-right-radius: 16upx;'">
							<view style="margin-left: 10upx;width: 480upx;font-size: 30upx;color: #383838;">{{item.name}}</view>
							<image :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;" @click="openAcceptanceDetaile(item)"></image>
						</view>
						<view v-show="item.open" style="padding: 0 36upx;">
							<view v-for="(item2, index2) in item.children" style="display: flex;justify-content: space-between;margin-bottom: 10upx;height: 120upx;align-items: center;" :style="(index2 + 1) === item.children.length ? '' : 'border-bottom: 1upx dashed #ddd;'">
								<view style="width: 500upx;font-size: 30upx;color: #383838;">{{item2.name}}</view>
								<image :src="item2.check ? '../../static/page/accIconClick.png' : '../../static/page/accIconDefault.png'" style="width: 38upx;height: 38upx;"></image>
							</view>
						</view>
					</view>
					<!-- <view style="font-size: 34upx;color: #383838;margin-left: 24upx;margin-top: 28upx;">附件</view> -->
					<view style="font-size: 30upx;color: #383838;margin-left: 24upx;margin-top: 20upx;">
						<!-- <main-bar-inter :name="'验收照片'" :isDis='true' :isDisBottom='false'>
							<view @click="screen">
								<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='matRepairAccEnclosureList' @updateImage="updateImage" :isUpdate="isUpdate"></upload-image-bar>
							</view>
						</main-bar-inter> -->
						<view>
							<view class="file">验收照片：</view>
							<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='matRepairAccEnclosureList' @updateImage="updateImage" :isUpdate="isUpdate"></upload-image-bar>
						</view>
					</view>
					<view style="padding-left: 24upx;width: 654upx;">
						<main-bar-inter :name="'验收意见：'" :vm="'190upx'" :isDisBottom='false'>
							<view style="font-size: 30upx;width: 400upx;">{{itemDetaileData.acceRemark}}</view>
						</main-bar-inter>
					</view>
				</view>
			</view>
			<view v-if="tabsValue === 2">
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
				tabs: [{
						id: 1,
						name: '病害信息'
					},
					{
						id: 2,
						name: '流程信息'
					},
				],
				tabsValue: 1,
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
				],
				isHidden: false,
				//如果改为true，咱支持日常维修（通用），改为false则只上传维修的整体的信息（青岛）
				isDailyRepair: false,
				list: [],
				id: 0,
				title: '',
				contractName: '',//合同名称
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
				checklistName: '',//清单名称
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
				],
				addBaseMaterialList: [],
				transitionList: [
				],
				matRepairRectificationEnclosureList: [],
				file: [],
				isUpdate: false,
				acceptanceList: [
					{
						id: 1,
						name: '质量验收标准',
						state: '通过',
						open: false,
						children: [/* {
							"id": "3",
							"diseasetypeId": "2",
							"code": "1",
							"name": "三",
							"sortNum": 1,
							check: false,
						}, {
							"id": "4",
							"diseasetypeId": "2",
							"code": "2",
							"name": "四",
							"sortNum": 2,
							check: false,
						} */]
					},
					{
						id: 2,
						name: '安全管理标准',
						state: '通过',
						open: false,
						children: []
					}
				],
				matRepairAccEnclosureList: [],
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
									  //console.log(res,"+++++++++++++")
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
			updateImageOne(fileList, item) {
				//console.log(fileList)
				//console.log(item)
				item.matRepairDailySafeEnclosureList = fileList
			},
			updateImageTwo(fileList, item) {
				item.matRepairDailyBeforeEnclosureList = fileList
			},
			updateImageThree(fileList, item) {
				item.matRepairDailyMidEnclosureList = fileList
			},
			updateImageFour(fileList, item) {
				item.matRepairDailyAfterEnclosureList = fileList
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
			openTransitionDetaile(item) {
				let _this = this
				_this.transitionList.map(itemData => {
					if (item.id === itemData.id) {
						itemData.open = !itemData.open
						if (itemData.open) {
							_this.$api.send({
							     url: `/repair/matRepairSequsenceRel/getById?id=${itemData.id}`,
							     method: 'get',
							     success:(res)=>{
									 //console.log(res,"+++++++++++++++++++++++++++++")
									 itemData.sequsenceEnclosureRemoteList = res.data.sequsenceEnclosureRemoteList
									 _this.$set(itemData, 'sequsenceEnclosureRemoteListT', JSON.parse(JSON.stringify(res.data.sequsenceEnclosureRemoteList)))
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
			deleteVideoClick() {},
			updateImage() {},
			openAcceptanceDetaile(item) {
				let _this = this
				_this.acceptanceList.map(itemData => {
					if (item.id === itemData.id) {
						itemData.open = !itemData.open
					} else {
						itemData.open = false
					}
				})
			},
			getAccByRepairId(id) {
			    let _this = this
			    _this.$api.send({
			         url: `/repair/matRepair/getAccByRepairId?id=${id}&safeStardardCode=null&acceStardardCode=null`,
			         method: 'get',
			         success:(res)=>{
						console.log(res,"+++++++++++++")
						if (res.data.id) {
							_this.getLog(res.data.id,res.data.diseaseId)
						}
						_this.itemDetaileData = res.data
						_this.repairRecordList = res.data.matRepairDailyList
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
						
						_this.engineerList = res.data.matRepairMeasureList ? res.data.matRepairMeasureList : []
						_this.addBaseMaterialList = res.data.matRepairMaterialRelList ? res.data.matRepairMaterialRelList : []
						_this.transitionList = res.data.matRepairSequsenceRelList ? res.data.matRepairSequsenceRelList : [],
						_this.transitionList.map((item, index) => {
							_this.$set(item, 'open', false)
							_this.$set(item, 'used', true)
						})
						_this.matRepairRectificationEnclosureList = res.data.matRepairRectificationEnclosureList ? res.data.matRepairRectificationEnclosureList : [],
						console.log(_this.matRepairRectificationEnclosureList)
						_this.matRepairAccEnclosureList = res.data.matRepairAccEnclosureList ? res.data.matRepairAccEnclosureList : []
						_this.diseasetypeId = res.data.matDisease[0] ? res.data.matDisease[0].diseasetypeId : undefined
						if (_this.diseasetypeId) {
							_this.getAcceListByDiseasetypeId(_this.diseasetypeId)
						}
			         },
			         fail:(res)=>{
						console.log(res,"+++++++++++++++++++++++++++++")
			         }
			    })
			},
			getAcceListByDiseasetypeId(id) {
				let _this = this
				_this.$api.send({
				     url: `/repair/matDiseasetypeAcce/getAcceListByDiseasetypeId?diseasetypeId=${id}`,
				     method: 'get',
				     success:(res)=>{
						console.log(res,"+++++++++++++")
						let _acceList = res.data
						_acceList.map(item => {
							_this.$set(item, 'check', false)
						})
						_this.acceptanceList[0].children = _acceList
						_this.acceptanceList[0].children.map(item => {
							if (_this.itemDetaileData.acceStardardCode && _this.itemDetaileData.acceStardardCode.split(',').indexOf(item.code) > -1) {
								item.check = true
							}
						})
				     },
				     fail:(res)=>{
						console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
				_this.$api.send({
				     url: `/repair/matDiseasetypeSafe/getSafeListByDiseasetypeId?diseasetypeId=${id}`,
				     method: 'get',
				     success:(res)=>{
						console.log(res,"+++++++++++++")
						let _safeList = res.data
						_safeList.map(item => {
							_this.$set(item, 'check', false)
						})
						_this.acceptanceList[1].children = _safeList
						_this.acceptanceList[1].children.map(item => {
							if (_this.itemDetaileData.safeStardardCode && _this.itemDetaileData.safeStardardCode.split(',').indexOf(item.code) > -1) {
								item.check = true
							}
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
			this.getAccByRepairId(this.detaileData.id)
		},
		onBackPress() {
			if (this.isHidden) {
				this.isHidden = false
				return true
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
		/* width: 90upx; */
		height: 34upx;
		border-radius: 4upx;
		color: #ffffff;
		font-size: 24upx;
		margin-left: 10upx;
		padding: 0 10upx;
		
	}
	.repair-record-bottom{
		width: 702upx;
		background: #fff;
		border-radius: 16upx;
		box-sizing: border-box;
		margin: 16upx auto;
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
		min-height: 290upx;
		background: #fff;
		border-radius: 16upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
		padding: 18upx 36upx 30upx 35upx;
		margin-bottom: 24upx;
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
