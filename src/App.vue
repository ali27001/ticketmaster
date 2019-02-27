<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  import  Table from './componenst/view/Table'
  import  TableDetail from './componenst/view/TableDetail'

export default {
  name: 'app',
  components: {Table,TableDetail },

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
