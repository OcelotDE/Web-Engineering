<script>
import ItemSection from "@/components/ItemSection.vue";
import HeaderC from "@/components/HeaderC.vue";
import VectorImageFill from "@/components/VectorImageFill.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import ItemCard from "@/components/ItemCard.vue";
import ParallaxC from "@/components/Parallax/ParallaxC.vue";
import WeatherC from "@/components/WeatherC.vue";

import NotFound from "./components/RouterPages/404R.vue";
import Default from "./components/RouterPages/DefaultR.vue";
import Weather from "./components/RouterPages/WeatherR.vue";
import Wiki from "./components/RouterPages/WikiR.vue";
import Stocks from "./components/RouterPages/StocksR.vue";
import Contact from "./components/RouterPages/ContactR.vue";

import FooterC from "@/components/FooterC.vue";
import ErrorC from "@/components/ErrorC.vue";
import { shallowRef } from "vue";

export default {
  components: {
    ErrorC,
    FooterC,
    WeatherC,
    ItemCard,
    NavigationBar,
    VectorImageFill,
    HeaderC,
    ItemSection,
    ParallaxC,
  },
  data() {
    return {
      currentPath: window.location.hash,
      currentErrorCode: null,
      currentErrorMessage: null,
      errors: [],
      routes: {
        "/": {
          Component: shallowRef(Default),
          HeaderHeight: "100vh",
          HeaderTitle: "A NEW ERA",
          NavTitle: "Home",
          NavRoute: "",
        },
        "/weather": {
          Component: shallowRef(Weather),
          HeaderHeight: "0",
          HeaderTitle: "",
          NavTitle: "Weather",
          NavRoute: "weather",
        },
        "/stocks": {
          Component: shallowRef(Stocks),
          HeaderHeight: "30vh",
          HeaderTitle: "STOCKS VIEWER",
          NavTitle: "Stocks",
          NavRoute: "stocks",
        },
        "/wiki": {
          Component: shallowRef(Wiki),
          HeaderHeight: "30vh",
          HeaderTitle: "WIKI SEARCH",
          NavTitle: "WikiSearch",
          NavRoute: "wiki",
        },
        "/contact": {
          Component: shallowRef(Contact),
          HeaderHeight: "30vh",
          HeaderTitle: "CONTACT",
          NavTitle: "Contact",
          NavRoute: "contact",
        },
      },
    };
  },
  computed: {
    currentView() {
      const NotFoundComponent = { component: NotFound, height: "0", title: "" };
      return this.routes[this.currentPath.slice(1) || "/"] || NotFoundComponent;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
  methods: {
    shallowRef,
    clearErrorMessage: function (toRemoveIndex) {
      this.errors.splice(toRemoveIndex, 1);
      this.updateErrorIndices();
    },
    updateErrorIndices: function () {
      let index = 0;
      this.errors.forEach((error) => {
        error.Index = index;
        index++;
      });
    },
    addErrorMessage: function (code, msg) {
      this.errors.push({ Code: code, Message: msg, Index: this.errors.length });
    },
  },
};
</script>

<template>
  <NavigationBar :navigation-options="routes" />
  <div class="app-content">
    <HeaderC
      :presentedText="currentView.HeaderTitle"
      :height="currentView.HeaderHeight"
    />

    <component
      :is="currentView.Component"
      @errorOnFetch="addErrorMessage($event.errorCode, $event.errorMsg)"
    />
  </div>

  <div class="banner">
    <ErrorC
      v-for="error in errors"
      :error-code="error.Code"
      :error-message="error.Message"
      @errorMessageClear="clearErrorMessage(error.Index)"
    />
  </div>
  <FooterC />
</template>

<style>
.banner {
  background-color: rgba(189, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  color: white;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  text-align: center;
  font-family: SFPro, sans-serif;
  text-transform: uppercase;
  overflow: hidden;
}

.app-content {
  min-height: 100vh;
}
</style>
