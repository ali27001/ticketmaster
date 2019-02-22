import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import  Table from './componenst/Table.vue'
import  TableDetail from './componenst/TableDetail.vue'


Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

import VueRouter from 'vue-router'

Vue.use(VueRouter);
const router = new VueRouter({
  routes:[
    { path: '/', component: Table},
    { path: '/TableDetail/:id', component: TableDetail}
  ],
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
