<template>
  <div class="WeatherForecast">
        <HourlyForecast/>
        <DailyForecast/>
      
      
  </div>
</template>

<script >
import HourlyForecast from "./HourlyForecast.vue"
import DailyForecast from "./DailyForecast.vue"
export default {
    name: "WeatherForecast",
    components:{
        HourlyForecast,
        DailyForecast
    }

}
</script>

<style scoped>
.WeatherForecast{
    width: 100%;
    border-radius: 22px;
    background-color:#3A5CB3;
    padding: 15px;
}

</style>