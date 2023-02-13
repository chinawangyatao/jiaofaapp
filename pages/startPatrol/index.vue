<template>
	<view class="header-top-height">
		<header-bar :left="true" :name="name">
			<view v-if="status!=='2'">
				<view v-if="isUpdateContext" @click="isUpdateContext=!isUpdateContext">编辑</view>
			</view>
		</header-bar>
		<view style="padding: 1upx;">
			<mainBar :name="'巡查信息'"  :overflowY="'auto'">
				<main-bar-inter :name="'巡查日期'">
					<view v-if="isAdd" @click="types==='add'?routeClick(3):''" :class="form.inspectDate===''?'fontColor':''">
						{{form.inspectDate===""?'请选择日期':form.inspectDate}}</view>
					<view v-else class="fontColor">{{form.inspectDate}}</view>
				</main-bar-inter>
				<main-bar-inter v-if="status" :name="'开始时间'">
					<view class="fontColor">{{startTime}}</view>
				</main-bar-inter>
				<main-bar-inter v-if="status" :name="'结束时间'">
					<view class="fontColor">{{Number(status)===2?'至今':endTime}}</view>
				</main-bar-inter>
				<main-bar-inter :name="'巡查人'">
					<input v-if="isAdd" disabled="true" placeholder="请输入内容" v-model="form.inspectPersonName" />
					<view v-else class="fontColor">{{form.inspectPersonName}}</view>
				</main-bar-inter>
				<main-bar-inter :name="'同行人'">
					<view @click="routeClick(4)" v-if="isAdd"
						:class="listKeyZValue(form.togetherPersonIds,'infoList').indexOf('请选择')>-1?'fontColor':''">
						{{listKeyZValue(form.togetherPersonIds,'infoList')}}</view>
					<view v-else class="fontColor">{{listKeyZValue(form.togetherPersonIds,'infoList')}}</view>
				</main-bar-inter>
				<main-bar-inter :name="'巡查车'">
					<view v-if="isAdd" @click="routeClick(2)"
						:class="listKeyZValue(form.inspectVehicleId,'patrolCarList').indexOf('请选择')>-1?'fontColor':''">
						{{listKeyZValue(form.inspectVehicleId,'patrolCarList')}}</view>
					<view v-else class="fontColor">{{listKeyZValue(form.inspectVehicleId,'patrolCarList')}}</view>
				</main-bar-inter>
				<main-bar-inter :name="'天气'">
					<view v-if="isAdd" @click="routeClick(1)" :class="listKeyZValue(form.weatherType,'weatherList').indexOf('请选择')>-1?'fontColor':''">
						{{listKeyZValue(form.weatherType,'weatherList')}}</view>
					<view v-else class="fontColor">{{listKeyZValue(form.weatherType,'weatherList')}}</view>
				</main-bar-inter>
			
				
				<view>
					<view class="file">{{isAdd?'开始巡查照片':'巡查照片'}}</view>
					<view @click="screen">
						<upload-image-bar @deleteVideoClick="deleteVideoClick" :file='form.enclosures' @updateImage="updateImage" :isUpdate="isAdd"></upload-image-bar>
					</view>
				</view>
				
			
				<view v-if="name!=='开始巡查'">
					<view class="file">结束巡查照片</view>
					<view @click="screen">
						<upload-image-bar @deleteVideoClick="deletestrEnclosures" :file='strEnclosures' @updateImage="updateImagestrEnclosures" :isUpdate="isAdd"></upload-image-bar>
					</view>
				</view>
			
				<main-bar-inter :name="'巡查内容'" :isDis='true' v-if="!isUpdate" style="margin-top: 20upx;">
					<view class="screen" @click="!isUpdateContext?screenVioce():''">{{form.inspectContent}}</view>
				</main-bar-inter>
			</MainBar>
		</view>
		<view class="botton-bg bottomFielx " style="justify-content: center;">
			<button :disabled="isClick" class="buttoms1" @click="routerViewClick('/pages/endPatrol/index')" v-if="isUpdate">
				{{types==='add'?'保存':'开始巡查'}}
			</button>
			<view v-else>
				<button :disabled="isClick" class="buttoms1" @click="routerView('/pages/endPatrol/index')" v-if="!isUpdateContext">
					保存
				</button>
			</view>
			
		</view>
		
		
		<n-transition ref='tk' :height="'300px'">
			<select-bar :list="weatherList" :visible='visible' :dispatch='true' v-if="type===1" :dataList='dataList'
				:dataValue="dataValue" @confirm="confirm" @cancel="cancel" ></select-bar>
			<select-check-bar @clickQu="clickQu" :list="patrolCarList" v-if="type===2" :name="'inspectVehicleId'"  @hide="$refs.tk.hide()">
			</select-check-bar>
			<time-bar :type="1" @clickQu="clickQu" v-if="type===3"  @hide="$refs.tk.hide()"></time-bar>
			<select-check-bar @clickQu="clickQu" :list="infoList" v-if="type===4" :name="'togetherPersonIds'"  @hide="$refs.tk.hide()">
			</select-check-bar>
		</n-transition>

		<voice-bar ref="voice" v-if="isVoiceBar" :text="form.inspectContent" @input='input'></voice-bar>
	</view>
