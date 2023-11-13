<template>
  <div class="container bootstrap snippets bootdey">
    <div class="row">
      <div class="col-sm-10">
        <h1>Торги</h1>
      </div>
    </div>
    <div id="profile-content" class="row">
      <div class="col-sm-2">
        <img title="auction image" class="img-thumbnail" src="@/assets/logo.png">
      </div>
      <div class="col-sm-3">
        <ul class="list-group">
          <li class="list-group-item text-muted">Торги</li>
          <li class="list-group-item text-right"><span class="pull-left"><strong>Дата: </strong></span> {{getDate}}</li>
          <li class="list-group-item text-right"><span class="pull-left"><strong>Статус: </strong></span> {{getStatus}}</li>
        </ul>
      </div>
      <div class="col-sm-3">
        <ul class="list-group">
          <li class="list-group-item text-muted">Профиль брокера</li>
          <li class="list-group-item text-right"><span class="pull-left"><strong>ID: </strong></span> {{getID}}</li>
          <li class="list-group-item text-right"><span class="pull-left"><strong>Имя: </strong></span> {{getName}}</li>
          <li class="list-group-item text-right"><span class="pull-left"><strong>Баланс: </strong></span> {{parseFloat(getCash).toFixed(3)}}</li>
        </ul>
        <br>
      </div>

      <!--/col-3-->
      <hr>
      <div class="col-lg-12">

        <div class="tab-pane">
          <p v-if="errors.length"
             class="alert alert-danger">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
<!--           v-if="getStatus !== 'Завершены' " -->
          <table class="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>label</th>
              <th>name</th>
              <th>price</th>
              <th>Доход </th>
              <th>Количество</th>
              <th></th>
              <th><v-switch
                            v-model="switchModel"
                            true-value="Продать"
                            false-value="Купить"
                            :label="switchModel"></v-switch></th>
            </tr>
            </thead>
            <tbody id="items">
              <tr v-for="(stock, i) in this.getStocks">
                <td>{{i + 1}}</td>
                <td>{{stock.label}}</td>
                <td>{{stock.name}}</td>
                <td>{{stock.price}}</td>
                <td>{{getIncome(stock.id).toFixed(3)}}</td>
                <td>{{getCount(stock.id)}}</td>

                <td>
                  <v-btn class="v-btn bg-primary"
                           rounded="xl"
                           size="small"
                           v-on:click="historyHandler(stock.id)">история</v-btn>

                </td>

                <td class="row-cols-md-1">
                  <v-btn class="v-btn bg-cyan"
                         :id='`transaction-btn-${stock.id}`'
                         rounded="xl"
                         size="small"
                         v-on:click="transactionHandler(stock.id, stock.price, i)">{{switchModel}}</v-btn>
                </td>

                <td>
                  <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-minus"
                    @click="decrement(i)"
                  ></v-btn>
                </td>

                <td class="row-cols-md-1">
                  <v-slider
                    v-model="slider[i]"
                    class="align-center"
                    :max="max"
                    :min="min"
                    :step="1"
                    hide-details
                    style="width: 100px"
                  >
                    <template v-slot:append>
                      <span
                        class="text-h6 font-weight-light"
                        v-text="slider[i]"
                      ></span>
                    </template>
                  </v-slider>
                </td>
                <td class="row-cols-md-1">
                  <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-plus"
                    @click="increment(i)"
                  ></v-btn>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <!--/tab-pane-->
      </div>
      <!--/tab-content-->

    </div>
    <!--/col-9-->
  </div>
  <!--/row-->
</template>

<script>
import axios from "axios";


export default {
  name: "Auction",
  data: function() {
    return {
      stocks: [],
      portfolio: [],
      errors: [],
      min: 1,
      max: 10,
      slider: [1, 1, 1, 1, 1, 1, 1, 1],
      switchModel: 'Купить'
    };
  },
  computed: {
    isLogged(){
      return this.$store.getters.IS_LOGGED;
    },
    getName(){
      return this.$store.getters.NAME;
    },
    getCash(){
      return this.$store.getters.CASH;
    },
    getID(){
      return this.$store.getters.ID;
    },
    getDate(){
      return this.$store.getters.DATE;
    },
    getStatus(){
      return this.$store.getters.STATUS;
    },
    getStocks(){
      return this.$store.getters.STOCKS;
    },
  },
  async mounted() {
    console.log('mounted')
    if (!this.isLogged) {
      this.$router.push('/login');
    }
    await axios.get('http://localhost:5000/settings/')
      .then(res => {
        console.log(res.data);
        this.$store.dispatch('INIT_SETTINGS', res.data);
        console.log(this.getStatus);
      })
      .catch(error => {
        console.log(error);
      })

    this.portfolio = this.$store.getters.getPortfolio;
  },
  methods: {
    decrement (i) {
      if(this.slider[i] - 1 >= this.min) {
        this.slider[i]--;
      }
    },
    increment (i) {
      if(this.slider[i] + 1 <= this.max) {
        this.slider[i]++;
      }
    },
    historyHandler(id) {
      this.$router.push('/history/' + id);
    },
    transactionHandler(stockId, price, sliderId) {
      this.errors = [];

      if(this.getStatus === 'Завершены'){
        this.errors.push('Торги завершены')
        return;
      }

      const data = {
        brokerId: this.getID,
        stockId: stockId,
        price: price,
        count: this.slider[sliderId]
      }
      if(this.switchModel === 'Купить'){
        this.$store.dispatch('BUY_STOCK', {data})
          .then(() => {
            this.portfolio = this.$store.getters.getPortfolio;
          })
          .catch(error => {
            this.errors.push(error);
          })
      } else {
        this.$store.dispatch('SELL_STOCK', data)
          .then(() => {
            this.portfolio = this.$store.getters.getPortfolio;
          })
          .catch(error => {
            this.errors.push(error);
          })
      }

    },
    getCount(id){
      this.portfolio = this.$store.getters.getPortfolio;
      let stock = this.portfolio.find((item) => {
        return item.id === id;
      })
      return stock.count;
    },
    getIncome(id){
      return this.$store.getters.getIncome.find((item) => {
        return item.id === id;
      }).value;
    },
  }
}
</script>

<style scoped>

</style>
