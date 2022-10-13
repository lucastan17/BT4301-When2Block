<template>
    <div id="chart">
        <apexchart ref="proportion" type="donut" height="200" width="300" :options="this.chartOptions" :series="this.series"></apexchart>
        <o-button class="button" @click="populateData()">Refresh Chart</o-button>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
    data() {
        return {         
            series: this.seriesValue,
            chartOptions: {
                chart: {
                type: 'donut',
                },
                labels: this.chartLabels,
                dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return Math.round(val) + "%"
                    },
                },
                title: {
                    text: 'Distribution of Users',
                    align: 'center'
                },
            }
        }
    },
    props : {
        seriesValue: Array,
        chartLabels:Array
    },
    components: {
        apexchart: VueApexCharts
    },
    methods: {
      populateData() {
        this.$refs.proportion.updateOptions({series: this.seriesValue}, false, true);
      }
    }
}
</script>

<style scoped>
.button {
    background-color: #F16308;
    margin: 15px;
    border-radius: 5px;
} 
</style>