<template>
    <div id="metricCard">
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
    }

}
</script>

<style scoped>

#metricCard {
    width: 160px;
    height: fit-content;
    background-color: white;
    border-radius: 20px;
    padding: 25px;
    margin: 15px;
}

h3 {
    margin: 5px;
}

p {
    margin: 0;
    font-size: 1.1rem
}

</style>
