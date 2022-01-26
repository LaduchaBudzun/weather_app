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
      }
      dispatch("citySearch");
    },

    async citySearch({ commit, getters }) {
      const citySearch = getters.valueInputSearch;
      const citySearchLength = citySearch.length;
      const cities = getters.allCities;
      let suitableСities = [];
      console.log(1);

      cities.forEach((city) => {
        const truncatedName = city.name.substr(0, citySearchLength);

        if (truncatedName == citySearch) {
          if (
            suitableСities.find(
              (c) => c.matchingPart == truncatedName && c.restOfWord == ""
            )
          ) {
            //проверка на неповторяемость города
            return;
          } else {
            suitableСities.push({
              matchingPart: truncatedName,
              restOfWord: city.name.substr(citySearchLength),
              fullname: city.name,
              country: city.country,
              coord: city.coord,
              id: city.id,
            });
          }
        }
      });
      console.log(suitableСities);
      commit("updateFilteredCities", suitableСities);
    },

    async getWeather({ commit, getters }) {
      const lat = getters.coordinates.lat;
      const lon = getters.coordinates.lon;

      let response = await fetch(
        //hourly - дни ,а daily - почасовое
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=a895f25c2e62d7285c97531d093701f7&units=metric`
      );

      const result = await response.json();

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

      commit("updateDailyForecast", result.daily);
    },
  },
  mutations: {
    //Search
    updateLocation(state, city) {
      state.settings.location.city = city.fullname;
      state.settings.location.country = city.country;
      state.settings.location.coord = city.coord;
    },
    eraseSearch(state) {
      state.valueInputSearch = "";
      state.filteredCities = [];
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
      state.dailyWeather.forEach((day) => {
        day.dailyForecast = Math.round(daily[day.id].temp.day);
        if (day.dailyForecast > 0) {
          day.dailyForecast = "+" + day.dailyForecast;
        }
        day.nightForecast = Math.round(daily[day.id].temp.night);
        if (day.nightForecast > 0) {
          day.nightForecast = "+" + day.nightForecast;
        }

        day.weather = daily[day.id].weather;

        let date = new Date(daily[day.id].dt * 1000);
        day.date.weekday = date.toLocaleString("en-US", { weekday: "long" });
        day.date.month = date.toLocaleString("en-US", { month: "short" });
        day.date.day = date.toLocaleString("en-US", { day: "numeric" });
      });
    },

    updateHourlyForecast(state, hourly) {
      state.hourlyWeather.forEach((hour) => {
        hour.degrees = Math.round(hourly[hour.id].temp);
        if (hour.degrees > 0) {
          hour.degrees = "+" + hour.degrees;
        }
        hour.weather = hourly[hour.id].weather;

        let date = new Date(hourly[hour.id].dt * 1000);
        hour.time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
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
    closingSettingsPage(state) {
      //при закрытии страницы настроек settings = selectedSettings
      state.settings.degrees = state.selectedSettings.degrees;
      state.settings.windSpeed = state.selectedSettings.windSpeed;
      state.settings.pressure = state.selectedSettings.pressure;
      state.settings.location = state.selectedSettings.location;
    },
  },
  state: {
    valueInputSearch: "",
    allCities: [],
    filteredCities: [],
    timeNow: "",
    settings: {
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
      date: "",
      time: "",
    },
    hourlyWeather: [
      { id: 1, degrees: "", weather: {}, time: "" },
      { id: 2, degrees: "", weather: {}, time: "" },
      { id: 3, degrees: "", weather: {}, time: "" },
      { id: 4, degrees: "", weather: {}, time: "" },
    ],
    dailyWeather: [
      {
        id: 1,
        dailyForecast: "",
        nightForecast: "",
        date: { weekday: "", month: "", day: "" },
        weather: {},
      },
      {
        id: 2,
        dailyForecast: "",
        nightForecast: "",
        date: { weekday: "", month: "", day: "" },
        weather: {},
      },
      {
        id: 3,
        dailyForecast: "",
        nightForecast: "",
        date: { weekday: "", month: "", day: "" },
        weather: {},
      },
      {
        id: 4,
        dailyForecast: "",
        nightForecast: "",
        date: { weekday: "", month: "", day: "" },
        weather: {},
      },
      {
        id: 5,
        dailyForecast: "",
        nightForecast: "",
        date: { weekday: "", month: "", day: "" },
        weather: {},
      },
    ],
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
