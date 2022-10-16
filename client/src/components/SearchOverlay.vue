<template>
    <HeaderBar/>
    <p style="fontSize:22px; margin:10px;"> Get advice on Sunscreen application up to <b>2 hours</b> before heading to your destination</p>

    <!-- Create Label for inputing area-->
    
    <label id="place-f" for="select-place">Select area to check:</label>
        <input  id ="place-s" type = "text" v-model="places.name" list="places" placeholder="type here..." />
        <datalist id="places">
            <option v-for="(p,index) in places" :key="index">{{p.name}}</option>
        </datalist>

    <!-- Likewise,create Label for inputing time-->
    <label for="select-time" style="margin:15px">Select Timing to check:</label>
        <input id="time-s" type = "time" min="07:00:00" max="19:00:00" value="07:00:00" step="1800" required placeholder="Key time here..." />


    <button style="margin-left:20px" @click="search()">Search</button>
    <button style="margin-left:20px" @click="reset()"> Clear Search</button>
    
    <!--Show outcome if sunny or not-->
    <div id="outcome" v-show="showResults" >
        <h2 style="background-color:#F16308; color:white; margin:0px; border:2px solid black; border-radius: 15px ">Outcome</h2>
        <div style="display:flex; justify-content: center;">
            <img v-show="isSunny" alt="Sunscreen Logo" src="../assets/sunscreen.png" width="150" style="align-items:center; padding: 10px 10px 20px 0px; margin:15px"/>
            <img v-show="!isSunny" alt="Sunscreen gray Logo" src="../assets/sunscreen-gray.png" width="150" style="align-items:center; padding: 10px 10px 20px 0px; margin:15px"/>
            <h2 v-if="isSunny" style="padding-left:20px;padding-right:20px"> It's going to be SUNNY <br> Wear your Sunscreen! </h2>
            <h2 v-else> It's NOT SUNNY <br> Wearing Sunscreen is Optional! </h2>
        </div>
    </div>

    <!-- Load leaflet map of Singapore, as well as pin markers of all coordinates-->
    <div id ="maps">
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
    <div id ="listcoordinates">
            <li v-for="(item, index) in this.infometa" :key="index">
                {{item.name}} forecast is {{this.infofc[0].forecasts[index].forecast}}
            </li>
    </div>

</template>

