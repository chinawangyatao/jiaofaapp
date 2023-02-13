<template>
	<view>
		<view class="display" style="padding: 20upx 10upx;">
			<view @click="showLvxHidddenFalse" class="left titlse-7">取消</view>
			<view class="titlse-7">请选择</view>
			<view @click="showLvxHidddenTrue" class="right titlse-7">确定</view>
		</view>
		<view :class="item.checked ? 'dis_true font1-color ba2-color':'dis_false font2-color'"
			class="bor1-color  show_dis display align-center" @click="savOption(index,item.checked)"
			v-for="(item,index) in list" :key="index">
			<view>{{item.code}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			name:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				roadProductList: [{
					index: '1',
					itemName: '测试',
					checked: true
				}]
			}
		},
		methods: {
			savOption(i, checked) {
				this.list[i].checked = !checked
			},
			showLvxHidddenFalse(){
				this.$emit('hide')
			},
			showLvxHidddenTrue(){
				let listId = []
				this.list.map((item,index)=>{
					if(item.checked){
						listId.push(item.id)
					}
				})
				this.$emit('clickQu',listId.toString(),this.name)
				
			}
		}
	}
</script>


<style>
	.display {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.font1-color {
		color: #FFFFFF;
	}

	.ba2-color {
		background-color: #2C98DE;
	}

	.dis_true {
		width: 100vw;
		margin-right: 10upx;
		margin-bottom: 10upx;
		padding: 0 20upx;
	}

	.dis_false {
		width: 100vw;
		margin-right: 10upx;
		margin-bottom: 10upx;
		padding: 0 20upx;
	}

	.font2-color {
		color: #2C98DE
	}
</style>
