<template>
<div id="app">
    <select name="second" v-model="model">
    <option value="test">Some Text1</option>
    <option value="4">Some Text2</option>
    <option value="5">Some Text3</option>
    </select>
    {{model}}
</div>
</template>

<script>
export default {
    data() {
        return {
            model:'4'
        };
    }
};
</script>