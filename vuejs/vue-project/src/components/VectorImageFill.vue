<template>
  <svg
    ref="svgRef"
    viewBox="0 0 3508 2481"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    "
    preserveAspectRatio="xMidYMax meet"
  >
    <slot />
    <defs>
      <linearGradient
        id="_Linear1"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(3397,0,0,1453.78,25,1240.16)"
      >
        <stop
          offset="0"
          style="
            stop-color: var(--accent-c-pink-full-visibility);
            stop-opacity: 1;
          "
        />
        <stop
          offset="1"
          style="
            stop-color: var(--accent-c-pink-verylow-visibility);
            stop-opacity: 1;
          "
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default {
  name: "VectorImageFill",

  setup() {
    const svgRef = ref(null);
    const svgIsVisible = useElementVisibility(svgRef);

    return {
      svgRef,
      svgIsVisible,
    };
  },

  watch: {
    svgIsVisible: function (isVisible) {
      if (isVisible) {
        // render svg animation if component gets rendered
        let path = this.$el.querySelector("path");
        let pathLength = path.getTotalLength();

        path.style.strokeDasharray = pathLength + " " + pathLength;

        path.style.strokeDashoffset = pathLength;

        var bezierState = 0;
        var drawLength = 0;

        const intervalId = setInterval(() => {
          drawLength = pathLength * this.easeInOutExpo(bezierState);
          bezierState += 0.01;
          if (pathLength - drawLength >= 0) {
            path.style.strokeDashoffset = pathLength - drawLength;
          } else {
            path.style.strokeDashoffset = 0;
          }

          if (bezierState >= 1) {
            clearInterval(intervalId); // Stop the loop after 10 iterations
          }
        }, 10); // delay each iteration by 1 second
      }
    },
  },

  methods: {
    easeInOutExpo: function (x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    },
  },
};
</script>

<style scoped>
svg {
  width: 100%;
  opacity: 0.3;
}
</style>
