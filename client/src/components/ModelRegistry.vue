<template>
    <div id="outer-cover">
        <div id="title-row">
            <h3 style="font-weight:bold;">Model Registry</h3>
            <o-button class="button" id="register-button" @click="registerNewModel()">Register A New Model</o-button>
        </div>
        <table id="model_registry_table">
            <!-- TABLE HEADERS -->
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{header}}
                    </th>
                </tr>
            </thead>
            <!-- TABLE ROWS -->
            <tbody>
                <tr v-for="datum in data" :key="datum.model_id">
                    <td>{{datum.modelName}}</td>
                    <td><span v-if="datum.inProduction == 1">Deployed</span><span v-if="datum.inProduction == 0">Not
                            Deployed</span></td>
                    <td>{{datum.modelDescription}}</td>
                    <td>{{datum.modelVersion}}</td>
                    <td>{{convertDate(datum.editedTime)}}</td>
                    <td>{{datum.accuracy}}</td>
                    <td>
                        <o-button class="button" v-if="datum.inProduction != 1" @click="onUse(datum.model_id)">Use
                        </o-button>
                        <p v-if="datum.inProduction == 1">In-Use</p>
                    </td>
                    <td>
                        <o-button class="button" @click="onRefresh(datum.model_id)">Refresh
                        </o-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import modelRegistryService from '@/services/modelRegistryService'

export default {
    data() {
        return {
            headers: ["Name of Model", "Deployment Status", "Description", "Version Number", "Updated Date", "Performance Metric (AUC)", "Use?", "Re-run model"],
            // data: [{'model_id':4 ,'modelName': 'Model 4', 'deploymentStatus': 'Staged', "modelDescription": "40 Hidden Layers", "modelVersion": "V2.5", "editedTime": "29/10/22", "modelPerformance": "0.99"},
            //        {'model_id':3 ,'modelName': 'Model 3', 'deploymentStatus': 'Deployed', "modelDescription": "20 Hidden Layers", "modelVersion": "V1.2", "editedTime": "20/09/22", "modelPerformance": "0.89"},
            //        {'model_id':2 ,'modelName': 'Model 2', 'deploymentStatus': 'Decommissioned', "modelDescription": "10 Hidden Layers", "modelVersion": "V0.5", "editedTime": "29/07/22", "modelPerformance": "0.12"},
            //        {'model_id':1 ,'modelName': 'Model 1', 'deploymentStatus': 'Decommissioned', "modelDescription": "5 Hidden Layers", "modelVersion": "V0.2", "editedTime": "04/06/22", "modelPerformance": "0.58"}] 
        }
    },
    props: {
        data: Array
    },
    methods: {
        async onUse(id) {
            console.log(id)
            // POST request to change the deployment status field of the `model` table in DB to 'deployed' here 
            const response = await modelRegistryService.post(id)
            console.log(response.data)
            // auto-refresh page
            window.location.reload()
        },
        registerNewModel() {
            this.$router.push("/register-model")
        },
        convertDate(string) {
            return new Date(Date.parse(string)).toLocaleString();
        },
        async onRefresh(id) {
            const response = await modelRegistryService.refresh(id);
            console.log(response)
            // refresh page to see the changes made
            window.location.reload()
        }
    }
}
</script>

<style scoped>
#outer-cover {
    width: 85%;
    margin: auto;
}

#title-row {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#register-button {
    margin-top: 20px;
}

h1 {
    text-align: left;
}

tbody tr:nth-child(odd) {
    background-color: white;

}

tbody tr:nth-child(even) {
    background-color: #eeeeeeff;
}

table {
    background-color: #f97726;
    width: 100%;
    margin: auto;
}

tr {
    height: 60px;
}

table td th {
    text-align: center;
}

.button {
    background-color: #F16308;
    margin: 0px 0px 10px 0px;
    border: 0px;
}

.button:hover {
    background: #ffcc00;
    color: black;
    cursor: pointer;
}

.button:focus {
    outline: none;
}
</style>