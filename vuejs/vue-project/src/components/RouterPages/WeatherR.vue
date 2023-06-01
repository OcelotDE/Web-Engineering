<template>
  <div class="searchDiv">
    <SearchBar
      @searchRequested="getDataFromSearch(this.$emit)"
      @searchValueChanged="changeSearchText($event)"
      :currentSearchText="this.searchBarText"
    />
  </div>
  <div class="searchDiv">
    <PropositionsBox
      :propositions="propositions"
      @propositionSelected="changeSearchText($event)"
    ></PropositionsBox>
  </div>
  <WeatherC ref="weatherC" />
</template>

<script>
import WeatherC from "@/components/Containers/WeatherC.vue";
import SearchBar from "@/components/wikiSearch/SearchBar.vue";
import { ref } from "vue";
import PropositionsBox from "@/components/wikiSearch/PropositionsBox.vue";

export default {
  name: "WeatherR",
  components: { PropositionsBox, SearchBar, WeatherC },
  data() {
    return {
      searchBarText: "",
      propositionsTimer: 0,
    };
  },
  setup() {
    const propositions = ref([]);

    return {
      propositions,
    };
  },
  mounted() {
    window.addEventListener("online", () => console.log("Became online"));
    window.addEventListener("offline", () => console.log("Became offline"));
  },
  emits: ["errorOnFetch"],
  methods: {
    getDataFromSearch: async function () {
      console.log("text:" + this.searchBarText);
      let response;
      try {
        response = await fetch(
          "http://api.openweathermap.org/geo/1.0/direct?q=" +
            this.searchBarText +
            "&limit=1&appid=" +
            import.meta.env.VITE_WEATHER_KEY
        );
      } catch (e) {
        let errorCode = "400";
        let errorMsg =
          "Error fetching weather data, please ensure a stable internet connection.";
        this.$emit("errorOnFetch", { errorCode, errorMsg });
        return;
      }
      let data = await response.json();
      console.log(data[0]);
      if (!data) return;
      let position = {
        coords: {
          latitude: data[0]?.lat,
          longitude: data[0]?.lon,
        },
      };
      await this.$refs.weatherC.getData(position);
    },
    changeSearchText: function (newText) {
      this.searchBarText = newText;

      this.getPropositions(newText);
    },
    getPropositions: async function (searchBarValue) {
      if (searchBarValue === "") return;

      if (this.propositionsTimer > 0) {
        this.propositionsTimer = 0;
      } else {
        while (this.propositionsTimer < 10) {
          await this.sleep(10);
          this.propositionsTimer++;
        }
        this.propositionsTimer = 0;

        try {
          const response = await fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q=" +
              searchBarValue +
              "&limit=5&appid=" +
              import.meta.env.VITE_WEATHER_KEY
          );

          console.log(response.status);

          const json = await response.json();

          if (json.batchcomplete !== "") {
            let names = [];
            json.forEach((data) => {
              let addedPair;
              if (
                data.hasOwnProperty("local_names") &&
                data["local_names"].hasOwnProperty("de")
              ) {
                addedPair = { title: data["local_names"]["de"] };
              } else {
                addedPair = { title: data["name"] };
              }
              names.push(addedPair);
            });
            console.log(names);
            this.propositions = names;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    sleep: function (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
  },
};
</script>

<style scoped>
.searchDiv {
  display: flex;
  justify-content: center;
  background-color: var(--color-background-mute);
}
</style>
