<template>
    <div id = 'outerBox'>
        <div>
            <h3><b>Total Number since <br>APRIL 2022</b></h3>
        </div>
        <div>
            <p><b>{{totalCount}}</b></p>
        </div>
    </div>
</template>

<script>

export default {
    name: "TotalUserCount",
    data() {
        return {
                        
        }
    },
    props: {
        totalCount: Number
    }

}
</script>

<style scoped>

#outerBox {
    border-radius: 15px;
    padding: 10px;
    width: 100%;
    background-color: rgb(227, 189, 117);
    height: 300px;
}

p {
    font-size: 400%;
}
</style>
