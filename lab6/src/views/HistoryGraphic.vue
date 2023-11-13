<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">История акций</h2>
    <Line v-if="isLoaded"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: "HistoryChart",
  components: { Line },
  data() {
    return {
      isLoaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#21922a',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    isLogged(){
      return this.$store.getters.IS_LOGGED;
    },
  },
  mounted() {
    if (!this.isLogged) {
      this.$router.push('/login');
    }
    axios.get('http://localhost:5000/stocks/history/' + this.$route.params.id)
      .then(res => {
        this.chartData.datasets[0].label = res.data.label;
        for (let i = res.data.stocks.length - 1; i >= 0; i--){
          this.chartData.labels.push(res.data.stocks[i].date);
          this.chartData.datasets[0].data.push(res.data.stocks[i].open);
        }
        this.isLoaded = true;
      })
      .catch(error => console.log(error));
  }
}
</script>

<style scoped>

</style>
