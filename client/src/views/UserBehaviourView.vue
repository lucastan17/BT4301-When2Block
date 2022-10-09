<template>
    <HeaderBar></HeaderBar>
    <div id="overall-container">
        <h2>1. Count and Proportion of Users based on Sun-Block usage rates</h2>
        <div id="flex-boxdisplay-container">
            <UserProportionChart :seriesValue="this.userProportion.series" :chartLabels="this.userProportion.labels"/>
            <BoxDisplay title='Never' :actualNumber="this.never.actualNumber" :percentage='this.never.percentage'/>
            <BoxDisplay title='Monthly' :actualNumber="this.monthly.actualNumber" :percentage='this.monthly.percentage'/>
            <BoxDisplay title='Weekly' :actualNumber="this.weekly.actualNumber" :percentage='this.weekly.percentage'/>
            <BoxDisplay title='Daily' :actualNumber="this.daily.actualNumber" :percentage='this.daily.percentage'/>
        </div>
        <h2>2. Statistics of Users who have begun their sunscreen journey</h2>
        <div id="flex-chartstats-container">
            <div id="stats-container">
                <TotalUserCount :totalCount="this.totalCount"/>
            </div>
            <div id="chart-container">
                <UserBehaviourChart :userData="this.userBehaviour.userData" :months="this.userBehaviour.months" :key="this.userBehaviour"/>   
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue';
import BoxDisplay from '../components/BoxDisplay.vue';
import UserBehaviourChart from '../components/UserBehaviourChart.vue';
import TotalUserCount from '../components/TotalUserCount.vue';
import UserProportionChart from '../components/UserProportionChart.vue'
import userDashboardService from '@/services/userDashboardService';
// import api from '@/services/api'

export default {
    name: "UserBehaviourPage",
    data() {
        return {
            never: {
                actualNumber: 326,
                percentage: 62
            },
            monthly:{
                actualNumber: 18,
                percentage: 10
            },
            weekly: {
                actualNumber: 51,
                percentage: 16
            },
            daily: {
                actualNumber: 36,
                percentage: 12
            },
            totalCount: 79,
            
            userProportion: {
                series: [], //[326, 18, 51, 36],
                labels: ['Never', 'Monthly', 'Weekly', 'Daily']
            },

            userBehaviour: {
                userData: [], //[10, 21, 32, 56, 63, 79],
                months: this.getMonths( ),
            }
        }
    },
    components: {
        HeaderBar,
        BoxDisplay,
        UserBehaviourChart,
        TotalUserCount,
        UserProportionChart
    },
    methods: {
        getMonths () {
            const today = new Date()
            const month = today.getMonth()
            const monthsDict = {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            }
            const indexOfMonths = []
            for (let i = 0; i < 6; i++) {
                let curIndex = (month - (6 - i))
                if (curIndex < 0) {
                curIndex += 12
                }
                indexOfMonths.push(curIndex)
            }
            const listOfMonths = []
            for (let j = 0; j < indexOfMonths.length; j++) {
                listOfMonths.push(monthsDict[indexOfMonths[j]])
            }
            return listOfMonths
        },
        async getdata() {
            userDashboardService.index().then(res => {
                this.userBehaviour.userData = res.data.userData
                this.userProportion.series = res.data.userProportion
                this.totalCount = res.data.totalCount
                this.never.actualNumber = res.data.never.actualNumber
                this.never.percentage = res.data.never.percentage
                this.monthly.actualNumber = res.data.monthly.actualNumber
                this.monthly.percentage = res.data.monthly.percentage
                this.weekly.actualNumber = res.data.weekly.actualNumber
                this.weekly.percentage = res.data.weekly.percentage
                this.daily.actualNumber = res.data.daily.actualNumber
                this.daily.percentage = res.data.daily.percentage
            })
            // await api().get('userDashboard').then(res => {
            //     this.userBehaviour.userData = res.data.userData
            //     this.userProportion.series = res.data.userProportion
            //     this.totalCount = res.data.totalCount
            //     this.never.actualNumber = res.data.never.actualNumber
            //     this.never.percentage = res.data.never.percentage
            //     this.monthly.actualNumber = res.data.monthly.actualNumber
            //     this.monthly.percentage = res.data.monthly.percentage
            //     this.weekly.actualNumber = res.data.weekly.actualNumber
            //     this.weekly.percentage = res.data.weekly.percentage
            //     this.daily.actualNumber = res.data.daily.actualNumber
            //     this.daily.percentage = res.data.daily.percentage
            // })
        }
    },
    mounted() {
        this.getdata();
    },

}

</script>

<style scoped>
#overall-container {
    width: 85%;
    margin: auto;
    padding-top: 30px;  
}

#flex-boxdisplay-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: auto;
    padding: 30px 0px;
}

#flex-chartstats-container {
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
    
}

#stats-container {
    width: 20%;
}

#chart-container {
    width: 70%;
}

h2 {
    text-align: left;
}


</style>