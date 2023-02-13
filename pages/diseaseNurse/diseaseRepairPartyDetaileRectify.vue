<!-- 监理、工程师、科长进行验收审批的页面 -->
<template>
	<view class="index-wrap">
		<tabs-bar @tavbar="tavbar" :title="name" :tabs="tabs" :tabsValue="tabsValue" @screen="screen" :right="rightFlag"></tabs-bar>
		<scroll-view @scrolltolower="scrolltolower" scroll-y :style="tabsValue === 1 ? 'height:calc(100vh - 370upx);' : 'height:calc(100vh - 250upx);'">
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
										<upload-image-bar :file='item.matRepairDailySafeEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">安全照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailySafeEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工前照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyBeforeEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工前照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyBeforeEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工中照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyMidEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工中照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyMidEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
								</view>
								
								<!-- <main-bar-inter :name="'施工后照片'" :isDis='true' :isDisBottom='false'>
									<view @click="screen">
										<upload-image-bar :file='item.matRepairDailyAfterEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
									</view>
								</main-bar-inter> -->
								<view>
									<view style="margin-bottom: 26upx;margin-top: 40upx;color: #767676;">施工后照片：</view>
									<upload-image-bar :width="186" :file='item.matRepairDailyAfterEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
								</view>
							</view>
							<!-- <main-bar-inter :name="'施工内容'" :vm="'190upx'">
								<view>{{item.repairDailyContent}}</view>
							</main-bar-inter> -->
							<!-- <main-bar-inter :name="'施工内容：'" :vm="'180upx'">
								<view style="font-size: 30upx;color: rgb(56,56,56);width: 180upx;position: absolute;">施工内容：</view>
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
				
				<view class="order-state-two" v-if="transitionList.length > 0">
					<!--暂时隐藏 <view class="record-title display alert_item_center space-between">
						<text class="des-item-txt">转序信息</text>
					</view> -->
					<view v-for="(item, index) in transitionList" :key="item.id" class="transition-item" style="padding: 36upx;">
						<view style="height: 110upx;" class="display">
							<view v-if="item.used || item.status === '2'" class="display alert_item_center" :class="item.status_text === '未提交' ? 'tran-no' : 'tran-ing'" style="width: 90upx;height: 34upx;font-size: 24upx;border-radius: 4upx;justify-content: center;color: #ffffff;margin-top: 4upx;">{{item.status_text}}</view>
							<view :style="(item.used || item.status === '2') ? 'width: 480upx' : 'width: 570upx'" style="margin-left: 10upx;font-size: 30upx;color: #383838;">转序节点{{index + 1}}: {{item.sequenceName}}</view>
							<image :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;margin-top: 8upx;" @click="openTransitionDetaile(item)"></image>
						</view>
						<view v-if="item.open">
							<!-- <main-bar-inter :name="'转序图片'" :isDis='true'>
								<view @click="screen">
									<upload-image-bar :file='item.sequsenceEnclosureRemoteListT' :isUpdate="isUpdateFalse"></upload-image-bar>
								</view>
							</main-bar-inter> -->
							<view style="margin-top: 42upx;padding-bottom: 40upx;">
								<upload-image-bar :width="186" :file='item.sequsenceEnclosureRemoteListT' :isUpdate="isUpdateFalse"></upload-image-bar>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabsValue === 1">
				<!-- <view class="order-state-two">
					<view class="order-text">
						<text class="des-item-txt">工单状态:</text>
						<view class="state-wrap" :class="detaileData.class">{{detaileData.status_text}}</view>
					</view>
				</view> -->
				<view class="repair-record">
					<view class="order-text">
						<text class="des-item-txt">工单状态:</text>
						<view class="state-wrap" :class="detaileData.class">{{detaileData.status_text}}</view>
					</view>
					<view v-for="item in acceptanceList" :key="item.id" class="record-item-wrap" style="padding: 0;background: none;">
						<view style="height: 120upx;background: #fff;padding: 0 36upx;border-top-left-radius: 16upx;border-top-right-radius: 16upx;" class="display alert_item_center space-between" :style="item.open ? '' : 'border-bottom-left-radius: 16upx;border-bottom-right-radius: 16upx;'">
							<view style="margin-left: 10upx;width: 480upx;font-size: 30upx;color: #383838;">{{item.name}}</view>
							<image :src="item.open ? '../../static/page/arrow-up.png':'../../static/page/arrow-down.png'" style="width: 21upx;height: 13upx;" @click="openAcceptanceDetaile(item)"></image>
						</view>
						<view v-show="item.open" style="padding: 0 36upx;">
							<view v-for="(item2, index2) in item.children" style="display: flex;justify-content: space-between;margin-bottom: 10upx;height: 120upx;align-items: center;" :style="(index2 + 1) === item.children.length ? '' : 'border-bottom: 1upx dashed #ddd;'">
								<view style="width: 500upx;font-size: 30upx;">{{item2.name}}</view>
								<image :src="item2.check ? '../../static/page/accIconClick.png' : '../../static/page/accIconDefault.png'" style="width: 38upx;height: 38upx;" @click='chooseAcc(item, item2)'></image>
							</view>
						</view>
					</view>
					<!-- <view style="padding-left: 24upx;width: 654upx;">
						<main-bar-inter :name="'验收意见'" :vm="'190upx'">
							<input style="width: 400upx;" v-model="acceptContent"/>
						</main-bar-inter>
					</view> -->
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
						<!-- <main-bar-inter :name="'合同'" :vm="'190upx'" :isDisBottom='false'>
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view>{{itemDetaileData.contractName}}</view>
							</view>
						</main-bar-inter>
						<main-bar-inter :name="'清单'" :vm="'190upx'" :isDisBottom='false'>
							<view style="width: 480upx;" class="display alert_item_center space-between">
								<view>{{itemDetaileData.relaManageUnitName}}</view>
							</view>
						</main-bar-inter> -->
						<!-- <view style="display: flex;margin-top: 42upx;">
							<view style="width: 102upx;font-size: 28upx;color: #767676;">合同：</view>
							<view style="font-size: 28upx;color: #383838;margin-left: 8upx;">{{itemDetaileData.contractName}}</view>
						</view>
						<view style="display: flex;margin-top: 24upx;">
							<view style="font-size: 28upx;color: #767676;">清单：</view>
							<view style="font-size: 28upx;color: #383838;margin-left: 24upx;">{{itemDetaileData.relaManageUnitName}}</view>
						</view> -->
						<view style="display: flex;margin-top: 42upx;">
							<view style="width: 90upx;font-size: 30upx;color: #767676;">合同：</view>
							<view style="font-size: 30upx;color: #383838;width:560upx;">{{itemDetaileData.contractName}}</view>
						</view>
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
							<view style="display: flex;margin-top: 42upx;">
								<view style="font-size: 30upx;color: #767676;">申请:</view>
								<view style="width: 100upx;margin-left: 24upx;">{{item.applyNum}}</view>
								<view style="margin-left: 10upx;">{{item.serviceMeaUnit}}</view>
							</view>
							<main-bar-inter :name="'实际'" :vm="'190upx'">
								<view style="display: flex;align-items: center;">
									<input type='number' style="width: 100upx;" v-model="item.acceNum"/>
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
				<!-- 整改start -->
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
							<!-- <view class="file">整改后照片：</view> -->
							<view style="margin-bottom: 26upx;margin-top: -20upx;">整改后照片：</view>
							<upload-image-bar :width="186" :file='matRepairRectificationEnclosureList' :isUpdate="isUpdateFalse"></upload-image-bar>
						</view>
					</view>
					<view style="padding-left: 24upx;width: 654upx;">
						<main-bar-inter :name="'整改内容：'" :vm="'190upx'" :isDisBottom='false'>
							<view style="width: 400upx;">{{itemDetaileData.reformAfterRemark}}</view>
						</main-bar-inter>
					</view>
				</view>
				<!-- 整改end -->
				<view class="repair-record">
					<view class="order-text">
						<text class="des-item-txt">附件</text>
					</view>
					<!-- <view style="font-size: 34upx;color: #383838;margin-left: 24upx;margin-top: 28upx;">附件</view> -->
					<view style="font-size: 30upx;color: #383838;margin-left: 24upx;margin-top: 20upx;">
						<!-- <main-bar-inter :name="'验收照片'" :isDis='true' :isDisBottom='false'>
							<view @click="screen">
								<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='itemDetaileData.matRepairAccEnclosureListT' @updateImage="updateImage" :isUpdate="isUpdate"></upload-image-bar>
							</view>
						</main-bar-inter> -->
						<view>
							<view class="file">验收照片：</view>
							<upload-image-bar :width="186" @deleteVideoClick="deleteVideoClick" :file='itemDetaileData.matRepairAccEnclosureListT' @updateImage="updateImage" :isUpdate="isUpdate"></upload-image-bar>
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
		<view v-if='tabsValue === 1 && this.itemDetaileData.acceUser === this.userInfo.id' class="display alert_item_center bottom-btn-wrap">
			<view class="btn-item" style="height: 78upx;border: 1upx solid #3695e2;color: #1890FF;background: #fff;" @click='reject'>驳回</view>
			<view class="btn-item" style="margin-left: 30upx;color: #fff;background: #1890FF;" @click='acceptSaveVerify'>通过</view>
		</view>
		<radion-button-bar v-if="isHidden" :list="list" :title="title" @getvalue="getvalue" :id="id" />
		<n-transition ref='rx' :background="'rgb(241, 241, 243)'">
			<clone-bar :background="'rgb(241, 241, 243)'" @screen="screenAlarm"  @closeno="$refs.rx.hide()">
				<view style="display: flex;margin-left: -8upx;margin-bottom: 10upx;">
					<view v-for="item in rejectList">
						<view :class="item.select ? 'reject-select' : 'reject-default'" @click='chooseRejectItem(item)'>{{item.name}}</view>
					</view>
				</view>
				<view>意见：</view>
				<textarea v-model="opinion" style="height: 10vh;width: 85vw;background: #fff;margin-top: 20upx;"/>
			</clone-bar>
		</n-transition>
		<n-transition ref='rxn' :background="'rgb(241, 241, 243)'">
			<clone-bar :background="'rgb(241, 241, 243)'" @screen="screenAlarmN"  @closeno="$refs.rxn.hide()">
				<!-- <main-bar-inter :name="'审核人：'" :vm="'176upx'" @commit="commitInfo" :isTop="false" :isDisBottom="false">
					<view style="display: flex;margin-left: -8upx;margin-bottom: 10upx;">
						<view v-for="item in userList">
							<view :class="item.select ? 'reject-select' : 'reject-default'" @click='chooseUser(item)'>{{item.trueName}}</view>
						</view>
					</view>
				</main-bar-inter> -->
				<!-- 建议根据不同状态，改一下审核人或审批人  如何是两个人咋整   如果状态为9则不展示，只展示意见，但是非必填-->
				<view v-if='this.itemDetaileData.status === "7"' style="margin-bottom: 10upx;font-size: 30upx;color: #383838;">审核人：</view>
				<view v-if='this.itemDetaileData.status === "8"' style="margin-bottom: 10upx;font-size: 30upx;color: #383838;">审批人：</view>
				<view v-if='this.itemDetaileData.status === "7" || this.itemDetaileData.status === "8"' style="display: flex;margin-left: -8upx;margin-bottom: 10upx;font-size: 30upx;color: #383838;">
					<view v-for="item in userList">
						<view :class="item.select ? 'reject-select' : 'reject-default'" @click='chooseUser(item)'>{{item.trueName}}</view>
					</view>
				</view>
				<view v-if='this.itemDetaileData.status === "9"'>意见：</view>
				<textarea v-if='this.itemDetaileData.status === "9"' v-model="acceptContent" style="height: 10vh;width: 85vw;background: #fff;margin-top: 20upx;"/>
			</clone-bar>
		</n-transition>
		
		
		<!-- <n-transition ref='rx' :background="'rgb(241, 241, 243)'">
			<clone-bar :background="'rgb(241, 241, 243)'" @screen="screenAlarm"  @closeno="$refs.rx.hide()">
				<view style="margin-bottom: 10upx;">请选择验收人：</view>
				<view style="display: flex;margin-left: -8upx;margin-bottom: 10upx;">
					<view v-for="item in userList">
						<view :class="item.select ? 'reject-select' : 'reject-default'" @click='chooseUser(item)'>{{item.trueName}}</view>
					</view>
				</view>
			</clone-bar>
		</n-transition> 
		
		
		
		<n-transition ref='ware' :background="'rgb(241, 241, 243)'" :index="49" :isRadios="false">
			<clone-bar :background="'rgb(255, 255, 255)'" @screen="screenHousing" @closeno="$refs.ware.hide()">
				<main-bar-inter :name="'是否派单'" :vm="'176upx'" v-if="isHiddenY">
					<view>
						<radio-group @change="leafletChange">
							<label class="radio">
								<radio value="1" checked="true" />是
							</label>
							<label class="radio" style="margin-left: 60upx;">
								<radio value="2" />否
							</label>
						</radio-group>
					</view>
				</main-bar-inter>
				<view v-if="radio==='1'">
					<main-bar-inter :name="'接收单位'" :vm="'176upx'" @commit="commitInfo" :isTop="false" :isDisBottom="false">
						<view @click="commitInfo">{{idAndName(unitRepairId)}}</view>
					</main-bar-inter>
					<main-bar-inter :name="'计划完成时间'" :vm="'176upx'" @commit="time" :isTop="false" :isDisBottom="false">
						<view>{{dateTime}}</view>
					</main-bar-inter>					
					<view @click="textWClick('处理要求')">
						<view  style="box-sizing: border-box;height: 25vh;width: 652upx;background: #f1f3f3;margin:26upx auto 0;padding: 36upx;38upx;26upx" @click="textWClick('处理要求')">
							<view style="font-size: 30upx;color: #353535;font-weight: 700;margin-bottom: 16upx;">处理要求</view>
							<text style="color: #767676;font-size: 24upx;">{{desc}}</text>
						</view>
					</view>
				</view>
			</clone-bar>
		</n-transition>
		
		-->
		
		
	</view>
