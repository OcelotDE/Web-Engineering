<template>
    <header>
        <h1 id="headerTextBackground">{{ headerText }}</h1>
        <h1 id="headerTextMain" class="colorGradient">{{ headerText }}</h1>
    </header>
</template>

<script>
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default {
    name: "HeaderC",
    props: {
      presentedText: String,
      height: String
    },
    setup() {
        const headerTextRef = ref(null)
        const headerTextIsVisible = useElementVisibility(headerTextRef)
        const headerText = ref("none")

        return {
            headerTextRef,
            headerTextIsVisible,
            headerText
        }
    },

    mounted:function(){
        document.addEventListener('mousemove', this.mouseMove, false);
        this.headerText = this.presentedText
        this.updateHeight()
        this.updateTitle()
    },

    data() {
        return {
            headerRendered: false,
            shuffleAmount: 0
        }
    },

    watch: {
        headerTextIsVisible: function (newState) {
            if (newState && !this.headerRendered) {
                this.headerRendered = true
                this.shuffleHeaderText()
            }
        },
        height: function () {
          this.updateHeight()
        },
        presentedText: function () {
          this.updateTitle()
        }
    },
    expose: ['caesarCipher', 'shuffleHeaderText'],
    methods: {
        caesarCipher: function (str, num) {
            // you can comment this line
            str = str.toUpperCase();

            var result = '';
            var charcode = 0;

            for (var i = 0; i < str.length; i++) {
                charcode = (str[i].charCodeAt()) + num;
                result += String.fromCharCode(charcode);
            }
            return result;

        },
        shuffleHeaderText: function () {
          this.shuffleAmount++
            this.headerText = this.caesarCipher(this.headerText, 1)
            setTimeout(() => {
                if (this.shuffleAmount < 60) {
                    this.shuffleHeaderText();
                } else {
                    this.headerText = this.presentedText
                }
            }, 10)
        },
        mouseMove(event) {
            let multiplierA = 25
            let multiplierB = 3
            let x = (event.clientX / window.screen.width - 0.5) * -1 * multiplierA
            let y = (event.clientY / window.screen.height - 0.5) * -1 * multiplierA
            let x_bg = x * multiplierB
            let y_bg = y * multiplierB
            document.getElementById("headerTextBackground").style.transform = `translate(${x_bg}px, ${y_bg}px)`
            document.getElementById("headerTextMain").style.transform = `translate(${x}px, ${y}px)`
        },
        updateHeight() {
          if (this.height) {
            document.querySelector("header").style.height = this.height
          }
        },
        updateTitle() {
          this.shuffleAmount = 0
          this.headerText = this.presentedText
          this.shuffleHeaderText()
        }
    },
}
</script>

<style scoped>
header {
    height: 100vh;
    background-image: url("../assets/header.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: default;
  transition: height 400ms;
}

h1 {
    font-weight: bold;
    text-align: center;
}

#headerTextMain {
    font-size: 1400%;
}

#headerTextBackground {
    font-size: 1500%;
    position: absolute;
    color: black;
    opacity: 0.1;
}

@media screen and (max-width: 1300px) {
  #headerTextMain {
    font-size: 500%;
  }

  #headerTextBackground {
    font-size: 550%;
  }
}

@media screen and (max-width: 500px) {
  #headerTextMain {
    font-size: 300%;
  }

  #headerTextBackground {
    font-size: 330%;
  }
}
</style>