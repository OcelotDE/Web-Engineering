<template>
  <div class="mainDiv">
    <h1>Todays temperature is</h1>
    <h1>{{ degreeNow }} °C</h1>
    <p>Nothing can stop our drone from flying at these temperatures!</p>
    <img ref="weatherImage" src="" alt="" />
    <p>{{ weatherNow }}? No need to worry.</p>
  </div>
  <div class="secondDiv">
    <div
      class="weatherDayDiv"
      v-for="data in weatherData"
      v-show="validateData(data?.dt)"
    >
      <h1>{{ getWeekDay(data.dt_txt) }}</h1>
      <h2>{{ data.main.temp }} °C</h2>
      <img
        :src="
          'https://openweathermap.org/img/wn/' +
          data?.weather[0]?.icon +
          '@4x.png'
        "
        alt=""
      />
    </div>
  </div>
  <canvas id="canvas"></canvas>
</template>

<script>
import { ref } from "vue";

export default {
  name: "WeatherC",
  emits: ["errorOnFetch"],
  setup() {
    const degreeNow = ref(0);
    const weatherNow = ref(null);
    const canvasTimeoutId = ref(null);
    const weatherData = ref(null);

    return {
      degreeNow,
      weatherNow,
      canvasTimeoutId,
      weatherData,
    };
  },
  mounted() {
    const successCallback = (position) => {
      console.log(position);
      this.getData(position);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  },
  methods: {
    validateData: function (dt) {
      if (!dt || !this.weatherData) return false;
      return (dt - this.weatherData[0]?.dt) % 86400 === 0;
    },
    getWeekDay: function (dateString) {
      let dayNmbr = new Date(dateString).getUTCDay();
      switch (
        dayNmbr // Check what weekday it is
      ) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        default:
          return "N/A";
      }
    },
    getData: async function (position) {
      // fetch data from api to process using parameters
      let response;

      try {
        response = await fetch(
          "http://api.openweathermap.org/data/2.5/forecast?lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude +
            "&appid=" +
            import.meta.env.VITE_WEATHER_KEY +
            "&mode=JSON&units=metric"
        );

        if (response.status === 400) {
          let errorCode = "400";
          let errorMsg =
            "Error fetching location, please check for correct spelling.";
          this.$emit("errorOnFetch", { errorCode, errorMsg }); // emit error if connection issue
          return;
        }
      } catch (e) {
        let errorCode = "400";
        let errorMsg =
          "Error fetching location, please check your internet connection.";
        this.$emit("errorOnFetch", { errorCode, errorMsg }); // emit error if connection issue
        return;
      }
      let data = await response.json(); // parse to json

      // assign variables if valid
      this.weatherData = data?.list;
      this.degreeNow = data?.list[0]?.main?.temp;
      this.weatherNow = data?.list[0]?.weather[0]?.main;
      this.$refs.weatherImage.src =
        "https://openweathermap.org/img/wn/" +
        data?.list[0]?.weather[0]?.icon +
        "@4x.png"; // set weather image
      this.setCanvasWeather(data?.list[0]?.weather[0]?.main); // set canvas ui effect
    },
    setCanvasWeather: function (weatherString) {
      switch (
        weatherString // check if weather has ui effect
      ) {
        case "Rain":
          this.setRain();
          break;
        case "Clear":
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
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    },
    setSun: function () {
      var canvas = document.querySelector("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = "rgb(255,166,0)";
        ctx.fillStyle = "rgb(255,166,0)";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";

        // add circle
        ctx.beginPath();
        ctx.arc(0, 0, 300, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(255,166,0,0.61)";
        ctx.lineWidth = 100;

        // add sun ray lines
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(7000, 10000);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(1000, 10000);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10000, 1000);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10000, 5000);
        ctx.stroke();
      }
    },
    setRain: function () {
      var canvas = document.querySelector("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (canvas.getContext) {
        // calculate random positions for rain drops and render them falling down on the page
        var ctx = canvas.getContext("2d");
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = "rgba(174,194,224,0.5)";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";

        var init = [];
        var maxParts = 400;
        for (var a = 0; a < maxParts; a++) {
          init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10,
          });
        }

        var particles = [];
        for (var b = 0; b < maxParts; b++) {
          particles[b] = init[b];
        }

        function draw() {
          ctx.clearRect(0, 0, w, h);
          for (var c = 0; c < particles.length; c++) {
            var p = particles[c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
          }
          move();
        }

        function move() {
          for (var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > w || p.y > h) {
              p.x = Math.random() * w;
              p.y = -20;
            }
          }
        }

        this.canvasTimeoutId = setInterval(draw, 30);
      }
    },
  },
};
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
  margin: 30px 0;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  background-color: rgba(30, 31, 36, 0.5);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius);
}

.secondDiv {
  margin-bottom: 20vh;
  padding: 20px;
  left: 50%;
  width: 80%;
  transform: translateX(-50%);
  background-color: rgba(30, 31, 36, 0.5);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

img {
  width: 100px;
}

.weatherDayDiv {
  flex: 1 1 0;
  padding: 10px;
}

@media screen and (max-width: 900px) {
  .mainDiv {
    width: 80%;
  }
}
</style>
