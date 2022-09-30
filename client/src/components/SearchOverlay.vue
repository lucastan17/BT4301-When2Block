<template>
    <HeaderBar></HeaderBar>
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
    name: 'HeaderBar',
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
        };
    },

    mounted: function(){
        axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
             .then(response =>{
                this.infometa = response.data.area_metadata
                this.infofc = response.data.items[0]

                console.log(this.infofc.forecasts);
             })
        //console.log(this.info)
    },
  methods:{
    plus1(){
        this.count +=1;
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
    