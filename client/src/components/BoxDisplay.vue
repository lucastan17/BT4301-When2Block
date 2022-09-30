<template>
    <div id = 'outerBox'>
        <div>
            <h2>{{title}}</h2>
        </div>
        <div>
            <p>{{actualNumber}}</p>
        </div>
        <div>
            <h3>{{percentage}}</h3>
        </div>
    </div>
</template>

<script>

export default {
    name: "BoxDisplay",
    data() {
        return {
                        
        }
    },
    props: {
        title: String,
        actualNumber: Number,
        percentage: Number
    }

}
</script>

<style scoped>

#outerBox {
    border-radius: 25px;
    padding: 10px;
    width: 200px;
    background-color: rgb(241, 130, 60);
}

</style>

