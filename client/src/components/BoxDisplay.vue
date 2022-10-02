<template>
    <div id = 'outerBox'>
        <div>
            <h3><u>{{title}}</u></h3>
        </div>
        <div>
            <p>{{actualNumber}}</p>
        </div>
        <div>
            <p><b>{{percentage}}%</b></p>
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
    padding: 5px;
    width: 180px;
    background-color: rgb(241, 130, 60);
}

</style>

