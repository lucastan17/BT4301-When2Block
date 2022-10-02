<template>
    <HeaderBar></HeaderBar>
    <div id="overall-container">
        <h2>Count and Proportion of Users based on Sun-Block usage rates</h2>
        <div id="flex-boxdisplay-container">
            <BoxDisplay title='Never' :actualNumber="this.never.actualNumber" :percentage='this.never.percentage'/>
            <BoxDisplay title='Monthly' :actualNumber="this.monthly.actualNumber" :percentage='this.monthly.percentage'/>
            <BoxDisplay title='Weekly' :actualNumber="this.weekly.actualNumber" :percentage='this.weekly.percentage'/>
            <BoxDisplay title='Daily' :actualNumber="this.daily.actualNumber" :percentage='this.daily.percentage'/>
        </div>
        <h2>Statistics of Users who have begun their sunscreen journey</h2>
        <div id="flex-chartstats-container">
            <div id="stats-container">
                <p>hello</p>
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
            }
        }
    },
    components: {
    HeaderBar,
    BoxDisplay,
    UserBehaviourChart,
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
    width: 80%;
    margin: auto;
    padding: 30px 0px;
}

#flex-chartstats-container {
    display: flex;
    justify-content: space-between;
    
}

#stats-container {
    width: 20%;
}

#chart-container {
    width: 70%;
}

</style>