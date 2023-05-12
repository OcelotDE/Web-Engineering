<script>
import ItemSection from "@/components/ItemSection.vue";
import HeaderC from "@/components/HeaderC.vue";
import VectorImageFill from "@/components/VectorImageFill.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import ItemCard from "@/components/ItemCard.vue";
import ParallaxC from "@/components/Parallax/ParallaxC.vue";
import WeatherC from "@/components/WeatherC.vue";

import NotFound from "./components/pages/404R.vue";
import Default from "./components/pages/DefaultR.vue";
import Weather from "./components/pages/WeatherR.vue";
import Wiki from "./components/pages/WikiR.vue";
import Stocks from "./components/pages/StocksR.vue";
import Contact from "./components/pages/ContactR.vue";

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
    clearErrorMessage: function () {
      this.currentErrorCode = null;
      this.currentErrorMessage = null;
    },
    setErrorMessage: function (code, msg) {
      this.currentErrorCode = code;
      this.currentErrorMessage = msg;
    },
  },
};
</script>

<template>
  <NavigationBar :navigation-options="routes" />
  <HeaderC
    :presentedText="currentView.HeaderTitle"
    :height="currentView.HeaderHeight"
  />

  <component
    :is="currentView.Component"
    @errorOnFetch="setErrorMessage($event.errorCode, $event.errorMsg)"
  />

  <ErrorC
    :error-code="currentErrorCode"
    :error-message="currentErrorMessage"
    @errorMessageClear="clearErrorMessage"
  />
  <FooterC />
</template>

<style></style>
