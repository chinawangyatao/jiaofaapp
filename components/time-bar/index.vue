<template>
    <view>
		<view class="display" style="padding: 40upx;line-height: 40upx;">
			<view @click="hide">取消</view>
			<view class="font2-color" @click="clickQu">确认</view>
		</view>
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
            <picker-view-column>
                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>
<script>
    export default {
		props:{
			type:{
				type:Number,
				default:null
			}
		},
        data: function () {
            const date = new Date()
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()
			let monthF = 12
			let dayF= 31
			if(this.type===1){
				// monthF = date.getMonth()+1
				// dayF = date.getDate()-1
			}else{
				monthF = 12
				dayF = 31
			}
            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }
            for (let i = 1; i <= monthF; i++) {
                months.push(i)
            }
            for (let i = 1; i <= dayF; i++) {
                days.push(i)
            }
            return {
                title: 'picker-view',
                years,
                year,
                months,
                month,
                days,
                day,
                value: [9999, month - 1, day - 1],
                visible: true,
                indicatorStyle: `height: 50px;`,
				
            }
        },
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
				this.getDate(this.year,this.month,this.day)
            },
			hide(){
				this.$emit('hide')
			},
			clickQu(){
				let monts = this.month>=10?this.month:'0'+this.month
				let days = this.day>=10?this.day:'0'+this.day
				this.$emit('clickQu',`${this.year}-${monts}-${days}`,'inspectDate')
			},
			getDate(year,month,day){
				let date = new Date()
				const years = []
				const yearDQ = date.getFullYear()
				const months = []
				const monthDQ = date.getMonth() + 1
				let mounthNumber = 12
				const days = []
				const dayDQ = date.getDate()
				let dayNumber = 31
				
				let dayq = 0
				if(this.type===1){
					dayq=-1
				}
				
				if(yearDQ!==year){
					mounthNumber = 12
					
				}else{
					mounthNumber = monthDQ
					if(dayDQ===1){
						mounthNumber = monthDQ+dayq
					}
				}
				
				
				
				if(month===1 || month===3 || month===5 ||month===7 || month===8 ||month===10||month===12){
					if(month!=monthDQ){
						dayNumber=31
					}else if(month===monthDQ){
						dayNumber=dayDQ+dayq
					}
					
				}else if(month===2){
					if(month!=monthDQ){
						dayNumber=28
					}else if(month===monthDQ){
						dayNumber=dayDQ+dayq
					}
				}else{
				
					if(month!=monthDQ){
						dayNumber=30
					}else if(month===monthDQ){
						dayNumber=dayDQ+dayq
					}
					
				}
				
				for (let i = 1; i <= mounthNumber; i++) {
				    months.push(i)
				}
				this.months = months
				
				for (let i = 1; i <= dayNumber; i++) {
				    days.push(i)
				}
				this.days = days
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
