<template>
    <Line :chart-options="chartOptions" :chart-data="chartData"/>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'

ChartJS.register( Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale )

export default {
    name: 'TestGraph',
    components: { Line },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Past 14 Days',
                        backgroundColor: '#f87979',
                        data: [0.40, 0.39, 0.10, 0.40, 0.39, 0.80, 0.40],
                        tension: 0.5
                    },
                    {
                        label: 'Past 14-28 Days',
                        backgroundColor: '#f87979',
                        data: [0.30, 0.70, 0.80, 0.69, 0.40, 0.90, 0.20],
                        tension: 0.5
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
}
</script>