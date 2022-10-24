<template>
    <p style="fontSize:22px; margin:10px;"> Get advice on Sunscreen application up to <b>2 hours</b> before heading to
        your destination</p>

    <!-- Create Label for inputing area-->

    <label id="place-f" for="select-place" style="margin:15px">Select area to check:</label>
    <input id="select-place" type="text" v-model="places.name" list="places" placeholder="type here..." />
    <datalist id="places">
        <option v-for="(p,index) in places" :key="index">{{p.name}}</option>
    </datalist>

    <!-- Likewise,create Label for inputing time-->
    <label for="select-time" style="margin:15px">Select Timing to check:</label>
    <!--input id="time-s" type = "time" min="07:00:00" max="19:00:00" value="07:00:00" step="1800" required placeholder="Key time here..." /-->
    <input id="select-time" type="text" v-model="timing.time" list="timing" placeholder="Up till next 2 hours" />
    <datalist id="timing">
        <option v-for="(time,index) in timing" :key="index">{{time.time}}</option>
    </datalist>

    <o-button size="small" class="button" style="margin: 15px; font-weight: bold;" @click="search()">Search</o-button>
    <o-button size="small" class="button" style="margin: 15px 15px 15px 0px; font-weight: bold;" @click="reset()"> Clear
        Search</o-button>

    <!--Show outcome if sunny or not-->
    <div id="outcome" v-show="showResults">
        <h2 style="background-color:#F16308; color:white; margin:0px; border:2px solid black; border-radius: 15px ">
            Outcome</h2>
        <div style="display:flex; justify-content: center;">
            <img v-show="isSunny" alt="Sunscreen Logo" src="../assets/sunscreen.png" width="150"
                style="align-items:center; padding: 10px 10px 20px 0px; margin:15px" />
            <img v-show="!isSunny" alt="Sunscreen gray Logo" src="../assets/sunscreen-gray.png" width="150"
                style="align-items:center; padding: 10px 10px 20px 0px; margin:15px" />
            <h2 v-if="isSunny" style="padding-left:20px;padding-right:20px"> It's going to be SUNNY <br> Wear your
                Sunscreen! </h2>
            <h2 v-else> It's NOT SUNNY <br> Wearing Sunscreen is Optional! </h2>
        </div>
    </div>

    <!-- Load leaflet map of Singapore, as well as pin markers of all coordinates-->
    <div id="maps">
        <l-map ref="datamap" @ready="loadMap()" :zoom="zoom" :center="center" :zoomControl="true" :max-zoom="20">
            <l-tile-layer :url="url" layer-type="base" :max-zoom="20"> </l-tile-layer>

            <!-- For each marker we also include a pop up of the location, weather and UVI reading-->
            <l-marker v-for="(item,index) in this.infometa" :key="index"
                :lat-lng="[item.label_location.latitude,item.label_location.longitude]">
                <l-popup>
                    <table>
                        <thead>
                            <td><b>Location</b></td>
                            <td><b>Weather</b></td>
                            <td><b>UVI</b></td>
                        </thead>
                        <tr>
                            <td>{{this.infometa[index].name}}</td>
                            <td>{{this.infofc[0].forecasts[index].forecast}}</td>
                            <td> {{this.infoUV}} </td>
                        </tr>
                    </table>
                </l-popup>
            </l-marker>
        </l-map>
    </div>
    <div id="listcoordinates">
        <li v-for="(item, index) in this.infometa" :key="index">
            {{item.name}} forecast is {{this.infofc[0].forecasts[index].forecast}}
        </li>
    </div>

</template>

<script>
import axios from 'axios';
// import HeaderBar from "./HeaderBar.vue";
import searchService from '@/services/searchService';
const tf = require('@tensorflow/tfjs')
//const tfn = require("@tensorflow/tfjs-node")


// const weatherUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date='
const uviUrl = 'https://api.data.gov.sg/v1/environment/uv-index?date='
const today = new Date();
const previous = new Date(today.getTime());
previous.setDate(today.getDate() - 1);

