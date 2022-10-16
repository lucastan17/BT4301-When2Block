<template>
    <HeaderBar/>
    <div id="content">
        <h2> Current Model Performance </h2>
        <div id="metrics">
            <MetricCard metric="Accuracy" :val="this.accuracy.val" :threshold1="this.accuracy.threshold1" :threshold2="this.accuracy.threshold2"/>
            <MetricCard metric="AUC" :val="this.auc.val" :threshold1="this.auc.threshold1" :threshold2="this.auc.threshold2"/>
            <MetricCard metric="Precision" :val="this.precision.val" :threshold1="this.precision.threshold1" :threshold2="this.precision.threshold2"/>
            <MetricCard metric="Recall" :val="this.recall.val" :threshold1="this.recall.threshold1" :threshold2="this.recall.threshold2"/>
            <MetricCard metric="F1 Score" :val="this.f1.val" :threshold1="this.f1.threshold1" :threshold2="this.f1.threshold2"/>
        </div>
        <h2> Drift Summary </h2>
        <div id="driftSummary">
            <MetricCard metric="Accuracy" :val="this.accuracy.val" :threshold1="this.accuracy.threshold1" :threshold2="this.accuracy.threshold2"/>
            <MetricCard metric="AUC" :val="this.auc.val" :threshold1="this.auc.threshold1" :threshold2="this.auc.threshold2"/>
        </div>
        <div id="driftGraph">
            <TestGraph/>
            <TestDropdown/>
        </div>
        <div id="driftDistr">
        </div>
        <div id="dataDrift">
        </div>
    </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue';
import MetricCard from '../components/MetricCard.vue';
//import DriftGraph from '../components/charts/DriftGraph.vue';
import TestGraph from '../components/charts/TestGraph.vue'
import TestDropdown from '../components/charts/TestDropdown.vue'

export default {
    name: "ModelDashboard",
    data() {
        return {
            accuracy: {
                val: 0.9,
                threshold1: 0.8,
                threshold2: 0.7
            },
            auc: {
                val: 0.75,
                threshold1: 0.8,
                threshold2: 0.7
            },
            precision: {
                val: 0.65,
                threshold1: 0.8,
                threshold2: 0.7
            },
            recall: {
                val: 0.98,
                threshold1: 0.8,
                threshold2: 0.7
            },
            f1: {
                val: 0.95,
                threshold1: 0.8,
                threshold2: 0.7
            },
            totalCount: 79,
        }
    },
    components: {
    HeaderBar,
    MetricCard,
    //DriftGraph
    TestGraph,
    TestDropdown
},
}

</script>

<style scoped>

#content {
    margin: 7rem 10rem;
}

#metrics {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5rem;
    margin-bottom: 5rem;
}

#driftSummary {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5rem;
    margin-bottom: 5rem;
}

</style>