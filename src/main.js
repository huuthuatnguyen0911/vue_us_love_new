import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { authService } from "@/services/authService";
import i18n from "@/plugins/i18n/i18n";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

/**
 * COMPONENTs
 */
import NotifiView from "@/components/base/NotifiView.vue";

/**
 * CUSTOM
 */
/* 
FORTAWEASOME CUSTOM
*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);
library.add(fab);

/**
 * CSS APP
 */

import "animate.css";

/**
 * CUSTOM AXIOS
 */
axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.baseURL = "https://api-love-us.herokuapp.com/api";
authService.initAuthHeader();

/**
 * SOCKET.IO
 */

const socketConnection = SocketIO("http://localhost:3000");
// const socketConnection = SocketIO("https://api-love-us.herokuapp.com/");

createApp(App)
  .component("fa", FontAwesomeIcon)
  .component("NotifiView", NotifiView)
  .use(store)
  .use(i18n)
  .use(router)
  .use(
    new VueSocketIO({
      debug: true,
      connection: socketConnection,
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  )
  .mount("#app");

import "bootstrap/dist/js/bootstrap.js";
