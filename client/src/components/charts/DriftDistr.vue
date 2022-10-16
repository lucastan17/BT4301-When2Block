<template>
    <div class="container">
        <o-dropdown :triggers="['hover']" aria-role="list" v-model="selected">
            <o-button variant="info" slot="trigger">
                <span>{{selected}}</span>
                <o-icon icon="caret-down"></o-icon>
            </o-button>
            <o-tooltip label="Tooltip top" size="large" position="right" multiline>
                <o-dropdown-item aria-role="listitem">Chi-Square</o-dropdown-item>
            </o-tooltip> <!--add tooltips to explain-->
            <o-tooltip 
                label="Tooltip top"
                size="large"
                position="right"
                multiline
            >
                <o-dropdown-item aria-role="listitem">KL Divergence</o-dropdown-item>
            </o-tooltip> <!--add tooltips to explain--><o-tooltip 
                label="Tooltip top"
                size="large"
                position="right"
                multiline
            >
                <o-dropdown-item aria-role="listitem">JS Divergence</o-dropdown-item>
            </o-tooltip> <!--add tooltips to explain--><o-tooltip 
                label="Tooltip top"
                size="large"
                position="right"
                multiline
            >
                <o-dropdown-item aria-role="listitem">AD Test</o-dropdown-item>
            </o-tooltip> <!--add tooltips to explain-->
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
    components: { Line },data() {
        return {
            selected: 'Accuracy over Time',
            loaded: false,
            chartData: {
                labels: null,
                datasets: [{
                    label: this.selected,
                    data: [],
                    tension: 0.1
                }]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    watch: {
        selected(newSelected, oldSelected) {
            this.updateChart(newSelected)
        }
        //'chartData.datasets.data': function (val, oldVal) {
        //  do something
        //},
    },
    /*
    computed: {
        chartData() { return //mutable chart data }
    },*/
    methods: {
        async updateChart(newSelected) {
            try {
                // const res = await fetch('https://yesno.wtf/api')
                // this.answer = (await res.json()).answer
                const { userlist } = await fetch('/api/userlist')
                this.chartdata = userlist
            } catch (e) {
                console.error(e)
                this.chartData.datasets.data = []
            }
        }
    },
    /*
    setup() {
        const chartData = ref<ChartData<'bar'>>({
            datasets: []
        })

        function fillData() {
            const updatedChartData = {
                labels: [
                    'January' + getRandomInt(),
                    'February',
                    'March',
                ],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [
                        getRandomInt(),
                        getRandomInt(),
                        getRandomInt(),
                        ]
                    }
                ]
            }

            chartData.value = { ...updatedChartData }
        }

        onMounted(() => {
            setInterval(() => {
                fillData()
            }, 5000)
        })

    },*/
    async mounted() {
        this.loaded = false
    
        try {
            const { userlist } = await fetch('/api/userlist')
            this.chartdata = userlist
    
            this.loaded = true
        } catch (e) {
            console.error(e)
        }
    }
}
</script>