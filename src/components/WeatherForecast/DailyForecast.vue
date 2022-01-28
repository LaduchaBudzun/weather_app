<template>
  <div class="daily_forecast">
        
        <div class="item_day" v-for="day in dailyWeather" :key="day.id">
            <div class="day">
                <div class="date">{{day.date.month}} {{day.date.day}}{{numberEnding(day.date.day)}}</div>
                 <div class="day_of_week">{{day.date.weekday}}</div>
            </div>
            <div class="icon" v-if="day.icon == undefined" >
                <img class="icon_img"   alt="">
            </div> 
             <div class="icon"  v-if="day.icon == '50d' || day.icon == '50n'">
                <img class="icon_img" :src="require(`../../../public/icons/${day.icon}.png`)"  alt="">
            </div> 
            <div class="icon"  >
                <img class="icon_img" :src="require(`../../../public/icons/${day.icon}.svg`)"  alt="">
            </div> 

            <div class="degrees_day">
                <span class="day-time">{{day.dailyForecast}}°</span>
                <span class="night-time">{{day.nightForecast}}°</span>
            </div>
        </div>
        
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import functions from '../../mixins/functions'
export default {
    name:'DailyForecast',
     mixins:[functions],
    date(){
        return{
            path:'../../../public/icons/',
            svg:'svg',
            png:'png'

        }
    },
    computed:{
        ...mapGetters(['dailyWeather'])
    },
    mounted(){
        this.getDailyForecast()

    },
    methods:{
        ...mapActions(['getDailyForecast']),
        // displayIcons(){
        //     this.dailyWeather.
        // }
    }
}
</script>

<style scoped>
.day-time{
    color: #000000;
    margin-right: 6px;
}
.night-time{
    color:rgba(0, 0, 0, 0.28);
}
.degrees_day{
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
}
.icon_img{
    width: 44px;
    height: 44px;
}
.item_day{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 22px;
    padding: 15px 20px;
    background-color:#E9EEFA;
    width: 100%;
    position: relative;
}
.date{
    color:rgba(0, 0, 0, 0.28);
    font-size: 14px;
}
.day_of_week{
    margin-top: 3px;
    font-family: 'Roboto-700';
    font-size: 18px;
    color: #000000;
}
.daily_forecast{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>