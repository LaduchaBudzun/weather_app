<template>
  <div class="Location">
    <div v-if="!citiesLoader" class="wrapper_search">
      <div class="search">
        <router-link to="/settings"
          ><i class="pi pi-arrow-left"></i
        ></router-link>
        <span class="p-input-icon-right">
          <!-- <i class="pi pi-search" /> -->
          <i
            class="pi pi-times"
            v-if="valueInputSearch.length > 0"
            @click="eraseSearch"
          />

          <InputText
            v-model="valueInputSearch"
            type="text"
            placeholder="Search"
          />
        </span>
      </div>
      <div class="content">
        <div
          class="item"
          v-for="city in filteredCities"
          :key="city.id"
          @click="btnUpdateLocation(city)"
        >
          <span class="matchingPart">{{ city.matchingPart }}</span>
          <span>{{ city.restOfWord }}</span> ,
          <span>{{ city.country }}</span>
        </div>
      </div>
    </div>

    <div v-else class="loader">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    name:'Location',
    data(){
        return{
        }
    },
    computed:{
        ...mapGetters(['filteredCities']),

        valueInputSearch: {
            get () {
            return this.$store.state.weather.valueInputSearch
            },
            set (value) {
            this.$store.commit('updateValueInputSearch', value)
            this.cityInput()
            }
        }

    },
    mounted(){
      
    },
    methods:{
        ...mapActions(['cityInput']),
        ...mapMutations(['updateValueInputSearch','eraseSearch','updateLocation']),
        btnUpdateLocation(city){
            this.updateLocation(city)
            this.$router.push({path:"/settings"})
        }

    },
    unmounted(){
        this.eraseSearch()//стираем поиск
    }
}
</script>

<style scoped>
.matchingPart {
  font-weight: bold;
  color: #000000;
}
.content {
  padding: 20px 25px;
  font-size: 18px;
}
.Location {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 10px;
}
.wrapper_search {
}
.search {
  display: flex;
  gap: 5px;
  align-items: center;
}
.pi {
  cursor: pointer;
}
.item {
  padding: 20px 0px;
  cursor: pointer;
  font-size: 16px;
}
</style>