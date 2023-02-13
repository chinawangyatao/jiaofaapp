<!-- 工程师-维修记录保存及提交监理验收页面 -->
<template>
	<view class="index-wrap">
		<tabs-bar @tavbar="tavbar" :title="name" :tabs="tabs" :tabsValue="tabsValue" @screen="screen" :right="rightFlag"></tabs-bar>
		<scroll-view @scrolltolower="scrolltolower" scroll-y :style="tabsValue === 3 ? 'height:calc(100vh - 250upx);' : 'height:calc(100vh - 370upx);'">
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
				<!-- 整改start报错 -->
				
				<!-- 整改end -->
				<view class="repair-record" :style="repairRecordList.length > 0 ? 'padding-bottom: 26upx' : 'padding-bottom: 0'">
					<view class="record-title display alert_item_center space-between" :style="repairRecordList.length > 0 ? '' : 'border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;'">
						<text class="des-item-txt">维修记录</text>
						<image v-if="isDailyRepair" src="../../static/page/addIcon.png" style="width: 32upx;height: 32upx;" @click="addRepairRecord"></image>						
					</view>
					<view v-for="item in repairRecordList" :class="isDailyRepair ? 'record-item-wrap' : 'record-item-wrap2'">
						<view :style="isDailyRepair ? 'height: 120upx;': 'height: 16upx;'" class="display alert_item_center space-between">
							<!-- <view class="record-item-text">{{item.repairDate && item.repairDate.split(' ')[0]}} 日维修</view> -->
							 <!-- @click="clickTk"-->
							<view v-if="isDailyRepair" @click="chooseDate(item)" style="display: flex;align-items: center;justify-content: space-between;width: 60vw;">
								<view class="record-item-text">{{item.repairDate && item.repairDate.split(' ')[0]}} 日维修</view>
							</view>
							<image  v-if="isDailyRepair" :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;" @click="openRecordDetaile(item)"></image>
						</view>
						<view v-show="item.open" style="padding-bottom: 30upx;">
							<view  v-if="isDailyRepair" style="display: flex;border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 44upx;">
								<view>时间：</view><view @click="chooseTime('start', item)" style="width: 200upx;text-align: center;">{{item.repairDailyTimeStartBean}}</view>
								<view style="color: #999;">至</view><view @click="chooseTime('end', item)" style="width: 200upx;text-align: center;">{{item.repairDailyTimeEndBean}}</view>
							</view>
							<!-- 有编辑功能 -->
							<view  v-if="!isDailyRepair" style="font-size: 30upx;color: #383838;display: flex;border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 44upx;padding-top: 22upx">
								<view style="color: #767676;">维修日期：</view><view @click="chooseQuDate('start', item)" style="width: 200upx;text-align: center;">{{item.repairDailyTimeStart && item.repairDailyTimeStart.split(' ')[0]}}</view>
								<view style="color: #999;">至</view><view @click="chooseQuDate('end', item)" style="width: 200upx;text-align: center;">{{item.repairDailyTimeEnd && item.repairDailyTimeEnd.split(' ')[0]}}</view>
							</view>
							<!-- <view style="font-size: 34upx;color: #383838;margin-top: 46upx;margin-bottom: -16upx;">附件</view> -->
							<view style="font-size: 30upx;color: #383838;margin-top: 30upx;">
								<!-- <main-bar-inter :name="'安全照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="function(index) {deleteVideoClickOne(index, item)}" :file='item.matRepairDailySafeEnclosureListT' @updateImage="function(list) {updateImageOne(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">安全照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="function(index) {deleteVideoClickOne(index, item)}" :file='item.matRepairDailySafeEnclosureListT' @updateImage="function(list) {updateImageOne(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								<!-- <main-bar-inter :name="'施工前照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="function(index) {deleteVideoClickTwo(index, item)}" :file='item.matRepairDailyBeforeEnclosureListT' @updateImage="function(list) {updateImageTwo(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工前照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="function(index) {deleteVideoClickTwo(index, item)}" :file='item.matRepairDailyBeforeEnclosureListT' @updateImage="function(list) {updateImageTwo(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工中照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="function(index) {deleteVideoClickThree(index, item)}" :file='item.matRepairDailyMidEnclosureListT' @updateImage="function(list) {updateImageThree(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工中照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="function(index) {deleteVideoClickThree(index, item)}" :file='item.matRepairDailyMidEnclosureListT' @updateImage="function(list) {updateImageThree(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工后照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar @deleteVideoClick="function(index) {deleteVideoClickFour(index, item)}" :file='item.matRepairDailyAfterEnclosureListT' @updateImage="function(list) {updateImageFour(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工后照片：</view>
									<upload-image-bar :width="186" @deleteVideoClick="function(index) {deleteVideoClickFour(index, item)}" :file='item.matRepairDailyAfterEnclosureListT' @updateImage="function(list) {updateImageFour(list, item)}" :isUpdate="isUpdate"></upload-image-bar>
								</view>
							</view>
							<!-- <main-bar-inter :name="'施工内容：'" :vm="'180upx'">
								<view class="file" style="width: 180upx;">施工内容：</view>
								style="margin: 0upx 0upx 0upx -40upx;"  position:absolute
								<input placeholder="请输入" :value="item.repairDailyContent" @input="function(e) {changeRepairDailyContent(e, item)}"/> 
							</main-bar-inter> -->
							<!-- <main-bar-inter :name="'施工内容：'" :vm="'180upx'" :isTop="false" :isDisBottom="true" style="margin-bottom: 24upx;display: flex;align-items: flex-start;justify-content: space-between;">
								<textarea placeholder="请输入" :value="item.repairDailyContent" @input="function(e) {changeRepairDailyContent(e, item)}"  style="font-size: 30upx;margin: 13px 0;overflow-y: auto;max-height: 150px;margin-left: 15px;" :auto-height="true"/>
							</main-bar-inter> -->
							<!-- border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 44upx; -->
							<view style="width: 580upx;margin-top: 42upx;display: flex;border-bottom: 1upx solid rgb(213,213,213);padding-bottom: 12upx;">
								<!-- font-size: 28upx;color: #767676; margin: 13px 0;-->
								<view style="margin: 13px 0;font-size: 30upx;color: #767676;width: 200upx;">完成工程量：</view>	
								<textarea placeholder="请输入" :value="item.repairDailyContent" @input="function(e) {changeRepairDailyContent(e, item)}"  style="font-size: 30upx;margin: 13px 0;overflow-y: auto;max-height: 150px;width: 420upx;" :auto-height="true"/>
							</view>
														
							<!-- <view>
								<view class="file" style="width: 180upx;">施工内容</view>
								<input style="margin-left: 58upx;" :value="item.repairDailyContent" @input="function(e) {changeRepairDailyContent(e, item)}"/>
							</view> -->
							<!-- <main-bar-inter :name="'维修坑槽长度'" :vm="'190upx'">
								<input :value='item.splength' @input="function(e) {changeSpLength(e, item)}"/>
							</main-bar-inter>
							<main-bar-inter :name="'维修坑槽宽度'" :vm="'190upx'">
								<input :value='item.spwidth' @input="function(e) {changeSpWidth(e, item)}"/>
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
						<main-bar-inter :name="'合同'" :vm="'190upx'">
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view style="font-size: 30upx;color: #383838;">{{contractName}}</view>
								<image src="../../static/page/diseaseAdd/arrow_right.png" style="width: 14upx;height: 26upx;" @click="showContractList"></image>
							</view>
						</main-bar-inter>
						<main-bar-inter :name="'清单'" :vm="'190upx'" v-if='this.checklist.length > 0'>
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view style="font-size: 30upx;color: #383838;">{{checklistName}}</view>
								<image src="../../static/page/diseaseAdd/arrow_right.png" style="width: 14upx;height: 26upx;" @click="showChecklist"></image>
							</view>
						</main-bar-inter>
						<view style="margin: 42upx 0;" class="display alert_item_center space-between" v-if='this.sublist.length > 0'>
							<view>添加工程量</view>
							<image src="../../static/page/addIcon.png" style="width: 32upx;height: 32upx;" @click="addEngineerList"></image>
						</view>
						<view v-for="item in engineerList" class="engineer-item" v-if="item.delFlag !== '1'">
							<view class="display alert_item_center space-between">
								<view style="width: 500upx;font-size: 30upx;">{{item.name}}</view>
								<image src="../../static/page/delete.png" style="width: 50upx;height: 50upx;" @click="deleteEngineerList(item)"></image>
							</view>
							<main-bar-inter :name="'申请'" :vm="'190upx'">
								<view style="display: flex;align-items: center;">
									<input placeholder="请输入" type='number' style="width: 100upx;" v-model="item.value"/>
									<view style="margin-left: 10upx;">{{item.serviceMeaUnit}}</view>
								</view>
							</main-bar-inter>
						</view>
					</view>
					<view v-if="bottomTabsValue === 2" style="box-sizing: border-box;padding-left: 24upx;padding-right: 24upx;">
						<view style="margin: 40upx 0;" class="display alert_item_center space-between">
							<view>添加人机料</view>
							<image src="../../static/page/addIcon.png" style="width: 32upx;height: 32upx;" @click="addBaseMaterial"></image>
						</view>
						<view class="engineer-item" v-for="item in addBaseMaterialList" v-if="item.delFlag !== '1'">
							<main-bar-inter :name="item.name" :vm="'190upx'">
								<view style="display: flex;align-items: center;">
									<input type='number' style='width: 80upx;' :value="item.costNum" @input="function(e) {changeBaseMaterialList(e, item)}"/>
									<view style="width: 60upx;">{{item.materialUnit}}</view>
								</view>
								<image src="../../static/page/delete.png" style="width: 50upx;height: 50upx;margin-left: 550upx;position: absolute;" @click="deleteBaseMaterialList(item)"></image>
							</main-bar-inter>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabsValue === 2">
				<view class="order-state-two">
					<view class="order-text">
						<text class="des-item-txt">工单状态:</text>
						<view class="state-wrap" :class="detaileData.class">{{detaileData.status_text}}</view>
					</view>
					<view v-for="(item, index) in transitionList" class="transition-item" style="padding: 36upx;">
						<view class="display">
							<view v-if="item.used || item.status === '2'" class="display alert_item_center" :class="item.status_text === '未提交' ? 'tran-no' : 'tran-ing'" style="width: 90upx;height: 34upx;font-size: 24upx;border-radius: 4upx;justify-content: center;color: #ffffff;margin-top: 4upx;">{{item.status_text}}</view>
							<view :style="(item.used || item.status === '2') ? 'width: 480upx;margin-left: 10upx;' : 'width: 570upx;'" style="font-size: 30upx;color: #383838;">转序节点{{index + 1}}: {{item.sequenceName}}</view>
							<image v-if="item.used || item.status === '2'" :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;margin-top: 8upx;" @click="openTransitionDetaile(item)"></image>
						</view>
						<view v-if="item.open">
							<!-- <main-bar-inter :name="''" :isDis='true'>
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
		<view v-if="tabsValue === 1" class="display alert_item_center bottom-btn-wrap">
			<view class="btn-item" style="height: 78upx;border: 1upx solid #3695e2;color: #1890FF;background: #fff;" @click="saveCheck(false)">保存</view>
			<view class="btn-item" style="margin-left: 30upx;color: #fff;background: #1890FF;" @click="saveCheck(true)">提交</view>
		</view>
		<view v-if="tabsValue === 2" class="display alert_item_center bottom-btn-wrap">
			<view class="btn-item" style="height: 78upx;border: 1upx solid #3695e2;color: #1890FF;background: #fff;" @click="saveTran(false)">保存</view>
			<view class="btn-item" style="margin-left: 30upx;color: #fff;background: #1890FF;" @click="saveTran(true)">提交</view>
		</view>
		<radion-button-bar v-if="isHidden" :list="list" :title="title" @getvalue="getvalue" :id="id" @textScreen="textScreen" />
		<n-transition ref='tk'>
			<time-bar @clickQu="clickTk" @hide="$refs.tk.hide()"></time-bar>
		</n-transition>
		<n-transition ref='qutk'>
			<time-bar @clickQu="clickQuTk" @hide="$refs.qutk.hide()"></time-bar>
		</n-transition>
		<n-transition ref='tx' :index="50">
			<time-hour-bar @clickQu="clickQu"  @hide="$refs.tx.hide()"></time-hour-bar>
		</n-transition>
		<sub-list-choice-bar-new v-if="isHiddenThree" :title="titleThree" :threeList="threeList" @valueCli="valueCli"></sub-list-choice-bar-new>
		<!-- <three-buttom-choice-bar v-if="isHiddenThree" :title="titleThree" :threeList="threeList" @valueCli="valueCli"></three-buttom-choice-bar> -->
		<n-transition ref='rx' :background="'rgb(241, 241, 243)'">
			<clone-bar :background="'rgb(241, 241, 243)'" @screen="screenAlarm"  @closeno="$refs.rx.hide()">
				<view style="margin-bottom: 10upx;font-size: 30upx;color: #383838;">请选择验收人：</view>
				<view style="display: flex;margin-left: -8upx;margin-bottom: 10upx;font-size: 30upx;color: #383838;">
					<view v-for="item in userList">
						<view :class="item.select ? 'reject-select' : 'reject-default'" @click='chooseUser(item)'>{{item.trueName}}</view>
					</view>
				</view>
			</clone-bar>
		</n-transition>
	</view>
</template>

<script>
	import TabsBar from '@/components/tabs-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import RadionButtonBar from '@/components/radio-button-bar/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	import NTransition from '@/components/n-transition/n-transition.vue'
	import TimeIntegrityBar from '@/components/time-integrity-bar/index.vue'
	import TimeHourBar from '@/components/time-hour-bar/index.vue'
	import TimeBar from '@/components/time-bar/index.vue'
	import ThreeButtomChoiceBar from '@/components/three-buttom-choice-bar/index.vue'
	import subListChoiceBarNew from '@/components/sublist-choice-bar-new/index.vue'
	import CloneBar from '@/components/clone-bar/index.vue'
	export default{
		components: {
			TabsBar, MainBarInter, RadionButtonBar, uploadImageBar, NTransition, TimeIntegrityBar, TimeHourBar, TimeBar, ThreeButtomChoiceBar, subListChoiceBarNew, CloneBar
		},
		data(){
			return {
				name: '护理详情',
				rightFlag: false,
				tabs: [{
						id: 1,
						name: '病害信息'
					},
					/*暂时隐藏 {
						id: 2,
						name: '转序信息'
					}, */
					{
						id: 3,
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
				contractName: '',
				contractId: '',
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
				checklistName: '',
				checklistId: '',
				checklist: [
				],
				sublist: [],
				engineerList: [
				],
				transitionList: [
					// {
					// 	id: 1,
					// 	state: '通过',
					// 	open: false,
					// }
				],
				matRepairRectificationEnclosureList: [],
				isUpdateFalse: false,
				isUpdate: true,
				fileOne: [],
				fileTwo: [],
				fileThree: [],
				fileFour: [],
				startTime: '',
				endTime: '',
				timeFlag: '',
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
				repairItemId: null,
				baseMaterial: [],
				addBaseMaterialList: [],
				isHiddenThree: false,
				titleThree: '添加工程量',
				threeList: [],
				userList: [],
				selectUser: {},
				logData: []
			}
		},
		methods:{
			getItemDetaile(params) {
			    let _this = this
			    _this.$api.send({
			         url: `/repair/matRepair/getDiseaseMessageAndRepairing?id=${params.id}&user=${params.user}`,
			         method: 'get',
			         success:(res)=>{
						  //console.log(res,"+++++++++++++")
						  _this.itemDetaileData = res.data
						  _this.repairRecordList = res.data.matRepairDailyList
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
						  if (res.data.matDisease) {
							  //甲方用户
							  /* let params = {
								code: 'AMaintainEngineer,AMaintainDirector',
								id: res.data.matDisease.assignUnitId
							  } */
							  //监理用户(根据监理单位ID和角色获得监理角色的用户）(根据项目或合同ID->获取监理单位->从而获得监理角色的用户)
							  /*let params = {
								code: 'BSupervisorManager',
								id: res.data.matDisease[0].supervisorUnitId
							  }*/
							  let params = {
								code: 'AMaintainEngineer',
								id: res.data.matDisease[0].assignUnitId
							  }
							  _this.getUserList(params)
						  }

						  if (res.data.id) {
							  _this.getLog(res.data.id,res.data.diseaseId)
						  }
						  if (res.data.contractId && res.data.contractId !== '') {
							_this.getUnitList(res.data.contractId)
							_this.contractName = res.data.contractName
							_this.checklistName = res.data.relaManageUnitName
							_this.contractId = res.data.contractId
							_this.checklistId = res.data.relaManageUnitId
							if (res.data.relaManageUnitId && res.data.relaManageUnitId !== '') {
								_this.getSubList(res.data.contractId, res.data.relaManageUnitId)
							}
						  }
						  _this.addBaseMaterialList = JSON.parse(JSON.stringify(_this.itemDetaileData.matRepairMaterialRelList))
						  _this.addBaseMaterialList.map(item => {
								if (item.costNum) {
								} else {
								  _this.$set(item, 'costNum', '')
								}
						  })
						  _this.engineerList = JSON.parse(JSON.stringify(_this.itemDetaileData.matRepairMeasureList))
						  _this.engineerList.map(item => {
							  _this.$set(item, 'name', item.serviceMeaSubName)
							  if (item.applyNum) {
								  _this.$set(item, 'value', item.applyNum)
							  } else {
								  _this.$set(item, 'value', '')
							  }
						  })
			         },
			         fail:(res)=>{
			          console.log(res,"+++++++++++++++++++++++++++++")
			         }
			    })
			},
			getContractList() {
				let _this = this
				_this.$api.send({
				     url: `/contract/mat-con-contract-model/getContractList`,
				     method: 'post',
				     success:(res)=>{
				      //console.log(res,"+++++++++++++")
					  _this.contractList = res.data
					  _this.contractList.map(item => {
						  _this.$set(item, 'name', item.contractName)
					  })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			getUnitList(id) {
				let _this = this
				_this.$api.send({
				     url: `/contract/mat-con-contract-model/getUnitList?contractId=${id}`,
				     method: 'post',
				     success:(res)=>{
				      //console.log(res,"+++++++++++++")
					  _this.checklist = res.data
					  _this.checklist.map(item => {
						  _this.$set(item, 'name', item.unitName)
					  })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			getSubList(id, unitId) {
				let _this = this
				_this.$api.send({
				     url: `/contract/mat-con-contract-model/getSubList?contractId=${id}&unitId=${unitId}`,
				     method: 'post',
				     success:(res)=>{
				      //console.log(res,"-----------+++++++++++++------------")
					  //let _listData = res.data[0]			  
					  // console.log(Object.keys(_listData))
					  let _sublist = []
					  for (let i = 0;i < res.data.length;i++) { 
						let _listData = res.data[i];  
						for (let prop in _listData) {
						  if (_listData[prop].length > 0) {
							  let _item = {
								  id: Object.keys(_listData).findIndex(item => {return item === prop}),
								  name: prop,
								  depth: 1,
									isOpen: false,
								  checkList: []
							  }
							  _listData[prop].map((item, index) => {
								  let _itemData = {
									id: item.id,
									name: item.serviceMeaSubName,
									serviceMeaUnit: item.serviceMeaSubUint,
									isOpen: false,
									depth: 2,
									parentId: Object.keys(_listData).findIndex(itemIndex => {return itemIndex === prop}),
									serviceMeaSubNo: item.serviceMeaSubNo,
									serviceMeaProId: item.serviceMeaProId,
									checkList: []
								  }
								  _item.checkList.push(_itemData)
							  })
							  _sublist.push(_item)
						  }
						}						
					  }
					  //console.log(_sublist)
					  _this.sublist = _sublist
					  // _this.checklist.map(item => {
						 //  _this.$set(item, 'name', item.unitName)
					  // })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			tavbar(id) {
				let _this = this
				_this.tabsValue = id
				if (id === 2) {
					_this.$api.send({
					     url: `/repair/matRepairSequsenceRel/getSequsenceRelListByRepairId?repairId=${_this.itemDetaileData.id}`,
					     method: 'get',
					     success:(res)=>{
							  //console.log(res,"+++++++++++++")
							  let _index = -1
							  for (let i = 0;i < res.data.length;i++) {
								  if (res.data[i].status === '1') {
									  _index = i
									  break
								  }
							  }
							  //console.log(_index)
							  _this.transitionList = res.data
							  _this.transitionList.map((item, index) => {
								  _this.$set(item, 'open', false)
								  _this.$set(item, 'sequsenceEnclosureRemoteListT', [])
								  if (index > _index) {
									_this.$set(item, 'used', false)
								  } else {
									_this.$set(item, 'used', true)
								  }
							  })
					     },
					     fail:(res)=>{
					      console.log(res,"+++++++++++++++++++++++++++++")
					     }
					})
				}
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
									  _this.$set(items, 'matRepairDailySafeEnclosureListT', JSON.parse(JSON.stringify(res.data.matRepairDailySafeEnclosureList)))
									  _this.$set(items, 'matRepairDailyBeforeEnclosureList', res.data.matRepairDailyBeforeEnclosureList)
									  _this.$set(items, 'matRepairDailyBeforeEnclosureListT', JSON.parse(JSON.stringify(res.data.matRepairDailyBeforeEnclosureList)))
									  _this.$set(items, 'matRepairDailyMidEnclosureList', res.data.matRepairDailyMidEnclosureList)
									  _this.$set(items, 'matRepairDailyMidEnclosureListT', JSON.parse(JSON.stringify(res.data.matRepairDailyMidEnclosureList)))
									  _this.$set(items, 'matRepairDailyAfterEnclosureList', res.data.matRepairDailyAfterEnclosureList)
									  _this.$set(items, 'matRepairDailyAfterEnclosureListT', JSON.parse(JSON.stringify(res.data.matRepairDailyAfterEnclosureList)))
									  //console.log(items)								
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
			textScreen(text) {
				if (this.title === '选择合同') {
					if (text) {
						this.list = this.contractList.filter(item => item.name && item.name.toString().indexOf(text) !== -1)
					}else{
						this.list =this.contractList
					}
				} else if (this.title === '选择清单') {
					if (text) {
						this.list = this.checklist.filter(item => item.name && item.name.toString().indexOf(text) !== -1)
					}else{
						this.list =this.checklist
					}
				} else if (this.title === '选择人机料') {
					if (text) {
						this.list = this.baseMaterial.filter(item => item.name && item.name.toString().indexOf(text) !== -1)
					}else{
						this.list =this.baseMaterial
					}
				}
			},
			getvalue(index, title) {
				if (title === '选择合同') {
					if (this.contractId !== '' && this.contractId === this.list[index].id) {
					} else {
						this.checklistName = ''
						this.checklistId = ''
						this.sublist = []
						this.engineerList = []
					}
					this.contractName = this.list[index].name
					this.contractId = this.list[index].id
					this.getUnitList(this.list[index].id)
				} else if (title === '选择清单') {
					if (this.checklistId !== '' && this.checklistId === this.list[index].id) {
					} else {
						this.engineerList = []
					}
					this.checklistName = this.list[index].name
					this.checklistId = this.list[index].unitId
					this.getSubList(this.contractId, this.list[index].unitId)
				} else {
					this.$set(this.list[index], 'costNum', '')
					this.addBaseMaterialList.push(JSON.parse(JSON.stringify(this.list[index])))
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
				if (item.used || item.status === '2') {
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
				}
			},
			updateImageTransition(fileList, item) {
				this.transitionList.map(itemData => {
					if (itemData.id === item.id) {
						itemData.sequsenceEnclosureRemoteList = fileList
						itemData.sequsenceEnclosureRemoteListT = fileList
					}
				})
			},
			deleteTranClick(index, item) {
				item.sequsenceEnclosureRemoteList[index].modifyType = 2
				item.sequsenceEnclosureRemoteListT[index].modifyType = 2
				//item.sequsenceEnclosureRemoteListT.splice(index, 1)
			},
			saveTran(flag) {
				let _this = this
				let _postItem = undefined
				_this.transitionList.map(item => {
					if (item.used) {
						_postItem = JSON.parse(JSON.stringify(item))
					}
				})
				if (flag && _postItem) {
					_postItem.status = '2'
					_postItem.status_text = '已提交'
				}
				let _params = _postItem
				if (_params) {
					if (_params.sequsenceEnclosureRemoteList.length > 0) {
						_this.$api.send({
						     url: `/repair/matRepairSequsenceRel/submit`,
						     method: 'post',
							 data: _params,
						     success:(res)=>{
								 //console.log(res,"+++++++++++++++++++++++++++++")
								 uni.showToast({
								 	title: flag ? '提交成功' : '保存成功',
								 	icon: 'none',
								 	duration: 3000
								 })
								uni.navigateBack({ delta: 1 });
								// uni.navigateTo({url: '/pages/diseaseRepair/index'})
						     },
						     fail:(res)=>{
						      console.log(res,"+++++++++++++++++++++++++++++")
						     }
						})
					} else {
						uni.showToast({
							title: '请添加转序图片',
							icon: 'none',
							duration: 3000
						})
					}
				}
			},
			getdate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				
				if (month >= 1 && month <= 9) {
				  	month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					  strDate = "0" + strDate;
				}
				var currentdate = year + "-" + month + "-" + strDate;
				return currentdate;
			},
			addRepairRecord() {
				let hasNewItem = false
				let newFlagIndex = this.repairRecordList.findIndex(item => item.newFlag)
				let hasTodayRecordIndex = this.repairRecordList.findIndex(item => (item.repairDate && item.repairDate.split(' ')[0]) === (new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()))
				if (newFlagIndex > -1 || hasTodayRecordIndex > -1) {
					hasNewItem = true
				}
				if (hasNewItem) {
					uni.showToast({
						title: '已添加过今天的维修记录',
						icon: 'none',
						duration: 2000
					})
				} else {
					let _item = {
						newFlag: true,
						repairDate: this.getdate(),
						open: true,
						repairDailyTimeStart: '2022-01-01 09:00:00',
						repairDailyTimeEnd: '2022-01-01 17:00:00',
						repairDailyTimeStartBean: '09:00',
						repairDailyTimeEndBean: '17:00',
						repairDailyContent: '',
						splength: '',
						spwidth: '',
						matRepairDailySafeEnclosureList: [],
						matRepairDailyBeforeEnclosureList: [],
						matRepairDailyMidEnclosureList: [],
						matRepairDailyAfterEnclosureList: [],
						matRepairDailySafeEnclosureListT: [],
						matRepairDailyBeforeEnclosureListT: [],
						matRepairDailyMidEnclosureListT: [],
						matRepairDailyAfterEnclosureListT: []
					}
					this.repairRecordList.push(_item)
				}
			},
			updateImage() {},
			chooseTime(flag, item) {
				this.$refs.tx.show()
				this.timeFlag = flag
				if (item.newFlag) {
					this.repairItemId = 'new'
				} else {
					this.repairItemId = item.id
				}
			},
			chooseQuDate(flag, item) {
				this.$refs.qutk.show()
				this.timeFlag = flag
				if (item.newFlag) {
					this.repairItemId = 'new'
				} else {
					this.repairItemId = item.id
				}
			},
			chooseDate(item) {
				this.$refs.tk.show()
				if (item.newFlag) {
					this.repairItemId = 'new'
				} else {
					this.repairItemId = item.id
				}
			},
			clickTk(value){
				let _this = this
				//_this.repairDate=value
				_this.$refs.tk.hide()
				//_this.$refs.tx.hide()
				_this.startTime = value
				if (_this.repairItemId === 'new') {
					_this.repairRecordList.map(item => {
						if (item.newFlag) {
							item.repairDate = value
						}
					})
				} else {
					_this.repairRecordList.map(item => {
						if (item.id === _this.repairItemId) {
							item.repairDate = value
						}
					})
				}
			},
			clickQuTk(value) {//注释掉时分
				let _this = this
				_this.$refs.qutk.hide()
				if (_this.timeFlag === 'start') {
					//_this.startTime = value
					if (_this.repairItemId === 'new') {
						_this.repairRecordList.map(item => {
							if (item.newFlag) {
								item.repairDailyTimeStart = value
								//item.repairDailyTimeStartBean = value
							}
						})
					} else {
						_this.repairRecordList.map(item => {
							if (item.id === _this.repairItemId) {
								item.repairDailyTimeStart = value
								//item.repairDailyTimeStartBean = value
							}
						})
					}
				} else {
					//_this.endTime = value
					if (_this.repairItemId === 'new') {
						_this.repairRecordList.map(item => {
							if (item.newFlag) {
								item.repairDailyTimeEnd = value
								//item.repairDailyTimeEndBean = value
							}
						})
					} else {
						_this.repairRecordList.map(item => {
							if (item.id === _this.repairItemId) {
								item.repairDailyTimeEnd = value
								//item.repairDailyTimeEndBean = value
							}
						})
					}
				}
				_this.timeFlag = ''
			},
			clickQu(value) {//只有时
				let _this = this
				_this.$refs.tx.hide()
				if (_this.timeFlag === 'start') {
					_this.startTime = value
					if (_this.repairItemId === 'new') {
						_this.repairRecordList.map(item => {
							if (item.newFlag) {
								//item.repairDailyTimeStart = value
								item.repairDailyTimeStartBean = value
							}
						})
					} else {
						_this.repairRecordList.map(item => {
							if (item.id === _this.repairItemId) {
								//item.repairDailyTimeStart = value
								item.repairDailyTimeStartBean = value
							}
						})
					}
				} else {
					_this.endTime = value
					if (_this.repairItemId === 'new') {
						_this.repairRecordList.map(item => {
							if (item.newFlag) {
								//item.repairDailyTimeEnd = value
								item.repairDailyTimeEndBean = value
							}
						})
					} else {
						_this.repairRecordList.map(item => {
							if (item.id === _this.repairItemId) {
								//item.repairDailyTimeEnd = value
								item.repairDailyTimeEndBean = value
							}
						})
					}
				}
				_this.timeFlag = ''
			},
			changeRepairDailyContent(e, item) {
				item.repairDailyContent = e.target.value
			},
			changeSpWidth(e, item) {
				item.spwidth = e.target.value
			},
			changeSpLength(e, item) {
				item.splength = e.target.value
			},
			saveCheck(flag) {
				if (flag) {
					if (this.repairRecordList.length > 0) {
						let newFlagIndex = this.repairRecordList.findIndex(item => item.newFlag)
						let hasTodayRecordIndex = this.repairRecordList.findIndex(item => (item.repairDate && item.repairDate.split(' ')[0]) === (new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()))
						if (!this.isDailyRepair || hasTodayRecordIndex > -1 || newFlagIndex > -1) {
							let _index = !this.isDailyRepair ? 0 : (newFlagIndex > -1 ? newFlagIndex : hasTodayRecordIndex)
							if (!this.repairRecordList[_index].matRepairDailySafeEnclosureListT || this.repairRecordList[_index].matRepairDailySafeEnclosureListT.length < 1) {
								uni.showToast({
									title:'请上传安全照片',
									icon: 'none',
									duration: 3000
								})
							} else if (!this.repairRecordList[_index].matRepairDailyBeforeEnclosureListT || this.repairRecordList[_index].matRepairDailyBeforeEnclosureListT.length < 1) {
								uni.showToast({
									title:'请上传施工前照片',
									icon: 'none',
									duration: 3000
								})
							} else if (!this.repairRecordList[_index].matRepairDailyMidEnclosureListT || this.repairRecordList[_index].matRepairDailyMidEnclosureListT.length < 1) {
								uni.showToast({
									title:'请上传施工中照片',
									icon: 'none',
									duration: 3000
								})
							} else if (!this.repairRecordList[_index].matRepairDailyAfterEnclosureListT || this.repairRecordList[_index].matRepairDailyAfterEnclosureListT.length < 1) {
								uni.showToast({
									title:'请上传施工后照片',
									icon: 'none',
									duration: 3000
								})
							} else if (!this.repairRecordList[_index].repairDailyContent || this.repairRecordList[_index].repairDailyContent.toString().trim().length < 1) {
								uni.showToast({
									title:'请添写完成工程量',
									icon: 'none',
									duration: 3000
								})
							} else {
								// this.$refs.rx.show()
								this.checkEngineer()
							}
						} else {
							// this.$refs.rx.show()
							this.checkEngineer()
						}
					} else {
						// this.$refs.rx.show()
						this.checkEngineer()
					}
				} else {
					this.saveData(flag)
				}
			},
			checkEngineer() {
				if (this.engineerList.length > 0) {
					if (this.engineerList.findIndex(item => item.value.toString().trim() === '' && item.delFlag !== '1') > -1) {
						uni.showToast({
							title:'申请工程量数值不能为空',
							icon: 'none',
							duration: 3000
						})
					} else {
						this.checkBaseMaterial()
					}
				} else {
					this.checkBaseMaterial()
				}
			},
			checkBaseMaterial() {
				if (this.addBaseMaterialList.length > 0) {
					if (this.addBaseMaterialList.findIndex(item => item.costNum.toString().trim() === '' && item.delFlag !== '1') > -1) {
						uni.showToast({
							title:'人机料信息数值不能为空',
							icon: 'none',
							duration: 3000
						})
					} else {
						// this.$refs.rx.show()
						// console.log(this.addBaseMaterialList)
						this.checkTransition()
					}
				} else {
					// this.$refs.rx.show()
					// console.log(this.addBaseMaterialList)
					this.checkTransition()
				}
			},
			checkTransition() {
				let _this = this
				_this.$api.send({
				     url: `/repair/matRepairSequsenceRel/getSequsenceRelListByRepairId?repairId=${_this.itemDetaileData.id}`,
				     method: 'get',
				     success:(res)=>{
						 let _flag = true
						  if (res.data.length > 0) {
							  res.data.map(item => {
								  if (item.status === '1') {
									  _flag = false
								  }
							  })
						  } else {
							  _flag = true
						  }
						  if (_flag) {
							  this.$refs.rx.show()
						  } else {
							  uni.showToast({
							  	title:'当前转序信息未全部提交',
							  	icon: 'none',
							  	duration: 3000
							  })
						  }
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			saveData(flag) {//true 提交  false 保存	
				if (this.itemDetaileData.matRepairMeasureList && this.itemDetaileData.matRepairMeasureList.length > 0) {
					// this.itemDetaileData.matRepairMeasureList
				} else {
					// this.$set(this.itemDetaileData, 'matRepairMeasureList', [{contractId: this.contractId, relaManageUnitId: this.checklistId}])
					this.$set(this.itemDetaileData, 'matRepairMeasureList', [])
				}
				let _engineerList = []
				this.engineerList.map(item => {
					if (item.id) {
						item.applyNum = item.value
						_engineerList.push(item)
					} else {
						let _item = {
							relaManageUnitId: this.checklistId,
							// repairId: '',
							contractId: this.contractId,
							serviceMeaSubName: item.name,
							serviceMeaSubNo: item.serviceMeaSubNo,
							applyNum: item.value,
							serviceMeaUnit: item.serviceMeaUnit,
							serviceMeaSubId: item.serviceMeaSubId,
							serviceMeaProId: item.serviceMeaProId,
							delFlag: item.delFlag,
						}
						_engineerList.push(_item)
					}
				})
				this.itemDetaileData.matRepairMeasureList = _engineerList
				if (!this.itemDetaileData.matRepairMaterialRelList || this.itemDetaileData.matRepairMaterialRelList.length < 1) {
					let _matRepairMaterialRelList = []
					this.addBaseMaterialList.map(item => {
						let _item = {
							costNum: item.costNum,
							materialId: item.id,
							materialUnit: item.materialUnit,
							name: item.name,
							delFlag: item.delFlag
						}
						_matRepairMaterialRelList.push(_item)
					})
					this.$set(this.itemDetaileData, 'matRepairMaterialRelList', _matRepairMaterialRelList)
				} else {
					let _matRepairMaterialRelList = []
					this.addBaseMaterialList.map(item => {
						if (item.repairId) {
							_matRepairMaterialRelList.push(item)
						} else {
							let _item = {
								costNum: item.costNum,
								materialId: item.id,
								materialUnit: item.materialUnit,
								name: item.name,
								delFlag: item.delFlag
							}
							_matRepairMaterialRelList.push(_item)
						}
					})
					this.itemDetaileData.matRepairMaterialRelList = _matRepairMaterialRelList
				}
				if (!this.itemDetaileData.contractId) {
					this.$set(this.itemDetaileData, 'contractId', this.contractId)
				} else {
					this.itemDetaileData.contractId = this.contractId
				}
				if (!this.itemDetaileData.relaManageUnitId) {
					this.$set(this.itemDetaileData, 'relaManageUnitId', this.checklistId)
				} else {
					this.itemDetaileData.relaManageUnitId = this.checklistId
				}
				if (!this.itemDetaileData.contractName) {
					this.$set(this.itemDetaileData, 'contractName', this.contractName)
				} else {
					this.itemDetaileData.contractName = this.contractName
				}
				if (!this.itemDetaileData.relaManageUnitName) {
					this.$set(this.itemDetaileData, 'relaManageUnitName', this.checklistName)
				} else {
					this.itemDetaileData.relaManageUnitName = this.checklistName
				}
				//如果有监理验收
				//this.itemDetaileData.status = flag ? '7' : '2'
				//this.itemDetaileData.status_text = flag ? '监理验收' : '维修中'
				this.itemDetaileData.status = flag ? '8' : '2'
				this.itemDetaileData.status_text = flag ? '验收审核' : '维修中'
				if (flag) {
					this.$set(this.itemDetaileData, 'acceUser', this.selectUser.id)
				}
				let _matRepairDailyList = []
				this.itemDetaileData.matRepairDailyList.map(item => {
					if (item.newFlag) {
						let repairDailyTimeStart0 = this.isDailyRepair ? item.repairDate : item.repairDailyTimeStart && item.repairDailyTimeStart.split(' ')[0]
						let repairDailyTimeEnd0 = this.isDailyRepair ? item.repairDate : item.repairDailyTimeEnd && item.repairDailyTimeEnd.split(' ')[0]
						let repairDate0 = this.isDailyRepair ? item.repairDate : null
						let _item = {
							repairDate: repairDate0,
							repairDailyTimeEnd: repairDailyTimeEnd0 + ' ' + item.repairDailyTimeEndBean + ':00',
							repairDailyTimeStart: repairDailyTimeStart0 + ' ' + item.repairDailyTimeStartBean + ':00',
							splength: item.splength,
							spwidth: item.spwidth,
							repairDailyContent: item.repairDailyContent,
							matRepairDailySafeEnclosureList: item.matRepairDailySafeEnclosureList,
							matRepairDailyBeforeEnclosureList: item.matRepairDailyBeforeEnclosureList,
							matRepairDailyMidEnclosureList: item.matRepairDailyMidEnclosureList,
							matRepairDailyAfterEnclosureList: item.matRepairDailyAfterEnclosureList,
						}
						_matRepairDailyList.push(_item)
					} else {
						this.$delete(item,'open')
						this.$delete(item,'matRepairDailySafeEnclosureListT')
						this.$delete(item,'matRepairDailyBeforeEnclosureListT')
						this.$delete(item,'matRepairDailyMidEnclosureListT')
						this.$delete(item,'matRepairDailyAfterEnclosureListT')
						//item的日期修改一下
						if(this.isDailyRepair){							
							item.repairDailyTimeStart = item.repairDate + ' ' + item.repairDailyTimeStartBean + ':00'
							item.repairDailyTimeEnd = item.repairDate + ' ' + item.repairDailyTimeEndBean + ':00'
						}else{
							item.repairDailyTimeStart = item.repairDailyTimeStart && item.repairDailyTimeStart.split(' ')[0] + ' ' + item.repairDailyTimeStartBean + ':00'
							item.repairDailyTimeEnd = item.repairDailyTimeEnd && item.repairDailyTimeEnd.split(' ')[0] + ' ' + item.repairDailyTimeEndBean + ':00'
						}										
						_matRepairDailyList.push(item)
					}
				})
				this.itemDetaileData.matRepairDailyList = _matRepairDailyList
				//console.log("-------------------")
				//console.log(this.itemDetaileData)
				let _params = this.itemDetaileData
				let _this = this
				if (flag && _this.itemDetaileData.matRepairMeasureList.length < 1 && _this.itemDetaileData.contractName === '' && _this.itemDetaileData.relaManageUnitName === '') {
					uni.showToast({
						title:'请添加工程量信息',
						icon: 'none',
						duration: 3000
					})
				} else {
					_this.$api.send({
					     url: `/repair/matRepair/saveOrSubmit`,
					     method: 'post',
						 data: _params,
					     success:(res)=>{
					      //console.log(res,"+++++++++++++")
						  if (res.code === 200) {
							 uni.showToast({
							 	title: flag ? '提交成功' : '保存成功',
							 	icon: 'none',
							 	duration: 3000
							 })
							 uni.navigateBack({ delta: 1 });
							// uni.navigateTo({url: '/pages/diseaseRepair/index'})
						  }
					     },
					     fail:(res)=>{
					      console.log(res,"+++++++++++++++++++++++++++++")
					     }
					})
				}
				
			},
			getBaseMaterial() {
				this.$api.send({
				     url: `/repair/matBaseMaterial/list`,
				     method: 'post',
				     success:(res)=>{
						  //console.log(res,"+++++++++++++")
						  this.baseMaterial = res.data
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			addBaseMaterial() {
				this.isHidden = true
				this.title = '选择人机料'
				this.list = this.baseMaterial
			},
			changeBaseMaterialList(e, item) {
				item.costNum = e.target.value
			},
			valueCli(ids) {
				let _this = this
				ids.map(idItem => {
					_this.sublist.map(item => {
						item.checkList.map(item2 => {
							if (item2.id === idItem) {
								let _item = JSON.parse(JSON.stringify(item2))
								_this.$set(_item, 'value', '')
								_this.$set(_item, 'serviceMeaSubId', _item.id)
								_this.$set(_item, 'serviceMeaProId', _item.serviceMeaProId)
								delete _item.id
								if (_this.engineerList.findIndex(itemData => itemData.serviceMeaSubId === _item.serviceMeaSubId && itemData.delFlag !== '1') > -1) {
									uni.showToast({
										title:'已添加过此工程量',
										icon: 'none',
										duration: 3000
									})
								} else {
									_this.engineerList.push(_item)
								}
							}
						})
					})
				})
				_this.isHiddenThree = false
			},
			addEngineerList() {
				this.threeList = this.sublist
				this.isHiddenThree = true
			},
			deleteEngineerList(item) {
				this.engineerList.map(itemData => {
					//console.log(itemData)
					if (itemData.serviceMeaSubId === item.serviceMeaSubId) {
						if (itemData.delFlag) {
							itemData.delFlag = '1'
						} else {
							this.$set(itemData, 'delFlag', '1')
						}
					}
				})
			},
			deleteBaseMaterialList(item) {
				this.addBaseMaterialList.map(itemData => {
					if (itemData.id === item.id) {
						if (itemData.delFlag) {
							itemData.delFlag = '1'
						} else {
							this.$set(itemData, 'delFlag', '1')
						}
					}
				})
			},
			updateImageOne(fileList, item) {
				item.matRepairDailySafeEnclosureList = fileList
				item.matRepairDailySafeEnclosureListT = fileList
			},
			updateImageTwo(fileList, item) {
				item.matRepairDailyBeforeEnclosureList = fileList
				item.matRepairDailyBeforeEnclosureListT = fileList
			},
			updateImageThree(fileList, item) {
				item.matRepairDailyMidEnclosureList = fileList
				item.matRepairDailyMidEnclosureListT = fileList
			},
			updateImageFour(fileList, item) {
				item.matRepairDailyAfterEnclosureList = fileList
				item.matRepairDailyAfterEnclosureListT = fileList
			},
			deleteVideoClickOne(index, item) {
				item.matRepairDailySafeEnclosureList[index].modifyType = 2
				item.matRepairDailySafeEnclosureListT[index].modifyType = 2
				//item.matRepairDailySafeEnclosureListT.splice(index, 1)
			},
			deleteVideoClickTwo(index, item) {
				item.matRepairDailyBeforeEnclosureList[index].modifyType = 2
				item.matRepairDailyBeforeEnclosureListT[index].modifyType = 2
				//item.matRepairDailyBeforeEnclosureListT.splice(index, 1)
			},
			deleteVideoClickThree(index, item) {
				item.matRepairDailyMidEnclosureList[index].modifyType = 2
				item.matRepairDailyMidEnclosureListT[index].modifyType = 2
				//item.matRepairDailyMidEnclosureListT.splice(index, 1)
			},
			deleteVideoClickFour(index, item) {
				item.matRepairDailyAfterEnclosureList[index].modifyType = 2
				item.matRepairDailyAfterEnclosureListT[index].modifyType = 2
				//item.matRepairDailyAfterEnclosureListT.splice(index, 1)
			},
			getUserList(params) {
				let _this = this
				_this.$api.send({
				     url: `/sys-auth/user/getUserListByRoleCodeAndDeptId?deptId=${params.id}&roleCode=${params.code}`,
				     method: 'get',
				     success:(res)=>{
						  //console.log(res,"_this.userList+++++++++++++")
						  _this.userList = res.data
						  _this.userList.map(item => {
							  _this.$set(item, 'select', false)
						  })
				     },
				     fail:(res)=>{
				      console.log(res,"+++++++++++++++++++++++++++++")
				     }
				})
			},
			chooseUser(item) {
				// userList
				this.userList.map(itemData => {
					itemData.select = false
				})
				this.userList.map(itemData => {
					if (itemData.id === item.id) {
						itemData.select = true
					}
				})
			},
			screenAlarm() {
				let _selectUser = {}
				let hasSelect = false
				this.userList.map(item => {
					if (item.select) {
						_selectUser = item
						hasSelect= true
					}
				})
				if (!hasSelect) {
					uni.showToast({
						title:'请选择验收人！',
						icon: 'none',
						duration: 3000
					})
					return
				} else {
					this.selectUser = _selectUser
					this.$refs.rx.hide()
					this.saveData(true)
				}
			},
			getLog(id,diseaseId) {
				let _this = this
				_this.$api.send({
				     url: `/repair/matBusinessLog/getByForeignId?foreignId=${id}&diseaseId=${diseaseId}`,
				     method: 'get',
				     success:(res)=>{
						  //console.log(res,"+++++++++++++")
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
			let _params = {
				acceStardardCode: '',
				id: this.detaileData.id,
				safeStardardCode: '',
				user: 'yf001'
			}
			this.getItemDetaile(_params)
			//获取合同列表
			this.getContractList()
			//人机料
			this.getBaseMaterial()			
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
		// padding-bottom: 26upx;
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
				width: 200rpx;
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
		margin-bottom: 24upx;
		padding: 18upx 36upx 30upx 35upx;
	}
	.bottom-btn-wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		margin: 0 auto;
		background: #fff;
		justify-content: center;
		.btn-item{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 300upx;
			height: 80upx;
			border-radius: 10upx;
			font-size: 36upx;
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
	.reject-select{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120upx;
		height: 40upx;
		background: #3b9bff;
		color: #ffffff;
		border-radius: 8upx;
		margin-left: 8upx;
	}
	.reject-default{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120upx;
		height: 40upx;
		background: #fff;
		color: #383838;
		border-radius: 8upx;
		margin-left: 8upx;
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
