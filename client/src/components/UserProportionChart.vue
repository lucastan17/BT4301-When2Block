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
            series: [44, 55, 13, 33],
            chartOptions: {
                chart: {
                type: 'donut',
                },
                labels: ['Never', 'Monthly', 'Weekly', 'Daily'],
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
    components: {
        apexchart: VueApexCharts
    }
}
</script>

<style scoped>
    
</style>