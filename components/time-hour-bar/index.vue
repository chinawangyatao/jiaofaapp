<template>
    <view>
		<view class="display" style="padding: 40upx;line-height: 40upx;">
			<view @click="hide">取消</view>
			<view class="font2-color" @click="clickQu">确认</view>
		</view>
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
			<picker-view-column>
			    <view class="item" v-for="(item,index) in times" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column>
			    <view class="item" v-for="(item,index) in branchs" :key="index">{{item}}分</view>
			</picker-view-column>
        </picker-view>
    </view>
</template>
<script>
    export default {
        data: function () {
            const date = new Date()
			const times = []
			const time = date.getHours()
			const branchs = []
			const branch = date.getMinutes()
			for (let i =0;i<=23;i++){
				times.push(i)
			}
			for (let i =0;i<=59;i++){
				branchs.push(i)
			}
            return {
                title: 'picker-view',
				times,
				branchs,
				time,branch,
                value: [time,branch],
                visible: true,
                indicatorStyle: `height: 50px;`,
            }
        },
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
                this.time = this.times[val[0]]
                this.branch = this.branchs[val[1]]
            },
			hide(){
				this.$emit('hide')
			},
			clickQu(){
				console.log(this.time)
				console.log(this.branch)
				// let monts = this.month>=10?this.month:'0'+this.month
				// let days = this.day>=10?this.day:'0'+this.day
				let _hour = this.time.toString().length > 1 ? this.time.toString() : '0' + this.time.toString()
				let _minutes = this.branch.toString().length > 1 ? this.branch.toString() : '0' + this.branch.toString()
				this.$emit('clickQu',`${_hour}:${_minutes}`)
			}
        }
    }
</script>


<style>
	.picker-view {
		width: 100vw;
		height: 20vh;
		position: absolute;
		/* 加上以后日期会有滚动条 */
		/* top: 80upx; */
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
