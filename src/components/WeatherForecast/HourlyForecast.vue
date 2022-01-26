<template>
  <div class="hourly_forecast">
        <div class="item" >
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">{{currentWeather.degrees}}°</div>
          </div>
          <div class="item" v-for="item in hourlyWeather" :key="item.id">
              <span class="time">{{item.time}}</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">{{item.degrees}}°</div>
          </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:"HourlyForecast",
    computed:{
        ...mapGetters(['hourlyWeather','currentWeather']),
    },
    methods:{

    }
    

}
</script>

<style scoped>
.item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.weather_degrees{
    font-size: 16px;
}
.time{
    color:#BCCCF4;
    font-size: 14px;
}

.hourly_forecast{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>