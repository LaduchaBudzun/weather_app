<template>

 <div class="app_wrapper">
    <div class="weather">
        <div class="main">
          <div class="header">
            <div class="city_panel">
              <img src="../../public/img/city.svg" alt="">
              <span class="city">Los Angeles</span>
            </div>
            <router-link class="settings_btn" to="/settings">
              <img src="../../public/img/settings.svg" alt="">
            </router-link>
          </div>
          <div class="time">
            2: 23 PM   Aug 14th, 2022
          </div>
          <WeatherNow/>
          <WeatherForecast/>
  
        </div>
    </div>
 </div>
</template>

<script>
import WeatherNow from './WeatherNow.vue'
import WeatherForecast from './WeatherForecast/WeatherForecast.vue'
export default {
    name: 'Home',
    components:{
      WeatherNow,
      WeatherForecast
    },
    beforeCreate: function() {
        document.body.className = 'home';
    }

}
</script>

<style scoped>
.app_wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 10px;
}
.time{
  display: flex;
  justify-content: center;
  color:#BCCCF4;
}
.settings_btn{
  position: absolute;
  right: 0;
  cursor: pointer;
}
.header{
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}
.weather{
     
  color: white;
  max-width: 375px;
  min-width: 300px;
  width: 100%;

}
.city{
    font-family: 'Roboto-700';

  margin-left: 7px;
}
.main{
  width: 100%;
}

</style>