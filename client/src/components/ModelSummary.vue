<template>
    <div class="mb-3 card">
        <div class="card-body">
            <h1 class="card-title text-start m-3">Summary</h1>
            <hr/>
            <div class="no-gutters row">
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card border-0 p-4">
                        <div class="card-body">
                            <h3 class="card-title">Model Status</h3>
                            <div v-if="status.empty" class="card-text my-4">
                                <span class="h4 mx-2">No models in production.</span>
                            </div>
                            <div v-else>
                            <div v-if="status.stat" class="card-text text-success my-4">
                                <i class="bi bi-check-circle h4"/>
                                <span class="h4 mx-2">Operational</span>
                            </div>
                            <div v-else class="card-text text-danger my-4">
                                <i class="bi bi-x-circle h4"/>
                                <span class="h4 mx-2">Not Operational</span>
                            </div>
                            <h5>Model ID (In Prod): {{status.model_id}}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card border-top-0 border-bottom-0 p-4 rounded-0">
                        <div class="card-body">
                            <h3 class="card-title">Model Performance</h3>
                            <div v-if="perf.empty" class="card-text my-4">
                                <span class="h4 mx-2">No predictions have been made by current model.</span>
                            </div>
                            <div v-else>
                            <div v-if="perf.stat === 1" class="card-text my-4 text-success">
                                <i class="bi bi-check-circle h4"/>
                                <span class="h4 mx-2">Healthy</span>
                            </div>
                            <div v-else-if="perf.stat === 2" class="card-text my-4 text-warning">
                                <i class="bi bi-dash-circle h4"/>
                                <span class="h4 mx-2">Acceptable</span>
                            </div>
                            <div v-else class="card-text my-4 text-danger">
                                <i class="bi bi-exclamation-circle h4"/>
                                <span class="h4 mx-2">Poor</span>
                            </div>
                            <div class="row g-0">
                                <div class="col text-start">
                                    <i class="bi" :class="iconStat(perf.acc)"/><span class="h6 mx-2">Accuracy</span><br/>
                                    <i class="bi" :class="iconStat(perf.pre)"/><span class="h6 mx-2">Precision</span><br/>
                                    <i class="bi" :class="iconStat(perf.rec)"/><span class="h6 mx-2">Recall</span>
                                </div>
                                <div class="col-7 text-start">
                                    <i class="bi" :class="iconStat(perf.f1)"/><span class="h6 mx-2">F1-Score</span><br/>
                                    <i class="bi" :class="iconStat(perf.chi)"/><span class="h6 mx-2">Goodness-of-Fit</span>
                                </div>
                            </div>
                            <div class="card-body pt-1">
                                <p class="card-text mt-4" style="font-size:15px; color:grey">Last Updated: {{perf.date}}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-4">
                    <div class="card border-0 p-4">
                        <div class="card-body">
                            <h3 class="card-title">Model Drift</h3>
                            <div v-if="drift.empty" class="card-text my-4">
                                <span class="h4 mx-2">No predictions have been made by current model.</span>
                            </div>
                            <div v-else>
                            <div v-if="drift.stat === 1" class="card-text text-success my-4">
                                <i class="bi bi-check-circle h4"/>
                                <span class="h4 mx-2">Minimal</span>
                            </div>
                            <div v-else-if="drift.stat === 2" class="card-text text-warning my-4">
                                <i class="bi bi-dash-circle h4"/>
                                <span class="h4 mx-2">Acceptable</span>
                            </div>
                            <div v-else class="card-text text-danger my-4">
                                <i class="bi bi-exclamation-circle h4"/>
                                <span class="h4 mx-2">Severe</span>
                            </div>
                            <div class="row g-0">
                                <div class="col text-start">
                                    <i class="bi" :class="iconStat(drift.aot)"/><span class="h6 mx-2">Accuracy</span><br/>
                                    <i class="bi" :class="iconStat(drift.pot)"/><span class="h6 mx-2">Precision</span><br/>
                                    <i class="bi" :class="iconStat(drift.rot)"/><span class="h6 mx-2">Recall</span>
                                </div>
                                <div class="col-7 text-start">
                                    <i class="bi" :class="iconStat(drift.fot)"/><span class="h6 mx-2">F1-Score</span><br/>
                                    <i class="bi" :class="iconStat(drift.cot)"/><span class="h6 mx-2">Goodness-of-Fit</span>
                                </div>
                            </div>
                            <div class="card-body pt-1">
                                <p class="card-text mt-4" style="font-size:15px; color:grey">Last Updated: {{perf.date}}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModelSummary",
    props: {
        status: Object,
        perf: Object,
        drift: Object
    },
    methods: {
        iconStat(stat) {
            let icon = stat === 1 ? 'bi-check' : stat === 2 ? 'bi-exclamation' : 'bi-x';
            let textColor = stat === 1 ? 'text-success' : stat === 2 ? 'text-warning' : 'text-danger';
            return icon + ' ' + textColor
        }
    }
}
</script>