<template>
  <div class="weather_now">
      <div class="degrees">{{currentWeather.degrees}}  <span>°{{selectedSettings.degrees}}</span> <img src="../../public/img/Sun.svg" alt=""></div>
        <div class="comment">Very Sunny</div>
        <div class="weather_indicators">
            <div class="wind">
                <img src="../../public/img/Wind.svg" alt="">
                <span class="init" v-if="selectedSettings.windSpeed == 'm/s'">{{currentWeather.windSpeed}}{{selectedSettings.windSpeed}}, E</span>
                <span class="init" v-else>{{(currentWeather.windSpeed * 2.23694).toFixed(1)}}{{selectedSettings.windSpeed}}, E</span>

                <div class="compas"></div>
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
        
   
    },
}
</script>

<style scoped>
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
.wind span{
    margin-left: 11px;
    margin-right: 5px;

}
.compas{
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