<template>
    <div>
        <HeaderBar />
        <div class="container p-5" v-if="error === null">
            <ModelSummary :status="summary.status" :perf="summary.perf" :drift="summary.drift" />
            <ModelPerformance :acc="acc" :pre="pre" :rec="rec" :f1="f1" :chi="chi" />
            <b-card>
                <b-card-title class="text-start h1 m-3">Model Drift</b-card-title>
                <b-tabs lazy class="mt-4 mx-4">
                    <b-tab class="p-5" title="Accuracy over time" active>
                        <DriftGraph :dates="dates" :driftData="aot" title="Accuracy" />
                    </b-tab>
                    <b-tab class="p-5" title="Precision over time">
                        <DriftGraph :dates="dates" :driftData="pot" title="Precision" />
                    </b-tab>
                    <b-tab class="p-5" title="Recall over time">
                        <DriftGraph :dates="dates" :driftData="rot" title="Recall" />
                    </b-tab>
                    <b-tab class="p-5" title="F1-Score over time">
                        <DriftGraph :dates="dates" :driftData="fot" title="F1-Score" />
                    </b-tab>
                    <b-tab class="p-5" title="Goodness-of-Fit over time">
                        <DriftGraph :dates="dates" :driftData="cot" title="Goodness-of-Fit" />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
        <div v-else>
            Sorry, something went wrong. Please try again later!
            Error: {{error}}
        </div>
    </div>
</template>

<script>
import ModelSummary from '@/components/ModelSummary.vue'
import DriftGraph from '@/components/DriftGraph.vue'
import modelDriftService from '@/services/modelDriftService'
import modelPerformanceService from '@/services/modelPerformanceService'
import ModelPerformance from '@/components/ModelPerformance.vue'
import HeaderBar from '../components/HeaderBar.vue';


export default {
    name: "ModelDashboard",
    components: {
        ModelSummary,
        DriftGraph,
        ModelPerformance,
        HeaderBar
    },
    data() {
        return {
            loading: true,
            error: null,
            summary: {
                status: {
                    model_id: null,
                    stat: true
                },
                perf: {
                    stat: 1,
                    acc: 1,
                    pre: 1,
                    rec: 1,
                    f1: 1,
                    chi: 1
                },
                drift: {
                    stat: 1,
                    aot: 1,
                    pot: 1,
                    rot: 1,
                    fot: 1,
                    cot: 1
                }
            },
            acc: { val: null, t1: 0.95, t2: 0.9, stat: null },
            pre: { val: null, t1: 0.95, t2: 0.9, stat: null },
            rec: { val: null, t1: 0.95, t2: 0.9, stat: null },
            f1: { val: null, t1: 0.95, t2: 0.9, stat: null },
            chi: { val: null, t1: 2.706, t2: 3.841, stat: null },
            aot: { data: null, val: null, t1: 0.95, t2: 0.9, stat: null },
            pot: { data: null, val: null, t1: 0.95, t2: 0.9, stat: null },
            rot: { data: null, val: null, t1: 0.95, t2: 0.9, stat: null },
            fot: { data: null, val: null, t1: 0.95, t2: 0.9, stat: null },
            cot: { data: null, val: null, t1: 0.95, t2: 0.9, stat: null },
            dates: []
        }
    },
    methods: {
        updatePerf() {
            function stat(val, t1, t2) {
                return val > t1 ? 1 : val > t2 ? 2 : 3
            }
            modelPerformanceService.index().then(res => {
                this.summary.status.model_id = res.data.model_id
                this.acc.val = res.data.acc
                this.pre.val = res.data.pre
                this.rec.val = res.data.rec
                this.f1.val = res.data.f1
                this.chi.val = res.data.chi
            }).then(() => {
                this.acc.stat = stat(this.acc.val, 0.95, 0.9)
                this.pre.stat = stat(this.pre.val, 0.95, 0.9)
                this.rec.stat = stat(this.rec.val, 0.95, 0.9)
                this.f1.stat = stat(this.f1.val, 0.95, 0.9)
                this.chi.stat = this.chi.val < 2.706 ? 1 : this.chi.val < 3.841 ? 2 : 3
            }).then(() => {
                const sum = this.acc.stat + this.pre.stat + this.rec.stat + this.f1.stat + this.chi.stat
                const stat = sum < 7 ? 1 : sum < 9 ? 2 : 3
                this.summary.perf = {
                    acc: this.acc.stat,
                    pre: this.pre.stat,
                    rec: this.rec.stat,
                    f1: this.f1.stat,
                    chi: this.chi.stat,
                    stat
                }
            }).catch(err => this.error = err)
        },
        updateDrift() {
            modelDriftService.index().then(res => {
                this.aot.data = res.data.aot
                this.pot.data = res.data.pot
                this.rot.data = res.data.rot
                this.fot.data = res.data.fot
                this.cot.data = res.data.cot
                this.dates = res.data.dates //arranged from earliest to latest
            }).then(() => {
                function getDriftObject(data) {
                    let ave = data.reduce((sum, elem) => { return sum + elem; }, 0) / data.length
                    ave = Number(ave.toFixed(3))
                    let t1 = 0.95 * data[0] //assume data is arranged from earliest to latest 
                    t1 = Number(t1.toFixed(3))
                    let t2 = 0.9 * data[0]
                    t2 = Number(t2.toFixed(3))
                    const stat = ave > t1 ? 1 : ave > t2 && ave < t1 ? 2 : 3
                    return { data, val: ave, t1, t2, stat }
                }
                this.aot = getDriftObject(this.aot.data)
                this.pot = getDriftObject(this.pot.data)
                this.rot = getDriftObject(this.rot.data)
                this.fot = getDriftObject(this.fot.data)
                this.cot = getDriftObject(this.cot.data)
                let t1 = this.cot.val * 1.05
                let t2 = this.cot.val * 1.1
                this.cot.t1 = Number(t1.toFixed(3))
                this.cot.t2 = Number(t2.toFixed(3))
                this.cot.stat = this.cot.val < this.cot.t1 ? 1 : this.cot.val < this.cot.t2 ? 2 : 3
            }).then(() => {
                const sum = this.aot.stat + this.pot.stat + this.rot.stat + this.fot.stat + this.cot.stat
                const stat = sum < 7 ? 1 : sum < 9 ? 2 : 3
                this.summary.drift = {
                    aot: this.aot.stat,
                    pot: this.pot.stat,
                    rot: this.rot.stat,
                    fot: this.fot.stat,
                    cot: this.cot.stat,
                    stat
                }
            }).then(() => {
                const latest = new Date(this.dates[this.dates.length - 1])
                const tdy = new Date()
                if (latest.getFullYear() === tdy.getFullYear() && latest.getDate() === tdy.getDate() && latest.getMonth() === tdy.getMonth()) {
                    this.summary.status.stat = true
                } else {
                    // run model
                }
            }).catch(err => this.error = err)
        }
    },
    created() {
        this.updatePerf();
        this.updateDrift();
    }
}
</script>