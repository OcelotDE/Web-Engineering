<template>
  <div>
    <div class="navSpacing" ref="spacer"></div>
    <nav ref="navBar">
      <div id="logo"></div>
      <p v-if="loginValid && !showMobileNav" id="loginText">
        Welcome back, {{ userName }}.
      </p>
      <div id="items">
        <ul :class="{ mobileHide: showMobileNav }" ref="navList">
          <li v-if="!loginValid">
            <img
              src="/assets/images/lock.svg"
              alt="login icon"
              class="lockicon"
            />
            <a @click="this.$emit('openLoginDialogRequested')">Login</a>
          </li>
          <li v-if="loginValid">
            <img
              src="/assets/images/lock.svg"
              alt="logout icon"
              class="lockicon"
            />
            <a @click="this.$emit('logoutRequested')">Logout</a>
          </li>
          <li v-for="option in navigationOptions">
            <a :href="'#/' + option.NavRoute">{{ option.NavTitle }}</a>
          </li>
        </ul>
      </div>
      <span
        id="toggleMobileNav"
        @click="
          showMobileNav = !showMobileNav;
          updateSpacerSize();
        "
      >
        <svg
          class="ham hamRotate ham8"
          viewBox="0 0 100 100"
          width="80"
          :class="{ active: showMobileNav }"
        >
          <path
            class="line top"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          />
          <path class="line middle" d="m 30,50 h 40" />
          <path
            class="line bottom"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          />
        </svg>
      </span>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import VueCookie from "vue-cookie";

export default {
  name: "NavigationBar",
  props: {
    navigationOptions: Object,
    loginValid: Boolean,
  },
  emits: ["openLoginDialogRequested", "logoutRequested"],
  setup() {
    const showMobileNav = ref(false);

    return {
      showMobileNav,
    };
  },
  data() {
    return {
      userName: VueCookie.get("username"),
    };
  },
  methods: {
    updateUsername() {
      this.userName = VueCookie.get("username");
    },
    updateSpacerSize: async function () {
      for (let i = 0; i < 20; i++) {
        // loop 20 times and wait 20ms each to transition the height for mobile
        await this.sleep(20);
        if (this.$refs.spacer.style !== null) {
          this.$refs.spacer.style.height =
            this.$refs.navBar.clientHeight + "px"; // update height value
        }
      }
    },
    sleep: function (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
  },
  mounted() {
    this.updateSpacerSize();
    window.addEventListener("resize", this.updateSpacerSize, false);
  },
  watch: {
    loginValid: function () {
      this.updateUsername();
    },
  },
};
</script>

<style scoped>
button {
  position: absolute;
  right: 0;
  top: 0;
}

#logo {
  height: 2rem;
  width: 2rem;
  background-color: #fff;
  -webkit-mask: url(/assets/images/logo.svg) no-repeat center;
  mask: url(/assets/images/logo.svg) no-repeat center;
}

.navSpacing {
  height: 0;
  position: relative;
  background-color: var(--color-background);
}

nav {
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: rgba(30, 31, 36, 0.5);
  backdrop-filter: blur(20px);
  padding: 10px 40px;
  width: 100%;

  transition: all 1s;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  list-style-type: none;
  display: flex;
}

nav ul li {
  display: inline-block;
  padding: 0 20px;
}

nav ul li {
  padding: 5px 20px;
  text-align: center;
}

li:first-of-type > a {
  font-weight: 300;
  cursor: pointer;
}

nav ul li a {
  text-decoration: none;
  color: #989898;
  font-size: 0.8rem;
  font-weight: bold;
  transition-duration: 400ms;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 45%,
    #ff8400 55%,
    #861edc 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position-x: 0;
  transition: background-position 400ms;
  background-size: 300% 100%;
}

nav ul li a:hover {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*animation: hoverAnim ease-in-out 200ms forwards;*/
  background-position-x: 100%;
}

nav ul li a:hover {
  color: #ffffff;
}

@keyframes hoverAnim {
  0% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 100%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  5% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 95%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  10% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 90%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  15% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 85%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  20% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 80%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  25% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 75%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  30% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 70%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  35% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 65%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  40% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 60%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  45% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 55%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  50% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 50%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  55% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 45%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  60% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 40%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  65% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 35%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  70% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 30%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 25%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 20%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  80% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 15%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  85% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 10%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  90% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 5%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  100% {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 0%,
      #ff8400 00%,
      #861edc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

#toggleMobileNav {
  display: none;
  cursor: pointer;
}

@media screen and (max-width: 850px) {
  #items ul {
    flex-direction: column;
    overflow: hidden;
    height: 0;
    transition: height 400ms;
  }

  #toggleMobileNav {
    display: block;
  }

  .mobileHide {
    height: 250px !important;
  }
}

.hamRotate.active {
  transform: rotate(45deg);
}

.ham8 .top {
  stroke-dasharray: 40 160;
}
.ham8 .middle {
  stroke-dasharray: 40 142;
  transform-origin: 50%;
  transition: transform 400ms;
}
.ham8 .bottom {
  stroke-dasharray: 40 85;
  transform-origin: 50%;
  transition: transform 400ms, stroke-dashoffset 400ms;
}
.ham8.active .top {
  stroke-dashoffset: -64px;
}
.ham8.active .middle {
  transform: rotate(90deg);
}
.ham8.active .bottom {
  stroke-dashoffset: -64px;
}

.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #fff;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.lockicon {
  height: 1.2rem;
  width: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 5px;
}

#loginText {
  font-size: 0.7rem;
  position: absolute;
  left: 100px;
}
</style>
