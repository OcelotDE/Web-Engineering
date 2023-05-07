<template>
  <div class="searchDiv">
    <SearchBar @searchRequested="" @searchValueChanged="" :currentSearchText="this.searchText"/>
  </div>
  <WeatherC/>
</template>

<script>
import WeatherC from "@/components/WeatherC.vue";
import {ref} from "vue";
import {useElementVisibility} from "@vueuse/core";
import SearchBar from "@/components/wikiSearch/SearchBar.vue";

export default {
  name: "WeatherR",
  components: {SearchBar, WeatherC},
  setup() {
    const searchText = ref("Stuttgart");

    return {
      searchText
    }
  }
}
</script>

<style scoped>
.searchDiv {
  display: flex;
  justify-content: center;
  background-color: var(--color-background-mute);
}
</style>