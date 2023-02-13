<!-- id为空1 、病害上报(施工、工程师、科长)  状态是已维修、维修中或是乙方的待入库、待派单2、病害查看（已入库handle_status、dise_status任意状态-已维修、维修中、除待入库、待派单） 甲方且是待入库 3、病害待入库   甲方且是待派单4、病害待派单  id非空且是甲方的待入库、待派单且是编辑模式5、病害编辑-->
<template>
	<!-- 新增：optionId==='' isFootBar详情但是非编辑模式非审批模式-->
	<!-- <view :class="optionId==='' || (diseStatus===1 && isFootBar) ? 'diseaseAdd1' : 'diseaseAddH'"> -->
	<view class="diseaseAdd header-top-height">
		<header-bar :left="true" :name="name">
			<!--&& isARole -->
			<view v-show="diseStatus===1 && !isModified" class="title-bar-btn-box-right" @tap="toEdit">
				<image class="title-bar-btn-img" src="../../static/page/edit.png" mode="aspectFit" />
			</view>
		</header-bar>
		<main-bar :name="names" :height="'82vh'"><!-- 加上后会有两层滚动条 :height="'82vh'" -->
			<main-bar-inter :name="'名称：'" :vm="'176upx'">
				<input v-model="form.diseName" :disabled="!isModified" placeholder="请输入"/>
			</main-bar-inter>
			<main-bar-inter :name="'时间：'" :vm="'176upx'" @commit="isModified && timebhsj()">
				<view style="display: flex;align-items: center;justify-content: space-between;width: 60vw;">
					<view>{{form.diseSubmitDate}}</view>
					<image v-if="isModified" style="width: 13upx;height: 24upx;" src='../../static/page/right_j.png'>
					</image>				
				</view>
			</main-bar-inter>
			<view style="margin:24upx 0">
				<check-bottom-add :name="'病害类型'" v-if="form.diseasetypeId===''" @commit="commit"></check-bottom-add>
				<view class="diseasCelassifsty" v-else>
					<view class="title">病害类型</view>
					
					<view class="display alert_item_center space-between">
						<view class="name">{{this.getBhName(form.diseaseFirstType,form.diseasetypeId)}}</view>						
						<image v-if="isModified" style="width: 13upx;height: 24upx;" src='../../static/page/right_j.png'
							@click="isModified && commit()">
						</image>
					</view>
				</view>
			</view>
			<view style="margin-bottom: 24upx;">
				<check-bottom-add :name="'病害位置'" v-if="form.sectionId===''" @commit="commitw"></check-bottom-add>
				<view class="diseaseLocations" v-else>
					<view class="title">病害位置</view>
					<main-bar-inter :name="'路段：'" :vm="'176upx'">
						<view class="display alert_item_center space-between" style="width: 80%;">
							<view class="name" :vm="'176upx'">{{getsectionIdByme(form.sectionId)}}</view>							
							<image v-if="isModified" style="width: 13upx;height: 24upx;" src='../../static/page/right_j.png'
								@click="isModified && commitw()">
							</image>
						</view>
					</main-bar-inter>
					<!-- <main-bar-inter :name="'位置'" :vm="'176upx'">
						<input />
					</main-bar-inter> -->
					<main-bar-inter :name="'桩号：'" :vm="'176upx'" :isDisBottom='false'>
						<view class="display alert_item_center " style="width: 80%;">
							<view style="width: 188upx;border-bottom: 1upx solid #d5d5d5;line-height: 110upx;">
								<view v-if="isStartStake">
									<input @blur="startStakeBlur" :disabled="!isModified"
										style="width: 188upx;text-align: center;height: 110upx;" type="number" v-model="form.startStake" />
								</view>
								<view @click="isModified && (isStartStake=true)" v-else style="width: 188upx;text-align: center;">{{upStake(form.startStake)}}
								</view>
							</view>
							<view style="width: 36upx;height: 1upx;background: rgb(172,172,172);margin-right: 20upx;"></view>
							<view style="width: 188upx;border-bottom:1upx solid #d5d5d5;line-height: 110upx;text-align: center;">
								<view v-if="isEndStake"><input @blur="startEndBlur" :disabled="!isModified"
										style="width: 188upx;text-align: center;height: 110upx;" type="number" v-model="form.endStake" /></view>
								<view @click="isModified && (isEndStake=true)" v-else style="width: 188upx;text-align: center;">{{upStake(form.endStake)}}
								</view>
							</view>
						</view>
					</main-bar-inter>
					<main-bar-inter :name="'设施名称：'" :vm="'176upx'"  @commit="isModified && commiJutiwez()" :isDisBottom='isModified || (this.direction.up===1 || this.direction.down===1)'>
						<!-- <view>
							{{getLoctionIdName(form.locationId)}}
						</view> -->
						<view class="display alert_item_center space-between" style="width: 80%;">
							<!-- <view  class="name" :vm="'176upx'">
								{{getLoctionIdName(form.locationId)}}
							</view> -->
							<input :placeholder="!isModified ? '无' : '请选择'" style="width: 176upx;" v-model="form.locationName" :disabled="true"/>							
							<image v-if="isModified" style="width: 13upx;height: 24upx;" src='../../static/page/right_j.png'></image>
						</view>						
						<!-- <view v-show="(diseStatus===1 && !isModified) || optionId===''" style="width: 50upx;height: 50upx; display: flex;justify-content: center;align-items: center;z-index: 20;" @tap="removeLocation">
							<image src="../../static/page/del.png" mode="" style="width: 50upx;height: 50upx;"></image>
						</view> -->
					</main-bar-inter>
					
					
					<main-bar-inter :name="'方向：'" :vm="'196upx'" :isDisBottom='false' v-if="isModified || (this.direction.up===1 || this.direction.down===1)">
						<view class="display space-between">
							<view></view>
							<view class="display alert_item_center" style="margin-left: 60upx;">
								<view :class="direction.up===1?'buttom':'buttoms'" @click="isModified && directionUp()">
									<image v-if="direction.up===1" src="../../static/page/diseaseAdd/up_select.png"></image>
									<image v-else src="../../static/page/diseaseAdd/up_default.png"></image>
									<text>上行</text>
								</view>
								<view :class="direction.down===1?'buttom':'buttoms'"
									@click="isModified && directionDown()">
									<image v-if="direction.down===1" src="../../static/page/diseaseAdd/down_select.png">
									</image>
									<image v-else src="../../static/page/diseaseAdd/down_default.png"></image>
									<text>下行</text>
								</view>
							</view>
						</view>
					</main-bar-inter>
					<main-bar-inter :name="'车道：'" :vm="'276upx'" :isDisBottom='false' v-if="isVehicle&&(this.direction.up===1 || this.direction.down===1)">
						<view class="display alert_item_center">
							<view v-for="(item,index) in vehicleLaneList" :key="index"
								@click="isModified && updateRoadLineName(item,index)">
								<view class="vehicele" :style="index!==0?'margin-left:50upx':''">
									<view>{{item.name}}</view>
									<view :class="item.checked?'vehicele_true':'vehicele_false'"></view>
								</view>
							</view>
						</view>
					</main-bar-inter>
				</view>
			</view>
			<!-- <view class="paddingLeft">
				<main-bar-inter :name="'备注信息'" :isTop="true" style="margin-bottom: 24upx;"
					@commit="isModified && getDiseDecs()">
					<input v-model="form.diseDecs" :disabled="true" placeholder="请输入"/>
				</main-bar-inter>
			</view> -->
			<view class="paddingLeft">						
				<main-bar-inter :name="'备注信息：'" :vm="'176upx'" :isTop="false" style="display: flex;align-items: flex-start;justify-content: space-between;"><!-- margin-bottom: 24upx;@commit="isModified" -->
					<textarea v-model="form.diseDecs" :disabled="!isModified"  :placeholder="!isModified ? '无' : '请输入'" style="margin-top:25upx;font-size: 30upx;overflow-y: auto;max-height: 150px;" :auto-height="true"></textarea><!-- margin: 13px 0; -->
				</main-bar-inter>	
				
			</view>
			
			
			<view v-if="!isModified">
				<view class="paddingLeft" v-if="form.enclosureList.length>0">
					<view class="file">照片：</view>
					<upload-image-bar @deleteVideoClick="deleteVideoClick" :isUpdate="isModified"
						:file="form.enclosureList" @updateImage="updateImage"></upload-image-bar>
				</view>
			</view>
			<view v-else>
				<view class="paddingLeft">
					<view class="file">照片：</view>
					<upload-image-bar :width="200" @deleteVideoClick="deleteVideoClick" :isUpdate="isModified"
						:file="form.enclosureList" @updateImage="updateImage"></upload-image-bar>
				</view>
			</view>		
			
		</main-bar>
		<!-- 1、病害上报 -->
		<view v-if="optionId===''">
			<view class="botton-bg bottomFielx">
				<button class="buttoms1" @click="diseasAdd" :disabled="isClick">
					确定
				</button>
			</view>
		</view>
		<!-- 2、3：病害入库、病害派单 -->
		<!-- && isARole-->
		<view v-if="optionId!=''" class="display alert_item_center space-between"><!-- v-else -->
			
			<view v-if="isModified">
				<view class="botton-bg bottomFielx">
					<view class="buttoms_3" @click="toCanel">取消</view>					
					<button class="buttoms_2" @click="diseasAdd" :disabled="isClick">
						保存
					</button>
				</view>
			</view>
			<!-- <view v-else> -->
			<view v-if="!isModified && isARole">	 <!-- && isARole -->		
				<view class="botton-bg bottomFielx" v-if="!isHandled || diseStatus===1">
					<view class="buttoms_3" @click="falseAlarm" v-if="!isHandled">误报</view>
					<view v-if="diseStatus===1" class="buttoms_2"> <!-- style="margin-left: 30upx;" -->
						<text @click="warehousing"><!-- v-if='isARole' -->
							{{!isHandled?'入库':'派单'}}
						</text>
					</view>
				</view>
			</view>					
		</view>
		<n-transition ref='bhsj' :index="50">
			<time-integrity-bar @clickQu="clickQubhsj" :type="1"  :isD='1' @hide="$refs.bhsj.hide()"></time-integrity-bar>
		</n-transition>
		<n-transition ref='tx' :index="50">
			<time-integrity-bar @clickQu="clickQu" :type="1" @hide="$refs.tx.hide()"></time-integrity-bar>
		</n-transition>
		<n-transition ref='rk' :index="50">
			<time-integrity-bar @clickQu="clickQurk" :type="365*10" :dataArr="dataArr" @hide="$refs.rk.hide()"></time-integrity-bar>
		</n-transition>

		<n-transition ref='rx'  :isRadios="false" :background="'rgb(241, 241, 243)'">
			<!-- <clone-bar :isClsPadd="false" :background="'rgb(255,255,255)'" @screen="screenAlarm" @closeno="$refs.rx.hide()"> -->
			<clone-bar :background="'rgb(241, 241, 243)'" @screen="screenAlarm" @closeno="$refs.rx.hide()">
				<!-- <view style="box-sizing: border-box;height: 25vh;width: 702upx;background: #f1f3f3;margin:26upx auto 0;padding: 36upx;38upx;26upx" @click="textWClick('误报描述')">
					<view style="font-size: 30upx;color: #353535;font-weight: 700;margin-bottom: 24upx;">误报描述</view>
					<text style="color: #767676;font-size: 24upx;">{{desc}}</text>
				</view> -->
			    <textarea v-model="desc" style="height: 10vh;width: 85vw;background: #fff;margin-top: 20upx;"/>				
			</clone-bar>
		</n-transition>
		<n-transition ref='ware' :background="'rgb(241, 241, 243)'" :index="49" :isRadios="false">
			<clone-bar :background="'rgb(255, 255, 255)'" @screen="screenHousing" @closeno="$refs.ware.hide()">
				<main-bar-inter :name="'是否派单：'" :vm="'176upx'" v-if="!isHandled" :isTop="false" :isDisBottom="false">
					<view>
						<radio-group @change="leafletChange">
							<label class="radio" style="font-size: 30upx;color: #383838;">
								<radio value="1"  />是
							</label>
							<label class="radio" style="margin-left: 60upx;font-size: 30upx;color: #383838;">
								<radio value="2" checked="true" />否
							</label>
						</radio-group>
					</view>
				</main-bar-inter>
				<view v-if="radio==='1'">
					<main-bar-inter :name="'接收单位：'" :vm="'176upx'" @commit="commitInfo" :isTop="false" :isDisBottom="false">
						<view style="font-size: 30upx;color: #383838;" @click="commitInfo">{{idAndName(unitRepairId)}}</view>
						<image src='../../static/page/right_j.png' style="width: 13upx;height: 24upx;position: absolute;right: 44upx;"></image>
					</main-bar-inter>
					<main-bar-inter :name="'监理单位：'" :vm="'176upx'" @commit="commitInfo2" :isTop="false" :isDisBottom="false">
						<view style="font-size: 30upx;color: #383838;" @click="commitInfo2">{{idAndName2(supervisorUnitId)}}</view>
						<image src='../../static/page/right_j.png' style="width: 13upx;height: 24upx;position: absolute;right: 44upx;"></image>
					</main-bar-inter>
					<main-bar-inter :name="'完成期限：'" :vm="'176upx'" @commit="time" :isTop="false" :isDisBottom="false">
						<view style="font-size: 30upx;color: #383838;">{{dateTime}}</view>
						<image src='../../static/page/right_j.png' style="width: 13upx;height: 24upx;position: absolute;right: 44upx;" >
					</main-bar-inter>
					<main-bar-inter :name="'处理要求：'" :isTop="false" :isDisBottom="false" style="margin-bottom: 24upx;display: flex;align-items: flex-start;justify-content: space-between;">
						<textarea placeholder="请输入" v-model="desc"  style="font-size: 30upx;margin: 13px 0;overflow-y: auto;max-height: 150px;margin-left: 15px;" :auto-height="true">{{desc}}</textarea>
					</main-bar-inter>
					<!-- <view @click="textWClick('处理要求')">
						<view  style="box-sizing: border-box;height: 25vh;width: 652upx;background: #f1f3f3;margin:26upx auto 0;padding: 36upx;38upx;26upx" @click="textWClick('处理要求')">
							<view style="font-size: 30upx;color: #353535;font-weight: 700;margin-bottom: 16upx;">处理要求</view>
							<text style="color: #767676;font-size: 24upx;">{{desc}}</text>
						</view>
					</view> -->
					<main-bar-inter :name="'预计工程量：'" :isTop="false" :isDisBottom="false" style="margin-bottom: 24upx;display: flex;align-items: flex-start;justify-content: space-between;">
						<textarea placeholder="请输入" v-model="planQuanttityDesc"  style="font-size: 30upx;margin: 13px 0;overflow-y: auto;max-height: 150px;margin-left: 15px;" :auto-height="true">{{planQuanttityDesc}}</textarea>
					</main-bar-inter>
				</view>
			</clone-bar>
		</n-transition>
		<radion-button-bar @textScreen="textScreen" :text="text" @screenTrue="screenTrue" v-if="isHidden" :list="list"
			:title="title" @getvalue="getvalue" :id="form.sectionId" :type="1" @getId="getZ" />
		<three-buttom-choice-bar v-if="isHiddenThree" :title="title" :threeList="threeList" @valueCli="valueCli"
			:id="form.diseasetypeId"></three-buttom-choice-bar>
		<screen-voice-bar v-if="isVoice" :text="text" @input='input' @inputUpvoice="inputUpvoice"></screen-voice-bar>
		<voice-bar :name="'病害备注'" v-if="isVoiceBar" :text="form.diseDecs" @input="inputDise"></voice-bar>
		<voice-bar :name="textCli" v-if="inputMessage" :text="desc" @input="inputMessageClick"></voice-bar>
		<radion-button-bar @textScreen="textScreen" :text="text" @screenTrue="screenTrue" v-if="isHiddenJS"
			:list="list" :title="title" @getvalue="getvalueJS" :id="unitRepairId" :type="1"
			@getId="getZ" />
		<radion-button-bar @textScreen="textScreen" :text="text" @screenTrue="screenTrue" v-if="isHiddenJS2"
				:list="list" :title="title" @getvalue="getvalueJS2" :id="supervisorUnitId" :type="1"
				@getId="getZ" />
			
		<three-buttom-choice-bar v-if="isHiddenThrees" :title="title" :threeList="list" @valueCli="valueClis" :isHidden="true" @textScreen="textScreenClics"
			:id="form.locationId"></three-buttom-choice-bar>
			
	</view>
