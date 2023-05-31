<template>
  <div class="chart">
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
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.vue";
import BarChart from "@/components/Charts/BarChart.vue";
import { nextTick } from "vue";

import { ApiClient, DefaultApi } from "finnhub";

export default {
  name: "StockC",
  props: ["symbol", "type", "resolution"],
  emits: ["errorOnFetch"],
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

      try {
        // Use finnhub as api, since it has a way higher limit of calls than alphavantage
        const api_key = ApiClient.instance.authentications["api_key"];
        api_key.apiKey = import.meta.env.VITE_FINNHUB_KEY;
        const finnhubClient = new DefaultApi();

        finnhubClient.stockCandles(
          this.symbol,
          this.resolution,
          0,
          Math.floor(Date.now() / 1000),
          (error, data, response) => {
            for (let item in data.t) {
              this.labelsSet.push(
                new Date(data.t[item] * 1000).toLocaleDateString("us-US")
              );
            }
            this.openDataSet = data.c;

            this.refresh();
          }
        );
      } catch (e) {
        let errorCode = "400";
        let errorMsg =
          "Error fetching stock data, please ensure a stable internet connection.";
        this.$emit("errorOnFetch", { errorCode, errorMsg });
      }
    },
    refresh: async function () {
      this.render = false;

      await nextTick();

      this.render = true;
    },
  },

  watch: {
    symbol: function () {
      this.addStock();
    },
    resolution: function () {
      this.addStock();
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
