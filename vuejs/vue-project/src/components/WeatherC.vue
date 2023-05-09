<template>
  <div class="mainDiv">
    <h1>Todays temperature is</h1>
    <h1>{{ degreeNow }} °C</h1>
    <p>Nothing can stop our drone from flying at these temperatures!</p>
    <img ref="weatherImage" src="" alt="">
    <p>{{ weatherNow }}? No need to worry.</p>
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
    const weatherNow = ref(null);
    const canvasTimeoutId = ref(null)

    return {
      degreeNow,
      weatherNow,
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
      this.weatherNow = data?.list[0]?.weather[0]?.main
      this.$refs.weatherImage.src = "https://openweathermap.org/img/wn/" + data?.list[0]?.weather[0]?.icon + "@4x.png"
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

  .mainDiv {
    margin: 20px;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    background-color: rgba(30, 31, 36, 0.5);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
  }

  img {
    width: 100px;
  }
</style>