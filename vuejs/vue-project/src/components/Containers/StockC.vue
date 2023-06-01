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

      if (this.symbol === "") return;

      try {
        let response = await fetch(
          "https://finnhub.io/api/v1/stock/candle?" +
            "symbol=" +
            this.symbol +
            "&resolution=" +
            this.resolution +
            "&from=0" +
            "&to=" +
            Math.floor(Date.now() / 1000) +
            "&token=" +
            import.meta.env.VITE_FINNHUB_KEY
        );

        response = await response.json();

        for (let item in response.t) {
          this.labelsSet.push(
            new Date(response.t[item] * 1000).toLocaleDateString("de-DE")
          );
        }
        this.openDataSet = response.c;

        await this.refresh();
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
