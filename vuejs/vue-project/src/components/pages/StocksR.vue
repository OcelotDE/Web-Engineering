<template>
  <!--<Line
      id="my-chart-id"
      :data="openDataSet"
  />-->
</template>

<script>
import {Line} from 'vue-chartjs'

export default {
  name: "StocksR",
  components: {
    Line
  },
  mounted() {
    this.addStock()
  },
  data() {
    return {
      openDataSet: []
    }
  },
  methods: {
    addStock: async function () {
      const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=GOOGL&apikey=" + import.meta.env.VITE_ALPHAVANTAGE_KEY)
      console.log(response);
      const json = await response.json();

      console.log("ad");

      console.log(json["Monthly Time Series"]["1. open"]);

      (json["Monthly Time Series"]).forEach((item) => {
        console.log(item)
      })
    }
  }
}
</script>

<style scoped>

</style>