<template>
	<view class="index"> 
		<tabs-bar :left="false" @tavbar="tavbar" :title="'待办'" :tabs="tabs" :tabsValue="tabsValue" @screen="screen"></tabs-bar>		
		<screen-bar @screenTrue='screenTrue' :text="text" :searchTip="tabsValue===1 ? '病害名称、位置' : '病害名称、位置、工单编号'"></screen-bar>
		<view class="ba7-color" style="overflow: hidden;margin-top: 98upx;">
			<view v-if="tabsValue===1">
				<scroll-view @scrolltolower="scrolltolower" scroll-y style="height:calc(100vh - 324upx);overflow: hidden;">
					<view class="content" v-for="(item,index) in pageList" :key="index" @click="rouerD(item)">
						<view class="state">
							<view class="title">
								<view
									:style="{'background':backgroundLink(item.diseStatus)}"
									class="details"> 
									{{item.mainName}}
								</view>
								<text>{{item.diseName}}</text>
							</view>
						</view>
						<view class="equipment">
							<view class="eqTxt">
								<text class="ftxt">时间:</text>
								<view class="ftxt1">{{item.diseSubmitDate}}</view>
							</view>
							<view class="eqTxt" style="margin-top: 16upx;">
								<text class="ftxt">类型:</text>
								<view>{{item.diseaseFirstTypeName}}-{{item.diseasetypeName}}</view>
							</view>
							<view class="eqTxt" style="margin-top: 16upx;">
								<text class="ftxt">位置:</text>
								<view class="ftxt1">{{item.locationDesc}}</view>
							</view>
						</view>
					</view>
					<view  v-if="errorStatus == 'noData'" style="display: flex;flex-direction: column;align-items: center;padding-top: 258upx;">
						<text style="font-size: 32upx;color: #666666;">没有找到相关数据</text>
					</view>
				</scroll-view>				
			</view>
			<view v-if="tabsValue===2">
				<list-value-bar ref="urlRquest2"  :paramName="['','','','完成期限：','病害位置：','病害类型：','']" :param="['status','status_text','diseName','planDoneDate','locationDesc','diseasetypeName']" :url="`/repair/matRepair/pageList?pageNo=${pageNo}&pageSize=${pageSize}`" :paramTobe="param" @scrolltolower="scrolltolower1" @rouer="clickItem"></list-value-bar>
			</view>
		</view>
		<!-- 过滤条件 -->
	    <n-transition ref='tk' :height="'450upx'" :isRadios="false" :isTavBar="true" :index="1000">
			<screen-value-bar v-if="tabsValue===1" @screen="screenVal"  @closeno="closeno" :actionList='actions' @cleck="cleck" :title="'病害库'"></screen-value-bar>
			<screen-value-bar v-if="tabsValue===2" @screen="screenValCleck"  @closeno="closenoWork" :actionList='actionsType' @cleck="cleckWork" :title="'病害维修'"></screen-value-bar>
		</n-transition>
		
		<screen-voice-bar v-if="isVoice" :text="text"  @input='input'  @inputUpvoice="inputUpvoice"   @clearKey="clearKey"></screen-voice-bar>
	</view>
</template>


