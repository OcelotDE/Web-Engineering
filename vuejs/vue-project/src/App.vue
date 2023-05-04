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

export default {
    components: {DefaultR, WeatherC, ItemCard, NavigationBar, VectorImageFill, HeaderC, ItemSection, ParallaxC},
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
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
    }
}

const routes = {
  '/': Default,
  '/weather': Weather,
  '/wiki': Wiki
}

</script>

<template>
    <NavigationBar/>

    <component :is="currentView" />
</template>

<style>
</style>