</template>

<script>
	import MainBar from '@/components/main-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import CheckBottomAdd from '@/components/check-bottom-add/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	import RadionButtonBar from '@/components/radio-button-bar/index.vue'
	import NTransition from '@/components/n-transition/n-transition.vue'
	import TimeIntegrityBar from '@/components/time-integrity-bar/index.vue'
	import ThreeButtomChoiceBar from '@/components/three-buttom-choice-bar/index.vue'
	import ScreenVoiceBar from '@/components/screen-voice-bar/index.vue'
	import CloneBar from '@/components/clone-bar/index.vue'
	import {getPersonal,jurisdictionList} from '@/utils/jurisdictionUtils'
	import {
		ref
	} from 'vue'
	import VoiceBar from '@/components/voice-bar/index.vue'
	import {
		temporary
	} from '@/config/StorageKey.js'
	import {
		urls
	} from '../../config/UrlKey.js'
	import {
		keys
	} from '@/config/StorageKey.js'
	export default {
		components: {
			MainBar,
			MainBarInter,
			CheckBottomAdd,
			uploadImageBar,
			RadionButtonBar,
			NTransition,
			TimeIntegrityBar,
			ThreeButtomChoiceBar,
			ScreenVoiceBar,
			CloneBar,
			VoiceBar
		},
		data() {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let time = date.getHours()
			let branch = date.getMinutes()
			month = month >= 10 ? month : '0' + month
			day = day >= 10 ? day : '0' + day
			time = time >= 10 ? time : '0' + time
			branch = branch >= 10 ? branch : '0' + branch
			let dateTime = `${year}-${month}-${day} ${time}:${branch}`

			const date1 = new Date(new Date().getTime() + 60 * 1000 * 60 * 24)
			
			let year1 = date1.getFullYear()
			let month1 = date1.getMonth() + 1
			let day1 = date1.getDate()
			let time1 = date1.getHours()
			let branch1 = date1.getMinutes()
			month1 = month1 >= 10 ? month1 : '0' + month1
			day1 = day1 >= 10 ? day1 : '0' + day1
			time1 = time1 >= 10 ? time1 : '0' + time1
			branch1 = branch1 >= 10 ? branch1 : '0' + branch1
			let dateTime1 = `${year1}-${month1}-${day1} ${time1}:${branch1}`
			let dataArr = [year1,month1,day1,time1,branch1]
			return {
				dataArr:dataArr,
				isARole: uni.getStorageSync('jurisdiction') != 'BProjectManager',
				inputMessage: false,
				name: '病害上报',
				names: '病害信息',
				isHidden: false,
				isHiddenThree: false,
				list: [],
				title: '',
				id: 0,
				diseaseLocationList: [],
				vehicleLaneList: [],
				diseaseLocation: 0,
				direction: {
					up: 0,
					down: 0
				},
				threeList: [],
				isVoice: false,
				text: "",
				optionId: '',
				isVoiceBar: false,
				locationTypeList: [],
				startStake: '', //开始桩号
				endStake: '',
				indexLocationType: '',
				flag: 1,
				isVehicle: false,//车道是否显示
				isModified: true,//字段是否可编辑状态
				isFootBar: false,
				isLocationShow: false,//设施名称是否显示
				desc: '',
				planQuanttityDesc:'',
				radio: '2',
				dateTime: dateTime1,
				form: {
					id:'',
					diseName: '',
					diseSubmitDate: dateTime,
					diseasetypeName: '', //病害类型
					diseaseFirstType: '',
					diseasetypeId: '',

					roadId: '',
					sectionId: '', //路段
					sectionName: '',

					startStake: '', //开始桩号
					endStake: '', //结束桩号
					roadDirection: '', //方向
					roadDirectionName: '',
					roadLine: '',
					roadLineName: '', //车道
					diseDecs: '', //备注信息
					enclosureList: [], //照片
					locationType: '',//设施类型，如收费站等
					locationId: '', //设施ID
					locationName: '' //设施名称
				},
				isHandled: false,//false未入库，true已入库
				store: '',

				isStartStake: false,
				isEndStake: false,
				diseStatus: 1,
				isHiddenJS2: false,
				isHiddenJS: false,
				getDeptListByUserList: [],
				getDeptSupervisorListByUserList: [],
				unitRepairId: '',
				supervisorUnitId: '',
				isClick:false,
				localtpe:[],
				isHiddenThrees:false,
				textCli:''
			}
		},

		onLoad(option) {

			//获取病害类型/repair/diseaseType/type
			this.diseaseType()
			//获取病害位置/repair/diseaseType/getRoadSection
			this.getRoadSection()
			//获取设施类别/repair/diseaseType/getLocationType
			this.getLocationType()
			//获取车道
			this.getRoadLineNum()
		
			// vehicleLaneList
			//获取接收单位
			// /sys-auth/dept/getDeptListByUserId
			// this.getDeptListByUserId()

			this.optionId = option.id ? option.id : ''
			this.store = option.store
			if (option.id) {
				this.getDiseaseById(option.id)
				this.flag = 2
				this.isVehicle = true				
				this.isModified = false
				this.isFootBar = true
				this.name = option.name
				if(uni.getStorageSync("jurisdiction")!==jurisdictionList[2]){//根据角色来判断去获取第三方单位？？？是否需要优化
					this.getDeptListByUserId()
					this.getDeptListByUserId2()
				}
				
			} else {
				//这个方便不知用途
				this.uploadImage()
				this.preAdd()
				// this.form.enclosureList = this.$store.state.image.imageArr
				this.name = option.name
			}
			//option.diseStatus === 1这里是待派单和待入库（后台是option.diseStatus空时是待入库，1是待派单）
			//乙方进来都是查看病害
			if(!this.isARole){
				this.name = '病害查看'
			}
			if (option.diseStatus) {
				this.diseStatus = Number(option.diseStatus)
				if (this.diseStatus === 1 && this.isARole) {
					this.name = '病害派单'
				} else {
					this.name = '病害查看'
				}
			}
			//option.type === "1"时为已入库；否则为待入库
			if (option.type === "1") {
				this.isHandled = true
			}
			
		},
		watch: {
			direction: {
				handler() {
					if (this.direction.up === 1 || this.direction.down === 1) {
						this.isVehicle = true
					} else {
						this.isVehicle = false
					}
				},
				deep: true
			}
		},
		methods: {
			uploadImage() {
				let baseAjaxAxios = uni.getStorageSync("baseAjax")
				if (baseAjaxAxios.indexOf('http://apiweibo.lngsyg.cn:9088/wechat-dev/') > -1) {
					baseAjaxAxios = 'http://apiweibo.lngsyg.cn:9088/wechat-dev/up-io/maintain/'
				}
				
				//if(baseAjaxAxios == ''){
					//baseAjaxAxios = 'http://218.78.108.4:8282'
					//baseAjaxAxios = 'http://124.129.136.5:8282'					
				//}
				
				uni.chooseImage({
					count: 3,
					success: (res) => {
						let image = []
						const files = res.tempFiles;
						for (let i = 0; i < files.length; i++) {
							let obj = new Object();
							obj.name = 'file' + i;
							obj.uri = files[i].path;
							image.push(obj);
						}
						const uploadTask = uni.uploadFile({
							url: baseAjaxAxios + urls.baseUpload,
							files: image,
							header:{ "hi-auth-token":uni.getStorageSync(keys.token)},
							success: (fileDate) => {
								let res = JSON.parse(fileDate.data)
								if (res.code === 200) {
									let data = res.data.map(item => ({
										...item,
										modifyType: 1
									}))
									this.form.enclosureList = data
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
			getDeptListByUserId() {
				let personal = uni.getStorageSync('personal')
				personal = JSON.parse(personal)
				this.$api.send({
					url: `/sys-auth/dept/getPartyBListByPartyAUserId?partyAUserId=${personal.id}`,
					method: 'get',
					success: (res) => {
						// "deptCode": "0011001",
						// "deptName": "养护中心",
						if (res.code === 200) {
							const data = res.data
							let getDeptListByUserList = []
							getDeptListByUserList = data.map(item => ({
								id: item.deptFirstId,
								name: item.deptName
							}))
							this.getDeptListByUserList = getDeptListByUserList
							this.unitRepairId = getDeptListByUserList[0].id
						}
					}
				})
			},
			getDeptListByUserId2() {
				let personal = uni.getStorageSync('personal')
				personal = JSON.parse(personal)
				this.$api.send({
					url: `/sys-auth/dept/getPartyBSupervisorListByPartyAUserId?partyAUserId=${personal.id}`,
					method: 'get',
					success: (res) => {
						// "deptCode": "0011001",
						// "deptName": "养护中心",
						if (res.code === 200) {
							const data = res.data							
							//监理单位(建议把这个接口换一下，接收单位和监理单位放个类型)
							let getDeptSupervisorListByUserList = []
							getDeptSupervisorListByUserList = data.map(item => ({
								id: item.deptFirstId,
								name: item.deptName
							}))
							this.getDeptSupervisorListByUserList = getDeptSupervisorListByUserList
							this.supervisorUnitId = getDeptSupervisorListByUserList[0].id
						}
					}
				})
			},
			preAdd() {
				this.$api.send({
					url: "/repair/disease/preAdd",
					method: 'get',
					success: (res) => {
						if (res.code === 200) {							
							const data = res.data.vo
							Object.keys(data).map(key => {
								this.form[key] = data[key]
							})
							//病害上报时，如果进来要初始化则，注释下一行，增加可以删除"设施名称"removeLocation
							if(this.optionId===''){
								this.form.locationId = ""
								this.form.locationName = "";
							}							
							if (data.sectionId) {
								//显示该用户曾经上报的位置第一条
								//console.info(this.diseaseLocationList)
								let disease = this.diseaseLocationList.filter(item => item.id === data
									.sectionId)[0]
								this.form.startStake = disease.startstake
								this.form.endStake = disease.endstake
								this.startStake = disease.startstake
								this.endStake = disease.endstake
							}
							this.locationTypeList.map((item, index) => {
								if (item.id === data.locationType) {
									this.getLocationList(index)
								}
							})
						}
					}
				})
			},
			async diseaseType() {
				let diseaseType = await this.$api.send({
					url: '/repair/diseaseType/type',
					method: 'get'
				})

				if (diseaseType.data.code === 200) {
					const data = diseaseType.data.data.diseaseType.data
					const threeList = []
					data.map((item, index) => {
						let checkList = item.children.map(items => ({
							id: items.itemCode,
							name: items.itemName,
							isOpen: false,
							depth: 2,
							parentId: item.itemCode,
							checkList: []
						}))
						threeList.push({
							id: item.itemCode,
							name: item.itemName,
							isOpen: item.isOpen,
							depth: 1,
							checkList: checkList
						})
					})
					this.threeList = threeList
				}
			},
			async getRoadSection() {
				let roadSe = await this.$api.send({
					url: "/repair/diseaseType/getRoadSection",
					method: 'get'
				})
				if (roadSe.data.code === 200) {
					const data = roadSe.data.data.list
					const diseaseLocationList = []
					data.map(item => {
						diseaseLocationList.push({
							id: item.id,
							name: item.name,
							isChecked: false,
							startstake: item.startstake,
							endstake: item.endstake,
							roadId: item.roadid
						})
					})
					this.diseaseLocationList = diseaseLocationList
				}
			},
			async getLocationType() {
				let diseaseType = await this.$api.send({
					url: '/common/sysDic/queryDicByCode?code=LOCATION_TYPE',
					method: 'get'
				})
				if (diseaseType.data.code === 200) {
					const diseaseLocationList = []
					diseaseType.data.data.map((item, index) => {
						diseaseLocationList.push({
							id: item.itemCode,
							name: item.itemName,
							isChecked: false
						})
					})
					this.locationTypeList = diseaseLocationList

				}
			},
			getRoadLineNum() {
				this.$api.send({
					url: '/common/sysDic/queryDicByCode?code=ROAD_LINE_NUM',
					method: 'get',
					success: (res) => {
						let vehicleLaneList = []
						if (res.code === 200) {
							if (this.form.roadLine) {
								res.data.map(item => {
									let id = this.form.roadLine.split(',').filter(key => item
										.itemCode === key)[0]
										//console.log(item,id)
									vehicleLaneList.push({
										id: item.itemCode,
										name: item.itemName,
										checked: Number(id) === Number(item.itemCode),
									})
								})
							} else {
								res.data.map(item => {
									vehicleLaneList.push({
										id: item.itemCode,
										name: item.itemName,
										checked: false,
									})
								})
							}

						}
						this.vehicleLaneList = vehicleLaneList
					}
				})
			},
			getDiseaseById(id) {
				this.$api.send({
					url: '/repair/disease/getDiseaseById?id=' + id,
					method: 'get',
					success: (res) => {
						if (res.code === 200) {
							const data = res.data
							Object.keys(this.form).map(key => {
								this.form[key] = res.data[key]
							})							
							
							
							//编辑时给桩号赋值
							if (data.sectionId) {
								this.startStake = data.startStake
								this.endStake = data.endStake
							}
														
							//console.log( data.roadLine)
							this.vehicleLaneList = this.vehicleLaneList.map(item => ({
								id: item.id,
								name: item.name,
								checked: data.roadLine.split(',').filter(it=>it===item.id).length>0
							}))
							//console.log(this.vehicleLaneList) 
							this.locationTypeList.map((item, index) => {
								if (item.id === data.locationType) {
									this.getLocationList(index)
								}
							})
							this.upRoadDirectionName()
						}

					}
				})
			},
			upRoadDirectionName() {
				if(this.form.roadDirectionName){
					this.form.roadDirectionName.split(',').map(item => {
						if (item === '上行') {
							this.direction.up = 1
						} else if (item === '下行') {
							this.direction.down = 1
						}
					})
				}
			},
			commit() {
				this.title = '病害类型'
				this.id = this.form.diseaseFirstType
				this.isHiddenThree = true
			},
			commitInfo() {
				let list = this.getDeptListByUserList
				this.list = list
				this.title = '接收单位'
				this.isHiddenJS = true
			},
			commitInfo2() {
				let list = this.getDeptSupervisorListByUserList
				this.list = list
				this.title = '监理单位'
				this.isHiddenJS2 = true
			},
			commitw() {
				let list = this.diseaseLocationList
				this.list = list
				this.title = '病害位置'
				this.isHidden = true
			},
			commiJutiwez() {
				let list = this.localtpe
				this.list = list
				this.title = '设施名称'
				this.isHiddenThrees = true
			},
			getZ(id) {
				//alert("不知道是啥")
				this.form.locationId = id
				this.isHidden = false
			},
			getvalue(index, title) {
				//alert(this.form.locationName)
				if (title === '设施名称') {
					this.form.locationType = this.list[index].id
					this.form.locationName = this.list[index].id
				} else {
					//console.log(this.list[index])
					this.form.sectionId = this.list[index].id
					this.form.startStake = this.list[index].startstake
					this.form.endStake = this.list[index].endstake
					this.startStake = this.list[index].startstake
					this.endStake = this.list[index].endstake
					this.isHidden = false
					this.form.roadId = this.list[index].roadId
					this.getLocationList()
				}


			},
			getvalueJS(index, title) {
				this.unitRepairId = this.getDeptListByUserList[index].id
				this.isHiddenJS = false
			},
			getvalueJS2(index, title) {
				this.supervisorUnitId = this.getDeptSupervisorListByUserList[index].id
				this.isHiddenJS2 = false
			},
			idAndName(id) {
				let list = this.getDeptListByUserList.filter(item => item.id === id)
				if (list.length > 0) {
					return list[0].name
				} else {
					return '请选择'
				}
			},
			idAndName2(id) {
				let list = this.getDeptSupervisorListByUserList.filter(item => item.id === id)
				if (list.length > 0) {
					return list[0].name
				} else {
					return '请选择'
				}
			},
			getLocationList(index) {
				//console.log(this.form.roadId)
				const _this = this
				_this.$api.send({
					url: '/repair/diseaseType/getLocationListALL',
					method: 'post',
					data: {
						"endStake": _this.form.endStake,
						"locationType": _this.form.locationType,
						"name": '',
						"roadId": _this.form.roadId,
						"startStake": _this.form.startStake
					},
					success: (res) => {						
						let threeList = []
						_this.locationTypeList.map(item=>{
							let checkList = res.data[item.id].map(items => ({
								id: items.id,
								name: items.name,
								isOpen: false,
								depth: 2,
								sid:item.id,
								checkList: []
							}))
													
							threeList.push({
								id: item.id,
								name: item.name,
								isOpen: false,
								depth: 1,
								checkList: checkList
							})
							//console.info(threeList)
						})
						this.localtpe = threeList
						//详情回显设施名称，后期应该改为后台返回名称						
						this.form.locationName = this.getLoctionIdName(this.form.locationId)
					}
				})
			},
			time() {
				this.$refs.rk.show()
			},
			timebhsj() {
				this.$refs.bhsj.show()
			},
			valueCli(item) {
				this.form.diseaseFirstType = item.parentId
				this.form.diseasetypeId = item.id
				this.isHiddenThree = false
			},
			//在弹出的选择框里点击一条时被调用
			valueClis(item){
				if(item.sid){					
					this.form.locationId = item.id
					this.form.locationName = this.getLoctionIdName(item.id)
					this.form.locationType = item.sid
					this.isHiddenThrees = false
				}
				
			},
			screenTrue() {
				this.isVoice = true
			},
			input(value) {
				this.text = value
				// this.from.diseaseName = this.text 

			},
			inputUpvoice() {
				this.text = ''
				this.isVoice = false
			},
			textScreen(text) {
				if(this.title === '设施名称'){
					if (text) {
						this.list = this.locationTypeList.filter(item => item.name && item.name.toString().indexOf(text) !==
							-1)
					}else{
						this.list =this.locationTypeList
					}
				}else if(this.title === '病害位置'){
					if (text) {
						this.list = this.diseaseLocationList.filter(item => item.name && item.name.toString().indexOf(text) !==
							-1)
					}else{
						this.list =this.diseaseLocationList
					}
				}else if(this.title === '接收单位'){
					if (text) {
						this.list = this.getDeptListByUserList.filter(item => item.name && item.name.toString().indexOf(text) !==
							-1)
					}else{
						this.list =this.getDeptListByUserList
					}
				}else if(this.title === '监理单位'){
					if (text) {
						this.list = this.getDeptSupervisorListByUserList.filter(item => item.name && item.name.toString().indexOf(text) !==
							-1)
					}else{
						this.list =this.getDeptSupervisorListByUserList
					}
				}
				

			},
			toCanel() {
				this.isModified = false;				
				//this.diseStatus现在病害审批和病害派单都是1，实际上和后台不匹配
				this.name = this.store === 'warehoused' ? '病害派单' : '病害审批'
			},
			toEdit() {
				this.isModified = true;
				this.name = '病害修改'
				//
				this.$refs.rx.hide()
				this.$refs.ware.hide()
			},
			removeLocation() {
				this.form.locationId = "";
				this.form.locationName = "";
			},
			falseAlarm() {
				this.desc = ''
				this.$refs.rx.show()
			},
			warehousing() {
				this.desc = ''//通过
				this.$refs.ware.show()
			},
			textWClick(text) {
				this.textCli = text
				this.inputMessage = true
			},
			updateRoadLineName(item, index) {
				this.vehicleLaneList[index].checked = !item.checked
			},

			getBhName(id, ponId) {
				let name1 = ''
				let name2 = ''
				this.threeList.map(item => {
					if (item.id === id) {
						name1 = item.name
						item.checkList.map(items => {
							if (items.id === ponId) {
								name2 = items.name
							}
						})
					}
				})
				return `${name1}-${name2}`
			},
			getsectionIdByme(id) {
				let name = ''
				this.diseaseLocationList.map(item => {
					if (item.id === id) {
						name = item.name
					}
				})
				return name
			},
			getDiseDecs() {
				// uni.pageScrollTo({
				//   scrollTop: 2000000,    //滚动到页面的目标位置（单位px）
				//   duration: 0    //滚动动画的时长，默认300ms，单位 ms
				// });
				setTimeout(()=>{
					this.isVoiceBar = true
				},100)
			},
			inputDise(e) {
				this.form.diseDecs = e
			},
			getLoctionIdName(id) {				
				let name = ''
				this.localtpe.map(item => {
					if (item.checkList) {
						item.checkList.map(it => {
							if(id === it.id){
								name=it.name
							}
						})
					}
				})
				return name
			},
			updateImage(imageArr) {
				this.form.enclosureList = imageArr
			},
			clickQu(data) {
				this.form.diseSubmitDate = data
				this.$refs.tx.hide()
			},
			clickQubhsj(data) {
				//alert(this.form.diseSubmitDate)
				this.form.diseSubmitDate = data
				this.$refs.bhsj.hide()
			},
			dataDirection() {
				let directionArr = []
				let directionArrName = []
				if (this.direction.up === 1) {
					directionArr.push(1)
					directionArrName.push('上行')
				}
				if (this.direction.down === 1) {
					directionArr.push(2)
					directionArrName.push('下行')
				}
				return {
					disID: directionArr.toString(),
					disName: directionArrName.toString()
				}
			},
			dataVehicleLaneList() {
				let idArr = [],
					nameArr = []
				this.vehicleLaneList.map(item => {
					if (item.checked) {
						idArr.push(item.id)
						nameArr.push(item.name)
					}
				})
				return {
					idArr: idArr.toString(),
					nameArr: nameArr.toString()
				}
			},
			diseasAdd() {
				this.isClick = true
				let {
					disID,
					disName
				} = this.dataDirection()
				const {
					idArr,
					nameArr
				} = this.dataVehicleLaneList()

				this.form.diseasetypeName = this.getBhName(this.form.diseaseFirstType, this.form.diseasetypeId)
				this.form.sectionName = this.getsectionIdByme(this.form.sectionId)
				this.form.roadDirection = disID
				this.form.roadDirectionName = disName
				this.form.roadLine = idArr
				this.form.roadLineName = nameArr
				// this.form.diseSubmitDate = this.form.diseSubmitDate+":00"
				this.form.locationName = this.getLoctionIdName(this.form.locationId)
                this.form.id=this.optionId
				if (this.form.startStake > this.form.endStake) {
					uni.showToast({
						title: '开始桩号不能大于结束桩号',
						icon: 'none',
						duration: 3000,
						success:()=>{
							setTimeout(()=>{
								this.isClick = false
							},3000)
						}
					})
					return
				}
				
				if(!this.form.diseName){
					uni.showToast({
						title: '病害名称不能为空',
						icon: 'none',
						duration: 3000,
						success:()=>{
							setTimeout(()=>{
								this.isClick = false
							},3000)
						}
					})
					return
				}
				
				if(!this.form.diseName){
					uni.showToast({
						title: '病害名称不能为空',
						icon: 'none',
						duration: 3000,
						success:()=>{
							setTimeout(()=>{
								this.isClick = false
							},3000)
						}
					})
					return
				}
				
				

				let dataStr = JSON.stringify(this.form)
				let data = JSON.parse(dataStr)
				if(this.optionId===''){
					delete data.diseSubmitDate
				}				
				this.$api.send({
					url: '/repair/disease/add',
					method: 'post',
					data: {
						...data,
						diseSubmitDate: this.form.diseSubmitDate,
						//diseSubmitDate: this.optionId==='' ? this.form.diseSubmitDate + ":00" : this.form.diseSubmitDate //没改后台返回格式前
					},
					success: (res) => {
						if (res.code === 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
							setTimeout(()=>{
								this.isClick = false
								uni.navigateBack({
									delta: 1
								});
							},3000)
						} 
					}
				})
			},
			deleteVideoClick(index) {
				this.form.enclosureList[index].modifyType = 2
			},
			router() {
				uni.navigateBack({
					delta: 1
				});
			},
			inputMessageClick(e) {
				this.desc = e
			},
			clickQurk(data) {
				this.dateTime = data
				this.$refs.rk.hide()
			},
			screenAlarm() {//驳回误报的情况
				if (this.desc === '') {
					uni.showToast({
						title: '不能为空',
						icon: 'none',
						duration: 3000
					})
					return
				}
				this.$api.send({
					url: `/repair/disease/approve?id=${this.optionId}&desc=${this.desc}`,
					method: 'get',
					success: (res) => {
						if (res.code === 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
							uni.navigateBack({
								delta: 1
							});
						}
					}
				})
			},
			screenHousing() {
				const ids = this.$store.state.diseaseList.idsObj[this.store]
				let key = ''
				let keyID = ''
				if (ids) {
					key = ids.indexOf(this.optionId) //获取当前所在id的数组
					keyID = ids[key + 1] //获取下一个id	 
				}
				if (this.radio === "2") {
					this.$api.send({
						url: `/repair/disease/approve?id=${this.optionId}`,
						method: 'get',
						success: (res) => {
							if (res.code === 200) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 3000
								})
								uni.navigateBack({
									delta: 1
								});
								if (keyID) {
									if (this.store === 'toBeWarehoused') {//地址不太对，不知道啥时候被调用
										uni.navigateTo({
											url: `/pages/diseaseAdd/index?id=${keyID}&store=${this.store}`
										})
									} else {
										uni.navigateTo({
											url: `/pages/diseaseAdd/index?id=${keyID}&type=1&store=${this.store}`
										})
									}

								}
							}
						}
					})
				} else {
					if (!this.desc) {
						uni.showToast({
							title: '处理要求不能为空',
							icon: 'none',
							duration: 3000
						})
						return
					}
					if (!this.planQuanttityDesc) {
						uni.showToast({
							title: '预计工程量不能为空',
							icon: 'none',
							duration: 3000
						})
						return
					}
					if (!this.dateTime) {
						uni.showToast({
							title: '计划时间不为空',
							icon: 'none',
							duration: 3000
						})
						return
					}
					if (!this.unitRepairId) {
						uni.showToast({
							title: '接收单位不为空',
							icon: 'none',
							duration: 3000
						})
						return
					}
					//派单或入库派单
					//完成期限去除 + ":00"
					this.$api.send({
						url: `/repair/disease/sendOrder`,
						method: 'post',
						data: {
							"advice": this.desc,
							"date": this.dateTime,
							// "date": this.dateTime,
							"id": this.optionId,
							unitRepairId: this.unitRepairId,
							supervisorUnitId: this.supervisorUnitId,
							planQuanttityDesc: this.planQuanttityDesc,
						},
						success: (res) => {
							if (res.code === 200) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 3000
								})
								uni.navigateBack({
									delta: 1
								});
								if (keyID) {
									if (this.store === 'toBeWarehoused') {
										uni.navigateTo({
											url: `/pages/diseaseAdd/index?id=${keyID}&store=${this.store}`
										})
									} else {
										uni.navigateTo({
											url: `/pages/diseaseAdd/index?id=${keyID}&type=1&store=${this.store}`
										})
									}

								}

							}

						},
					})
				}
			},
			leafletChange(e) {
				this.radio = e.target.value
			},
			startStakeBlur() {				
				if(this.optionId===''){//新增
					if (this.form.startStake < this.startStake || this.form.startStake > this.endStake) {
						this.form.startStake = this.startStake
					}	
				}else{//编辑
					if (this.form.startStake < 0 || this.form.startStake > this.form.endStake) {
						this.form.startStake = this.startStake
					}
					
				}
							
				this.form.startStake = Number(this.form.startStake)
				this.isStartStake = false
			},
			startEndBlur() {								
				if(this.optionId===''){//新增
					if (this.form.endStake < this.startStake || this.form.endStake > this.endStake) {
						this.form.endStake = this.endStake
					}	
				}else{//编辑
					if (this.form.endStake < this.form.startStake) {
						this.form.endStake = this.endStake
					}					
				}
				this.form.endStake = Number(this.form.endStake)
				this.isEndStake = false
			},
			upStake(value) {
				if (value.toString().indexOf('.') === -1) {
					return `k${Number(value)}`
				} else {
					let arr = value.toString().split('.')
					let hot = arr[1]
					if (arr[1].length == 1) {
						hot = hot + '00'
					} else if (arr[1].length === 2) {
						hot = hot + '0'
					}
					return `k${Number(arr[0])}+${hot}`
				}

			},
			/* 允许上下行为空 */
			directionUp() {
				if (this.direction.up == 1) {
					this.direction.up = 0
					//this.direction.down = 1
				} else {
					this.direction.up = 1
					this.direction.down = 0
				}
			},
			directionDown() {
				if (this.direction.down == 1) {
					//this.direction.up = 1
					this.direction.down = 0					
				} else {
					this.direction.up = 0
					this.direction.down = 1					
				}
			},
			textScreenClics(text){
				if(text){
					let list = this.localtpe.map(item=>{
						if(item.checkList){
							return {
								...item,
								checkList:item.checkList.filter(it=>it.name.indexOf(text)>-1)
							}
						}
					})
					list = list.filter(item=>item.checkList.length>0)
					this.list=list
				}else{
					this.list = this.localtpe
				}
				
			}
		},
		onBackPress() {
			if (this.isHidden || this.isHiddenThree) {
				this.isHidden = false
				this.isHiddenThree = false
				if (this.isVoice) {
					this.isHidden = true
					this.isVoice = false
				}

				return true
			}

			if (this.isVoiceBar) {
				this.isVoiceBar = false
				return true
			}

			if (this.inputMessage) {
				this.inputMessage = false
				return true
			}
			
			if(this.isHiddenThrees){
				this.isHiddenThrees = false
				return true
			}

		},
	}
</script>

<style lang="scss" scoped>
	.diseaseAdd {
		overflow: hidden;
	}
	.diseaseAdd1 {
		overflow: hidden;
		margin-top: 145upx;
		background: $font-color3;
		/* height: calc(100vh - 145upx); */
		padding-bottom:145upx;		
	}
	.diseaseAddH {
		overflow: hidden;			
		margin-top: 145upx;
		background: $font-color3;
		height: 100vh;/* 没有脚部按钮 */	
	}    
	.diseasCelassifsty {
		background-color: #FFFFFF;
		border-radius: 25upx;
		height: 160upx;
		padding: 30upx 36upx 0;

		.title {
			margin: 0 0 36upx 0;
			font-size: 36upx;
			color: rgb(56, 56, 56);
			font-family: 'pingfangMediumBold';
		}

		.name {
			font-size: 28upx;
			color: rgb(56, 56, 56);
		}

		.img {
			width: 140upx;
			height: 260upx;
		}
	}

	.diseaseLocations {
		background-color: #FFFFFF;
		border-radius: 25upx;
		padding: 45upx 36upx 0;

		.title {
			margin: 0 0 10upx 0;
			font-size: 36upx;
			color: rgb(56, 56, 56);
			font-family: 'pingfangMediumBold';
		}
	}

	.buttom {
		background: rgb(59, 155, 255);
		border: 2upx solid rgb(59, 155, 255);
		width: 160upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 100upx;
		margin-right: 16upx;

		text {
			color: rgb(255, 255, 255);
		}

		image {
			height: 28upx;
			width: 24upx;
			margin-right: 10upx;
		}
	}

	.buttoms {
		border: 2upx solid rgb(59, 155, 255);
		width: 160upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 100upx;
		margin-right: 16upx;

		text {
			color: rgb(59, 155, 255);
		}

		image {
			height: 28upx;
			width: 24upx;
			margin-right: 10upx;
		}
	}

	.vehicele {
		// margin-left: 78upx;
		width: 56upx;
		color: rgb(59, 155, 255);
		text-align: center;
	}

	.vehicele_true {
		background: rgb(59, 155, 255);
		margin-top: 9upx;
		height: 6upx;
		width: 100%;
		border-radius: 6upx;
	}

	.vehicele_false {
		background: rgba(59, 155, 255, 0);
		margin-top: 9upx;
		height: 6upx;
		width: 100%;
		border-radius: 6upx;
	}

	.buttoms_d {
		margin: 0 auto;
		width: 94vw;
		background: rgb(52,159,229);
		text-align: center;
		line-height: 80upx;
		border-radius: 10upx;
		color: #ffffff;
	}

	.buttoms_s {
		margin: 0 auto;
		width: 24vw;
		background: rgb(52,159,229);
		text-align: center;
		line-height: 80upx;
		border-radius: 10upx;
		color: #ffffff;
		font-size: 34upx;
	}
	.title-bar-btn-img {
		width: 36rpx;
		height: 32rpx;
	}
	.title-bar-btn-box-right {
		width: 80rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
