<template>
  <div>
      <h1 class="colorGradient">{{ title }}</h1>
      <span>{{ description }}</span>
      <slot/>
      <br/>
      <div id="imageContainer">
          <img v-bind:src="imageUrl" alt=""/>
          <button><h2 class="colorGradient">See more</h2></button>
      </div>
  </div>
</template>

<script>
export default {
    name: "ItemCard",
    props: ['title', 'description', 'imageUrl'],

    mounted:function(){
        let svg = this.$el.querySelector("svg")
        svg.style.position = "absolute"
        svg.style.left = "0"
        svg.style.right = "0"
        svg.style.top = "0"
        svg.style.marginLeft = "auto"
        svg.style.marginRight = "auto"
    },
}

</script>

<style scoped>
  div {
      background: var(--color-background-soft);
      border-radius: 10px;
      margin: 30px 70px;
  }

  * {
      text-align: center;
  }

  img {
      width: 100%;
      border-radius: 10px;
  }

  #imageContainer {
      margin-top: 200px;
  }

  h1 {
      font-family: SFPro;
      font-weight: bold;
      font-size: 40px;
  }

  span {
      font-family: SFPro,serif;
      font-weight: 100;
      font-size: 30px;
  }

  button {
      border-top-left-radius: 100px;
      border-top-right-radius: 100px;
      padding: 5px 20px;
      background: var(--color-background-soft);
      position: absolute;
      border: none;
      margin: 0;
      bottom: 0;
      left: 50%;
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      -webkit-transition: width 400ms, border-radius 700ms;
      -moz-transition: width 400ms, border-radius 700ms;
      transition: width 400ms, border-radius 700ms;
      width: 50%;
  }

  button:hover {
      cursor: pointer;
      width: 100%;
      border-radius: 0;
      -webkit-transition: width 400ms, border-radius 700ms;
      -moz-transition: width 400ms, border-radius 700ms;
      transition: width 400ms, border-radius 700ms;
  }

  h2 {
      font-family: SFPro,serif;
      font-size: 15px;
      font-weight: 200;
      color: white;
  }
</style>