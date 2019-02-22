<template>
<div class="table-detail">
  <div class="container">
    <h5> {{sonuc.name}}</h5>
    <div class="row">

        <img v-bind:src="sonuc.images[0].url" class="table-img" alt="...">
        <p>Locale :{{sonuc.locale}}</p>
    </div>
    <div class="row">
      <div class="col-md-4">
        <i>Presales</i>
        <p> Start Time: {{sonuc.sales.presales[0] && sonuc.sales.presales[0].startDateTime ? sonuc.sales.presales[0].startDateTime : ''  }}</p>
        <p> Finish Time: {{sonuc.sales.presales[0] && sonuc.sales.presales[0].endDateTime ? sonuc.sales.presales[0].endDateTime : ''  }}</p>
        <p> Name: {{sonuc.sales.presales[0].name}}</p>

      </div>
      <div class="col-md-4">
        <i>Dates</i>
        <p> Local Date: {{sonuc.dates.start.localDate}}</p>
        <p> Local Time: {{sonuc.dates.start.localTime}}</p>
      </div>
      <div class="col-md-4">
        <i>classifications</i>
        <ul v-for="sonucx in sonuc.classifications">
          <li>{{sonucx.segment.name}}</li>
          <li>{{sonucx.genre.name}}</li>
          <li>{{sonucx.subGenre.name}}</li>
        </ul>
      </div>
      <div class="col-md-4">
        <i>promoter</i>
        <p>{{sonuc.promoter.name}}</p>
      </div>
      <div class="col-md-4">
        <i>info</i>
        <p>{{sonuc.info}}</p>
      </div>
      <div class="col-md-4">
        <i>Price</i>
        <i  v-for ="pricex in sonuc.priceRanges">{{pricex.min}} - {{pricex.max}}$</i>
      </div>
      <div class="col-md-4">
        <i>accessibility</i>
        <img v-bind:src="sonuc.seatmap.staticUrl" class="table-img" alt="...">
      </div>

    </div>
    <ul>

    </ul>


  </div>
</div>
</template>

<script>
  import  axios from 'axios'
    export default {

      name: "TableDetail",
      data(){
        return {
          idx: this.$route.params.id ,
          sonuc:{},


        }
      },



      created(){

        var self = this;

// Make a request for a user with a given ID

        console.log(self.idx)
        axios.get(`https://app.ticketmaster.com/discovery/v2/events/${self.idx}?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&countryCode=US`)
          .then(function (response) {
            self.sonuc = response.data;
            self.isLoading = false;
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
      }

    }

</script>

<style scoped>
.table-img{
  width: 500px;
  height: 300px;
  text-align: center;
}
</style>
