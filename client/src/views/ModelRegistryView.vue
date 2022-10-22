<template>
    <div>
        <HeaderBar />
        <br />
        <ModelRegistry :data='this.data' />
    </div>
</template>
    
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import ModelRegistry from '@/components/ModelRegistry.vue';
import modelRegistryService from '@/services/modelRegistryService';

export default {
    components: { HeaderBar, ModelRegistry },
    data() {
        return {
            // data format: model_id, modelName, inProduction (deployed), modelDescription, modelVersion, editedTime, modelPerformance
            data: []
        }
    },
    methods: {
        getData() {
            modelRegistryService.index().then(res => {
                console.log(res)
                // GET request to populate the data list above
                this.data = res.data.models
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>
    
<style scoped>

</style>
