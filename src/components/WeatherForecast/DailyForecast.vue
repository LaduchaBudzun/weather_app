<template>
  <div class="daily_forecast">
        
        <div class="item_day" v-for="day in dailyWeather" :key="day.id">
            <div class="day">
                <div class="date">{{day.date.month}} {{day.date.day}} th</div>
                 <div class="day_of_week">{{day.date.weekday}}</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
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
export default {
    name:'DailyForecast',
    date(){
        return{

        }
    },
    computed:{
        ...mapGetters(['dailyWeather'])
    },
    mounted(){
        this.getDailyForecast()
    },
    methods:{
        ...mapActions(['getDailyForecast'])
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
    margin-left: 10px;
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