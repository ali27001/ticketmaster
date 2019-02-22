<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  import  Table from './componenst/Table'
  import  TableDetail from './componenst/TableDetail'
  import  axios from 'axios'

export default {
  name: 'app',
  components: {TableDetail, Table },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',


    }
  },




}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
