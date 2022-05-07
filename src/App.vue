<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

import { mapActions, mapMutations } from 'vuex'

import { workerCities } from './services/worker-api.service.js'
export default {
    name: "App",
    data(){
      return{

      }
    },

    methods:{
      ...mapActions(['saveSettings']),...mapMutations(['updateSelectedSettings','updateSettingsPage']),

      checkLocalStorage(){
       if(localStorage.degrees) {
         let savedSettings = {}
         savedSettings.degrees = localStorage.degrees
         savedSettings.windSpeed = localStorage.windSpeed
         savedSettings.pressure = localStorage.pressure
         savedSettings.location = JSON.parse(localStorage.location)

          this.updateSelectedSettings(savedSettings)
          this.updateSettingsPage()
       }
      },
    },
     async mounted(){
        this.checkLocalStorage()
        workerCities({action:'import'})
    },
     onmounted(){
        this.saveSettings()
    }

  }
  </script>
<style >
body {
  margin: 0px;
  height: 100%;
}

body.home {
  height: 100%;
  background-color: #4974e2;
  /* фон всегда в body */
  /* динамическое изменение фона */
}
body.settings {
  height: 100%;
  background-color: #ffffff;
}

#app {
  font-family: "Roboto-regular";
  width: 100%;
}
</style>