<script>
import axios from 'axios';
import HeaderBar from "./HeaderBar.vue";
import searchService from '@/services/searchService'
import {
  LMap,
  //LIcon,
  LTileLayer,
  LMarker,
  LPopup,
  //LControlLayers,
  /*LTooltip,
  LPolyline,
  LPolygon,
  LRectangle,*/
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

//import 'vue3-timepicker/dist/VueTimepicker.css'

//import Vue from "vue";

export default {
    name: 'SearchOverlay', 
    components: {
    HeaderBar,
    LMap,
    //LIcon,
    LPopup,
    LTileLayer,
    LMarker,
    //LControlLayers,
    //LTooltip,
    //LPolyline,
    //LPolygon,
    //LRectangle,
    },

    data () {
        return {
            dummyModel:{model_id:1,location:'result',time: this.SGCurrDate(8), weather:'Sunny',uv_index:3,prediction:'Wear',actual:'Wear'},
            showResults: false,
            isSunny:true,
            map: null,
            count:0,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 11,
            attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            center: [1.3521, 103.8198],
            ocenter:[1.3521, 103.8198],
            sunnyConditions: ["Cloudy","Fair & Warm","Fair (Day)","Partly Cloudy(Day)","Windy"],
            today: 0,
            infometa: {},
            infofc:{},
            infoUV:null,
            db_info:{},
            places:{'Ang Mo Kio':{name:'Ang Mo Kio',forecast:'1',lat:'',long:''},'Bedok':{name:'Bedok',forecast:'',lat:'',long:''},'Bishan':{name:'Bishan',forecast:'',lat:'',long:''},'Boon Lay':{name:'Boon Lay',forecast:'',lat:'',long:''},'Bukit Batok':{name:'Bukit Batok',forecast:'',lat:'',long:''},
                    'Bukit Merah':{name:'Bukit Merah',forecast:'2',lat:'',long:''},'Bukit Panjang':{name:'Bukit Panjang',forecast:'',lat:'',long:''},'Bukit Timah':{name:'Bukit Timah',forecast:'',lat:'',long:''},'Central Water Catchment':{name:'Central Water Catchment',forecast:'',lat:'',long:''},'Changi':{name:'Changi',forecast:'',lat:'',long:''},
                    'Choa Chu Kang':{name:'Choa Chu Kang',forecast:'3',lat:'',long:''},'Clementi':{name:'Clementi',forecast:'',lat:'',long:''},'City':{name:'City',forecast:'',lat:'',long:''},'Geylang':{name:'Geylang',forecast:'',lat:'',long:''},'Hougang':{name:'Hougang',forecast:'',lat:'',long:''},
                    'Jalan Bahar': {name:'Jalan Bahar',forecast:'4',lat:'',long:''},'Jurong East':{name:'Jurong East',forecast:'',lat:'',long:''},'Jurong Island':{name:'Jurong Island',forecast:'',lat:'',long:''},'Jurong West':{name:'Jurong West',forecast:'',lat:'',long:''},'Kallang':{name:'Kallang',forecast:'',lat:'',long:''},
                    'Lim Chu Kang':{name:'Lim Chu Kang',forecast:'',lat:'',long:''},'Mandai':{name:'Mandai',forecast:'',lat:'',long:''},'Marine Parade':{name:'Marine Parade',forecast:'',lat:'',long:''},'Novena':{name:'Novena',forecast:'',lat:'',long:''},'Pasir Ris':{name:'Pasir Ris',forecast:'',lat:'',long:''},
                    'Paya Lebar':{name:'Paya Lebar',forecast:'',lat:'',long:''},'Pioneer':{name:'Pioneer',forecast:'',lat:'',long:''},'Pulau Tekong':{name:'Pulau Tekong',forecast:'',lat:'',long:''},'Pulau Ubin':{name:'Pulau Ubin',forecast:'',lat:'',long:''},'Punggol':{name:'Punggol',forecast:'',lat:'',long:''},
                    'Queenstown':{name:'Queenstown',forecast:'',lat:'',long:''},'Seletar':{name:'Seletar',forecast:'',lat:'',long:''},'Sembawang':{name:'Sembawang',forecast:'',lat:'',long:''},'Sengkang':{name:'Sengkang',forecast:'',lat:'',long:''},'Sentosa':{name:'Sentosa',forecast:'',lat:'',long:''},
                    'Serangoon':{name:'Serangoon',forecast:'',lat:'',long:''},'Southern Islands':{name:'Southern Islands',forecast:'',lat:'',long:''},'Sungei Kadut':{name:'Sungei Kadut',forecast:'',lat:'',long:''},'Tampines':{name:'Tampines',forecast:'',lat:'',long:''},'Tanglin':{name:'Tanglin',forecast:'',lat:'',long:''},
                    'Tengah':{name:'Tengah',forecast:'',lat:'',long:''},'Toa Payoh':{name:'Toa Payoh',forecast:'',lat:'',long:''},'Tuas':{name:'Tuas',forecast:'',lat:'',long:''},'Western Islands':{name:'Western Islands',forecast:'',lat:'',long:''},'Western Water Catchment': {name:'Western Water Catchment',forecast:'',lat:'',long:''},
                    'Woodlands':{name:'Woodlands',forecast:'',lat:'',long:''},'Yishun':{name:'Yishun',forecast:'',lat:'',long:''}},
        }

 
    },

    mounted: function(){ 
        this.fetchData()
        this.load_db()  
    }, 

    methods:{ 
    async load_db(){ 
        searchService.index().then( res =>{
            this.db_info = res.data
            console.log(this.db_info) 
        }).catch(err => {
            console.log(err) 
        })
    }, 
    async loadMap(){
        //console.log(this.$refs.datamap.leafletObject)
        this.map = this.$refs.datamap.leafletObject
    },

    reset(){
        this.center = this.ocenter
        this.showResults = false
        this.map.setView(this.center,this.zoom)
        document.getElementById('place-s').value = ''
        //this.document.getElementById('place-s').value = null
        this.places.name = ''
        
    },
    async fetchData(){
        try{    
            const response = await axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
            const response2 = await axios.get('https://api.data.gov.sg/v1/environment/uv-index')
            this.infometa = response.data.area_metadata
            this.infofc = response.data.items
            //Currently infoUV stores the current UVI reading from the realtime API
            this.infoUV = response2.data.items[0].index[0].value
            this.fillData(response.data)
            //console.log(this.infometa[0].label_location)
        } 
        catch(error){
            console.log(error)
        }
    },
    SGCurrDate(hours,date=new Date()){
        date.setTime(date.getTime() + hours * 60 * 60 *1000)
        return date
    },
    fillData(){
        for ( var i = 0; i<Object.keys(this.places).length;i++){
            var name = this.infometa[i].name 
            this.places[name].forecast = this.infofc[0].forecasts[i].forecast
            this.places[name].lat = this.infometa[i].label_location.latitude
            this.places[name].long = this.infometa[i].label_location.longitude
        }
    }, 
    async search(){
        if (this.db_info.UVI.length != 0 ){
            console.log("UVI_called")
            alert("UVI called")
        } else {
            console.log("Call model and display")
            //model call function here, store in const result and reload db
            //UVI_model.run() etc
            const result = await searchService.post({
                    model_id: this.dummyModel.model_id,
                    location: this.dummyModel.location,
                    time: this.dummyModel.time,
                    weather: this.dummyModel.weather,
                    uv_index: this.dummyModel.uv_index,
                    prediction: this.dummyModel.prediction,
                    actual: this.dummyModel.actual,
            })
            console.log(result.data)
            alert("Model ran")
            this.load_db()
        }
        this.centerUpdated();

    },
    checkSunny(place,time){
        var forecast = this.places[place].forecast
        var curr_time = time
        var UVI = this.infoUV
        if(this.sunnyConditions.includes(forecast) && UVI >= 3){
            this.isSunny = true
        } else {
            this.isSunny = false
        }
        console.log(curr_time)
        //console.log(UVI)
        //console.log(forecast)
        //console.log(this.isSunny)
    },
    checkTime(time){
        let now = this.SGCurrDate(8).getHours()
        if (now-time.getHours()  > 2 ){
            alert("Please Select a timing of up to 2 hours from now")
        } else {
            alert("Timing is good")
        }
    },
    centerUpdated(){
        var p = document.getElementById('place-s').value
        var t = document.getElementById('time-s').value
        this.center = [this.places[p].lat,this.places[p].long]
        //console.log(this.$refs.datamap.leafletObject)
        this.showResults = true;
        //console.log(t)
        this.checkSunny(p,t)
        this.checkTime(new Date(t))
        this.map.setView(this.center,13.5)    
    }
  }
  
}

</script>

<style scoped>
#outcome{
    font-size: 35px;
    width:70%;
    text-align: center;
    margin:15px auto;
    border: 2px solid;
    border-radius: 20px;
    flex-direction: row;
}
table, th, td {
  border:1px solid black;
  justify-content:center;
  align-items: center;
} 
#listcoordinates{
    margin:10px;
    padding-top: 20px;
}

#maps{
    height:400px;
    padding-left: 5%;
    padding-right: 5%;
    margin:20px;
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

button {
    background-color: rgb(241, 99, 9);
    color: white;
    border-radius: 5px;
    height: 25px;
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