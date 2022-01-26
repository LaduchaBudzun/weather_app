<template>

 <div class="app_wrapper">
    <div class="weather">
        <div class="main">
          <div class="header">
            <div class="city_panel">
              <img src="../../public/img/city.svg" alt="">
              <span class="city">{{location.city}}</span>
            </div>
            <router-link class="settings_btn" to="/settings">
              <img src="../../public/img/settings.svg" alt="">
            </router-link>
          </div>
          <div class="time">
            <p class="timeNow">{{time}}</p> 
            <p class="monthNow">{{month}} </p>
            <p>{{day}}{{numberEnding(day)}}, {{year}}</p>
          </div>
          <WeatherNow/>
          <div class="WeatherForecast">
            <HourlyForecast/>
            <DailyForecast/>
          </div>
  
        </div>
    </div>
 </div>
</template>

<script>
import WeatherNow from './WeatherNow.vue'
import HourlyForecast from './WeatherForecast/HourlyForecast.vue'
import DailyForecast from './WeatherForecast/DailyForecast.vue'
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'Home',
    components:{
      WeatherNow,
      HourlyForecast,
      DailyForecast
    },
    data(){
      return{
        time:'',
        dateNow:'',
        weekday:'',
        day:''
      }
    },
    computed:{
      ...mapGetters(['timeNow','location'])
    },
    beforeCreate: function() {
        document.body.className = 'home';
    },
    async mounted(){
      await this.getWeather()
      this.timeDecoding()
    },
    
    methods:{
      ...mapActions(['getWeather']),
        timeDecoding(){//перенести это в vuex date:{}
         this.year = this.timeNow.toLocaleString('en-US', { year:'numeric'})
         this.weekday = this.timeNow.toLocaleString('en-US', { weekday: 'long'})
         this.day = this.timeNow.toLocaleString('en-US', {day:'numeric'})
         this.month = this.timeNow.toLocaleString('en-US', {month:'short'})
         this.time = this.timeNow.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        },
         numberEnding(date){
           const last = date.toString().slice(-1)
           if(last == '1'){
             return 'st'
           }else if(last == '2'){
             return 'nd'
           }else if(last == '3'){
             return 'rd'
           }else{
             return 'th'
           }
         }

        //   setInterval(function() {
        //   this.time = this.timeNow.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true ,year:'numeric'})  
        //   console.log(this.timeNow)
        // }.bind(this), 60000);

// Остановить исполнение можно вызовом clearInterval(time).
    }

}
</script>

<style scoped>
.monthNow{
  margin-right: 7px;
}
.timeNow{
  margin-right: 10px;
}
.WeatherForecast{
    width: 100%;
    border-radius: 22px;
    background-color:#3A5CB3;
    padding: 15px;
}
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