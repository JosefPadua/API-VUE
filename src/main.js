import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
