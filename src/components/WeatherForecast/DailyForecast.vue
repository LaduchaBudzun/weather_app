<template>
  <div class="daily_forecast">
        <div class="item_day">
            <div class="day">
                <div class="date">Aug 15 th</div>
                 <div class="day_of_week">Mondey</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
            </div> 
            <div class="degrees_day">
                <span class="day-time">+ 26°</span>
                <span class="night-time">+ 21°</span>
            </div>
        </div>
        <div class="item_day">
            <div class="day">
                <div class="date">Aug 15 th</div>
                 <div class="day_of_week">Mondey</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
            </div> 
            <div class="degrees_day">
                <span class="day-time">+ 26°</span>
                <span class="night-time">+ 21°</span>
            </div>
        </div>
        <div class="item_day">
            <div class="day">
                <div class="date">Aug 15 th</div>
                 <div class="day_of_week">Mondey</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
            </div> 
            <div class="degrees_day">
                <span class="day-time">+ 26°</span>
                <span class="night-time">+ 21°</span>
            </div>
        </div>
        <div class="item_day">
            <div class="day">
                <div class="date">Aug 15 th</div>
                 <div class="day_of_week">Mondey</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
            </div> 
            <div class="degrees_day">
                <span class="day-time">+ 26°</span>
                <span class="night-time">+ 21°</span>
            </div>
        </div>
        <div class="item_day">
            <div class="day">
                <div class="date">Aug 15 th</div>
                 <div class="day_of_week">Mondey</div>
            </div>
            <div class="icon">
                <img class="icon_img" src="@/../public/img/Partly_Cloudy_Day.svg" alt="">
            </div> 
            <div class="degrees_day">
                <span class="day-time">+ 26°</span>
                <span class="night-time">+ 21°</span>
            </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.day-time{
    color: #000000;
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