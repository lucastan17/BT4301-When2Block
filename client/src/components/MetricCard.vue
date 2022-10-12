<template>
    <div id="metricCard" :class="classColor">
        <h3>{{metric}}</h3>
        <div>
            <p>Value: {{val}}</p>
            <p>Threshold: {{threshold2}}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "MetricCard",
    props: {
        metric: String,
        val: Number,
        threshold1: Number,
        threshold2: Number
    },
    computed: {
        classColor() {
            return {
                below: this.val < this.threshold1,
                thres1: this.val >= this.threshold1 && this.val < this.threshold2,
                thres2: this.val >= this.threshold2
            }
        }
    }

}
</script>

<style scoped>

#metricCard {
    width: 160px;
    height: fit-content;
    border-radius: 20px;
    padding: 25px 10px;
    margin: 15px;
}

h3 {
    margin: 5px;
}

p {
    margin: 0;
    font-size: 1.1rem
}

.below {
    background-color: azure;
}

.thres1 {
    background-color: rgb(231, 169, 169);
}

.thres2 {
    background-color: indianred;
    color: white;
}

</style>
