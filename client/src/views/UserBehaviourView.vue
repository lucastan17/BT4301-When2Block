<template>
    <HeaderBar></HeaderBar>
    <div id="overall-container">
        <h2>1. Count and Proportion of Users based on Sun-Block usage rates</h2>
        <div id="flex-boxdisplay-container">
            <UserProportionChart/>
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
                <UserBehaviourChart/>   
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

export default {
    name: "UserBeavhiourPage",
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
        }
    },
    components: {
        HeaderBar,
        BoxDisplay,
        UserBehaviourChart,
        TotalUserCount,
        UserProportionChart
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