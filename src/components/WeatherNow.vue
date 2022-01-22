<template>
  <div class="weather_now">
      <div class="degrees">28 С <img src="../../public/img/Sun.svg" alt=""></div>
        <div class="comment">Very Sunny</div>
        <div class="weather_indicators">
            <div class="wind">
                <img src="../../public/img/Wind.svg" alt="">
                <span class="init">2.1m.e, E</span>
                <div class="compas"></div>
            </div>
            <div class="humidity">
                <img src="../../public/img/humidity.svg" alt="">
                <span>87 <span class="init">%</span></span>
            </div>
            <div class="atmosphere_pressure">
                <img src="../../public/img/atmosphere_pressure.svg" alt="">
                <p>1012 <span class="init">hPa</span></p>
            </div>
        </div>

  </div>
</template>

<script>
export default {
    name:"WeatherNow",
    data(){
        return{

        }
        
    }
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
    justify-content: center;
    align-items: center;
    gap: 35px;
}
.humidity {
    display: flex;
    justify-content: center;
    align-items: center;
}
.humidity span{
    margin-left: 5px;
}
.wind {
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