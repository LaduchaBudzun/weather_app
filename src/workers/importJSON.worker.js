import { debounce } from "vue-debounce";


let allCities

self.onmessage = async function(e) {
    console.log('onmessage in Worker')

    if(e.data.action === 'import'){
        let module = require("../assets/json/city.list.json")
        const allCitiesJSON = JSON.stringify(module)
        allCities = JSON.parse(allCitiesJSON)
   
    }else if(e.data.action === 'filter'){
       citySearch(e.data.word)

    }
    
    
}// выделить второй воркер для фильтрации

async function citySearch(word) {
      const citySearch = word;
      const citySearchLength = citySearch.length;
      const cities = allCities;
      let suitableСities = [];

      const returnedFunction = debounce(async () => {
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
        console.log(suitableСities)
        self.postMessage(suitableСities)
        return suitableСities
      }, "800ms"); //более менее оптимизированно
      returnedFunction();
    }





// import * as Comlink from 'comlink'
// const fns = {
//     async importJSON(){
//     let module = await import("../assets/json/city.list.json")
//     const allCitiesJSON = JSON.stringify(module)
//     const allCities = JSON.parse(allCitiesJSON)
//     return allCities
//     }
// }
// Comlink.expose(fns)

