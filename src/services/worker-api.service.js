import store from '../store'
import importJSONWorker from 'worker-loader!./../workers/importJSON.worker.js'

const importWorker = new importJSONWorker()

export function workerCities(msg){
    importWorker.postMessage(msg)

    importWorker.onmessage = (msgCities) =>{
        store.commit('updateFilteredCities',msgCities.data)

    }

}







