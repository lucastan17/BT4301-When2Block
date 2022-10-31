<template>
    <div v-if="error === null">
    <div class="row justify-content-center mb-4">
    <div class="card" style="width:50%">
    <div class="card-body">
        <h4 class="card-title mb-4">{{title}} over Past 30 Days</h4>
        <h5 class="card-subtitle mb-3">Total Drift (earliest - latest): {{driftData.drift}}</h5>
        <p class="card-text text-muted"> Threshold: {{driftData.t2}}</p>
    </div>
    </div>
    </div>
    <Line 
        :chart-options="chartOptions" 
        :chart-data="{labels: dates, datasets:[{data:driftData.data, borderColor: `#F16308`}]}"
    />
    </div> 
    <p v-else>Sorry, something went wrong. Please try again later!</p>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'

ChartJS.register( Title, Tooltip, LineElement, LinearScale, PointElement, CategoryScale )

export default {
    name: 'DriftGraph',
    components: { Line },
    props: {
        driftData: Object,
        dates: Array,
        title: String,
    },
    data() {
        return {
            error: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                tension: 0.5,
                elements: {
                    point: {
                        radius: 5,
                        hitRadius: 15,
                        hoverRadius: 6
                    }
                },
                plugins: {
                    legend:{
                        display:false
                    }
                },
                layout: {
                    padding:20
                },
                scales: {
                    x: { offset: true }
                }
            }
        }
    },
}
</script>