import {
    LMap,
    //LIcon,
    LTileLayer,
    LMarker,
    LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { Buffer } from 'buffer'
//import 'vue3-timepicker/dist/VueTimepicker.css'

//import Vue from "vue";

export default {
    name: 'SearchOverlay',
    components: {
        LMap,
        //LIcon,
        LPopup,
        LTileLayer,
        LMarker,
    },

    data() {
        return {
            dummyModel: { model_id: 1, location: 'testmodel', time: new Date(new Date().getTime() + 8 * (3600 * 1000)), weather: 'Sunny', uv_index: 3, prediction: 1, actual: 1, predict_proba: 0.01 },
            showResults: false,
            isSunny: true,
            map: null,
            count: 0,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 11,
            attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            center: [1.3521, 103.8198],
            ocenter: [1.3521, 103.8198],
            sunnyConditions: ["Cloudy", "Fair & Warm", "Fair (Day)", "Partly Cloudy(Day)", "Windy"],
            today: 0,
            infometa: {},
            infofc: {},
            infoUV: null,
            db_info: {},
            uviJ: null,
            modJ: null,
            places: {
                'Ang Mo Kio': { name: 'Ang Mo Kio', forecast: '1', lat: '', long: '' }, 'Bedok': { name: 'Bedok', forecast: '', lat: '', long: '' }, 'Bishan': { name: 'Bishan', forecast: '', lat: '', long: '' }, 'Boon Lay': { name: 'Boon Lay', forecast: '', lat: '', long: '' }, 'Bukit Batok': { name: 'Bukit Batok', forecast: '', lat: '', long: '' },
                'Bukit Merah': { name: 'Bukit Merah', forecast: '2', lat: '', long: '' }, 'Bukit Panjang': { name: 'Bukit Panjang', forecast: '', lat: '', long: '' }, 'Bukit Timah': { name: 'Bukit Timah', forecast: '', lat: '', long: '' }, 'Central Water Catchment': { name: 'Central Water Catchment', forecast: '', lat: '', long: '' }, 'Changi': { name: 'Changi', forecast: '', lat: '', long: '' },
                'Choa Chu Kang': { name: 'Choa Chu Kang', forecast: '3', lat: '', long: '' }, 'Clementi': { name: 'Clementi', forecast: '', lat: '', long: '' }, 'City': { name: 'City', forecast: '', lat: '', long: '' }, 'Geylang': { name: 'Geylang', forecast: '', lat: '', long: '' }, 'Hougang': { name: 'Hougang', forecast: '', lat: '', long: '' },
                'Jalan Bahar': { name: 'Jalan Bahar', forecast: '4', lat: '', long: '' }, 'Jurong East': { name: 'Jurong East', forecast: '', lat: '', long: '' }, 'Jurong Island': { name: 'Jurong Island', forecast: '', lat: '', long: '' }, 'Jurong West': { name: 'Jurong West', forecast: '', lat: '', long: '' }, 'Kallang': { name: 'Kallang', forecast: '', lat: '', long: '' },
                'Lim Chu Kang': { name: 'Lim Chu Kang', forecast: '', lat: '', long: '' }, 'Mandai': { name: 'Mandai', forecast: '', lat: '', long: '' }, 'Marine Parade': { name: 'Marine Parade', forecast: '', lat: '', long: '' }, 'Novena': { name: 'Novena', forecast: '', lat: '', long: '' }, 'Pasir Ris': { name: 'Pasir Ris', forecast: '', lat: '', long: '' },
                'Paya Lebar': { name: 'Paya Lebar', forecast: '', lat: '', long: '' }, 'Pioneer': { name: 'Pioneer', forecast: '', lat: '', long: '' }, 'Pulau Tekong': { name: 'Pulau Tekong', forecast: '', lat: '', long: '' }, 'Pulau Ubin': { name: 'Pulau Ubin', forecast: '', lat: '', long: '' }, 'Punggol': { name: 'Punggol', forecast: '', lat: '', long: '' },
                'Queenstown': { name: 'Queenstown', forecast: '', lat: '', long: '' }, 'Seletar': { name: 'Seletar', forecast: '', lat: '', long: '' }, 'Sembawang': { name: 'Sembawang', forecast: '', lat: '', long: '' }, 'Sengkang': { name: 'Sengkang', forecast: '', lat: '', long: '' }, 'Sentosa': { name: 'Sentosa', forecast: '', lat: '', long: '' },
                'Serangoon': { name: 'Serangoon', forecast: '', lat: '', long: '' }, 'Southern Islands': { name: 'Southern Islands', forecast: '', lat: '', long: '' }, 'Sungei Kadut': { name: 'Sungei Kadut', forecast: '', lat: '', long: '' }, 'Tampines': { name: 'Tampines', forecast: '', lat: '', long: '' }, 'Tanglin': { name: 'Tanglin', forecast: '', lat: '', long: '' },
                'Tengah': { name: 'Tengah', forecast: '', lat: '', long: '' }, 'Toa Payoh': { name: 'Toa Payoh', forecast: '', lat: '', long: '' }, 'Tuas': { name: 'Tuas', forecast: '', lat: '', long: '' }, 'Western Islands': { name: 'Western Islands', forecast: '', lat: '', long: '' }, 'Western Water Catchment': { name: 'Western Water Catchment', forecast: '', lat: '', long: '' },
                'Woodlands': { name: 'Woodlands', forecast: '', lat: '', long: '' }, 'Yishun': { name: 'Yishun', forecast: '', lat: '', long: '' }
            },
            timing: { 0: { time: '' }, 1: { time: '' }, 2: { time: '' } },
        }


    },

    mounted: function () {
        this.fetchData()
        this.load_db()
    },

    methods: {
        async load_db() {
            searchService.index().then(res => {
                this.db_info = res.data
                this.uviJ = res.data.UVmod
                this.modJ = res.data.mod
                // const json = JSON.parse(res.data.mod);
                // const weightData = new Uint8Array(Buffer.from(json.weightData, "base64")).buffer;
                // const model = tf.loadLayersModel(tf.io.fromMemory(json.modelTopology, json.weightSpecs, weightData));

            }).catch(err => {
                console.log(err.message)
            })
        },
        async loadMap() {
            //console.log(this.$refs.datamap.leafletObject)
            this.map = this.$refs.datamap.leafletObject
        },

        reset() {
            this.center = this.ocenter
            this.showResults = false
            this.map.setView(this.center, this.zoom)
            this.places.name = ''
            this.timing.time = ''
            this.load_db()

        },
        async fetchData() {
            try {
                const response = await axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast').catch(err =>{
                    console.log(err.message)
                    alert("Error getting data from Real-Time API. Please try again later")
                })
                const response2 = await axios.get('https://api.data.gov.sg/v1/environment/uv-index').catch(err =>{
                    console.log(err.message)
                    alert("Error getting data from Real-Time API. Please try again later")
                })
                this.infometa = response.data.area_metadata
                this.infofc = response.data.items
                //Currently infoUV stores the current UVI reading from the realtime API
                this.infoUV = response2.data.items[0].index[0].value
                this.fillData(response.data)
                //console.log(this.infometa[0].label_location)
            }
            catch (error) {
                console.log(error)
            }
        },
        async SGCurrDate(hours, date = new Date()) {
            date.setTime(date.getTime() + hours * 60 * 60 * 1000)
            return date
        },
        fillData() {
            for (var i = 0; i < Object.keys(this.places).length; i++) {
                var name = this.infometa[i].name
                this.places[name].forecast = this.infofc[0].forecasts[i].forecast
                this.places[name].lat = this.infometa[i].label_location.latitude
                this.places[name].long = this.infometa[i].label_location.longitude
            }
            //for timing inputs
            for (var j = 0; j < 3; j++) {
                var cT = new Date()
                var display = new Date(cT.getTime() + (j + 8) * 3600 * 1000).toISOString().substring(11, 16)
                this.timing[j].time = display
            }
            // console.log(this.timing)
        },

        formatDate(dt) {
            let day = dt.getDate();
            let month = dt.getMonth() + 1;
            let year = dt.getFullYear();
            return `${year}-${month}-${(day > 9 ? '' : '0') + day}`;
        },
        uviTransform(data) {
            const input = [];
            for (let i = 0; i < data.length; i++) {
                var value = [data[i].value]
                input.push(value)
            }
            const inputTensor = tf.tensor3d([input]);
            return inputTensor
        },
        async runUVI() {

            console.log('run UVI triggered')

            // load model taken from backend
            const json = JSON.parse(this.uviJ);
            const weightData = new Uint8Array(Buffer.from(json.weightData, "base64")).buffer;
            const UVImodel = await tf.loadLayersModel(tf.io.fromMemory(json.modelTopology, json.weightSpecs, weightData));

            //const UVImodel = this.uviModel
            //const UVImodel = await tf.loadLayersModel("http://localhost:8080/uvi-model/UVImodel.json")

            console.log('uvi model loaded', UVImodel)


            // load yesterday UVI
            const uviDataObj = await axios.get(uviUrl + this.formatDate(previous))
            const lastIndex = uviDataObj.data.items.length-1
            const uviDataList = uviDataObj.data.items[lastIndex].index
            console.log('uvi data loaded', uviDataList)

            // transform uvi data into a tensor
            const uviTensor = this.uviTransform(uviDataList)
            console.log(uviTensor)

            const uviResult = await UVImodel.predict(uviTensor)
            console.log(uviResult)
            const uviResultout = uviResult.dataSync()

            console.log('uvi model result:', uviResultout)
            console.log('uvi value from model result:', uviResultout[0])

            alert('done running UVI model')
            return uviResultout
        },
        async runPred(uviPred, weatherPred) {
            console.log('run prediction triggered')
            // load model from back end
            const json = JSON.parse(this.modJ);
            const weightData = new Uint8Array(Buffer.from(json.weightData, "base64")).buffer;
            const predModel = await tf.loadLayersModel(tf.io.fromMemory(json.modelTopology, json.weightSpecs, weightData));

            //const predModel = await tf.loadLayersModel("http://localhost:8080/tfjs-model/model.json")
            console.log('pred model loaded', predModel)

            // transform into numerical input
            const weatherItems = [];
            for (var i = 0; i < weatherPred.length; i++) {
                var condition = weatherPred[i].forecast 
                console.log('check here', condition)
                if (this.sunnyConditions.includes(condition)) {
                    condition = 1
                } else {
                    condition = 0
                }
                weatherItems.push([condition, uviPred])
            }
            console.log('weather data loaded', weatherItems)

            // transform weather and uvi data into a tensor
            const inputTensor = tf.tensor2d(weatherItems)
            const predResult = await predModel.predict(inputTensor)
            const predResultout = predResult.dataSync()

            alert('done running prediction model')
            return predResultout
        },
        async weatherPredData(hour) {
            // load weather forecast
            console.log(hour)
            const weatherDataObj = await axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
            const weatherList = weatherDataObj.data.items[0].forecasts
            console.log('2 hour pred data: ', weatherList)
            return weatherList
        },
        async search() {
            var myInput = document.getElementById("select-place");
            var myInput2 = document.getElementById("select-time");
            if (myInput && myInput.value && myInput2 && myInput2.value)  {
                this.searchBody()
            } else {
                alert('please select value for inputs')
            }
        },
        async searchBody() {

            const loc = document.getElementById('select-place').value
            const hour = parseInt(document.getElementById('select-time').value.substring(0, 2))

            // get hours already in database
            const hours = []
            const dbHours = JSON.parse(JSON.stringify(this.db_info.hours))
            for (var j = 0; j<dbHours.length;j++){ 
                console.log('recurse through hours here')
                hours.push(dbHours[j].hr)
            }


            const c_hour = parseInt(this.timing[0].time.substring(0, 2))
            const diff = hour - c_hour
            const off_hours = [0, 1, 2, 3, 4, 5, 6, 20, 21, 22, 23]

            // check if hour of search is out of 7am-7pm
            if (off_hours.includes(hour)) {
                this.isSunny = 0

                // check if hour of search is not in data base
            } else if (!hours.includes(hour)) {
                const uviResults = await this.runUVI()
                const uviPred = uviResults[0]
                const weatherPred = await this.weatherPredData(hour)
                const predResults = await this.runPred(uviPred, weatherPred)
                console.log("finish running prediction model")
                console.log(predResults)
                console.log(Object.keys(this.places))

                // post into database
                for (var i = 0; i < 47; i++) {
                    const name = this.infometa[i].name
                    const ts = new Date(new Date().getTime() + (8 + diff) * (3600 * 1000))
                    console.log('storing pred for this place: ', name)
                    const response = await searchService.post({
                        model_id: 0,
                        location: name,
                        weather: weatherPred[i].forecast,
                        time: ts,
                        uv_index: Math.ceil(uviPred),
                        prediction: ((predResults[i] < 0.5) ? 0 : 1),
                        actual: (((this.sunnyConditions.includes(weatherPred[i].forecast)) & (uviPred < 3)) ? 0 : 1), 
                        predict_proba: predResults[i]
                    })
                    if (name == loc) {
                        this.isSunny = ((predResults[i] < 0.5) ? 0 : 1)
                        console.log('updating sunnny', this.isSunny)
                    }
                    console.log(response.data)
                }
            } else {
                // query from fetched data
                const dbPred = JSON.parse(JSON.stringify(this.db_info.pred))
                const locFilter = dbPred.filter(
                    function (data) { return data.location == loc }
                )
                const timeFilter = locFilter.filter(
                    function (data) { return data.time.substring(11, 13) == hour }
                )
                const predDB = timeFilter[0].prediction
                this.isSunny = ((predDB < 0.5) ? 0 : 1)
            }
            this.centerUpdated()
        },
        checkSunny(place, time) {
            var forecast = this.places[place].forecast
            var curr_time = time
            var UVI = this.infoUV
            if (this.sunnyConditions.includes(forecast) && UVI >= 3) {
                this.isSunny = true
            } else {
                this.isSunny = false
            }
            console.log(curr_time)
        },
        checkTime(time) {
            let now = this.SGCurrDate(8).getHours()
            if (now - time.getHours() > 2) {
                alert("Please Select a timing of up to 2 hours from now")
            } else {
                alert("Timing is good")
            }
        },
        centerUpdated() {
            var p = document.getElementById('select-place').value
            // var t = this.timing.time
            this.center = [this.places[p].lat, this.places[p].long]
            this.showResults = true;
            //console.log(t)
            // this.checkSunny(p,t)
            //this.checkTime(new Date(t))
            this.map.setView(this.center, 13.5)
        }
    }

}

