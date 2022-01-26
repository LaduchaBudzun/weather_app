import { createStore } from "vuex";
import weather from "./modules/weather";
export default createStore({
  modules: {
    weather,
  },
});
