<template>
  <div class="backgroundContainer">
    <img :src="productImagePath" alt="">
    <div class="content">
      <h1>{{ productName }}</h1>
      <hr>
      <p>Features</p>
      <ul v-for="feature in features">
        <li>{{ feature }}</li>
      </ul>
    </div>
    <slot/>
    <button>Add to cart</button>
    <h2>{{ price }} €</h2>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    productName: String,
    description: String,
    productImagePath: String,
    price: Number,
    features: [String]
  }
}
</script>

<style scoped>

h1 {
  color: var(--accent-c-pink-full-visibility);
  padding: 0 5px;
}

h2 {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.content {
  top: 20%;
}

.backgroundContainer {
  height: 600px;
  width: 20vw;
  background-color: var(--color-background-soft);
  border-radius: 20px;
  margin: 20px;
  margin-top: 60px;
  text-align: center;
  position: relative;
  transition: box-shadow 400ms;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 350px;
}

.backgroundContainer:hover {
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);
  transition: box-shadow 400ms;
}

img {
  width: 100%;
  top: -10%;
  position: absolute;
  transform: translateX(-50%);
}

button {
  padding: 10px;
  border-radius: 10px;
  background-color: var(--color-background);
  border: 1px solid var(--accent-c-pink-full-visibility);
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);
  color: var(--color-text);
  text-transform: uppercase;
  font-family: SFPro, sans-serif;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 30px;
  transition: padding 400ms;
}

button:hover {
  padding: 15px;
  transition: padding 400ms;
}

hr {
  margin: 3% 30%;
  border: 0;
  border-top: 1px solid var(--vt-c-divider-dark-1)
}

ul {
  text-align: left;
}
</style>