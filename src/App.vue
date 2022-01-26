<template>
  <div id="app" >
  <router-view/>

  </div>
  
</template>
  <script>
import { mapActions, mapMutations } from 'vuex'
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
      }
    },
     mounted(){
        this.checkLocalStorage()
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

body.home{ 
    height: 100%; 
    background-color: #4974e2;
    /* фон всегда в body */
    /* динамическое изменение фона */
}
body.settings{ 
    height: 100%; 
    background-color: #ffffff;

}




#app{

  font-family: 'Roboto-regular';
  width: 100%;
}
@font-face {
  font-family: 'Roboto-regular';
  src: local('Roboto-regular'), local('Roboto-regular'),
    url('~@/assets/fonts/Roboto/roboto_regular.woff2') format('woff2'),
    url('~@/assets/fonts/Roboto/roboto_regular.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: 'Roboto-700';
  src: local('Roboto-700'), local('Roboto-700'),
    url('~@/assets/fonts/Roboto/roboto-700.woff2') format('woff2'),
    url('~@/assets/fonts/Roboto/roboto-700.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}
/* @media only screen and (max-width: 1000px) {   
html,body,
#app{ 
    height: auto; 
}
 } */
</style>
