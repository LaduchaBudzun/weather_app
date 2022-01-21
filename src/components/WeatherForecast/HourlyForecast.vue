<template>
  <div class="hourly_forecast">
          <div class="item">
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">+28°</div>
          </div>
          <div class="item">
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">+28°</div>
          </div>
          <div class="item">
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">+28°</div>
          </div>
          <div class="item">
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">+28°</div>
          </div>
          <div class="item">
              <span class="time">Now</span>
              <img src="@/../public/img/hourly_sun.svg" alt="">
              <div class="weather_degrees">+28°</div>
          </div>

      </div>
</template>

<script>
export default {
    name:"HourlyForecast"

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
}

.hourly_forecast{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>