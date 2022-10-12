<template>
    <div class="container">
        <o-dropdown  :triggers="['hover']" aria-role="list" v-model="selected">
            <template>
                <o-button variant="info">
                <span>{{selected}}</span>
                <o-icon icon="caret-down"></o-icon>
                </o-button>
            </template>
            <o-dropdown-item aria-role="listitem">Accuracy over Time</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">AUC over Time</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Precision over Time</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Recall over Time</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">F1 over Time</o-dropdown-item>
        </o-dropdown>
        
        <Line v-if="loaded" :chart-data="chartData" :chart-options="chartOptions"/>
    </div>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'
  
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
  
 export default {
     name: 'DriftGraph',
     components: { Line },
     data() {
        return {
            selected: 'Accuracy over Time',
            loaded: true,
            chartData: {
                labels: null,
                datasets: [
                    {
                        label: 'Past 14 Days',
                        data: [],
                        tension: 0.5
                    },
                    {
                        label: 'Past 14-28 Days',
                        data: [],
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
    watch: {
        /*
        selected(newSelected, oldSelected) {
            this.updateChart(newSelected)
            console.log(oldSelected)
        }*/
    },
    methods: {
        async updateChart(newSelected) {
            try {
                // fetch accuracy over last 30 days and last 60 days
                // const res = await fetch('https://yesno.wtf/api')
                // this.answer = (await res.json()).answer
                // const { userlist } = await fetch('/api/userlist')
                // this.chartdata = userlist
                console.log(newSelected)
                
            } catch (e) {
                console.error(e)
                this.chartData.datasets[0].data = []
                this.chartData.datasets[1].data = []
            }
        }
    },
    async mounted() {
        this.loaded = false
    
        // try {
        //     const { userlist } = await fetch('/api/userlist')
        //     this.chartdata = userlist
    
            this.loaded = true
        // } catch (e) {
        //     console.error(e)
        // }
    }
}
</script>