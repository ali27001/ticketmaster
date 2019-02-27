import Vue from 'vue'
import  Table from '../componenst/view/Table.vue'
import  TableDetail from '../componenst/view/TableDetail.vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    { path: '/',
      component: Table
    },
    { path: '/TableDetail/:id',
      component: TableDetail
    },
  ],
  mode: 'history'
});

export default router

