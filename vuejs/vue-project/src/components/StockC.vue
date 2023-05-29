<template>
  <BarChart
    v-if="render && type === 'bar'"
    :values-set="openDataSet"
    :labels-set="labelsSet"
    :title="symbol"
  />
  <LineChart
    v-if="render && type === 'line'"
    :values-set="openDataSet"
    :labels-set="labelsSet"
    :title="symbol"
  />
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import { nextTick } from "vue";

export default {
  name: "StockC",
  props: ["symbol", "type"],
  components: {
    LineChart,
    BarChart,
  },
  mounted() {
    this.addStock();
  },
  data() {
    return {
      render: true,
    };
  },
  setup() {
    const openDataSet = [];
    const labelsSet = [];

    return {
      openDataSet,
      labelsSet,
    };
  },
  methods: {
    addStock: async function () {
      this.openDataSet = [];
      this.labelsSet = [];
      const response = await fetch(
        "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
          this.symbol +
          "&apikey=" +
          import.meta.env.VITE_ALPHAVANTAGE_KEY
      );
      const json = await response.json();

      const monthly = json["Monthly Time Series"];

      for (let item in monthly) {
        if (item) {
          this.openDataSet.push(parseInt(monthly[item]["1. open"]));
          this.labelsSet.push(item);
        }
      }
      console.log(this.openDataSet);
      console.log(this.labelsSet);

      this.render = false;

      await nextTick();

      this.render = true;
    },
  },

  watch: {
    symbol: function () {
      this.addStock();
    },
  },
};
</script>

<style scoped></style>
