<template>
  <div class="table">
    <p class="text-center" v-if="isLoading">Loading</p>
    {{sonuc.name}}
    <div v-show="!isLoading" class="container">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Price Ranges</th>
          <th scope="col">Venues</th>
          <th scope="col">Location</th>
          <th scope="col">Detail</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(event,index) in sonuc">

          <td><img :src="event.images[0].url" class="table-img" alt="..."></td>
          <td>{{event.name}}</td>
          <td>{{event.dates.start.localDate}} = {{event.dates.start.localTime}}</td>
          <td><i v-for="pricex in event.priceRanges">{{pricex.min}} - {{pricex.max}}$</i></td>
          <td>{{event._embedded.venues[0].name}}</td>
          <td> {{event._embedded.venues[0].city.name}} - {{event._embedded.venues[0].country.countryCode}}.
          </td>
          <td>
            <router-link :to="'/TableDetail/'+event.id">detay</router-link>
          </td>

        </tr>

        </tbody>

      </table>
      <div class="clearfix btn-group col-md-2 offset-md-5">
        <pagination type="default" :page-count="totalElements" v-model="page" class="all-data-pagination"/>
      </div>

    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import Pagination from './Pagination.vue'

  export default {
    name: "Table",
    components: {
      Pagination
    },
    data() {
      return {
        isLoading: true,
        sonuc: [],
        page: 1,
        totalElements: 0,
      }
    },

    methods: {
      getPosts() {
        this.isLoading = true;
        var self = this;
        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&countryCode=US&page=' + self.page)
          .then(function (response) {
            self.isLoading = false;
            self.sonuc = response.data._embedded.events;
            self.totalElements = response.data.page.totalElements;
            self.page = response.data.page.number;
            self.isLoading = false
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            self.isLoading = false;
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      },
    },
    watch: {
      page: function (val, oldVal) {
        this.getPosts()
      }
    },
    created() {
      this.getPosts();
    }

  }
</script>

<style scoped>
  .table-img {
    width: 30px;
    height: 30px;
  }
  .loading {
    background-color: rgb(255, 176, 0);
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 25%;
    right: 25%;
    width: 0%;
    height: 5px;
    transition: opacity 0.6s ease 0s;
  }
</style>
