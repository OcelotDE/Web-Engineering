<template>
  <div>
    <h1>Todays temperature is </h1>
    <h1>{{ degreeNow }} °C</h1>
    <p>Nothing can stop this drone from flying at these temperatures!</p>
  </div>
  <canvas id="canvas"></canvas>
</template>

<script>
import {ref} from "vue";
import {func} from "three/nodes";

export default {
  name: "WeatherC",
  setup() {
    const degreeNow = ref(0);
    const canvasTimeoutId = ref(null)

    return {
      degreeNow,
      canvasTimeoutId
    }
  },
  mounted() {
    const successCallback = (position) => {
      console.log(position);
      this.getData(position)
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  },
  methods: {
    getData: async function (position) {
      let response = await fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid="+ import.meta.env.VITE_WEATHER_KEY + "&mode=JSON&units=metric")
      let data = await response.json()
      console.log(data)
      this.degreeNow = data?.list[0]?.main?.temp;
      this.setCanvasWeather(data?.list[0]?.weather[0]?.main);
    },
    setCanvasWeather: function (weatherString) {
      console.log(weatherString)
      switch (weatherString) {
        case "Rain":
          this.setRain();
          break;
        case "Sun":
          this.setSun();
          break;
        default:
          this.clearCanvas();
          break;
      }
    },
    clearCanvas: function () {
      clearInterval(this.canvasTimeoutId);
      const canvas = document.querySelector("canvas");
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    },
    setSun: function () {
      var canvas = document.querySelector("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
      }
    },
    setRain: function () {
      var canvas = document.querySelector("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';


        var init = [];
        var maxParts = 400;
        for(var a = 0; a < maxParts; a++) {
          init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
          })
        }

        var particles = [];
        for(var b = 0; b < maxParts; b++) {
          particles[b] = init[b];
        }

        function draw() {
          ctx.clearRect(0, 0, w, h);
          for(var c = 0; c < particles.length; c++) {
            var p = particles[c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
          }
          move();
        }

        function move() {
          for(var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if(p.x > w || p.y > h) {
              p.x = Math.random() * w;
              p.y = -20;
            }
          }
        }

        this.canvasTimeoutId = setInterval(draw, 30);

      }
    }
  }
}
</script>

<style scoped>
  div {
    text-align: center;
  }
  #canvas {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
  }
</style>