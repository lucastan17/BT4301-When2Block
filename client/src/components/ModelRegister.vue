<template>
    <div style="margin-top: 50px;">
        <h3><span style="color: red">Register </span>
            <span style="color: orange">Your </span>
            <span style="color: yellowgreen">Machine </span>
            <span style="color: green">Learning </span>
            <span style="color: blue">Model </span>
            <span style="color: violet">Here</span>
        </h3>

        <div class="parent">
            <div class="float-child-left">
                <h3 id="small-text">Model Information...</h3>
                <br />
                <div class="stretch-input">
                    <p><b>Name of the model: </b></p>
                    <o-field>
                        <o-input placeholder="Model Name" autocomplete="off" v-model="modelName"></o-input>
                    </o-field>
                </div>
                <div class='stretch-input'>
                    <p><b>Description of the Model: </b></p>
                    <o-field>
                        <o-input class="stretch-input" placeholder="Model Description" autocomplete="off"
                            v-model="modelDescription"></o-input>
                    </o-field>
                </div>
                <div class='stretch-input'>
                    <p><b>Version of the Model: </b></p>
                    <o-field>
                        <o-input class="stretch-input" placeholder="Model Version" autocomplete="off"
                            v-model="modelVersion"></o-input>
                    </o-field>
                </div>
            </div>

            <div class="float-child-right">
                <h3 id="small-text">Model Files...</h3>
                <label for="json-file" class="drop-container">
                    <span class="drop-title">Drop your JSON file here</span>
                    or
                    <input type="file" id="json-file" @change="onJsonFileChange" accept='.json' />
                </label>
                <label for="bin-file" class="drop-container">
                    <span class="drop-title">Drop your BIN file here</span>
                    or
                    <input type="file" id="bin-file" @change="onWeightsFileChange" accept=".bin" />
                </label>
                <o-button @click="onUploadJsonFile" class="button">Submit</o-button>
            </div>
        </div>
        <h1 class="error" v-if="error">{{error}}</h1>
    </div>

</template>
    
<script>

import ModelRegisterService from '@/services/newModelRegister'
import jsonFileUploadService from '@/services/jsonFileUploadService'
import weightsFileUploadService from '@/services/weightsFileUploadService'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RegisterItem',

    data() {
        return {
            modelName: "",
            modelDescription: "",
            modelVersion: "",
            error: "",
            selectedJsonFile: "",
            selectedWeightsFile: "",
        }
    },
    methods: {
        async modelRegister() {
            if (this.modelName == "" | this.modelDescription == "" | this.modelVersion == "") {
                this.error = "Please enter the model information!"
            } else if (this.selectedJsonFile == "") {
                this.error = "Please upload your JSON ML model!"
            } else if (this.selectedWeightsFile == "") {
                this.error = "Please upload your ML model's Weights!"
            } else {
                alert("Model Submitted!")
                const response = await ModelRegisterService.modelRegister({
                    modelName: this.modelName,
                    modelDescription: this.modelDescription,
                    modelVersion: this.modelVersion,
                })
                console.log(response)
            }

        },
        onJsonFileChange(e) {
            const selectedJsonFile = e.target.files[0]; // accessing file
            this.selectedJsonFile = selectedJsonFile;
        },
        async onUploadJsonFile() {
            this.modelRegister();
            this.onUploadWeightsFile();
            const formData = new FormData();
            formData.append("file", this.selectedJsonFile);  // appending file

            // sending file to the backend
            const response = await jsonFileUploadService.post(formData)
            console.log(response)
            location.reload();
        },
        onWeightsFileChange(e) {
            const selectedWeightsFile = e.target.files[0];
            this.selectedWeightsFile = selectedWeightsFile;
        },
        async onUploadWeightsFile() {
            const formData = new FormData();
            formData.append("file", this.selectedWeightsFile);
            const response = await weightsFileUploadService.post(formData)
            console.log(response)
        },
        clearFields() {
            this.modelName = "";
            this.modelDescription = "";
            this.modelVersion = "";
            this.selectedJsonFile = "";
            this.selectedWeightsFile = "";
        },
    },
})
</script>
    
<style scoped>
h3 {
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 7px;

}

#small-text {
    font-weight: bold;
    font-size: 25px;
    margin: 0;
}

.stretch-input {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
}

.parent {
    height: 450px;
    width: 85%;
    border-radius: 50px;
    border: 1px solid black;
    /* padding: 20px; */
    margin: auto;
    background-color: white;
}

.float-child-left {
    width: 50%;
    height: 100%;
    border-radius: 50px;
    float: left;
    padding: 20px 30px 0px 30px;
    background-color: #FCF5E8;
    position: relative;

}

.float-child-right {
    width: 50%;
    height: 100%;
    border-radius: 50px;
    float: left;
    padding: 20px 30px 0px 30px;
    margin: 0px;
}

.button {
    background-color: #F16308;
    border: 0;
    color: white;
    margin-top: 20px;
}

.error {
    margin: 0 auto;
    font-size: 15px;
    color: red;
}

/* DROP CONTAINTER REFERENCED FROM: https://nikitahl.com/custom-styled-input-type-file */
.drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 150px;
    padding: 20px;
    margin: 8px 5px 0px 5px;
    border-radius: 10px;
    border: 1px dashed #555;
    color: #444;
    cursor: pointer;
    transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
    background: #eee;
    border-color: #111;
}

.drop-container:hover .drop-title {
    color: #222;
}

.drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color .2s ease-in-out;
}

/* END OF DROP CONTAINTER REFERENCE */
</style>