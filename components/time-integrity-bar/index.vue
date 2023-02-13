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
			<picker-view-column>
			    <view class="item" v-for="(item,index) in times" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column>
			    <view class="item" v-for="(item,index) in branchs" :key="index">{{item}}分</view>
			</picker-view-column>
			<picker-view-column v-if="type!==1 && type!==3650">
			    <view class="item" v-for="(item,index) in seconds" :key="index">{{item}}秒</view>
			</picker-view-column>
        </picker-view>
    </view>
</template>
<script>
    export default {
        data: function () {
            const date = new Date(new Date().getTime()+this.type*24*60*60*1000)
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()
			const times = []
			const time = date.getHours()
			const branchs = []
			const branch = date.getMinutes()
			const seconds = []
			const second = date.getSeconds()
			
			let monthsf = 12
			let dayf = 31
			let timesf = 23
			let branchsf = 59
            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }
            for (let i = 1; i <= monthsf; i++) {
                months.push(i)
            }
            for (let i = 1; i <= dayf; i++) {
                days.push(i)
            }
			for (let i =0;i<=timesf;i++){
				times.push(i)
			}
			for (let i =0;i<=branchsf;i++){
				branchs.push(i)
				seconds.push(i)
			}
            let value = [year, month - 1, day - 1,time,branch,second]  
			if(this.type===1){
				if(this.isD===1){
					value = [year, month - 1, new Date().getDate() - 1,time,branch]
				}else{
					value = [year, month - 1, day - 1,time,branch]
				} 
			}
			if(this.type>9){
				value  = [this.dataArr[0]-1990,this.dataArr[1],this.dataArr[2]-1,this.dataArr[3],this.dataArr[4],this.dataArr[5]]
		
			}
		
			return {
                title: 'picker-view',
                years,
                year,
                months,
                month,
                days,
                day,
				times,
				branchs,
				seconds,
				time,branch,second,
                value: value,
                visible: true,
                indicatorStyle: `height: 50px;`,
				
            }
        },
		props:{
			type:{
				type:Number,
				default:0
			},
			dataArr:{
				type:Array,
				default:()=>{
					return []
				}
			},
			isD:{
				type:Number,
				default:0
			},
		},
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
				this.time = this.times[val[3]]
				this.branch = this.branchs[val[4]]
				this.second = this.seconds[val[5]]
				if(this.type<10){
					this.getDate(this.year,this.month,this.day,this.time,this.branch,this.second)
				}
            },
			hide(){
				this.$emit('hide')
			},
			clickQu(){
				let monts = this.month>=10?this.month:'0'+this.month
				let days = this.day>=10?this.day:'0'+this.day
				let time = this.time>=10?this.time:'0'+this.time
				let branch = this.branch>=10?this.branch:'0'+this.branch
				let second = this.second>=10?this.second:'0'+this.second
				
				if(this.type===1 || this.type===3650){
					this.$emit('clickQu',`${this.year}-${monts}-${days} ${time}:${branch}`,'inspectDate')
				}else{
					this.$emit('clickQu',`${this.year}-${monts}-${days} ${time}:${branch}:${second}`,'inspectDate')
				}
				
			},
			getDate(year,month,day,time,branch,second){
				let date = new Date()
				const years = []
				const yearDQ = date.getFullYear()
				const months = []
				const monthDQ = date.getMonth() + 1
				let mounthNumber = 12
				const days = []
				const dayDQ = date.getDate()
				let dayNumber = 31
				const times = []
				const timeDQ = date.getHours()
				const branchs = []
				const branchDQ = date.getMinutes()
				const seconds = []
				const secondDQ = date.getSeconds()
				
				if(yearDQ!==year){
					mounthNumber = 12
					
				}else{
					mounthNumber = monthDQ
				}
				
				if(monthDQ===1 || monthDQ===3 || monthDQ===5 ||monthDQ===7 || monthDQ===8 ||monthDQ===10||monthDQ===12){
					if(dayDQ===31){
						if(month<=monthDQ){
							dayNumber=31
						}else{
							dayNumber=1
						}						
						mounthNumber = monthDQ+1
					}else{
						if(month<=monthDQ){
							dayNumber=31
						}else{
							dayNumber=dayDQ+1
						}
					}
				}else if(month===2){
					if(dayDQ===28){
						if(month<=monthDQ){
							dayNumber=28
						}else{
							dayNumber=1
						}						
						mounthNumber = monthDQ+1
					}else{
						if(month<=monthDQ){
							dayNumber=28
						}else{
							dayNumber=dayDQ+1
						}
					}
				}else{
				
					if(dayDQ===30){
						if(month<=monthDQ){
							dayNumber=30
						}else{
							dayNumber=1
						}						
						mounthNumber = monthDQ+1
					}else{
						if(month<=monthDQ){
							dayNumber=30
						}else{
							dayNumber=dayDQ+1
						}
					}
				}
				
				if(month===1 || month===3 || month===5 ||month===7 || month===8 ||month===10||month===12){
					if(month===monthDQ){
						if(dayDQ===31){
							if(this.type===1){
								dayNumber=this.type
							}else{
								dayNumber =dayDQ
							}						
						}else{
							dayNumber=dayDQ+this.type
						}
					}else{
						dayNumber=31
					}
					
				}else if(month===2){
					if(month===monthDQ){
						if(dayDQ===28){
							if(this.type===1){
								dayNumber=this.type
							}else{
								dayNumber =dayDQ
							}						
						}else{
							dayNumber=dayDQ+this.type
						}
					}else{
						dayNumber=28
					}
				}else{
					if(month===monthDQ){
						if(dayDQ===30){
							if(this.type===1){
								dayNumber=this.type
							}else{
								dayNumber =dayDQ
							}						
						}else{
							dayNumber=dayDQ+this.type
						}
					}else{
						dayNumber=30
					}
				}
				
				let timesNumber = 23
				let branchNumber = 59
				if(day===dayDQ+this.type){
					timesNumber = timeDQ
					branchNumber = branchDQ
				}else{
					timesNumber = 23
					branchNumber = 59
				}
				
				for (let i = 1; i <= mounthNumber; i++) {
				    months.push(i)
				}
				this.months = months
				
				for (let i = 1; i <= dayNumber; i++) {
				    days.push(i)
				}
				this.days = days
				
				for (let i = 1; i <= timesNumber; i++) {
				    times.push(i)
				}
				this.times = times
				
				for (let i = 1; i <= branchNumber; i++) {
				    branchs.push(i)
				}
				this.branchs = branchs
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
