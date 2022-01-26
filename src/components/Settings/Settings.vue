<template>
  <div class="app_wrapper">
      <div class="settings">
          <div class="title">
              <span>Settings</span>
              <router-link to="/" @click="updateSettingsPage">
                  <img class="close" src="@/../public/img/Close.svg" alt="">
              </router-link>
          </div>
          <div class="location">
              <div class="title_location"><span>Location selection</span></div>
              <div class="current">
                  <span>Current Location</span>
                  <div @click="locationModal = true" class="current_location">
                      <span>{{settingsLocation.city}}</span> ,
                      <span>{{settingsLocation.country}}</span>

                  </div>
                  </div>
          </div>
          <div class="units">
              <div class="title_location"><span>Measure Units</span></div>
              <div class="units-selections">
                  <div class="unit">
                      <span>Temperature</span>
                      <label class="checkbox-green">
                        <input type="checkbox" v-model="degrees"  false-value="C" true-value="F" >
                        <span class="checkbox-green-switch" data-label-off="C°" data-label-on="F°" ></span>
                     </label>
                  </div>
                  <div class="unit">
                      <span>Wind Speed</span>
                      <label class="checkbox-green">
                        <input type="checkbox" v-model="windSpeed" false-value="m/s" true-value="mph" >
                        <span class="checkbox-switch-lowercase" data-label-off="m/s" data-label-on="mph" ></span>
                     </label>
                  </div>
                  <div class="unit">
                      <span>Pressure</span>
                      <label class="checkbox-green">
                        <input type="checkbox" v-model="pressure" false-value="hPa" true-value="mmHg" >
                        <span class="checkbox-switch-lowercase" data-label-off="hPa" data-label-on="mmHg" ></span>
                     </label>
                  </div>
              </div>
          </div>
          <div class="btn-cont"><Button label="Apply Settings" class="btn_apply" :loading="fasle" @click="btnApplyingSettings"/></div>

           <Dialog v-model:visible="locationModal" header="Change Location?"  modal="true" >
                <template #header showHeader="false">

                </template>

                    <div class="modal_content">
                        <Button label="Use My Current Location"  class="p-button-outlined btn-loc" @click="btnMyLocation" />
                        <router-link to="/settings/location" class="btn-link"><Button label="Select location manually"  class="p-button-outlined btn-loc" /></router-link>
                    </div>

                <template #footer >
                    <Button label="Cancel"  class="p-button p-component p-button-danger p-button-text" @click="locationModal = false"/>
                </template>
            </Dialog>

      </div>
  </div>
</template>

<script>
import {  mapActions, mapGetters, mapMutations} from 'vuex'
export default {
    name: "Settings",
    data(){
        return{
            locationModal:false,


        }
    },
    beforeCreate: function() {
        document.body.className = 'settings';
    },
    computed:{
        ...mapGetters(['settingsLocation']),
        degrees: {
            get () {
            return this.$store.state.weather.settings.degrees
            },
            set (value) {
            this.$store.commit('updateDegrees', value)
            }
        },
        windSpeed: {
            get () {
            return this.$store.state.weather.settings.windSpeed
            },
            set (value) {
            this.$store.commit('updateWindSpeed', value)
            }
        },
        pressure: {
            get () {
            return this.$store.state.weather.settings.pressure
            },
            set (value) {
            this.$store.commit('updatePressure', value)
            }
        },

    },
   
    methods:{
        ...mapActions(['applyingSettingsAction']),
        ...mapMutations(['updateSettingsPage','myLocation']),
        btnApplyingSettings(){
            this.applyingSettingsAction()
            this.$router.push({ path: "/" });
        },
        btnMyLocation(){
            this.myLocation()
            this.locationModal = false
        }

    },




}
</script>

<style>
.p-button-outlined{
    width: 100%;
}
.p-dialog-mask{
    background: rgba(0, 0, 0, 0.77) !important;
}
.p-dialog .p-dialog-header .p-dialog-header-icon{
    display: none;
}
.p-dialog .p-dialog-header{
    display: flex;
    justify-content: center;
}
.p-dialog .p-dialog-footer {
    display: flex;
    justify-content: center;
    color: #FF0C0C;

}
    

</style>


<style scoped>

.p-dialog-footer{
    display: flex;
    justify-content: center ;
}

.p-dialog{
    background:#000000;
}

.p-button-danger{
    font-size: 18px;
}
.btn-link{
    text-decoration: none;
    width: 100%;
}
.btn-loc{
    font-size: 18px;
}
.modal_content{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.p-dialog{
     background: rgba(0, 0, 0, 0.77);
}
/* .p-component-overlay-enter {
    animation: p-component-overlay-enter-animation 150ms forwards;
}
.p-component-overlay-enter{
   background: rgba(0, 0, 0, 0.77);
} */
.btn-cont{
    display: flex;
    justify-content: center;
}
.btn_apply{
    font-weight: 500;
    width: 93%;
    border-radius: 9px;
    font-size: 18px;
    height: 50px;
}
.unit{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0px;
    border-bottom: 1px solid #F2F2F2;
}
.unit span{
    font-size: 16px;
}
.units-selections{
    padding: 13px 15px;
}
.current_location{
    cursor: pointer;
    color:#2196F3;
    font-family: 'Roboto-700';
}
.current{
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 13px 15px;
}
.title_location{
     padding: 9px ;
    background-color:#ECEEF2;
    color: #A8ABB4;
    font-size: 14px;
}
.title_location span{
    padding: 0px 7px;
}
.title{
    display: flex;
    justify-content:space-between ;
    align-items: center;
    padding: 24px 10px;
}
.title span {
    font-size: 22px;
    font-family: "Roboto-700";
}
.close{
    width: 22px;
    height: 22px;
    cursor: pointer;
}
.settings{
    color: #000;
    max-width: 375px;
    min-width: 300px;
    width: 100%;
}
.app_wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
}

