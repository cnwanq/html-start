import "@fortawesome/fontawesome-free"
import "../sass/index.scss"
import "../images/logo/gocms-logo-white.png"
import Vue from "vue"

const api = require('../common/api')


console.log("app index")

new Vue({
  el: '#app',
  data: {
    user_email: "",
    is_disabled_notify: true,
  },
  methods: {
    notify_to_me: function () {
      console.log(this.user_email);
      this.is_disabled_notify = true;
    }
  },
  watch: {
    user_email: function (email) {
      this.user_email = email;
      if (email.length == 0) {
        this.is_disabled_notify = true;
      } else {
        this.is_disabled_notify = false;
      }
    }
  }
})