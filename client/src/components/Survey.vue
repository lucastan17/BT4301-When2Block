<template>
    <div class="">
        <div class="parent">
            <div class="float-child-left">
                <img class="pic_1" src="../assets/hat.png" />
                <div class="msg">
                    <h3 id="small-text">Amost done...</h3>
                    <h1 id="large-text">Tell us your routine!</h1>
                </div>
                <img class="pic_2" src="../assets/sunblock.png" />
            </div>
            <div class="float-child-right">
                <div class="top-form">
                    <form>
                        <h2 class="qn">How often do you apply sunscreen?</h2>
                        <label for="daily">
                            <input type="radio" id="daily" value="daily" name="frequency" v-model="frequency">
                            Daily</label><br />

                        <label for="weekly">
                            <input type="radio" id="weekly" value="weekly" name="frequency" v-model="frequency">
                            Weekly</label><br />

                        <label for="monthly">
                            <input type="radio" id="monthly" value="monthly" name="frequency" v-model="frequency" />
                            Monthly</label><br />

                        <label for="never">
                            <input type="radio" id="never" value="never" name="frequency" v-model="frequency" />
                            Never</label>
                    </form>
                </div>

                <div class="bottom-form">
                    <form>
                        <h2 class="qn">Tell us your skin type!</h2>
                        <label for="normal">
                            <input type="radio" id="normal" value="normal" name="skin_type" v-model="skinType">
                            Normal Skin</label><br />

                        <label for="dry">
                            <input type="radio" id="dry" value="dry" name="skin_type" v-model="skinType">
                            Dry Skin</label><br />

                        <label for="oily">
                            <input type="radio" id="oily" value="oily" name="skin_type" v-model="skinType" />
                            Oily Skin</label><br />

                        <label for="combination">
                            <input type="radio" id="combination" value="combination" name="skin_type"
                                v-model="skinType" />
                            Combination Skin</label><br />

                        <label for="sensitive">
                            <input type="radio" id="sensitive" value="sensitive" name="skin_type" v-model="skinType" />
                            Sensitive Skin</label><br />
                    </form>
                </div>

                <o-button @click="submitSurvey" class="button">SUBMIT</o-button>
                <h5 v-if="error" class="error">{{error}}</h5>


            </div>

        </div>
    </div>
</template>
    
<script>
import SurveyService from '@/services/surveyService'

export default {
    name: 'SurveyItem',
    data() {
        return {
            frequency: "",
            skinType: "",
            error: ""
        }
    },
    methods: {
        async submitSurvey() {
            console.log(this.frequency, this.skinType)

            if (this.frequency == "" | this.skinType == "") {
                this.error = "Please select an option for each question!"
            } else {
                const response = await SurveyService.post({
                    user_id: 5,
                    sunscreen_freq: this.frequency,
                    skin_type: this.skinType
                })
                console.log(response.data)
                alert(`Survey submitted!`)
                this.$router.push({ name: "home" })
            }
        }

    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
    margin: 0px;
    position: absolute;
    top: 130px;
    left: 70px;
    bottom: 50px;
    right: 70px;
}

#small-text {
    font-weight: bold;
    font-size: 25px;
    margin: 0;
}

#large-text {
    font-weight: bold;
    font-size: 50px;
    margin: 0;
}

.pic_1 {
    width: 40%;
    margin: 0px 60px 0px 0px;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
}

.pic_2 {
    width: 20%;
    float: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.parent {
    height: 400px;
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
    /* padding: 50px; */
    background-color: white;
    position: relative;

}

.float-child-right {
    width: 50%;
    height: 100%;
    border-radius: 50px;
    float: left;
    padding: 10px 80px 0px 80px;
    background-color: #FCF5E8;
    margin: 0px;
}

.top-form {
    text-align: left;
}

.bottom-form {
    padding-top: 20px;
    text-align: left;
}

.qn {
    margin: 10px;
}

.button {
    background-color: #F16308;
    border: 0;
}

.error {
    font-size: 12pt;
    color: red;
    margin: 5px;
}
</style>
    