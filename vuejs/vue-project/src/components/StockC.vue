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

export default {
  name: "StockC",
  props: ["symbol", "type"],
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
      let response;
      try {
        response = await fetch(
          "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
            this.symbol +
            "&apikey=" +
            import.meta.env.VITE_ALPHAVANTAGE_KEY
        );
      } catch (e) {
        let errorCode = "400";
        let errorMsg =
          "Error fetching stock data, please ensure a stable internet connection.";
        this.$emit("errorOnFetch", { errorCode, errorMsg });
      }
      const json = await response.json();

      const monthly = json["Monthly Time Series"];

      for (let item in monthly) {
        if (item) {
          this.openDataSet.push(parseInt(monthly[item]["1. open"]));
          this.labelsSet.push(item);
        }
      }
      this.openDataSet = this.openDataSet.reverse(); // reverse because the data is sent backwards ._.
      this.labelsSet = this.labelsSet.reverse(); // reverse because the data is sent backwards ._.

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

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