/* custom checkbox ---------*/
.checkbox-green {
	display: inline-block;    
	height: 32px;    
	line-height: 28px;  
	margin-right: 10px;      
	position: relative;
	vertical-align: middle;
	font-size: 16px;
	user-select: none;	
    background: #E6E6E6;
    color: #000000;
    border-radius: 23px;
    
}
.checkbox-green .checkbox-green-switch {
    /* C - disable */
	display: inline-block;	
	height: 32px;
	width: 116px;
	box-sizing: border-box;
	position: relative;	
	background: #E6E6E6;
    color: #000000;
    border-radius: 23px;
	transition: background-color 0.3s cubic-bezier(0, 1, 0.5, 1);
}
.checkbox-green .checkbox-green-switch:before {
    /* C - disable */
	content: attr(data-label-on);
	display: inline-block;
	box-sizing: border-box;		
	width: 52px;
	height: 32px;
	padding: 2px 6px 2px 12px;	
	position: absolute;
	left: 58px;	
	text-transform: uppercase;
	text-align: center;
	color: #000000;
	font-size: 16px;
	line-height: 28px;
    border-radius: 23px;
}
.checkbox-green .checkbox-green-switch:after {
    /* F */
	content: attr(data-label-off);
	display: inline-block;
	box-sizing: border-box;	
	width: 52px;	
	border-radius: 1px;	
	position: absolute;
	top: 2px;
	left: 2px;	
	z-index: 5;
	text-transform: uppercase;
	text-align: center;
	background: #2196F3;
    border-radius: 23px;
	line-height: 28px;
	font-size: 16px;
    color:#fff;	
	transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1);
}
.checkbox-green input[type="checkbox"] {
	display: block;	
	width: 0;
	height: 0;	
	position: absolute;
	z-index: -1;
	opacity: 0;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-green-switch {
	background-color: #E6E6E6;
    color:#000000;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-green-switch:before {
	content: attr(data-label-off);
	background: #E6E6E6;
    color: #000000;
	left: 0;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-green-switch:after {
	content: attr(data-label-on);
	background-color: #2196F3;
    color:#fff;
	transform: translate3d(60px, 0, 0);
    border-radius: 23px;
}
 
/* Hover */
.checkbox-green input[type="checkbox"]:not(:disabled) + .checkbox-green-switch:hover {
	cursor: pointer;
}
.checkbox-green input[type="checkbox"]:not(:disabled) + .checkbox-green-switch:hover:after {
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}
 
/* Disabled */
.checkbox-green input[type=checkbox]:disabled + .checkbox-green-switch {
	opacity: 0.6;   
	filter: grayscale(50%);
}
 
/* Focus */
.checkbox-green.focused .checkbox-green-switch:after {
	box-shadow: inset 0px 0px 4px #ff5623;
}

/* checkbox lowercase -------*/

.checkbox-green .checkbox-switch-lowercase {
    /* C - disable */
	display: inline-block;	
	height: 32px;
	width: 116px;
	box-sizing: border-box;
	position: relative;	
	background: #E6E6E6;
    color: #000000;
    border-radius: 23px;
	transition: background-color 0.3s cubic-bezier(0, 1, 0.5, 1);
}
.checkbox-green .checkbox-switch-lowercase:before {
    /* left - disable */
	content: attr(data-label-on);
	display: inline-block;
	box-sizing: border-box;		
	width: 52px;
	height: 32px;
	padding: 2px 2px 2px 2px;	
	position: absolute;
	left: 58px;	
	text-transform: uppercase;
	text-align: center;
	color: #000000;
	font-size: 16px;
	line-height: 28px;
    border-radius: 23px;
    text-transform:lowercase;

    
}
.checkbox-green .checkbox-switch-lowercase:after {
    /* rigth - disable */
	content: attr(data-label-off);
	display: inline-block;
	box-sizing: border-box;	
	width: 52px;	
	border-radius: 1px;	
	position: absolute;
	top: 2px;
	left: 2px;	
	z-index: 5;
	text-transform: uppercase;
	text-align: center;
	background: #2196F3;
    border-radius: 23px;
	line-height: 28px;
	font-size: 16px;
    color:#fff;	
	transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1);
    text-transform:lowercase;

}
.checkbox-green input[type="checkbox"] {
	display: block;	
	width: 0;
	height: 0;	
	position: absolute;
	z-index: -1;
	opacity: 0;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-switch-lowercase {
	background-color: #E6E6E6;
    color:#000000;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-switch-lowercase:before {
	content: attr(data-label-off);
	background: #E6E6E6;
    color: #000000;
	left: 0;
}
.checkbox-green input[type="checkbox"]:checked + .checkbox-switch-lowercase:after {
	content: attr(data-label-on);
	background-color: #2196F3;
    color:#fff;
	transform: translate3d(60px, 0, 0);
    border-radius: 23px;
}
 
/* Hover */
.checkbox-green input[type="checkbox"]:not(:disabled) + .checkbox-switch-lowercase:hover {
	cursor: pointer;
}
.checkbox-green input[type="checkbox"]:not(:disabled) + .checkbox-switch-lowercase:hover:after {
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}
 
/* Disabled */
.checkbox-green input[type=checkbox]:disabled + .checkbox-switch-lowercase {
	opacity: 0.6;   
	filter: grayscale(50%);
}
 
/* Focus */
.checkbox-green.focused .checkbox-switch-lowercase:after {
	box-shadow: inset 0px 0px 4px #ff5623;
}
</style>