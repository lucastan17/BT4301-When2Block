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
                        <div v-if="aot.data === null">
                            <h4>No predictions have been made by this model.</h4>
                        </div>
                        <div v-else>
                            <DriftGraph :dates="dates" :driftData="aot" title="Accuracy"/>
                        </div>
                    </b-tab>
                    <b-tab class="p-5" title="Precision over time">
                        <div v-if="pot.data === null">
                            <h4>No predictions have been made by this model.</h4>
                        </div>
                        <div v-else>
                            <DriftGraph :dates="dates" :driftData="pot" title="Precision"/>
                        </div>
                    </b-tab>
                    <b-tab class="p-5" title="Recall over time">
                        <div v-if="rot.data === null">
                            <h4>No predictions have been made by this model.</h4>
                        </div>
                        <div v-else>
                            <DriftGraph :dates="dates" :driftData="rot" title="Recall"/>
                        </div>
                    </b-tab>
                    <b-tab class="p-5" title="F1-Score over time">
                        <div v-if="fot.data === null">
                            <h4>No predictions have been made by this model.</h4>
                        </div>
                        <div v-else></div>
                        <DriftGraph :dates="dates" :driftData="fot" title="F1-Score"/>
                    </b-tab>
                    <b-tab class="p-5" title="Goodness-of-Fit over time">
                        <div v-if="cot.data === null">
                            <h4>No predictions have been made by this model.</h4>
                        </div>
                        <div v-else>
                            <DriftGraph :dates="dates" :driftData="cot" title="Goodness-of-Fit"/>
                        </div>
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
import HeaderBar from '@/components/HeaderBar.vue';
import modelRegistryService from '@/services/modelRegistryService'


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
                    empty: true,
                    model_id: null,
                    stat: null
                },
                perf: {
                    empty: true,
                    stat: null,
                    acc: null,
                    pre: null,
                    rec: null,
                    f1: null,
                    chi: null,
                    date: null
                },
                drift: {
                    empty: true,
                    stat: null,
                    aot: null,
                    pot: null,
                    rot: null,
                    fot: null,
                    cot: null
                }
            },
            acc: { val: null, t1: 0.95, t2: 0.9, stat: null },
            pre: { val: null, t1: 0.95, t2: 0.9, stat: null },
            rec: { val: null, t1: 0.95, t2: 0.9, stat: null },
            f1: { val: null, t1: 0.95, t2: 0.9, stat: null },
            chi: { val: null, t1: 2.706, t2: 3.841, stat: null },
            aot: { data: null, drift: null, t1: 0.95, t2: 0.9, stat: null },
            pot: { data: null, drift: null, t1: 0.95, t2: 0.9, stat: null },
            rot: { data: null, drift: null, t1: 0.95, t2: 0.9, stat: null },
            fot: { data: null, drift: null, t1: 0.95, t2: 0.9, stat: null },
            cot: { data: null, drift: null, t1: 2.706, t2: 3.841, stat: null },
            dates: null
        }
    },
    methods: {
        updatePerf() {
            function stat(val, t1, t2) {
                return val > t1 ? 1 : val > t2 ? 2 : 3
            }
            modelPerformanceService.index().then(res => {
                if (res.data.model_id !== null) {
                    this.summary.status.empty = false
                    this.summary.status.model_id = res.data.model_id
                }
                if (res.data.acc !== null) {
                    this.summary.perf.empty = false
                    this.summary.drift.empty = false
                    this.summary.perf.date = res.data.date
                    this.acc.val = res.data.acc
                    this.pre.val = res.data.pre
                    this.rec.val = res.data.rec
                    this.f1.val = res.data.f1
                    this.chi.val = res.data.chi
                }
            }).then(() => {
                if (this.acc.val !== null) {
                    this.acc.stat = stat(this.acc.val, 0.95, 0.9)
                    this.pre.stat = stat(this.pre.val, 0.95, 0.9)
                    this.rec.stat = stat(this.rec.val, 0.95, 0.9)
                    this.f1.stat = stat(this.f1.val, 0.95, 0.9)
                    this.chi.stat = this.chi.val < 2.706 ? 1 : this.chi.val < 3.841 ? 2 : 3
                }
            }).then(() => {
                if (this.acc.stat !== null) {
                    const sum = this.acc.stat + this.pre.stat + this.rec.stat + this.f1.stat + this.chi.stat
                    const stat = sum < 7 ? 1 : sum < 9 ? 2 : 3
                    this.summary.perf = {
                        empty: false,
                        acc: this.acc.stat,
                        pre: this.pre.stat,
                        rec: this.rec.stat,
                        f1: this.f1.stat,
                        chi: this.chi.stat,
                        stat,
                        date: this.summary.perf.date
                    }
                }
            }).catch(err => this.error = err)
        },

        updateDrift() {
            modelDriftService.index().then(res => {
                if (res.data.model_id !== null && res.data.dates !== null) {
                    this.aot.data = res.data.aot
                    this.pot.data = res.data.pot
                    this.rot.data = res.data.rot
                    this.fot.data = res.data.fot
                    this.cot.data = res.data.cot
                    this.dates = res.data.dates //arranged from earliest to latest
                }
            }).then(() => {
                if (!this.summary.status.empty && this.dates !== null) {
                    // eslint-disable-next-line
                    function getDriftObject(data) {
                        let t1 = 3
                        let t2 = 5
                        let drift = (data[0] - data[data.length-1]).toFixed(3)
                        const stat = drift < t1 ? 1 : drift < t2 ? 2 : 3
                        return { data, drift, t1, t2, stat }
                    }
                    this.aot = getDriftObject(this.aot.data)
                    this.pot = getDriftObject(this.pot.data)
                    this.rot = getDriftObject(this.rot.data)
                    this.fot = getDriftObject(this.fot.data)
                    this.cot = getDriftObject(this.cot.data)
                    this.cot.t1 = -0.3
                    this.cot.t2 = -0.5
                    this.cot.stat = this.cot.drift > this.cot.t1 ? 1 : this.cot.drift > this.cot.t2 ? 2 : 3
                }
            }).then(() => {
                if (!this.summary.status.empty && this.dates !== null) {
                    const sum = this.aot.stat + this.pot.stat + this.rot.stat + this.fot.stat + this.cot.stat
                    const stat = sum < 7 ? 1 : sum < 9 ? 2 : 3
                    this.summary.drift = {
                        empty: false,
                        aot: this.aot.stat,
                        pot: this.pot.stat,
                        rot: this.rot.stat,
                        fot: this.fot.stat,
                        cot: this.cot.stat,
                        stat
                    }
                }
            }).then(async() => {
                if (!this.summary.status.empty && this.dates !== null) {
                    const latest = new Date(this.dates[this.dates.length - 1])
                    const tdy = new Date()
                    if (latest.getFullYear() === tdy.getFullYear() && latest.getDate() === tdy.getDate() && latest.getMonth() === tdy.getMonth()) {
                        this.summary.status.stat = true
                    } else {
                        this.summary.status.stat = await modelRegistryService.refresh(-1) === false ? false : true
                    }
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