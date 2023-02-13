<template>
	<view class="index"> 
		<tabs-bar @tavbar="tavbar" :title="'病害库'" :tabs="tabs" :tabsValue="tabsValue" @screen="screen"></tabs-bar>
		<screen-bar @screenTrue='screenTrue' :text="text" :searchTip="'病害名称、位置'"></screen-bar>
		
		<view v-show="tabsValue===3" style="overflow: hidden;margin-top: 100upx;position: fixed;">
			<!--background-color: #F6F6F6;-->
			<view class="conHead" style="-webkit-tap-highlight-color: transparent;padding: 0;border-radius: 0upx;display: flex;justify-content: space-between;align-items: flex-end;">
				<view class="conAd" style="border: 0; ">
					<view  v-for="item in bottomTabs" >
					<!--<view @click="tavbarBottom(item.id)" class="text" :class="item.id===bottomTabsValue?'text_true':''" v-for="item in bottomTabs" :key="item.id">-->
						<view @click="tavbarBottom(item.id)" :style="{ 'font-weight': item.id===bottomTabsValue ? '800' : '500', color: item.id===bottomTabsValue ? '#000000' : '#999999' }">{{item.name}}</view>
						<view class="ss" :class="{ actions: item.id===bottomTabsValue }"></view>
					</view>
				</view>
			</view>
		</view>				
		<view class="ba7-color" :style="{'overflow': 'hidden','margin-top': tabsValue === 3 ? '155upx' : '120upx'}">
		<!--<view class="ba7-color" style="overflow: hidden;margin-top: 120upx;">-->
		    <!--1待入库-->
			<view v-if="!isBProject" v-show="tabsValue===1">				
				<list-value-bar ref="urlRquest1" :param="inStorageArr" :paramTobe="inStorageTobe" :isHidden="false" @rouer="rouerY" :url="'/repair/disease/pageList'"  :type="'toBeWarehoused'" @scrolltolower="scrolltolower"></list-value-bar>
			</view>
			 <!--2全部-->
			<view v-show="tabsValue===-1">				
				<list-value-bar ref="urlRquest2" :param="allDiseaseArr" :paramTobe="allDiseaseTobe" :url="'/repair/disease/pageList'" @rouer="rouerY" :type="'warehoused'" @scrolltolower="scrolltolower2"></list-value-bar>
			</view>
			<!--3待派单-->
			<view v-if="!isBProject" v-show="tabsValue===3">				
				<list-bar @closeno="closenoWare" ref="urlRquest3"  :param="sendOrderArr" :paramTobe="sendOrderTobe" :url="'/repair/disease/waitPageList'" @scrolltolower="scrolltolower3" @rouer="rouerY" @warehousing="warehousing"></list-bar>
			</view>
		</view>
				
		<n-transition ref='ware' :background="'rgb(241, 241, 243)'" :index="49" :isRadios="false">
			<clone-bar :background="'rgb(255, 255, 255)'" @screen="screenHousing" @closeno="$refs.ware.hide()">
				<view>
					<main-bar-inter :name="'维修单名称：'" :vm="'176upx'" :isTop="false" :isDisBottom="false" >
						<input v-model="repairName" placeholder="请输入"/>
					</main-bar-inter>
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
					<main-bar-inter :name="'预计工程量：'" :isTop="false" :isDisBottom="false" style="margin-bottom: 24upx;display: flex;align-items: flex-start;justify-content: space-between;">
						<textarea placeholder="请输入" v-model="planQuanttityDesc"  style="font-size: 30upx;margin: 13px 0;overflow-y: auto;max-height: 150px;margin-left: 15px;" :auto-height="true">{{planQuanttityDesc}}</textarea>
					</main-bar-inter>
				</view>
			</clone-bar>
		</n-transition>
		
		<n-transition ref='rk' :index="50">
			<time-integrity-bar @clickQu="clickQurk" :type="365*10" :dataArr="dataArr" @hide="$refs.rk.hide()"></time-integrity-bar>
		</n-transition>
		<!--条件过滤弹框 tabsValue  2已入库 -1全部 1待入库 3待派单-->
		<n-transition ref='tk'> 
			<screen-value-bar  v-if="tabsValue===1" @screen="screenTode" @closeno="closeno" :actionList='actions' @cleck="cleck" :title="'按类型'"></screen-value-bar>
			<screen-value-list-bar  v-if="tabsValue===-1"  @screen="screenParam" @closeno="closeno" :actionList='actionsList' @cleck="cleckParam" :titleList="titleLit"></screen-value-list-bar>
			<screen-value-bar v-if="tabsValue===3" @screen="screenPages"  @closeno="closeno" :actionList='actionsPage' @cleck="cleckpages" :title="'按状态'"></screen-value-bar>		
		</n-transition>
		<screen-voice-bar v-if="isVoice" @input="input" :text="text" @inputUpvoice="inputUpvoice" @clearKey="clearKey"></screen-voice-bar> <!-- 录入不点检索就走后台查询 @input="input" --> 
		
		<radion-button-bar @textScreen="textScreen" :text="text" @screenTrue="screenTrue" v-if="isHiddenJS"
			:list="list" :title="title" @getvalue="getvalueJS" :id="unitRepairId" :type="1"
			@getId="getZ" />
		<radion-button-bar @textScreen="textScreen" :text="text" @screenTrue="screenTrue" v-if="isHiddenJS2"
				:list="list" :title="title" @getvalue="getvalueJS2" :id="supervisorUnitId" :type="1"
				@getId="getZ" />
	</view>
