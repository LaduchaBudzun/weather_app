import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Settings from "@/components/Settings/Settings";
import Location from "@/components/Settings/Location";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/settings/location",
    name: "Location",
    component: Location,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
