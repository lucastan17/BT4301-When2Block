<template>
    <div id="chart">
        <apexchart type="donut" height="200" width="300" :options="this.chartOptions" :series="this.series"></apexchart>
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

}
</script>

<style scoped>
    
</style>