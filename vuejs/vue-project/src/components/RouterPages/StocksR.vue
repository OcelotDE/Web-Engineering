<template>
  <div class="searchDiv">
    <SearchBar
      @searchRequested="updateStockName()"
      @searchValueChanged="changeSearchText($event)"
      :currentSearchText="tempInputSymbol"
    />
  </div>
  <div class="content">
    <button class="default-button" @click="useBarChart = !useBarChart">
      Change display type
    </button>
    <div class="barsDiv">
      <div class="item">
        <StockC
          :symbol="currentSymbol"
          :type="chartType"
          @error-on-fetch="errorPass($event)"
        ></StockC>
      </div>
    </div>
    <div class="item">
      <p v-if="render" v-for="infoTitles in Object.keys(infos)">
        <b>{{ infoTitles }}</b
        >: {{ infos[infoTitles] }}
      </p>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import { nextTick } from "vue";
import StockC from "@/components/StockC.vue";
import SearchBar from "@/components/wikiSearch/SearchBar.vue";

export default {
  name: "StocksR",
  components: {
    SearchBar,
    StockC,
    LineChart,
    BarChart,
  },
  emits: ["errorOnFetch"],
  data() {
    return {
      render: true,
      useBarChart: true,
      chartType: "bar",
      currentSymbol: "GOOGL",
      tempInputSymbol: "GOOGL",
      infos: [],
    };
  },
  mounted() {
    this.addStockInfo();
  },
  setup() {
    const openDataSet = [];
    const labelsSet = [];

    return {
      openDataSet,
      labelsSet,
    };
  },
  watch: {
    useBarChart: function (isBarChart) {
      if (isBarChart) {
        this.chartType = "bar";
      } else {
        this.chartType = "line";
      }
    },
  },
  methods: {
    errorPass: function (event) {
      this.$emit("errorOnFetch", event);
    },
    updateStockName: function () {
      this.currentSymbol = this.tempInputSymbol;
      this.addStockInfo();
    },
    changeSearchText: function (newSearchText) {
      this.tempInputSymbol = newSearchText;
    },
    addStockInfo: async function () {
      let response;
      try {
        response = await fetch(
          "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
            this.currentSymbol +
            "&apikey=" +
            import.meta.env.VITE_ALPHAVANTAGE_KEY
        );
      } catch (e) {
        let errorCode = "400";
        let errorMsg =
          "Error fetching stock info, please ensure a stable internet connection.";
        this.$emit("errorOnFetch", { errorCode, errorMsg });
      }
      this.infos = await response.json();

      this.render = false;

      await nextTick();

      this.render = true;
    },
  },
};
</script>

<style scoped>
.barsDiv {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 50%;
  transform: translateX(-50%);
  left: 50%;
}

.item {
  flex: 1 1 0;
  margin: 10px;
  padding: 10px;
  border-radius: var(--border-radius);
  background-color: var(--color-background-mute);
}

button {
  transform: translateX(-50%);
  left: 50%;
}

.content {
  top: 10px;
}

b {
  font-weight: bold;
  color: var(--accent-c-pink-full-visibility);
}
</style>