<script>
	import NTransition from '@/components/n-transition/n-transition.vue'
	import ScreenBar from '@/components/screen-bar/index.vue'
	import ScreenVoiceBar from '@/components/screen-voice-bar/index.vue'
	import TabsBar from '@/components/tabs-bar/index.vue'
	import ScreenValueBar from '@/components/screen-value-bar/index.vue'
	import ListValueBar from '@/components/list-value-bar/index.vue'
	import {getPersonal,jurisdictionList} from '@/utils/jurisdictionUtils'
	export default{
		components:{
			NTransition,
			ScreenBar,
			ScreenVoiceBar,
			TabsBar,
			ScreenValueBar,
			ListValueBar
		},
		onLoad() {
			//this.getPageList()
			if(uni.getStorageSync("jurisdiction")===jurisdictionList[2] || uni.getStorageSync("jurisdiction")===jurisdictionList[3]){
				this.tabs=[{id:2,name:'病害维修'}]
				this.tabsValue = 2
				this.actionsType = [
					{title:'未开始',selected:false,score:0,type:1},
					{title:'维修中',selected:false,score:0,type:2},
					{title:'整改中',selected:false,score:0,type:4}
				]
			}
			
		}, 
		onShow(){
			this.pages.mainStatus = ""
			this.pages.status = ""
			this.pages.pageNo=1
			this.pageList = []
			this.getPageList()
		},
		data(){
			return {
				errorStatus: null,
				actions:[{title:'待入库',selected:false,score:0},{title:'待派单',selected:false,score:0}],
				isVoice:false,
				tabs:[
					{id:1,name:'病害库'},
					{id:2,name:'病害维修'},
				],
				tabsValue:1,
				pageList:[],
				//病害库
				pages:{
					pageNo:1,
					pageSize:10,
					searchContent:'',
					mainStatus:'',
					status:''
				},
				text:"",
				
				actionsType:[
					{title:'待验收',selected:false,score:0,type:3},
					// {title:'转序待审',selected:false,score:0,type:-2},
				],
				//病害维修
				param:{
					searchContent:"",
					status:"",
					flag:"1",
					user:(uni.getStorageSync("jurisdiction")===jurisdictionList[2])?'yf001':'jf001',
					userRoleCode:uni.getStorageSync("jurisdiction")
				},
				pageNo:1,//病害维修用的这个
				pageSize:10,
			}
		},
		methods:{
			screen(){
				//隐藏后导致模糊搜索时消失
				//uni.hideTabBar()
				setTimeout(()=>{
					this.$refs.tk.show()
				},500)
			},
			closeno(){
				//console.log("closeno")
				this.pages.mainStatus = ""
				this.pages.status = ""
				this.$refs.tk.hide()				
			},
			scrolltolower(){
				this.pages.pageNo+=1
				this.getPageListPage()
			},
			scrolltolower1(){
				this.pageNo+=1
			},
			screenTrue(){
				this.isVoice=true
				//隐藏后导致模糊搜索时消失
				//uni.hideTabBar();
			},
			tavbar(id){				
				this.tabsValue = id
				//this.tabsValue不同是否都是下边的
				this.text = ''
				
				
				if(id===1){										
					this.pages.searchContent = ''
					this.pages.pageNo = 1
					this.getPageList()
				}else{					
					if(this.$refs.urlRquest2){
						this.param.searchContent = ''
						this.pageNo = 1
						this.$refs.urlRquest2.urlRquest()
					}					
				}				
			},
			cleck(item,index){
				this.actions[index].selected=!item.selected
			},
			getPageList(){
				this.$api.send({
					url:'/repair/disease/waitPageList',
					method:'post',
					data:this.pages,
					success:(res)=>{
						if(res.code===200){
							this.pageList = res.data.list							
							//初始化没有数据的情况
							if (this.pageList && this.pageList.length > 0) {							
								this.errorStatus = null;	
							} else {
								this.errorStatus = 'noData';					
							}
							//
							//
						}
					}
				})
			},
			getPageListPage(){				
				this.$api.send({
					url:'/repair/disease/waitPageList',
					method:'post',
					data:this.pages,
					success:(res)=>{
						if(res.code===200){
							this.pageList = this.pageList.concat(res.data.list)							
						}
					}
				})
			},
			backgroundLink(status){
				
				switch(status){
					/* case '1':
						return 'rgb(54,149,226)'
					case '2':
						return 'rgb(19,193,191)'
					case '3':
						return 'rgb(247,71,71)'
					default:
						return 'rgb(113, 71, 221)' */
					case '1':
						return 'rgb(54,149,226)'
					case '2':
						return 'rgb(247,71,71)'
					case '3':
						return 'rgb(180, 180, 180)'
					default:
						return 'rgb(113, 71, 221)'
				}
			},
			screenVal(){
				this.actions.map(item=>{
					if(item.selected){
						if(item.title==='待入库'){
							this.pages.status = 1
						}else{
							this.pages.mainStatus = 1
						}
					}else{
						if(item.title==='待入库'){
							this.pages.status = ''
						}else{
							this.pages.mainStatus = ''
						}
					}
				})
				this.pages.pageNo = 1
				this.getPageList()
				
				this.$refs.tk.hide()
				
			},
			input(value) {
				let tv = this.tabsValue
				this.text = value
				// this.from.searchContent = this.text 
				if(tv===1){
					this.pages.searchContent = value
				}else{
					this.param.searchContent = value
				}
			},
			inputUpvoice(){
				//如果本页搜索要打开
				//this.text = ''
				this.isVoice=false
				//this.pages.searchContent = ''			
				let tv = this.tabsValue
				if(tv===1){
					this.pages.searchContent = this.text
					this.pages.pageNo=1
					this.getPageList()
				}else{					
					if(this.$refs.urlRquest2){
						this.param.searchContent = this.text
						this.pageNo=1
						this.$refs.urlRquest2.urlRquest()
					}					
					
				}	
				
			},
			clearKey() {//点清空按钮
				this.text = ""
				/*这个页面点搜索时调用好使
				let tv = this.tabsValue
				if(tv===1){
					this.pages.searchContent = this.text
				}else{
					this.param.searchContent = this.text
				}	*/
			},
			cleckWork(item,index){
				this.actionsType[index].selected=!item.selected
			},
			screenValCleck(){
				let arr=  []
				this.actionsType.map(item=>{
					if(item.selected){
						arr.push(item.type)
					}
				})
				this.param.status = arr.toString()
				this.$refs.tk.hide()
			
			},
			closenoWork(){
				this.$refs.tk.hide()
			},
			rouerD(item) {
				if(item.mainName==='待入库'){
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&store=toBeWarehoused&name=病害审批`
					})
				}else{
					uni.navigateTo({
						url: `/pages/diseaseAdd/index?id=${item.id}&type=1&store=warehoused&name=病害派单`
					})
				}
			},
			clickItem(item) {
				//console.log(item)
					
				if (uni.getStorageSync("jurisdiction")===jurisdictionList[2]) {//非本人
					if (item.status === '1' || item.status === '2') {
						uni.navigateTo({url: '/pages/diseaseRepairDetaile/index?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '4') {
						uni.navigateTo({url: '/pages/diseaseRepairDetaileRectify/index?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '3' || item.status === '7' || item.status === '8' || item.status === '9' || item.status === '5') {
						uni.navigateTo({url: '/pages/diseaseRepairDetaileFinish/index?item=' + encodeURIComponent(JSON.stringify(item))})
					}
				} else {//本人
					if (item.status === '1' || item.status === '2' || item.status === '4') {
						uni.navigateTo({url: '/pages/diseaseRepairPartyDetaile/index?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '3' || item.status === '7' || item.status === '8' || item.status === '9') {
						uni.navigateTo({url: '/pages/diseaseRepairPartyDetaileRectify/index?item=' + encodeURIComponent(JSON.stringify(item))})
					} else if (item.status === '5') {
						uni.navigateTo({url: '/pages/diseaseRepairDetaileFinish/index?item=' + encodeURIComponent(JSON.stringify(item))})
					}
				}
			},
		},
		/* 这个方法明显问题,但是没发现什么时候调用,所以没有改 */
		onBackPress() {
			//alert("onBackPress")
			if(this.isVoice){
				this.isVoice=false
				this.pages.pageNo=1
				this.pages.searchContent = this.text
				this.getPageList()
				/*这个页面点搜索时调用好使*/
				/* setTimeout(()=>{
					uni.showTabBar()
				},300) */
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

	.content {
		font-family: 'pingfangMedium';
		width:702upx;
		margin: 16upx auto 0;
		padding: 26upx 24upx;
		border-radius: 12upx;
		background-color: #fff;
		position: relative;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
		.state {
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.title {
				display: flex;
				align-items: center;
	
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
				text{
					font-style: 30upx;
					color: rgb(56,56,56);
					font-family: 'pingfangMediumBold';
				}
	
				.details {
					background-color: rgb(241, 71, 71);
					height: 34upx;
					line-height: 34upx;
					border-radius: 4upx;
					width: 110upx;/* 76upx */
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
	
			text {
				width: 500upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 30upx;
				font-weight: 600;
			}
		}
		.label-width {
			width: 100upx;
		}
		.equipment {
			margin-top:22upx;
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
	
</style>
