<template>
    <div>
        <HeaderBar/>
        <ModelRegistry :data='this.data'/>
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
            //Lucas, this is the format that my ModelRegistry.vue page (in components) requires to display the dashboard
            //if you need to change it, pls update the dashboard page too
            //this list of {} can be removed once you've written the method to extract the data from DB
            // but leave a placeholder i.e data: []
            data: [{'model_id':4 ,'modelName': 'Model 4', 'deploymentStatus': 'Staged', "modelDescription": "40 Hidden Layers", "modelVersion": "V2.5", "editedTime": "29/10/22", "modelPerformance": "0.99"},
                   {'model_id':3 ,'modelName': 'Model 3', 'deploymentStatus': 'Deployed', "modelDescription": "20 Hidden Layers", "modelVersion": "V1.2", "editedTime": "20/09/22", "modelPerformance": "0.89"},
                   {'model_id':2 ,'modelName': 'Model 2', 'deploymentStatus': 'Decommissioned', "modelDescription": "10 Hidden Layers", "modelVersion": "V0.5", "editedTime": "29/07/22", "modelPerformance": "0.12"},
                   {'model_id':1 ,'modelName': 'Model 1', 'deploymentStatus': 'Decommissioned', "modelDescription": "5 Hidden Layers", "modelVersion": "V0.2", "editedTime": "04/06/22", "modelPerformance": "0.58"}] 
        }
    },
    methods: {
        getData() {
            modelRegistryService.index().then(res => {
                console.log(res)
                //Lucas can you write the logic for GET request to populate the data list above
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
