<template>
    <HeaderBar/>
    <p style="fontSize:22px; margin:10px;"> Get advice on Sunscreen application up to <b>2 hours</b> before heading to your destination</p>

    <label for="select-place">Select area to check:</label>
        <input type = "text" v-model="places.name" list="places" placeholder="type here..." />
        <datalist id="places">
            <option v-for="(p,index) in places" :key="index">{{p.name}}</option>
        </datalist>

    <div id ="map">
        <l-map style="height:330px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng" title="Marker 1"></l-marker>
        </l-map>
    </div>

    <div id="listcoordinates">
        <li v-for="(item, index) in this.infometa" :key="index">
            {{item.name}} forecast is {{this.infofc.forecasts[index].forecast}}
        </li>
    </div>
</template>

<script>
import {
  LMap,
  //LIcon,
  LTileLayer,
  LMarker,
  /*LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,*/
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import HeaderBar from "./HeaderBar.vue";

export default {
    name: 'SearchOverlay',
    props: {
        msg: String
    },
    components: {
    LMap,
    //LIcon,
    LTileLayer,
    LMarker,
    //LControlLayers,
    //LTooltip,
    //LPopup,
    //LPolyline,
    //LPolygon,
    //LRectangle,
    HeaderBar
},
    data () {
        return {
            count:0,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 11,
            center: [1.3521, 103.8198],
            markerLatLng: [1.3521, 103.75],
            infometa: {},
            infofc:{},
            places:[{name:'Ang Mo Kio',forecast:'1',lat:'',long:''},{name:'Bedok',forecast:'',lat:'',long:''},{name:'Bishan',forecast:'',lat:'',long:''},{name:'Boon Lay',forecast:'',lat:'',long:''},{name:'Bukit Batok',forecast:'',lat:'',long:''},
                    {name:'Bukit Merah',forecast:'2',lat:'',long:''},{name:'Bukit Panjan',forecast:'',lat:'',long:''},{name:'Bukit Timah',forecast:'',lat:'',long:''},{name:'Central Water Catchment',forecast:'',lat:'',long:''},{name:'Changi',forecast:'',lat:'',long:''},
                    {name:'Choa Chu Kang',forecast:'3',lat:'',long:''},{name:'Clementi',forecast:'',lat:'',long:''},{name:'City',forecast:'',lat:'',long:''},{name:'Geylang',forecast:'',lat:'',long:''},{name:'Hougang',forecast:'',lat:'',long:''},
                    {name:'Jalan Bahar',forecast:'4',lat:'',long:''},{name:'Jurong East',forecast:'',lat:'',long:''},{name:'Jurong Island',forecast:'',lat:'',long:''},{name:'Jurong West',forecast:'',lat:'',long:''},{name:'Kallang',forecast:'',lat:'',long:''},
                    {name:'Lim Chu Kang',forecast:'',lat:'',long:''},{name:'Mandai',forecast:'',lat:'',long:''},{name:'Marine Parade',forecast:'',lat:'',long:''},{name:'Novena',forecast:'',lat:'',long:''},{name:'Pasir Ris',forecast:'',lat:'',long:''},
                    {name:'Paya Lebar',forecast:'',lat:'',long:''},{name:'Pioneer',forecast:'',lat:'',long:''},{name:'Pulau Tekong',forecast:'',lat:'',long:''},{name:'Pulau Ubin',forecast:'',lat:'',long:''},{name:'Punggol',forecast:'',lat:'',long:''},
                    {name:'Queenstown',forecast:'',lat:'',long:''},{name:'Seletar',forecast:'',lat:'',long:''},{name:'Sembawang',forecast:'',lat:'',long:''},{name:'Sengkang',forecast:'',lat:'',long:''},{name:'Sentosa',forecast:'',lat:'',long:''},
                    {name:'Serangoon',forecast:'',lat:'',long:''},{name:'Southern Islands',forecast:'',lat:'',long:''},{name:'Sungei Kadut',forecast:'',lat:'',long:''},{name:'Tampines',forecast:'',lat:'',long:''},{name:'Tanglin',forecast:'',lat:'',long:''},
                    {name:'Tengah',forecast:'',lat:'',long:''},{name:'Toa Payoh',forecast:'',lat:'',long:''},{name:'Tuas',forecast:'',lat:'',long:''},{name:'Western Islands',forecast:'',lat:'',long:''},{name:'Western Water Catchment',forecast:'',lat:'',long:''},
                    {name:'Woodlands',forecast:'',lat:'',long:''},{name:'Yishun',forecast:'',lat:'',long:''}]
        };
    },

    mounted: function(){
        axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
             .then(response =>{
                this.infometa = response.data.area_metadata
                this.infofc = response.data.items[0]
                this.fill_data(response)
                console.log(this.infofc.forecasts);
             })
        //console.log(this.info)
    },
  methods:{
    plus1(){
        this.count +=1;
    },
    fill_data(d){
        for ( var i = 0; i<this.places.length;i++){
            this.places[i].forecast = d.data.items[0].forecasts[i].forecast
            this.places[i].lat = d.data.area_metadata[i].label_location.latitude
            this.places[i].long = d.data.area_metadata[i].label_location.longitude
            //console.log(this.places[i].lat)
        }
    }
  }
  
}

</script>

<style scoped>

#listcoordinates{
    margin:10px;
    padding-top: 20px;
}

#map{
    height:300px;
    padding-left: 100px;
    padding-right: 100px;
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
    