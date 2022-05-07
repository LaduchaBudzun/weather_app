<template>
  <div class="app_wrapper">
    <div class="weather">
      <div class="main" v-if="location && date">
        <div class="header">
          <div class="city_panel">
            <img src="../../public/img/city.svg" alt="" />
            <span class="city">{{ location.city }}</span>
          </div>
          <router-link class="settings_btn" to="/settings">
            <img src="../../public/img/settings.svg" alt="" />
          </router-link>
        </div>
        <div class="time">
          <p class="timeNow">{{ date.time }}</p>
          <p class="monthNow">{{ date.month }}</p>
          <p>{{ date.day }}{{ numberEnding(date.day) }}, {{ date.year }}</p>
        </div>
        <WeatherNow />
        <div class="WeatherForecast">
          <HourlyForecast />
          <DailyForecast />
        </div>
      </div>

      <div v-else class="loader">
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherNow from './WeatherNow.vue'
import HourlyForecast from './WeatherForecast/HourlyForecast.vue'
import DailyForecast from './WeatherForecast/DailyForecast.vue'
import { mapGetters,mapActions, mapMutations } from 'vuex'
import functions from '../mixins/functions'
export default {
    name: 'Home',
    mixins:[functions],
    components:{
      WeatherNow,
      HourlyForecast,
      DailyForecast
    },
    data(){
      return{
      }
    },
    computed:{
      ...mapGetters(['timeNow','location','date'])
    },
    beforeCreate: function() {
        document.body.className = 'home';
    },
    async mounted(){
      await this.getWeather()
      this.updateTime()
    },
    
    methods:{
      ...mapActions(['getWeather']),
      ...mapMutations(['timeDecoding']),
      
        updateTime(){
          setInterval(() => {
            const timeNow = Date.now() / 1000;
            this.timeDecoding({dt:timeNow})
          }, 10000)
        }

    }

}
</script>
<style scoped>
.loader {
  width: 100%;
  padding-top: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.monthNow {
  margin-right: 7px;
}
.timeNow {
  margin-right: 10px;
}
.WeatherForecast {
  width: 100%;
  border-radius: 22px;
  background-color: #3a5cb3;
  padding: 15px;
}
.app_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 10px;
}
.time {
  display: flex;
  justify-content: center;
  color: #bcccf4;
}
.settings_btn {
  position: absolute;
  right: 0;
  cursor: pointer;
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}
.weather {
  color: white;
  max-width: 375px;
  min-width: 300px;
  width: 100%;
}
.city {
  font-family: "Roboto-700";

  margin-left: 7px;
}
.main {
  width: 100%;
}
</style>