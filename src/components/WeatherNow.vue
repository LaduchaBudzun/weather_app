<template>
  <div class="weather_now">
      <div class="degrees">{{currentWeather.degrees}}  <span>°{{selectedSettings.degrees}}</span> 

                <img class="icon_img" v-if="currentWeather.weather.icon == undefined" src=""  alt="">

                <img class="icon_img" v-else-if="currentWeather.weather.icon == '50d' || currentWeather.weather.icon == '50n'" :src="require(`../../public/icons/${currentWeather.weather.icon}.png`)"  alt="">
        
                <img class="icon_img" v-else  :src="require(`../../public/icons/${currentWeather.weather.icon}.svg`)"  alt="">
      </div>
                 
        <div class="comment">{{currentWeather.weather.description}}</div>
        <div class="weather_indicators">
            <div class="wind">
                <img src="../../public/img/Wind.svg" alt="">
                <span class="init" v-if="selectedSettings.windSpeed == 'm/s'">{{currentWeather.windSpeed}}{{selectedSettings.windSpeed}}</span>
                <span class="init" v-else>{{(currentWeather.windSpeed * 2.23694).toFixed(1)}}{{selectedSettings.windSpeed}}</span>
                <span class="direction" >, {{directionWind(currentWeather.wind_deg)}}</span>

                <div class="compas"><img class="arrow" :style="{ transform: 'rotate('+ currentWeather.wind_deg+'deg)'}" src="../../public/img/Arrow.svg" alt=""></div>
            </div>
            <div class="humidity">
                <img src="../../public/img/humidity.svg" alt="">
                <span class="humidity_value">{{currentWeather.airHumidity}}<span class="init">%</span></span>
            </div>
            <div class="atmosphere_pressure">
                <img src="../../public/img/atmosphere_pressure.svg" alt="">
                <p v-if="selectedSettings.pressure == 'hPa'">{{currentWeather.pressure}} <span class="init" >{{selectedSettings.pressure}}</span></p>
                <p v-else>{{(currentWeather.pressure * 0.750062).toFixed(1)}} <span class="init" >{{selectedSettings.pressure}}</span></p>

            </div>
        </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:"WeatherNow",
    data(){
        return{
        }
    },
    computed:{
        ...mapGetters(['currentWeather','selectedSettings']),
    },
   
    methods:{
        directionWind(wind_deg){
            if(wind_deg >= 335 || wind_deg < 25){
                return 'N'
            }else if(wind_deg >= 295 && wind_deg < 335){
                return 'NW'
            }else if(wind_deg >= 245 && wind_deg < 295){
                return 'W'
            }else if(wind_deg >= 205 && wind_deg < 245){
                return 'SW'
            }else if(wind_deg >= 205 && wind_deg < 245){
                return 'SW'
            }else if(wind_deg >= 155 && wind_deg < 205){
                return 'S'
            }else if(wind_deg >= 155 && wind_deg < 205){
                return 'S'
            }else if(wind_deg >= 115 && wind_deg < 155){
                return 'SE'
            }else if(wind_deg >= 65 && wind_deg < 115){
                return 'E'
            }else if(wind_deg >= 25 && wind_deg < 65){
                return 'NE'
            }
        }
   
    },
}
</script>

<style scoped>
.arrow{
    margin-right: 1px;
}
.direction{
    color:#BCCCF4;
    margin-right: 3px;
}
.icon_img{
    margin-left: 15px;
    width: 72px;
    height: 72px;
}
.atmosphere_pressure{
    display: flex;
    justify-content: center;
    align-items: center;
}
.atmosphere_pressure p{
    margin-left: 4px;
}
.init{
    color: #BCCCF4;
}
.weather_indicators{
    display: flex;
    align-items: center;

}
.humidity {
    width: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.humidity_value{
    margin-left: 5px;
}
.wind {
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wind .init{
    margin-left: 11px;
    margin-right: 5px;

}
.compas{
    display: flex;
    justify-content: center;
    align-items: center;
    color: aqua;
    width: 20px;
    height: 20px;
    background-image: url("../../public/img/Compas.svg");
}
.comment{
    text-align: center;
    font-size:22px
}
.degrees{
    font-family: 'Roboto-700';
    font-size: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>