</template>

<script>
	import TabsBar from '@/components/tabs-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import RadionButtonBar from '@/components/radio-button-bar/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	import CloneBar from '@/components/clone-bar/index.vue'
	export default{
		components: {
			TabsBar, MainBarInter, RadionButtonBar, uploadImageBar, CloneBar
		},
		data(){
			return {
				name: '护理hl详情',
				rightFlag: false,
				tabs: [{
						id: 1,
						name: '验收信息'
					},
					{
						id: 2,
						name: '病害信息'
					},
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
				transitionList: [
				],
				isHidden: false,
				//如果改为true，咱支持日常维修（通用），改为false则只上传维修的整体的信息（青岛）
				isDailyRepair: false,
				list: [],
				id: 0,
				title: '',
				contractName: '',//合同合同合同合同
				contractList: [
				],
				checklistName: '',//清单清单清单清单
				checklist: [
				],
				engineerList: [
				],
				addBaseMaterialList: [],
				matRepairRectificationEnclosureList: [],
				isUpdate: true,
				isUpdateFalse: false,
				file: [],
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
				itemDetaileData: {
					matDisease: {},
					matDiseasetypeAcceList: {},
					matDiseasetypeSafeList: {},
					matRepairAccEnclosureList: [],
					matRepairDailyList: {},
					matRepairMaterialRelList: {},
					matRepairMeasureList: {},
					matRepairRectificationEnclosureList: {},
					matRepairSequsenceRelList: {},
				},
				safeList: [],
				acceList: [],
				acceptContent: '',
				opinion: '',
				rejectList: [
					{
						id: 1,
						name: '驳回',
						select: true,
					},
					{
						id: 2,
						name: '整改',
						select: false,
					}
				],
				userInfo: {},
				userList: [],
				selectUser: {},
				logData: [],
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
									 console.log(res,"+++++++++++++++++++++++++++++")
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
			deleteVideoClick(index) {
				this.itemDetaileData.matRepairAccEnclosureList[index].modifyType = 2
				this.itemDetaileData.matRepairAccEnclosureListT[index].modifyType = 2
				//this.itemDetaileData.matRepairAccEnclosureListT.splice(index, 1)
			},
			updateImage(list) {
				this.itemDetaileData.matRepairAccEnclosureList = list
				this.itemDetaileData.matRepairAccEnclosureListT = JSON.parse(JSON.stringify(list))
			},
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
						//
						let rolecode = res.data.status === '7' ? 'AMaintainEngineer' : 'AMaintainDirector';
						if (res.data.matDisease) {//???????
							//甲方用户
							let params = {
								code: rolecode,
								id: res.data.matDisease[0].assignUnitId
							}
							_this.getUserList(params)
						}
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
						
						_this.engineerList = res.data.matRepairMeasureList ? res.data.matRepairMeasureList : [],
						_this.engineerList.map(item => {
							if (item.acceNum) {
								item.acceNum = item.acceNum
							} else {
								_this.$set(item, 'acceNum', item.applyNum)
							}
						})
						_this.addBaseMaterialList = res.data.matRepairMaterialRelList ? res.data.matRepairMaterialRelList : []
						_this.transitionList = res.data.matRepairSequsenceRelList ? res.data.matRepairSequsenceRelList : [],
						_this.transitionList.map((item, index) => {
							_this.$set(item, 'open', false)
							_this.$set(item, 'used', true)
						})
						_this.matRepairRectificationEnclosureList = res.data.matRepairRectificationEnclosureList ? res.data.matRepairRectificationEnclosureList : []
						let _matRepairAccEnclosureListT = res.data.matRepairAccEnclosureList ? res.data.matRepairAccEnclosureList : []
						_this.$set(_this.itemDetaileData, 'matRepairAccEnclosureListT', _matRepairAccEnclosureListT)
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
						_this.acceList = res.data
						_this.acceList.map(item => {
							_this.$set(item, 'check', false)
						})
						_this.acceptanceList[0].children = _this.acceList
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
						_this.safeList = res.data
						_this.safeList.map(item => {
							_this.$set(item, 'check', false)
						})
						_this.acceptanceList[1].children = _this.safeList
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
			chooseAcc(data, item) {
				item.check = !item.check
			},
			acceptSaveVerify() {
				let _this = this
				let _acceStardardCode = []
				let _safeStardardCode = []
				_this.acceptanceList[0].children.map(item => {
							if (item.check) {
								_acceStardardCode.push(item.code)
							}
				})
				_this.acceptanceList[1].children.map(item => {
							if (item.check) {
								_safeStardardCode.push(item.code)
							}
				})
				if (_this.acceptanceList[0].children.length > 0 && _acceStardardCode.length < 1) {
					uni.showToast({
						title: '请选择质量验收标准',
						icon: 'none',
						duration: 3000
					})
				} else if (_this.acceptanceList[1].children.length > 0 && _safeStardardCode.length < 1) {
					uni.showToast({
						title: '请选择安全管理标准',
						icon: 'none',
						duration: 3000
					})
				} else if (_this.itemDetaileData.matRepairAccEnclosureList.length < 1) {
					uni.showToast({
						title: '请上传验收图片',
						icon: 'none',
						duration: 3000
					})
				} else {
					// this.acceptSave(1)
					this.$refs.rxn.show()
				}
			},
			acceptSave(flag) {//1是通过2、3是驳回（驳回、整改）
				let _this = this
				let _acceStardardCode = []
				let _safeStardardCode = []
				_this.acceptanceList[0].children.map(item => {
							if (item.check) {
								_acceStardardCode.push(item.code)
							}
				})
				_this.acceptanceList[1].children.map(item => {
							if (item.check) {
								_safeStardardCode.push(item.code)
							}
				})
				
				if(flag === 1){
					//如果监理Id为空则不需要监理审批，直接一级审批即可。流程类型：养护单位-一级审批、养护单位-三级审批
					let oldstatus = _this.itemDetaileData.status
					_this.itemDetaileData.status = oldstatus == '7' ? '8' : oldstatus === '8' ? '9' : '5'
					_this.itemDetaileData.status_text = oldstatus === '7' ? '验收审核' : oldstatus === '8' ? '验收审批' : '已完成'
				}else{
					_this.itemDetaileData.status = flag === 2 ? '2' : '4'
					_this.itemDetaileData.status_text = flag === 2 ? '维修中' : '整改中'
				}
				_this.itemDetaileData.acceRemark = _this.acceptContent
				_this.itemDetaileData.acceStardardCode = _acceStardardCode.join(',')
				_this.itemDetaileData.safeStardardCode = _safeStardardCode.join(',')
				_this.itemDetaileData.matRepairMeasureList.map(item => {
					item.acceNum = parseInt(item.acceNum)
				})
				if (flag === 3) {
					_this.itemDetaileData.reformRemark = _this.opinion
				}
				let urlAcc = `/repair/matRepair/accMatRepair`;
				switch(_this.itemDetaileData.status) {
					case '8':
						urlAcc = `/repair/matRepair/accMatRepairSupervisor`;
					break;
					case '9':
						urlAcc = `/repair/matRepair/accMatRepairEngineer`;
					break;					
				}
				_this.$api.send({
				     url: urlAcc,
				     method: 'post',
					 data: _this.itemDetaileData,
				     success:(res)=>{
						console.log(res,"+++++++++++++")
						uni.showToast({
							title: '操作完成',
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
			},
			passSave() {
			},
			screenAlarm() {//驳回
				let _this = this
				if (_this.opinion.toString().trim().length < 1) {
					uni.showToast({
						title:'意见不能为空',
						icon: 'none',
						duration: 3000
					})
					return
				} else {
					if (_this.rejectList[0].select) {//驳回：驳回						
						_this.acceptSave(2)
					} else {//驳回：整改
						_this.acceptSave(3)
					}
					_this.$refs.rx.hide()
				}
			},
			getUserList(params) {
				let _this = this
				_this.$api.send({
				     url: `/sys-auth/user/getUserListByRoleCodeAndDeptId?deptId=${params.id}&roleCode=${params.code}`,
				     method: 'get',
				     success:(res)=>{
						  console.log(res,"+++++++++++++")
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
			screenAlarmN() {//通过
			    let _this = this
				let _selectUser = {}
				let hasSelect = false
				this.userList.map(item => {
					if (item.select) {
						_selectUser = item
						hasSelect= true
					}
				})
				let status = _this.itemDetaileData.status		
				if (status != '9' && !hasSelect) {
					let title = status === '7' ? '请选择审核人！' : '请选择审批人！'
					uni.showToast({
						title: title,
						icon: 'none',
						duration: 3000
					})
					return
				} else {					
					this.selectUser = _selectUser					
					//根据当前验收账户acceUser显示按钮权限
					if (status != '9'){//7，8是设置下一节点的验收用户,acceUser：根据不同状态改变					
						//设置验收用户
						this.$set(_this.itemDetaileData, 'acceUser', this.selectUser.id)
					}
					this.acceptSave(1)
					this.$refs.rxn.hide()
				}
			
			//应该可以选择人
				/* if (this.acceptContent.toString().trim().length < 1) {
					uni.showToast({
						title:'意见不能为空',
						icon: 'none',
						duration: 3000
					})
					return
				} else { 
					this.acceptSave(1)
					this.$refs.rxn.hide()
				}*/
			},
			reject() {
				if (this.itemDetaileData.matRepairAccEnclosureList.length < 1) {
					uni.showToast({
						title: '请上传验收图片',
						icon: 'none',
						duration: 3000
					})
				} else {
					this.opinion = ''
					this.$refs.rx.show()
				}
			},
			chooseRejectItem(item) {
				this.rejectList.map(itemData => {
					itemData.select = false
				})
				this.rejectList.map(itemData => {
					if (item.id === itemData.id) {
						item.select = true
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
			console.log(this.detaileData)
			this.getAccByRepairId(this.detaileData.id)
			console.log(uni.getStorageSync("personal"))
			this.userInfo = JSON.parse(uni.getStorageSync("personal"))
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
			margin-top: 24upx;
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
		min-height: 290upx;
		background: #fff;
		border-radius: 16upx;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
		padding: 18upx 36upx 30upx 35upx;
		margin-bottom: 24upx;
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
