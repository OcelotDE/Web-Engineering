<template>
    <header>
        <h1 id="headerTextBackground" ref="headerTextRef">{{ headerText }}</h1>
        <h1 id="headerTextMain" class="colorGradient" ref="headerTextRef">{{ headerText }}</h1>
    </header>
</template>

<script>
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default {
    name: "HeaderC",
    setup() {
        const headerTextRef = ref(null)
        const headerTextIsVisible = useElementVisibility(headerTextRef)
        const headerText = ref("SHORT WIKI")

        return {
            headerTextRef,
            headerTextIsVisible,
            headerText
        }
    },

    mounted:function(){
        document.addEventListener('mousemove', this.mouseMove, false);
    },

    data() {
        return {
            headerRendered: false,
            headerTextFull: "SHORT WIKI"
        }
    },

    watch: {
        headerTextIsVisible: function (newState) {
            if (newState && !this.headerRendered) {
                this.headerRendered = true
                this.shuffleHeaderText()
            }
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
            this.headerText = this.caesarCipher(this.headerText, 1)
            setTimeout(() => {
                if (this.headerText.toUpperCase() !== "SHORT`WIKI") {
                    this.shuffleHeaderText();
                } else {
                    this.headerText = this.headerTextFull
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
        }
    },
}
</script>

<style scoped>
header {
    height: 50vh;
    background-image: url("../assets/header.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: default;
}

h1 {
    font-weight: bold;
    text-align: center;
    font-family: SFPro;
}

#headerTextMain {
    font-size: 1400%;
}

#headerTextBackground {
    font-size: 1500%;
    position: absolute;
    color: white;
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