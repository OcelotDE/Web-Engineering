<template>
  <div class="itemRowDiv">
    <div v-if="imageLeft" id="imageDiv"></div>
    <div id="textField">
      <h1>{{ headline }}</h1>
      <h2>{{ description }}</h2>
    </div>
    <div v-if="!imageLeft" id="imageDiv"></div>
  </div>
</template>

<script>
export default {
  name: "RowItemC",
  props: {
    headline: String,
    description: String,
    imageLeft: Boolean,
    imageSrc: String,
  },
  mounted: function () {
    this.$el.querySelector(
      "#imageDiv"
    ).style.backgroundImage = `url("${this.imageSrc}")`;
  },
};
</script>

<style scoped>
.itemRowDiv {
  flex: 1 1 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
  padding: 2%;
}

.itemRowDiv > * {
  width: 50%;
}

#imageDiv {
  background-image: url("/assets/images/drone-hand.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50%;
  height: 100%;
  border-radius: 10px;
}

#textField {
  /*top: 50%;
  transform: translateY(-50%);*/
  padding: 2%;
}

h1 {
  font-size: 5vw;
}

@media screen and (max-width: 900px) {
  h2 {
    font-size: 3.2vw;
  }
}
</style>
