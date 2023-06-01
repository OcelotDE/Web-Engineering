<template>
  <div class="searchDiv">
    <SearchBar
      @searchRequested="updateStockName()"
      @searchValueChanged="changeSearchText($event)"
      :currentSearchText="tempInputSymbol"
    />
  </div>
  <div class="content">
    <div class="barsDiv">
      <div class="item">
        <StockC
          v-if="render"
          :symbol="currentSymbol"
          :type="chartType"
          :resolution="resolution"
          @error-on-fetch="errorPass($event)"
        ></StockC>
      </div>
    </div>
    <div class="item">
      <button class="default-button" @click="useBarChart = !useBarChart">
        Change chart display type
      </button>
      <button class="default-button" @click="changeResolution()">
        Change resolution from "{{ resolution }}"
      </button>
      <p v-if="render" v-for="infoTitles in Object.keys(infos)">
        <b>{{ infoTitles }}</b
        >: {{ infos[infoTitles] }}
      </p>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Charts/BarChart.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import { nextTick } from "vue";
import StockC from "@/components/Containers/StockC.vue";
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
      resizeTimer: 0,
      semaphore: 0,
      resizeInProgress: false,
      resolution: "M",
    };
  },
  mounted() {
    this.addStockInfo();

    addEventListener("resize", (event) => {
      this.adjustStockChartSize();
    });
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
    adjustStockChartSize: async function () {
      if (this.resizeTimer > 0) {
        this.resizeTimer = 0;
      } else {
        this.resizeInProgress = true;
        while (this.resizeTimer < 100) {
          await this.sleep(100);
          if (!this.resizeInProgress) return; // if resize already done earlier, abort request
          this.resizeTimer++;
        }
        this.resizeTimer = 0;
        this.resizeInProgress = false;
        if (this.semaphore > 0) return; // check semaphore to prevent multiple resets
        this.semaphore++;

        this.render = false;

        await nextTick();

        this.render = true;

        this.semaphore--;
      }
    },
    sleep: function (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
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
    changeResolution: function () {
      switch (this.resolution) {
        case "M":
          this.resolution = "D";
          break;
        case "D":
          this.resolution = "W";
          break;
        case "W":
          this.resolution = "M";
          break;
      }
    },
  },
};
</script>

<style scoped>
.barsDiv {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /*width: 50%;
  transform: translateX(-50%);
  left: 50%;*/
}

.item {
  flex: 1 1 0;
  margin: 10px;
  padding: 10px;
  border-radius: var(--border-radius);
  background-color: var(--color-background-mute);
}

.content {
  top: 10px;
}

b {
  font-weight: bold;
  color: var(--accent-c-pink-full-visibility);
}
</style>
