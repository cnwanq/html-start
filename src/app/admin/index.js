
import "@fortawesome/fontawesome-free"
// import "../sass/index.scss"

import Vue from "vue"
import App from "./App.vue"
import router from "./router";
console.log("admin js")

new Vue({
  el: "#app",
  router,
  render: h => h(App),
})

