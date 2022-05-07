import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueDebounce from "vue-debounce";


// UI Components
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputSwitch from "primevue/inputswitch";
import ProgressSpinner from 'primevue/progressspinner';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "./../public/css/style.css"

const app = createApp(App);
app.use(store).use(router).use(PrimeVue).use(vueDebounce).mount("#app");

app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("InputSwitch", InputSwitch);
app.component("ProgressSpinner", ProgressSpinner);

