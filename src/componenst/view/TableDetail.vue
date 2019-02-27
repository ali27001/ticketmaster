<template>
<div class="table-detail">
  <div class="container">
    <div class="row pt-4">
      <div class="col-md-6">
        <div class="img-div">
          <img v-bind:src="sonuc.images[0].url" class="table-img" alt="...">
       </div>
        </div>
        <div class="col-md-6">
          <div class="title">
                 <h5> {{sonuc.name}}</h5>
               <p class="price">
                 <i>Price</i>
                 <i  v-for ="pricex in sonuc.priceRanges">{{pricex.min}} - {{pricex.max}}$</i>
               </p>
               <p class="locale">Locale :{{sonuc.locale}}</p>

             </div>
        </div>
    </div>

    <div class="row">
      <div class="detail-bottom">
        <h2>Details</h2>
        <div class="details row">
          <div class="card">
            <b>Classifications</b>
            <ul v-for="sonucx in sonuc.classifications">
              <li>{{sonucx.segment.name}}</li>
              <li>{{sonucx.genre.name}}</li>
              <li>{{sonucx.subGenre.name}}</li>
            </ul>
          </div>
          <div class="card">
            <b>Accessibility</b>
            <img v-bind:src="sonuc.seatmap.staticUrl" class="table-img" alt="...">
          </div>
          <div class="card">
               <b>Dates</b>
               <p> Local Date: {{sonuc.dates.start.localDate}}</p>
               <p> Local Time: {{sonuc.dates.start.localTime}}</p>
               <p> Date Time: {{sonuc.dates.start.dateTime}}</p>
          </div>

           <div v-if="sonuc.promoter" class="card">
             <b>Promoter</b>
              <p>{{sonuc.promoter.name}}</p>
           </div>
           <div class="card">
              <b>Info</b>
              <p  v-if="sonuc.info">{{sonuc.info}}</p>
              <p  v-else>Açıklama Bilgisi <Bulunmuyor></Bulunmuyor></p>
            </div>
          <div class="card">
            <b>Sales</b>
            <i>Public</i>
            <span class="presales">
              <p> Start Time:  {{sonuc.sales.public.startDateTime}} </p>
              <p> End Time:  {{sonuc.sales.public.endDateTime}} </p>
           </span>
            <i>presales</i>
            <span class="presales"  v-for=" sonucx in sonuc.sales.presales">
                   <p>Start Time: {{sonucx.startDateTime}} </p>
                    <p>End Time: {{sonucx.endDateTime}} </p>
                   <p>Name: {{sonucx.name}} </p>
                 </span>
         </div>
        </div>
      </div>
      </div>
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
         sonuc:{
           dates:{
             start: {
               "localDate": "",
               "localTime": "",
               "dateTime": "",
             },
           },
           sales:{
                                                     public: {
                                                       "localDate": "",
                                                       "localTime": "",
                                                       "dateTime": "",
                                                     },
                                                     presales:[],

                                                   },
           seatmap:{
                                                     "staticUrl":"",
                                                   },
           images:[
             {
               "url": "",
             }
           ],
         },
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
  .table-detail{
    background: #f9f7f7;
  }
  .table-img{
    width: 100%;
    text-align: center;
  }
  .details .card{
    width: 48%;
    padding: 35px;
    margin: 5px;
  }
  .title{
    margin-top: 90px;
  }
  .detail-bottom{
    margin-top: 20px;
  }
  .presales{
    border: 1px solid #757575;
    margin-bottom: 10px;
    border-radius: 13px;
    padding: 9px;
  }
  .title h5{
    background: #1487e2;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
  }
  .price{
    background: #4CAF50;
    width: 35%;
    color: #fff;
  }
  .locale{
    background: #404040;
    color: #fff;
    width: 35%;
  }
</style>
