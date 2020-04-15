import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import jQuery from "jquery";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});

import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

import { VTable } from "vuetensils";
Vue.component("VTable", VTable);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import Swal from "sweetalert2";
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
window.Toast = Toast;

window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
import "./assets/app.scss";

Vue.config.productionTip = false;

let app = "";
fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
