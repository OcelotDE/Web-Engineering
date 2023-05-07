<template>
    <div>
      <div class="navSpacing"></div>
      <nav ref="navBar">
        <div id="logo"></div>
        <div id="desktopNavbar">
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/weather">Weather</a></li>
            <li><a href="#/wiki">WikiSearch</a></li>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "NavigationBar",
  setup() {
    const mobileView = ref(false)
    const showMobileNav = ref(false)

    return {
      mobileView,
      showMobileNav
    }
  },
  methods: {
      updateValues() {
        if (window.innerWidth < 800 && !this.mobileView) {
          this.mobileView = true
        } else if (window.innerWidth >= 800 && this.mobileView) {
          this.mobileView = false
        }
        this.updateSpacerSize()
      },
    updateSpacerSize() {
      this.$el.querySelector(".navSpacing").style.height = this.$refs.navBar.clientHeight + "px"
    }
  },
  mounted() {
      this.updateSpacerSize()
      window.addEventListener( 'resize', this.updateValues, false );
  }
}
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
    -webkit-mask: url(../assets/logo.svg) no-repeat center;
    mask: url(../assets/logo.svg) no-repeat center;
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

    display:flex;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    list-style-type: none;
}

nav ul li {
    display: inline-block;
    padding: 0 20px;
}

nav ul li {
  padding: 5px 20px;
  text-align: center;
}

nav ul li a {
    text-decoration: none;
    color: #989898;
    font-size: .8rem;
    font-weight: bold;
    transition-duration: 400ms;
    background: linear-gradient(90deg, #ffffff 0%, #ffffff 45%, #FF8400 55%, #861EDC 100%);
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
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 100%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    5% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 95%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    10% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 90%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    15% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 85%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    20% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 80%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    25% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 75%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    30% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 70%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    35% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 65%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    40% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 60%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    45% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 55%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    50% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 50%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    55% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 45%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    60% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 40%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    65% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 35%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    70% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 30%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    75% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 25%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    75% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 20%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    80% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 15%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    85% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 10%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    90% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 5%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    100% {
        background: linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #FF8400 00%, #861EDC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>