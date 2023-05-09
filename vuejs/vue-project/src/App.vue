<script>
import ItemSection from "@/components/ItemSection.vue";
import HeaderC from "@/components/HeaderC.vue";
import VectorImageFill from "@/components/VectorImageFill.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import ItemCard from "@/components/ItemCard.vue";
import ParallaxC from "@/components/Parallax/ParallaxC.vue";
import WeatherC from "@/components/WeatherC.vue";

import NotFound from './components/pages/404R.vue'
import Default from './components/pages/DefaultR.vue'
import Weather from './components/pages/WeatherR.vue'
import Wiki from './components/pages/WikiR.vue'
import DefaultR from "@/components/pages/DefaultR.vue";
import FooterC from "@/components/FooterC.vue";
import ErrorC from "@/components/ErrorC.vue";

export default {
    components: {
      ErrorC,
      FooterC, DefaultR, WeatherC, ItemCard, NavigationBar, VectorImageFill, HeaderC, ItemSection, ParallaxC},
    data() {
      return {
        currentPath: window.location.hash,
        currentErrorCode: "400",
        currentErrorMessage: "test"
      }
    },
    computed: {
      currentView() {
        return routes[this.currentPath.slice(1) || '/'] || NotFound
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
    },
  methods: {
      clearErrorMessage: function () {
        this.currentErrorCode = null;
        this.currentErrorMessage = null;
      }
  }
}

const routes = {
  '/': {"component": Default, "height": "100vh", "title": "A NEW ERA"},
  '/weather': {"component": Weather, "height": "0", "title": ""},
  '/wiki': {"component": Wiki, "height": "30vh", "title": "WIKI SEARCH"}
}

</script>

<template>
    <NavigationBar/>
    <HeaderC :presentedText="currentView['title']" :height="currentView['height']"/>

    <component :is="currentView['component']" />

    <ErrorC :error-code="currentErrorCode" :error-message="currentErrorMessage" @errorMessageClear="clearErrorMessage"/>
    <FooterC/>
</template>

<style>
</style>