</template>

<script>
	import NTransition from '@/components/n-transition/n-transition.vue'
	import TimeIntegrityBar from '@/components/time-integrity-bar/index.vue'
	import RadionButtonBar from '@/components/radio-button-bar/index.vue'
	import ScreenBar from '@/components/screen-bar/index.vue'
	import ScreenVoiceBar from '@/components/screen-voice-bar/index.vue'
	import TabsBar from '@/components/tabs-bar/index.vue'
	import ScreenValueListBar from '@/components/screen-value-list-bar/index.vue'
	import ListValueBar from '@/components/list-value-bar/index.vue'
	import ListBar from '@/components/list-bar/index.vue'
	import ScreenValueBar from '@/components/screen-value-bar/index.vue'
	import {getPersonal,jurisdictionList} from '@/utils/jurisdictionUtils'
    import CloneBar from '@/components/clone-bar/index.vue'
	import MainBar from '@/components/main-bar/index.vue'
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	//import { reactive } from "vue"
	
	// 模拟的数据对象，要是响应式的
    //let data = reactive([] as { id: number; text: string; selected: boolean }[]);
	// 存储已选内容， 因为这个列表是增删很频繁的，所以选用map而不是数组，key对应的是数据的下标。至于value存放什么，完全由自己定
	//let selected = reactive(new Map<number, number>())
	
	export default {
		components: {
			MainBar,
			MainBarInter,
			NTransition,
			TimeIntegrityBar,
			RadionButtonBar,
			ScreenBar,
			ScreenVoiceBar,
			TabsBar,
			ScreenValueListBar,
			ListValueBar,
			ListBar,
			ScreenValueBar,
			CloneBar
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
				isBProject: uni.getStorageSync("jurisdiction")===jurisdictionList[2],
				dataArr:dataArr,
				tabsShow: true,
				isHiddenJS2: false,
				isHiddenJS: false,
				getDeptListByUserList: [],
				getDeptSupervisorListByUserList: [],
				
				unitRepairId: '',
				supervisorUnitId: '',
				repairName: '',
				dateTime: dateTime1,
				planQuanttityDesc: '',
				desc: '',
				
				actions: [{
					title: '路基',
					selected: false,
					score: 0,
					type:'1',
				}, {
					title: '路面',
					selected: false,
					score: 0,
					type:'2',
				}, {
					title: '桥梁',
					selected: false,
					score: 0,
					type:'3',
				}/* , {
					title: '隧道',
					selected: false,
					score: 0,
					type:'5',
				} */, {
						title: '涵洞',
						selected: false,
						score: 0,
						type:9
					}, {
					title: '交安设施',
					selected: false,
					score: 0,
					type:'6',
				}, {
						title: '收费站',
						selected: false,
						score: 0,
						type:8
					}, {
						title: '服务区',
						selected: false,
						score: 0,
						type:7
					}, {
					title: '绿化设施',
					selected: false,
					score: 0,
					type:'4',
				}],
				isVoice: false,
				tabs: [],
				tabsValue: 1,
				
				bottomTabs: [{
						id: 1,
						name: '路基'
					},
					{
						id: 2,
						name: '路面'
					},
					{
						id: 3,
						name: '桥梁'
					},
					{
						id: 6,
						name: '交安'
					}],
				bottomTabsValue: 1,

				titleLit: ['按状态', '按类型'],
				actionsList: [
					[{
							title: '待派单',
							selected: false,
							score: 0,
							type:1
						},
						{
							title: '维修中',
							selected: false,
							score: 0,
							type:2
						},
						{
							title: '已维修',
							selected: false,
							score: 0,
							type:3
						}
					],
					[{
						title: '路基',
						selected: false,
						score: 0,
						type:1
					}, {
						title: '路面',
						selected: false,
						score: 0,
						type:2
					}, {
						title: '桥梁',
						selected: false,
						score: 0,
						type:3
					}/* , {
						title: '隧道',
						selected: false,
						score: 0,
						type:5
					} */, {
						title: '涵洞',
						selected: false,
						score: 0,
						type:9
					}, {
						title: '交安设施',
						selected: false,
						score: 0,
						type:6
					}, {
						title: '收费站',
						selected: false,
						score: 0,
						type:8
					}, {
						title: '服务区',
						selected: false,
						score: 0,
						type:7
					}, {
						title: '绿化设施',
						selected: false,
						score: 0,
						type:4
					}]
				],
				
				
				inStorageArr:['diseName','mainName','diseName','diseSubmitDate','locationDesc','diseaseFirstTypeName','diseasetypeName'],
				inStorageTobe:{
					"searchContent": "",
					"diseaseType": "",
					"mainStatus": "",
					"pageNo": 1,
					"pageSize": 20,
					"status": "1"
				},
				
				allDiseaseArr:['diseStatus','mainName','diseName','diseSubmitDate','locationDesc','diseaseFirstTypeName','diseasetypeName'],
				allDiseaseTobe:{
					"searchContent": "",
					"diseaseType": "",
					"mainStatus": "",
					"pageNo": 1,
					"pageSize": 20,
					"status": "-1"
				},
				
				actionsPage:[{title:'待入库',selected:false,score:0},{title:'待派单',selected:false,score:0}],
				sendOrderArr:['diseStatus','mainName','diseName','diseSubmitDate','locationDesc'],
				sendOrderTobe:{
					pageNo:1,
					pageSize:20,
					searchContent:'',
					mainStatus:'',
					status:'',
					
				},
				
				text:'',
				
				is:1
			}
		},
		onLoad() {
			this.is=2
			if(uni.getStorageSync("jurisdiction")===jurisdictionList[2]){
				
				this.tabs=[
					{
						id: -1,
						name: '全部'
					}
				]
				this.tabsValue = -1
			}else{
				this.tabs=[{
					id: -1,
					name: '全部'
				}, {
					id: 1,
					name: '待入库'
				},
				{
					id: 3,
					name: '待派单'
				}]
				this.tabsValue = 1
			}
			this.groupStatistic()
			
			//如果是甲方获取一下监理单位和施工单位
			if(uni.getStorageSync("jurisdiction")!==jurisdictionList[2]){//根据角色来判断去获取第三方单位？？？是否需要优化
				this.getDeptListByUserId()
				this.getDeptListByUserId2()
			}
			
		},
		onShow() {
			//alert("diseasebank onshow")
			//alert(this.is)
			//alert("onShow调用请求==2budiao"+this.is)
			if(this.is!==2){
				//alert("cuowu")
				/*if(uni.getStorageSync("jurisdiction")!=jurisdictionList[2]){
					
					this.inStorageTobe.pageNo=1
					this.sendOrderTobe.pageNo=1
					this.$refs.urlRquest1.urlRquest()				
					this.$refs.urlRquest3.urlRquest()
				}*/
				//不建议放在这里应该放在保存成功里刷新列表
				//this.allDiseaseTobe.pageNo=1
				
				
				let tv = this.tabsValue
				//alert("tv="+tv)
				if(tv===1){					
					this.$refs.urlRquest1.urlRquest()
				}else if(tv===-1){						
					this.$refs.urlRquest2.urlRquest()
				}else{					
					this.$refs.urlRquest3.urlRquest()
					//this.sendOrderTobe.pageNo=1
				}
				
				
			}
			
		},
		mounted() {
		},
		methods: {
			
			getvalueJS(index, title) {
				this.unitRepairId = this.getDeptListByUserList[index].id
				this.isHiddenJS = false
			},
			getvalueJS2(index, title) {
				this.supervisorUnitId = this.getDeptSupervisorListByUserList[index].id
				this.isHiddenJS2 = false
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
			//批量派单弹框的确定按钮
			screenHousing() {				
				
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
				//是不是只有批量的调用？？？
				//派单或入库派单
				//完成期限去除 + ":00"
				/*
				{
				"repairName": "工单名称",
				    "advice": "处理要求",
				    "date": "2022-06-28 16:17",
				    "id": "1533419276999819266",
				    "unitRepairId": "9902",
				    "supervisorUnitId": "9904",
				    "planQuanttityDesc": "预计工程量"
				}*/
				this.$api.send({
					url: `/repair/disease/mergeOrders`,//mergeOrders 
					method: 'post',
					data: {
						"advice": this.desc,
						"date": this.dateTime,
						// "date": this.dateTime,
						"id": this.optionId,
						unitRepairId: this.unitRepairId,
						supervisorUnitId: this.supervisorUnitId,
						planQuanttityDesc: this.planQuanttityDesc,
						repairName: this.repairName,
					},
					success: (res) => {
						//alert(res.code)
						
						this.getListData(res.msg)
						/*setTimeout(()=>{
							this.isClick = false
							uni.navigateBack({
								delta: 0
							});
						},3000)*/
						/*if (res.code === 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
							uni.navigateBack({
								delta: 1
							});
		
						}*/
		
					},
				})
				
			},
			clickQurk(data) {
				this.dateTime = data
				this.$refs.rk.hide()
			},
			time() {
				this.$refs.rk.show()
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
			warehousing(ids,names) {
				
				//alert(names)
				this.repairName=names
				this.optionId=ids
				this.desc = ''//通过
				this.planQuanttityDesc=''
				this.$refs.ware.show()
			},
			closenoWare(resmsg) {
				this.$refs.ware.hide()
				if(resmsg){
					uni.showToast({
						title: resmsg,
						icon: 'none',
						duration: 3000
					})
				}
			},
			screen() {
				this.$refs.tk.show()
			},
			closeno() {
				this.$refs.tk.hide()
			},
			screenTrue() {
				this.isVoice = true
			},
			getListData(resmsg) {
				//alert("getListData")
				let tv = this.tabsValue
				if(tv===1){					
					this.$refs.urlRquest1.urlRquest()
				}else if(tv===-1){					
					this.$refs.urlRquest2.urlRquest()
				}else{					
					this.$refs.urlRquest3.urlRquest(resmsg)
				}
			},
			tavbarBottom(id) {
				this.bottomTabsValue = id
				this.sendOrderTobe={
					pageNo:1,
					pageSize:20,
					searchContent:this.text,
					mainStatus:'',
					status:'',//？？this.tabsValue
					diseaseType:this.bottomTabsValue,
				}
				//this.sendOrderTobe.diseaseType=this.bottomTabsValue
				//this.sendOrderTobe.pageNo=1				
				//getListData()
			},
			tavbar(id) {
				//alert("tavbar"+id)
				this.bottomTabsValue=1
				this.tabsValue = id
				this.text = ''
				
				this.actions=[{
					title: '路基',
					selected: false,
					score: 0,
					type:'1',
				}, {
					title: '路面',
					selected: false,
					score: 0,
					type:'2',
				}, {
					title: '桥梁',
					selected: false,
					score: 0,
					type:'3',
				}/* , {
					title: '隧道',
					selected: false,
					score: 0,
					type:'5',
				} */, {
						title: '涵洞',
						selected: false,
						score: 0,
						type:9
					}, {
					title: '交安设施',
					selected: false,
					score: 0,
					type:'6',
				}, {
						title: '收费站',
						selected: false,
						score: 0,
						type:8
					}, {
						title: '服务区',
						selected: false,
						score: 0,
						type:7
					}, {
					title: '绿化设施',
					selected: false,
					score: 0,
					type:'4',
				}]
				
				this.actionsList=[
					[{
							title: '待派单',
							selected: false,
							score: 0,
							type:1
						},
						{
							title: '维修中',
							selected: false,
							score: 0,
							type:2
						},
						{
							title: '已维修',
							selected: false,
							score: 0,
							type:3
						}
					],
					[{
						title: '路基',
						selected: false,
						score: 0,
						type:1
					}, {
						title: '路面',
						selected: false,
						score: 0,
						type:2
					}, {
						title: '桥梁',
						selected: false,
						score: 0,
						type:3
					}/* , {
						title: '隧道',
						selected: false,
						score: 0,
						type:5
					} */, {
						title: '涵洞',
						selected: false,
						score: 0,
						type:9
					}, {
						title: '交安设施',
						selected: false,
						score: 0,
						type:6
					}, {
						title: '收费站',
						selected: false,
						score: 0,
						type:8
					}, {
						title: '服务区',
						selected: false,
						score: 0,
						type:7
					}, {
						title: '绿化设施',
						selected: false,
						score: 0,
						type:4
					}]
				]
				if(id===1){
					//this.inStorageTobe.searchContent = ''
			
					
					this.inStorageTobe={
						"searchContent": "",
						"diseaseType": "",
						"mainStatus": "",
						"pageNo": 1,
						"pageSize": 20,
						"status": "1"
					}
					//this.inStorageTobe.pageNo=1
					//加上以后数据加倍
					//this.$refs.urlRquest1.urlRquest()
				}else if(id===-1){
					//this.allDiseaseTobe.searchContent = ''
					
					this.allDiseaseTobe={
						"searchContent": "",
						"diseaseType": "",
						"mainStatus": "",
						"pageNo": 1,
						"pageSize": 20,
						"status": "-1"
					}
					//this.allDiseaseTobe.pageNo=1
					//加上以后数据加倍
					//this.$refs.urlRquest2.urlRquest()
				}else{
					//this.sendOrderTobe.searchContent = ''
					//给 sendOrderTobe 赋值会调用列表重新请求
					this.sendOrderTobe={
						pageNo:1,
						pageSize:20,
						searchContent:'',
						mainStatus:'',
						status:'',
						diseaseType:this.bottomTabsValue
					}
					//this.sendOrderTobe.pageNo=1
					//加上以后数据加倍
					//this.$refs.urlRquest3.urlRquest()
				}
			},
			cleck(item, index) {
				this.actions[index].selected = !item.selected
			},
			/*rouer(item) {
				alert("item"+item.mainName)
				uni.navigateTo({
					url: `/pages/diseaseAdd/index?id=${item.id}&store=toBeWarehoused&name=病害审批`
				})
				this.is=1
			},*/
			rouerY(item) {
				//alert("rouerY"+item.mainName)
				if(item.mainName==='待入库'){
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&store=toBeWarehoused&name=病害审批`
					})
				}else if(item.mainName==='待派单'){
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&type=1&store=warehoused&name=病害派单`
					})
				}else{
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&type=1&store=warehoused&diseStatus=${item.diseStatus}&name=病害查看`
					})
				}
				this.is=1
			},
			/*rouerD(item) {
				alert("rouerD"+item.mainName)
				if(item.mainName==='待入库'){
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&store=toBeWarehoused&name=病害审批`
					})
				}else{
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&type=1&store=warehoused&name=病害派单`
					})
				}
					this.is=1
			},*/
			screenTode(){
				let arr=[]
				this.actions.map(item=>{
					if(item.selected){
						arr.push(item.type)
					}
				})
				this.inStorageTobe.pageNo = 1
				this.inStorageTobe.diseaseType = arr.toString()
				this.$refs.tk.hide()
			},
			screenParam(){
				let arr= []
				let arr1 = []
				this.allDiseaseTobe.pageNo = 1
				//console.info("this.actionsList[0]")
				//console.info(this.actionsList[0])
				this.actionsList[0].map(item=>{
					if(item.selected){
						arr.push(item.type)
					}
				})
				
				this.actionsList[1].map(item=>{
					if(item.selected){
						arr1.push(item.type)
					}
				})
				
				this.allDiseaseTobe.mainStatus= arr.toString()
				this.allDiseaseTobe.diseaseType = arr1.toString()
				
				this.$refs.tk.hide()
			},
			//diseaseType:this.bottomTabsValue,
			screenPages(){
				this.actionsPage.map(item=>{
					if(item.selected){
						if(item.title==='待入库'){
							this.sendOrderTobe.status = 1
						}else{
							this.sendOrderTobe.mainStatus = 1
						}
					}else{
						if(item.title==='待入库'){
							this.sendOrderTobe.status = ''
						}else{
							this.sendOrderTobe.mainStatus = ''
						}
					}
				})
				if(this.actionsPage.filter(item=>!item.selected).length ===this.actionsPage.length){
					this.sendOrderTobe.status = 1
					this.sendOrderTobe.mainStatus = 1
				}
				//alert("this.bottomTabsValue="+this.bottomTabsValue)
				this.sendOrderTobe.diseaseType=this.bottomTabsValue
				this.sendOrderTobe.pageNo = 1
				this.$refs.tk.hide()
			},
			cleckParam(item,index,i){
				this.actionsList[i][index].selected = !item.selected
			},
			
			cleckpages(item,index){
				this.actionsPage[index].selected=!item.selected
			},
			input(value){//检索框录入触发事件
				let tv = this.tabsValue
				this.text = value
				if(tv===1){
					this.inStorageTobe.searchContent = value
					this.inStorageTobe.pageNo = 1
				}else if(tv===-1){
					this.allDiseaseTobe.searchContent = value
					this.allDiseaseTobe.pageNo = 1
				}else{
					this.sendOrderTobe.searchContent = value
					this.sendOrderTobe.pageNo = 1
				}				
			},
			inputUpvoice(){//点取消/搜索							
				this.isVoice = false
				//点搜索增加如下功能，如果blur/input有了，该页面不需要加，其他页面不加有问题，不知道为什么
				/*
				let tv = this.tabsValue
				this.text = value
				if(tv===1){
					this.inStorageTobe.searchContent = this.text
				}else if(tv===-1){
					this.allDiseaseTobe.searchContent = this.text					
				}else{
					this.sendOrderTobe.searchContent = this.text
				}	
				this.getListData()
				*/
				//这里应该初始化页码，不然下滑后再查询会无数据->这个页面不需要调用了input
			},
			clearKey(){//点清空搜索内容，因为搜索时不查询，所以需要在这里清空查询条件
				this.text = ''
				let tv = this.tabsValue
				if(tv===1){
					this.inStorageTobe.searchContent = ''
				}else if(tv===-1){
					this.allDiseaseTobe.searchContent = ''					
				}else{
					this.sendOrderTobe.searchContent = ''
				}	
			},
			scrolltolower(waitflag){
				if(!waitflag){
					this.inStorageTobe.pageNo+=1
				}
			},
			scrolltolower2(waitflag){
				
				if(!waitflag){
					this.allDiseaseTobe.pageNo+=1
				}
			},
			scrolltolower3(waitflag){
				if(!waitflag){
					//console.info("不需要等待直接请求")
					this.sendOrderTobe.pageNo+=1
				}else{
					//console.info("正在请求请等待")
				}				
				
			},
			async groupStatistic(){
				const response = await this.$api.send({url:'/repair/disease/groupStatistic',method:"get"})
				if(response.data.code===200){
					const data = response.data.data
					this.screening(data)
				}
			},
			screening({statusType,diseaseType}){
				this.actions =[
					{
						title: '路基',
						selected: false,
						score: diseaseType[0].num,
						type:'1',
					}, {
						title: '路面',
						selected: false,
						score: diseaseType[1].num,
						type:'2',
					}, {
						title: '桥梁',
						selected: false,
						score: diseaseType[2].num,
						type:'3',
					}/* , {
						title: '隧道',
						selected: false,
						score: diseaseType[3].num,
						type:'5',
					} */, {
						title: '涵洞',
						selected: false,
						score: 0,
						type:9
					}, {
						title: '交安设施',
						selected: false,
						score: diseaseType[5].num,
						type:'6',
					}, {
						title: '收费站',
						selected: false,
						score: 0,
						type:8
					}, {
						title: '服务区',
						selected: false,
						score: 0,
						type:7
					}, {
						title: '绿化设施',
						selected: false,
						score: diseaseType[4].num,
						type:'4',
					}
				]
				
				this.actionsList=[
					[{
							title: '待派单',
							selected: false,
							score: statusType[0].num,
							type:1
						},
						{
							title: '维修中',
							selected: false,
							score: statusType[1].num,
							type:2
						},
						{
							title: '已维修',
							selected: false,
							score: statusType[2].num,
							type:3
						}
					],
					this.actions
				]
			},
		},
		onBackPress() {
			if (this.isVoice) {
				this.isVoice = false
				return true
			}
		},
	}
</script>


<style scoped lang="scss">
	.index {
		background: $font-color3;
		height: 100vh;
		overflow: hidden;
	}
	/**
	 * tab_bottom 2的样式
	 */
	.conHead {
		// display: flex;
		// justify-content: space-between;
		// align-items: flex-end;
		height: 48upx;
		padding: 0 24upx;
		border-top-left-radius: 16upx;
		border-top-right-radius: 16upx;
		//background-color: #fff;
		// border-bottom: 1upx dashed #767676;
		.blue {
			color: rgb(28, 130, 212);
			font-size: 34upx;
			margin-right: 20upx;
		}
	
		.orange {
			line-height: 28upx;
			padding: 5upx 9upx;
			border-radius: 4upx;
			font-size: 24upx;
			font-weight: 500;
			background-color: rgb(228, 131, 26);
	
			text {
				color: #fff;
				font-size: 24upx;
				font-weight: normal;
			}
		}
	
		.red {
			background-color: rgb(241, 71, 71);
		}
	
		image {
			width: 34upx;
			height: 34upx;
		}
	}
	
	.conAd {
		padding-left: 20upx;
		line-height: 1;
		//padding-top: 32upx;
		border-bottom: 1px dashed #ccc;
		//padding-bottom: 35upx;
		display: flex;
		align-items: center;
	
		view {
			width: 114upx;
			text-align: center;
	
			.ss {
				height: 8upx;
			}
	
			.actions {
				margin: 0 auto;
				background-color: #1c82d4;
				height: 8upx;
				border-radius: 8upx;
				width: 70upx;
			}
		}
	}
	/**
	 * 列表样式
	 */
	.selectAll {
		font-size: 30rpx;
		margin-left: 20rpx;
		color: #FFFFFF;
	}
	@font-face {
		font-family: 'pingfangMediumBold';
		src:url('~@/static/famiy/PINGFANG+BOLD.TTF') format('truetype');
	}
	.content {
		margin: 16upx 30upx;
		padding: 26upx 24upx;
		border-radius: 12upx;
		background-color: #fff;
		position: relative;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		font-family: 'pingfangMedium';
		.state {
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.title {
				display: flex;
				align-items: center;
				
				text{
					font-style: 30upx;
					color: rgb(56,56,56);
					// font-family: 'pingfangMediumBold';
					font-weight: 700;
				}
				view {
					color: #fff;
					border-radius: 4upx;
					font-size: 24upx;
					height: 34upx;
					padding: 0 10rpx;
					text-align: center;
					line-height: 34upx;
					background-color: rgb(180, 180, 180);
					margin-right: 10upx;
				}	
				.details {
					background-color: rgb(241, 71, 71);
					height: 34upx;
					line-height: 34upx;
					border-radius: 4upx;
					font-size: 24upx;
					width: 110upx;/* 76upx */
					
				}
				.titelText {					
					width: 550upx;
				}
				.titelText1 {					
					width: 600upx;
				}
	
				.work {
					background-color: rgb(54, 149, 226);
				}
	
				.arrive {
					background-color: rgb(113, 71, 221);
				}
	
				.repair {
					background-color: rgb(228, 131, 26);
				}
	
				.confirm {
					background-color: rgb(175, 29, 90);
				}
	
				.receipt {
					background-color: rgb(19, 193, 191);
				}
	
				.complete {
					background-color: rgb(180, 180, 180);
				}
			}
	
			// text {
			// 	width: 500upx;
			// 	overflow: hidden;
			// 	text-overflow: ellipsis;
			// 	white-space: nowrap;
			// 	font-size: 30upx;
			// 	font-weight: 600;
			// }
		}
	
		.label-width {
			width: 100upx;
		}
	
		.equipment {
			margin-top: 22upx;
	
			.eqTxt {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				line-height: 32upx;
	
				view {
					font-size: 26upx;
					color: #383838;
					font-weight: normal;
					text-overflow: ellipsis;
					/* white-space: nowrap; */
				}
	
				.ftxt {
					font-size: 26upx;
					color: rgb(118,118,118);
					width: 76upx;
				}
				.ftxtw {
					font-size: 26upx;
					color: rgb(118,118,118);
					/* width: 76upx; */
					width: 140upx;
				}	
				.ftxt1 {
					width: 550upx;
					font-size: 26upx;
					color: rgb(56,56,56);
					/* margin-right: 20upx; */
					/* margin-left: 10upx; */
				}
			}
		}
	
		.task {
			position: absolute;
			right: 24upx;
			bottom: 26upx;
			width: 100upx;
			// padding: 2upx 10upx;
			font-size: 26upx;
			text-align: center;
			border: #1c82d4 2upx solid;
			border-radius: 40upx;
			height: 40upx;
			line-height: 40upx;
			color: #1c82d4;
		}
	}
	.textClass{
		font-style: 30upx;
		color: rgb(56,56,56);
		font-family: 'pingfangMediumBold';
		// font-weight: 700;
	}
	
	/**
	 * 脚部
	 */
	.buttoms_22 {
		margin: 0 auto;
		width: 300upx;
		background: #3b9bff;
		text-align: center;
		line-height: 105upx;
		border-radius: 0upx;
		color: #ffffff;
		font-size: 34upx;	
		margin-right: 0upx;
	}
</style>
