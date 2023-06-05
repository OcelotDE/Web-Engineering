<script>
import ItemSection from "@/components/ItemSection.vue";
import HeaderC from "@/components/Main/HeaderC.vue";
import VectorImageFill from "@/components/VectorImageFill.vue";
import NavigationBar from "@/components/Main/NavigationBar.vue";
import ItemCard from "@/components/Cards/ItemCard.vue";
import ParallaxC from "@/components/Parallax/ParallaxC.vue";
import WeatherC from "@/components/Containers/WeatherC.vue";

import NotFound from "./components/RouterPages/404R.vue";
import Default from "./components/RouterPages/DefaultR.vue";
import Weather from "./components/RouterPages/WeatherR.vue";
import Wiki from "./components/RouterPages/WikiR.vue";
import Stocks from "./components/RouterPages/StocksR.vue";
import Contact from "./components/RouterPages/ContactR.vue";

import FooterC from "@/components/Main/FooterC.vue";
import ErrorC from "@/components/Main/ErrorC.vue";
import { shallowRef } from "vue";
import VueCookie from "vue-cookie";

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
      userInput: "",
      userName: "",
      loginValid: false,
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
          HeaderTitle: "STOCKS",
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
      const NotFoundComponent = {
        Component: NotFound,
        HeaderHeight: "0",
        HeaderTitle: "",
        NavTitle: "err",
        NavRoute: "err",
      };
      return this.routes[this.currentPath.slice(1) || "/"] || NotFoundComponent;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });

    this.loginValid = VueCookie.get("loginValid");
  },
  methods: {
    login: function () {
      if (this.userInput === import.meta.env.VITE_ADMINPASSWORD) {
        // check if password is correct
        VueCookie.set("loginValid", true); // set cookie to valid
        this.loginValid = true;
        VueCookie.set("username", this.userName); // set username cookie
      } else {
        this.addErrorMessage(
          "WRONGPASS",
          "You have entered the wrong password. (Incorrect input: " +
            this.userInput +
            ")"
        ); // send errormessage to user for wrong password
      }
      this.$refs.loginDialog.close(); // close ui dialog
    },
    cancelLogin: function () {
      this.$refs.loginDialog.close(); // close ui dialog
    },
    openLogin: function () {
      this.$refs.loginDialog.showModal(); // close ui dialog
    },
    logout: function () {
      VueCookie.delete("username"); // clear username cookie
      VueCookie.delete("loginValid"); // clear validity cookie
      this.loginValid = false;
    },
    shallowRef,
    clearErrorMessage: function (toRemoveIndex) {
      this.errors.splice(toRemoveIndex, 1); // clear errormessage using index
      this.updateErrorIndices(); // update indices of other messages
    },
    updateErrorIndices: function () {
      let index = 0;
      this.errors.forEach((error) => {
        error.Index = index;
        index++;
      }); // loop through errors and update index field
    },
    addErrorMessage: function (code, msg) {
      this.errors.push({ Code: code, Message: msg, Index: this.errors.length }); // add error message to array
    },
  },
};
</script>

<template>
  <NavigationBar
    :navigation-options="routes"
    @open-login-dialog-requested="openLogin()"
    @logout-requested="logout()"
    :login-valid="Boolean(loginValid)"
  />
  <div class="app-content">
    <HeaderC
      :presentedText="currentView.HeaderTitle"
      :height="currentView.HeaderHeight"
    />
    <dialog id="loginDialog" ref="loginDialog">
      <p id="loginHeader">Please enter the password below.</p>
      <input
        type="text"
        class="inputField"
        id="loginUsername"
        v-model="userName"
        placeholder="Enter your name (can be anything)"
      />
      <input
        type="text"
        class="inputField"
        id="loginInputField"
        v-model="userInput"
        placeholder="Enter the admin password"
      />
      <p id="loginHint">Hint: It's 12345.</p>
      <div>
        <button class="default-button" id="cancelBtn" @click="cancelLogin()">
          Cancel
        </button>
        <button class="default-button" id="loginBtn" @click="login()">
          Confirm
        </button>
      </div>
    </dialog>

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

#loginDialog {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-background-mute);
  border: 2px solid var(--accent-c-pink-full-visibility);
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);
  border-radius: var(--border-radius);
}

#loginHeader {
  font-family: SF Pro, sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--color-text);
}

#loginHint {
  font-family: SF Pro, sans-serif;
  font-weight: 100;
  padding: 10px;
  color: var(--color-text);
  text-align: center;
}

#loginBtn {
  filter: hue-rotate(160deg) saturate(5);
  float: right;
}

#loginUsername {
  margin-bottom: 10px;
}

.inputField {
  border: none;
  background: var(--color-background-soft);
  border-radius: var(--border-radius);
  padding: 10px;
  width: 100%;
  color: var(--color-text);
}
</style>
