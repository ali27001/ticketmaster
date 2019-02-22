<template>

 <div class="table">
   <p class="text-center" v-if="isLoading">Loading</p>
 {{sonuc.name}}
<div class="container">
  <table class="table" >
    <thead>
    <tr>
      <th scope="col">image</th>
      <th scope="col">name</th>
      <th scope="col">date</th>
      <th scope="col">price ranges</th>
      <th scope="col">venues</th>
      <th scope="col">location</th>
      <th scope="col">Detail</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(event,index) in sonuc">

      <td>  <img :src="event.images[0].url" class="table-img" alt="..."></td>
      <td>{{event.name}} </td>
      <td>{{event.dates.start.localDate}} = {{event.dates.start.localTime}}</td>
      <td ><i  v-for ="pricex in event.priceRanges">{{pricex.min}} - {{pricex.max}}$</i> </td>
      <td>{{event._embedded.venues[0].name}} </td>
      <td> {{event._embedded.venues[0].city.name}} - {{event._embedded.venues[0].country.countryCode}}.</td>
      <td>
        <router-link :to="'/TableDetail/'+event.id">detay </router-link>
      </td>

    </tr>

    </tbody>

  </table>
  <div class="clearfix btn-group col-md-2 offset-md-5">
    <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> << </button>
    <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
    <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
  </div>

</div>


 </div>
</template>

<script>
  import  axios from 'axios'

  export default {
    name: "Table",
    components: { },
     data(){
      return {
        isLoading: true,
        sonuc:[],
        page: 1,
        perPage: 5,
        pages: [],
      }
     },

    methods:{
      getPosts () {
        var self = this;
// Make a request for a user with a given ID
        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&countryCode=US')
          .then(function (response) {
            self.sonuc = response.data._embedded.events;
            self.isLoading = false
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      },

      setPages () {
        let numberOfPages = Math.ceil(this.sonuc.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },
      paginate (sonuc) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  sonuc.slice(from, to);
      },
    },

    computed: {
      displayedPosts () {
        return this.paginate(this.sonuc);
      }
    },
    watch: {
      sonuc () {
        this.setPages();
      }
    },
    created () {
      this.getPosts();
    }


  }
</script>

<style scoped>
  .table-img{
width: 30px;
    height: 30px;
  }
</style>
