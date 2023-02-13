<template>
	<view style="height: 500upx;">
		<view class="display" style="padding: 40upx;line-height: 40upx;">
			<view @click="hide">取消</view>
			<!--<view v-if="dispatch">
				<input type="text" v-model="inputName" placeholder="请输入" />
			</view> -->
			<view class="font2-color" @click="clickQu">确认</view>
		</view>
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="dataValue" @change="bindChange"
			class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in list" :key="index">{{item.code}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>



<script>
	export default{
		data(){
			return {
				indicatorStyle:'height: 50px;',
				inputName:'',
				value:[]
			}
		},
		methods:{
			bindChange(e){
				this.value = e.target.value
			},
			hide(){
				this.$emit('cancel')
			},
			clickQu(){
				if(this.value.length===0){
					this.value = this.dataValue
				}
				this.$emit('confirm',this.value,this.list[this.value].id)
			},
		},
		props:{
			visible:{
				type:Boolean,
				default:false
			},
			dispatch:{
				type:Boolean,
				default:false
			},
			dataList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			dataValue:{
				type:Array,
				default:()=>{
					return []
				}
			},
			list:{
				type:Array,
				default:()=>{
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.picker-view {
		width: 100vw;
		height: 100%;
		position: absolute;
		/* 加上以后日期会有滚动条 */
		/* bottom: 84px; */
		background: #FFFFFF;
		left: 0;
	}

	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.display{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
