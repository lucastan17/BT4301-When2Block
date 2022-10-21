<template>
    <div class="mb-3 card">
        <div class="card-body">
            <h1 class="card-title text-start m-3">Model Performance</h1>
            <hr/>
            <div class="row row-cols-md-5 p-3 g-5">
                <div class="col">
                    <div class="card shadow h-100 border-0 text-start pt-2 rounded-5" style="padding-left: 0.75rem; padding-right: 0.75rem;">
                    <div class="card-body pb-1 h-100">
                        <h4 class="card-title" style="display: inline;">Accuracy</h4>
                        <i v-if="acc.stat === 1" class="bi bi-check-circle h5 mx-2 text-success"/>
                        <i v-else-if="acc.stat === 2" class="bi bi-exclamation-circle h5 mx-2 text-warning"/>
                        <i v-else class="bi bi-x-circle h5 mx-2 text-danger"/>
                    </div>
                    <div class="card-body pt-1">
                        <h5 class="card-subtitle">{{acc.val}}</h5>
                        <p class="card-text text-start mt-4" style="font-size:15px; color:grey">Threshold: {{acc.t2}}</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow h-100 border-0 text-start pt-2 rounded-5" style="padding-left: 0.75rem; padding-right: 0.75rem;">
                    <div class="card-body pb-1 h-100">
                        <h4 class="card-title" style="display: inline;">Precision</h4>
                        <i v-if="pre.stat === 1" class="bi bi-check-circle h5 mx-2 text-success"/>
                        <i v-else-if="pre.stat === 2" class="bi bi-exclamation-circle h5 mx-2 text-warning"/>
                        <i v-else class="bi bi-x-circle h5 mx-2 text-danger"/>
                    </div>
                    <div class="card-body pt-1">
                        <h5 class="card-subtitle">{{pre.val}}</h5>
                        <p class="card-text text-start mt-4" style="font-size:15px; color:grey">Threshold: {{pre.t2}}</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow h-100 border-0 text-start pt-2 rounded-5" style="padding-left: 0.75rem; padding-right: 0.75rem;">
                    <div class="card-body pb-1 h-100">
                        <h4 class="card-title" style="display: inline;">Recall</h4>
                        <i v-if="rec.stat === 1" class="bi bi-check-circle h5 mx-2 text-success"/>
                        <i v-else-if="rec.stat === 2" class="bi bi-exclamation-circle h5 mx-2 text-warning"/>
                        <i v-else class="bi bi-x-circle h5 mx-2 text-danger"/>
                    </div>
                    <div class="card-body pt-1">
                        <h5 class="card-subtitle">{{rec.val}}</h5>
                        <p class="card-text text-start mt-4" style="font-size:15px; color:grey">Threshold: {{rec.t2}}</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow h-100 border-0 text-start pt-2 rounded-5" style="padding-left: 0.75rem; padding-right: 0.75rem;">
                    <div class="card-body pb-1 h-100">
                        <h4 class="card-title" style="display: inline;">F1-Score</h4>
                        <i v-if="f1.stat === 1" class="bi bi-check-circle h5 mx-2 text-success"/>
                        <i v-else-if="f1.stat === 2" class="bi bi-exclamation-circle h5 mx-2 text-warning"/>
                        <i v-else class="bi bi-x-circle h5 ml-2 text-danger"/>
                    </div>
                    <div class="card-body pt-1">
                        <h5 class="card-subtitle">{{f1.val}}</h5>
                        <p class="card-text text-start mt-4" style="font-size:15px; color:grey">Threshold: {{f1.t2}}</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow h-100 border-0 text-start pt-2 rounded-5" style="padding-left: 0.75rem; padding-right: 0.75rem;">
                    <div class="card-body pb-1 h-100">
                        <h4 class="card-title" style="display: inline;">Goodness-of-Fit</h4>
                        <i v-if="chi.stat === 1" class="bi bi-check-circle h5 mx-2 text-success"/>
                        <i v-else-if="chi.stat === 2" class="bi bi-exclamation-circle h5 mx-2 text-warning"/>
                        <i v-else class="bi bi-x-circle h5 mx-2 text-danger"/>
                    </div>
                    <div class="card-body pt-1">
                        <h5 class="card-subtitle">{{chi.val}}</h5>
                        <p class="card-text text-start mt-4" style="font-size:15px; color:grey">Threshold: {{chi.t2}}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ModelPerformance",
    props: {
        acc: Object,
        pre: Object,
        rec: Object,
        f1: Object,
        chi: Object
    },
    methods: {
        textColor(stat) {
            let textColor = stat === 1 ? 'text-success' : stat === 2 ? 'text-warning' : 'text-danger';
            return textColor
        }
    }

}
</script>