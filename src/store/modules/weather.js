import { debounce } from "vue-debounce";

export default {
  actions: {
    getJsonFile({ commit }) {
      const currentJsonFile = require("../../assets/json/city.list.json"); //правильная загрузка json файла
      commit("updateAllCities", currentJsonFile);
    },

    cityInput({ commit, dispatch, getters }) {
      const word = getters.valueInputSearch;

      if (word.length < 3) {
        commit("updateFilteredCities", []);
        return;
      } else {
        dispatch("citySearch");
      }
    },

    async citySearch({ commit, getters }) {
      const citySearch = getters.valueInputSearch;
      const citySearchLength = citySearch.length;
      const cities = getters.allCities;
      let suitableСities = [];

      const returnedFunction = debounce(() => {
        cities.forEach((city) => {
          const truncatedName = city.name.substr(0, citySearchLength);

          if (truncatedName.toLowerCase() == citySearch.toLowerCase()) {
            //   //проверка на неповторяемость города
            //   if (
            //     suitableСities.find(
            //       (c) => c.matchingPart == truncatedName && c.restOfWord == ""
            //     )
            //   ) {
            //     return;
            //   } else {}
            suitableСities.push({
              matchingPart: truncatedName,
              restOfWord: city.name.substr(citySearchLength),
              fullname: city.name,
              country: city.country,
              coord: city.coord,
              id: city.id,
            });
          }
        });
        console.log(suitableСities);
        commit("updateFilteredCities", suitableСities);
      }, "500ms"); //более менее оптимизированно
      returnedFunction();
    },

    async getWeather({ commit, getters }) {
      const lat = getters.coordinates.lat;
      const lon = getters.coordinates.lon;
      console.log("lat:" + lat);
      console.log("lon:" + lon);

      let response = await fetch(
        //hourly - дни ,а daily - почасовое
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=a895f25c2e62d7285c97531d093701f7&units=metric`
      );

      const result = await response.json();
      console.log(result.current.dt);
      console.log(result.timezone_offset);
      console.log(
        new Date((result.current.dt + result.timezone_offset) * 1000)
      );

      commit("updateTimeNow", result.current.dt);
      commit("updateCurrentWeather", result.current);
      commit("updateHourlyForecast", result.hourly);
    },

    async getDailyForecast({ commit, getters }) {
      const lat = getters.coordinates.lat;
      const lon = getters.coordinates.lon;

      let response = await fetch(
        //hourly - дни ,а daily - почасовое
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=a895f25c2e62d7285c97531d093701f7&units=metric`
      );

      const result = await response.json();
      console.log(result.daily);

      commit("updateDailyForecast", result.daily);
    },
    applyingSettingsAction({ commit }) {
      commit("applyingSettings");
      commit("saveSettings");
    },
  },
  mutations: {
    // Geolocation
    myLocation(state) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude, position.coords.longitude);

        state.selectedSettings.location.coord.lat = position.coords.latitude;
        state.selectedSettings.location.coord.lon = position.coords.longitude;
        state.selectedSettings.location.city = "My location";
        state.selectedSettings.location.country = "";

        state.settings.location = state.selectedSettings.location;
      });
    },
    //Search
    updateLocation(state, city) {
      state.settings.location.city = city.fullname;
      state.settings.location.country = city.country;
      state.settings.location.coord = city.coord;
    },
    eraseSearch(state) {
      state.valueInputSearch = "";
      state.filteredCities = [];
    },
    deleteAllCities(state) {
      state.allCities = [];
    },
    updateValueInputSearch(state, value) {
      state.valueInputSearch = value;
    },

    updateFilteredCities(state, filteredCities) {
      state.filteredCities = filteredCities;
    },
    updateAllCities(state, allCities) {
      console.log(allCities);
      state.allCities = allCities;
    },
    //---weather and time
    updateDailyForecast(state, daily) {
      state.dailyWeather = daily.slice(1, 6).map((day, index) => {
        console.log(day);
        day.id = index;
        day.dailyForecast = Math.round(day.temp.day);
        if (day.dailyForecast > 0) {
          day.dailyForecast = "+" + day.dailyForecast;
        }
        day.nightForecast = Math.round(day.temp.night);
        if (day.nightForecast > 0) {
          day.nightForecast = "+" + day.nightForecast;
        }

        day.weather = day.weather[0];
        day.icon = day.weather.icon;
        console.log(day.icon);
        let date = new Date(day.dt * 1000);
        day.date = {};
        day.date.weekday = date.toLocaleString("en-US", { weekday: "long" });
        day.date.month = date.toLocaleString("en-US", { month: "short" });
        day.date.day = date.toLocaleString("en-US", { day: "numeric" });
        return day;
      });
    },

    updateHourlyForecast(state, hourly) {
      state.hourlyWeather = hourly.slice(1, 5).map((hour, index) => {
        hour.id = index;
        hour.degrees = Math.round(hour.temp);
        if (hour.degrees > 0) {
          hour.degrees = "+" + hour.degrees;
        }
        hour.weather = hour.weather[0];

        let date = new Date(hour.dt * 1000);
        hour.time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return hour;
      });
    },

    updateTimeNow(state, dateUnix) {
      state.timeNow = new Date(dateUnix * 1000);
    },

    updateCurrentWeather(state, current) {
      state.currentWeather.degrees = Math.round(current.temp);
      if (state.currentWeather.degrees > 0) {
        state.currentWeather.degrees = "+" + state.currentWeather.degrees;
      }

      state.currentWeather.windSpeed = current.wind_speed;
      state.currentWeather.airHumidity = current.humidity;
      state.currentWeather.pressure = current.pressure;
      state.currentWeather.weather = current.weather[0];
    },

    //---settings---
    updateDegrees(state, degrees) {
      state.settings.degrees = degrees;
    },
    updateWindSpeed(state, windSpeed) {
      state.settings.windSpeed = windSpeed;
    },
    updatePressure(state, pressure) {
      state.settings.pressure = pressure;
    },
    applyingSettings(state) {
      //копирование объектов!
      state.selectedSettings.degrees = state.settings.degrees;
      state.selectedSettings.windSpeed = state.settings.windSpeed;
      state.selectedSettings.pressure = state.settings.pressure;
      state.selectedSettings.location = state.settings.location;
    },
    updateSettingsPage(state) {
      //при закрытии страницы настроек settings = selectedSettings
      state.settings.degrees = state.selectedSettings.degrees;
      state.settings.windSpeed = state.selectedSettings.windSpeed;
      state.settings.pressure = state.selectedSettings.pressure;
      state.settings.location = state.selectedSettings.location;
    },
    updateSelectedSettings(state, savedSettings) {
      state.selectedSettings.degrees = savedSettings.degrees;
      state.selectedSettings.windSpeed = savedSettings.windSpeed;
      state.selectedSettings.pressure = savedSettings.pressure;
      state.selectedSettings.location = savedSettings.location;
    },
    //LocalStorage
    saveSettings(state) {
      localStorage.location = JSON.stringify(state.selectedSettings.location);
      localStorage.degrees = state.selectedSettings.degrees;
      localStorage.windSpeed = state.selectedSettings.windSpeed;
      localStorage.pressure = state.selectedSettings.pressure;
    },
  },
  state: {
    valueInputSearch: "",
    allCities: [],
    filteredCities: [],
    timeNow: "",
    settings: {
      location: {
        city: "",
        country: "",
        coord: {
          lat: "",
          lon: "",
        },
      },
      degrees: "",
      windSpeed: "",
      pressure: "",
    },

    selectedSettings: {
      location: {
        city: "Atlanta",
        country: "US",
        coord: {
          lat: "33.753746",
          lon: "-84.386330",
        },
      },
      degrees: "C",
      windSpeed: "m/s",
      pressure: "hPa",
    },

    currentWeather: {
      degrees: "20",
      windSpeed: "2.1",
      pressure: "1012",
      airHumidity: "87",
      weather: {},
    },
    hourlyWeather: [],
    dailyWeather: [],
  },
  getters: {
    currentWeather(state) {
      return state.currentWeather;
    },
    selectedSettings(state) {
      return state.selectedSettings;
    },
    hourlyWeather(state) {
      return state.hourlyWeather;
    },
    dailyWeather(state) {
      return state.dailyWeather;
    },
    timeNow(state) {
      return state.timeNow;
    },
    allCities(state) {
      return state.allCities;
    },
    filteredCities(state) {
      return state.filteredCities;
    },
    valueInputSearch(state) {
      return state.valueInputSearch;
    },
    settingsLocation(state) {
      return state.settings.location;
    },
    location(state) {
      return state.selectedSettings.location;
    },
    coordinates(state) {
      return state.selectedSettings.location.coord;
    },
  },
};
