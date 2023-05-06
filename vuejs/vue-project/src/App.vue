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

export default {
    components: {FooterC, DefaultR, WeatherC, ItemCard, NavigationBar, VectorImageFill, HeaderC, ItemSection, ParallaxC},
    data() {
      return {
        currentPath: window.location.hash
      }
    },
    computed: {
      currentView() {
        return routes[this.currentPath.slice(1) || '/'] || NotFound
      },
      currentTitle() {
        return routes[this.currentPath.slice(1) || '/'].name || NotFound.name
      },
      currentHeight() {
        return routes[this.currentPath.slice(1) || '/'].name || NotFound.name
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
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

    <footer-c/>
</template>

<style>
</style>