</script>

<style scoped>
#outcome {
    font-size: 35px;
    width: 70%;
    text-align: center;
    margin: 15px auto;
    border: 2px solid;
    border-radius: 20px;
    flex-direction: row;
}

table,
th,
td {
    border: 1px solid black;
    justify-content: center;
    align-items: center;
}

#listcoordinates {
    margin: 10px;
    padding-top: 20px;
}

#maps {
    height: 400px;
    padding-left: 5%;
    padding-right: 5%;
    margin: 20px;
}

#logo {
    position: absolute;
    top: 5px;
    left: 15px;
}

#navbar {
    display: flex;
    justify-content: center;
    background-color: rgb(40, 41, 62);
    align-items: center;
}

#navlinks {
    color: white;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#LogOut {
    color: white;
    margin-right: 20px;
    position: absolute;
    right: 10px;
}

.button {
    background-color: #F16308;
    border: 0;
}

.button:hover {
    background: #ffcc00;
    color: black;
    cursor: pointer;
}

.button:focus {
    outline: none;
}

p {
    margin: 0px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    display: inline-block;
    margin: 0 70px;
}

a {
    color: white;
}

#navlinks a {
    color: white;
    text-decoration: none;
}

#navlinks a:hover,
a.active {
    border-bottom: white solid 2px;
}

/* to underline pages  */
/* #navlinks a:active {
    border-bottom: white solid 2px;
} */
</style>