</template>

<script>
	import MainBarInter from '@/components/main-bar-inter/index.vue'
	import MainBar from '@/components/main-bar/index.vue'
	import TimeBar from '@/components/time-bar/index.vue'
	import NTransition from '@/components/n-transition/n-transition.vue'
	import SelectBar from '@/components/select-bar/index.vue'
	import SelectCheckBar from '@/components/select-check-bar/index.vue'
	import uploadImageBar from '@/components/upload-image-bar/index.vue'
	import VoiceBar from '@/components/voice-bar/index.vue'
	export default {
		components: {
			MainBarInter,
			MainBar,
			TimeBar,
			NTransition,
			SelectBar,
			SelectCheckBar,
			uploadImageBar,
			VoiceBar
		},
		data() {
			return {
				name:'开始巡查',
				type: '',
				visible: false,
				dataList: [1, 2, 3, 4, 5, 6],
				dataValue: [1],
				isUpdate: false,
				isUpdateContext: false,
				isAdd:false,
				id: '',
				form: {
					inspectDate: '', //巡查时间
					inspectPersonName: '', //巡查人
					togetherPersonIds: '', //同行人
					inspectVehicleId: '', //巡查车
					weatherType: '', //天气
					enclosures: [], //照片
					inspectContent: ''
				},
				patrolCarList: [],
				weatherList: [],
				infoList: [],
				isVoiceBar: false,
				strEnclosures:[],
				types:'',
				status:'',
				startTime:"",
				endTime:'',
				isClick:false
			}
		},
		async onLoad(option) {
			//判断是开始巡查还是结束巡查
		
			this.types=option.type			
			this.patrolCar()
			this.weather()
			if(option.type==="add"){
				this.isUpdate = false
				// this.isAdd = true
				this.name = '新增'
			}
			this.getUserListByRoleCodeAndDeptId()
			
			if (option.id) {
				this.isUpdateContext = true
				this.id = option.id
				this.getInspectTaskInfo()
			} else {
				this.isUpdate = true
				this.isAdd = true
				this.preStartTask()
		
				if(option.type!=='add'){
				}
				
			}
			this.status = option.status
			this.startTime=option.startTime
			this.endTime=option.endTime
			
		},
		onBackPress() {
			if (this.isVoiceBar) {
				this.isVoiceBar = false
				return true
			}

		},
		methods: {
			routeClick(id) {
				this.type = id
				this.$refs.tk.show()
				this.visible = true
			},
			getInspectTaskInfo() {
				this.$api.send({
					url: `/inspect/task/getInspectTaskInfo?id=${this.id}`,
					method: 'GET',
					success: (res) => {
						console.log(res)
						if (res.code === 200) {
							const data = res.data
							this.form.inspectDate = data.taskModel.inspectDate
							this.form.inspectPersonName = data.taskModel.inspectPersonName
							this.form.togetherPersonIds = data.taskModel.togetherPersonIds
							this.form.inspectVehicleId = data.taskModel.inspectVehicleId
							this.form.weatherType = data.taskModel.weatherType
							this.form.enclosures = data.file
							this.form.inspectContent = data.taskModel.inspectContent
							this.name = data.taskModel.name
						} else {
							uni.showToast({
								title: '请求失败！',
								icon: 'none',
								duration: 3000
							})
						}
					},
				})
			},
			getUserListByRoleCodeAndDeptId(){
				let personal = uni.getStorageSync('personal')
				personal = JSON.parse(personal)
				this.$api.send({
					url:`/sys-auth/user/getDeptByPeerUser?deptId=${personal.deptId}`,
					method:'get',
					success:(res)=>{
						if(res.code===200){
							let data=  res.data
							console.log(data)
							this.infoList = data.map(item=>({
								id: item.id,
								code: item.trueName,
								checked: false
							}))
						}
					}
				})
			},
			preStartTask(){
				this.$api.send({
					url:`/inspect/task/preStartTask`,
					method:'get',
					success:(res)=>{
						try{
							if(res.code===200){
								let data=  res.data.vo
								Object.keys(this.form).map(key=>{
									this.form[key] = data[key]
								})						
							}
						}catch(e){
							
						}
						let personal = uni.getStorageSync('personal')
						this.form.inspectPersonName = JSON.parse(personal).trueName
						if(this.types!=='add'){
							const data = new Date()
							let year = data.getFullYear()
							let day = data.getDate()
							let motnh = data.getMonth()+1
							let motnhs = motnh.toString().length > 1 ? motnh.toString() : '0' + motnh.toString()
							let days = day.toString().length > 1 ? day.toString() : '0' + day.toString()
							this.form.inspectDate = `${year}-${motnhs}-${days}`
						}else{
							const data = new Date(new Date().getTime()-60*1000*60*24)
							let year = data.getFullYear()
							let day = data.getDate()
							let motnh = data.getMonth()+1
							let motnhs = motnh.toString().length > 1 ? motnh.toString() : '0' + motnh.toString()
							let days = day.toString().length > 1 ? day.toString() : '0' + day.toString()
							this.form.inspectDate = `${year}-${motnhs}-${days}`
						}
					}
				})
			},
			routerView(url) {
				this.isClick=true
				if(this.isAdd){
					this.addTask()
					return
				}
				this.$api.send({
					url:'/inspect/task/endTask',
					method:'post',
					data:{
						inspectContent:this.form.inspectContent,
						id:this.id,
						file:this.form.file 
					},
					success:(res)=>{
						uni.showToast({
							title:res.msg,
							icon: 'none',
							duration: 3000
						})
						this.isClick=false
						setTimeout(()=>{
							if(res.code===200){
								uni.navigateBack({
								    delta: 1
								});
							}
						},1000)
					}
				})
			},
			confirm(value,id) {
				this.dataValue = value
				this.form.weatherType=id
				this.$refs.tk.hide()
				this.visible = false
			},
			cancel() {
				this.$refs.tk.hide()
				this.visible = false
			},
			patrolCar() {
				this.$api.send({
					url: '/inspect/vehicle/patrolCar',
					method: 'GET',
					success: (res) => {
						if (res.code === 200) {

							this.patrolCarList = res.data.map(item => ({
								...item,
								checked: false
							}))
						}
					}
				})
			},
			weather() {
				this.$api.send({
					url: '/common/sysDic/queryDicByCode?code=WEATHER_TYPE',
					method: 'GET',
					success: (res) => {
						if (res.code === 200) {
							this.weatherList = res.data.map(item => ({
								id: item.itemCode,
								code: item.itemName
							}))
						}
					}
				})
			},
			clickQu(date, key) {
				this.form[key] = date
				this.$refs.tk.hide()
				if(key==='inspectDate'){
					// this.name = this.form[key] +'第一次巡查'
				}
			},
			listKeyZValue(list, key) {
				let names = []
				if (list !== '') {
					list && list.split(',').map(item => {
						let name = this[key].filter(items => items.id.toString() === item.toString())
						let nameCode = name.length > 0 ? name[0].code : ''
						names.push(nameCode)
					})
					return names.toString()
				} else {
					return '请选择'
				}


			},
			screenVioce() {
				this.isVoiceBar = true
			},
			input(value) {
				this.form.inspectContent = value
			},
			updateImage(imageArr){
				this.form.enclosures = imageArr
			},
			updateImagestrEnclosures(imageArr){
				this.strEnclosures = imageArr
			},
			routerViewClick(url) {
				this.isClick=true
				// console.log(this.name)
				// return
				
				if(this.name==='新增'){
					this.addTask()
					return
				}
			
				delete this.form.inspectContent
				let isD = false
				Object.keys(this.form).map(item=>{
					if(item!=='enclosures'){
						if(!this.form[item]){
							isD=true
							return
						}
					}					
				})
				if(isD){
					uni.showToast({
						title: '数据不允许为空！',
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
				this.$api.send({
					url:"/inspect/task/startTask",
					method:"post",
					data:{...this.form,togetherPersonNames:this.listKeyZValue(this.form.togetherPersonIds,'infoList')},
					success:(res)=>{
						if(res.code===200){
							let personal = uni.getStorageSync('personal')
							personal = JSON.parse(personal)
							let param = {
								title:res.data.title,
								id:res.data.id
							}
							uni.setStorageSync(personal.id,JSON.stringify(param))
							console.log(this.type)
							if(this.types==='add'){
								uni.navigateBack({
								    delta:1
								});
							}else{
								uni.navigateTo({
									url:`${url}?id=${res.data.id}&title=${res.data.title}`
								})
							}
							
						}else{
							this.isClick = false
						}
					}
				})
				
			},
			deleteVideoClick(index){
				this.form.enclosures[index].modifyType = 2
			},
			deletestrEnclosures(index){
				this.strEnclosures[index].modifyType = 2
			},
			addTask(){
				if(this.strEnclosures>0){
					this.form.enclosures = [...this.form.enclosures,...this.strEnclosures]
				}
				
				this.$api.send({
					url:"/inspect/task/add",
					method:'post',
					data:{...this.form,togetherPersonNames:this.listKeyZValue(this.form.togetherPersonIds,'infoList')},
					success:(res)=>{
						if(res.code===200){
							uni.showToast({
								title:res.msg,
								icon: 'none',
								duration: 3000
							})
							uni.navigateBack({
							    delta: 1
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.buttom {
		margin: 0 auto;
		width: 94vw;
		background: $uni-color-primary;
		text-align: center;
		line-height: 80upx;
		border-radius: 20upx;
		color: #ffffff;
	}

	.fontColor {
		color: rbg(56,56,56);
	}

	.screen {
		width: 97%;
		margin: -10upx auto 0;
		height: 500upx;
		background: #FFFFFF;
		border-radius: 16upx;
	}
</style>
