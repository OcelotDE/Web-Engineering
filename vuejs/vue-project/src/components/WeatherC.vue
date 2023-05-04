<template>

</template>

<script>
export default {
  name: "WeatherC",
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
    }
  }
}
</script>

<style scoped>

</style>