import "@fortawesome/fontawesome-free"
import "../sass/login.scss"
import Vue from "vue"

const api = require('../common/api')

console.log("login app");


new Vue({
  el: '#app',
  data: {
    username: "",
    password: "",
    remember_pwd: false,
  },
  methods: {
    login_handle: function () {
      console.log(this.username + ":" + this.password + ":" + this.remember_pwd);
    },
  }
})