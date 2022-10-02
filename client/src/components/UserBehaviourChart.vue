<template>
    <div id="chart">
        <apexchart type="line" height="350" :options="this.chartOptions" :series="this.series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
    data() {
        return {         
          series: [{
              name: "Number of Users",
              data: this.userData, //[10, 21, 32, 56, 63, 79]
          }],
          chartOptions: {
            chart: {
              height: 400,
              width: 500,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Total number of Users who have started using sunscreen',
              align: 'center'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'rgb(241, 130, 60)'], // takes an array which will be repeated on columns
                opacity: 0.2
              },
            },
            xaxis: {
              categories: this.months, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            }
          },
        }
    },
    props: {
      userData: Array,
      months: Array
    },
    components: {
        apexchart: VueApexCharts
    }
}
</script>

<style scoped>
    
</style>