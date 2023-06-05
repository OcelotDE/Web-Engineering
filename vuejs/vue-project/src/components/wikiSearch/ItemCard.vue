<template>
  <div class="flexDiv" :class="{ flexFull: showDescription }">
    <div class="itemCard">
      <div id="itemThumbnail">
        <!--<img src="" alt="Item header image">-->
        <h1>{{ title }}</h1>
      </div>
      <div>
        <p :class="{ showing: showDescription, hidden: !showDescription }">
          {{ description }}
          <button class="readmoreBtn" @click="openWikiArticle()">
            Read more...
          </button>
        </p>
        <button class="expandBtn" type="button" @click="toggleDescription()">
          {{ showDescription ? "Collapse" : "Expand" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ItemCard",
  props: ["title", "description", "pageid"],
  setup() {
    const showDescription = ref(false);
    return {
      showDescription,
    };
  },
  methods: {
    toggleDescription: function () {
      this.showDescription = !this.showDescription;
    },
    imageFetch: async function () {
      // fetch image from api
      const response = await fetch(
        "https://de.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&prop=pageimages%7Cpageterms&pithumbsize=1000&titles=" +
          this.title +
          "&origin=*"
      );

      const json = await response.json();

      // set image of card to wiki image
      this.$el.querySelector(
        "#itemThumbnail"
      ).style.backgroundImage = `URL(${json.query?.pages[0]?.thumbnail?.source})`;
    },
    openWikiArticle: function () {
      window.open(`https://de.wikipedia.org/?curid=${this.pageid}`);
    },
  },
  watch: {
    title: function () {
      this.imageFetch();
    },
  },
  mounted: function () {
    this.imageFetch();
  },
};
</script>

<style scoped>
.itemCard {
  background-color: var(--color-background);
  border-radius: 10px;
  margin: 0 30px;
  padding-top: 10px;
  animation: fadeIn ease-in-out 2000ms;
  border: 1px solid var(--accent-c-pink-verylow-visibility);
  box-shadow: 0px 0 15px var(--accent-c-pink-verylow-visibility);
}

.itemCard > div:first-child {
  max-width: 200px;
}

.itemCard > div:nth-child(2) {
  padding: 10px;
}

.itemCard > div > img {
  width: 100%;
}

#itemThumbnail {
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
}
#itemThumbnail > h1 {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  overflow-wrap: break-word;
  color: var(--vt-c-white);
}

h1 {
  text-align: center;
  font-family: SFPro, serif;
  font-weight: bold;
}

p {
  overflow: hidden;
  display: inline-block;
  transition: max-height 1s;
}

.hidden {
  max-height: 0;
}

.showing {
  max-height: 1000px;
}

button {
  cursor: pointer;
}

.expandBtn {
  border-radius: 5px;
  padding: 10px 80px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  font-family: SFPro, serif;
  font-weight: 200;
  color: var(--color-text);
  display: block;
  margin: auto;
  font-size: 14px;
}

.readmoreBtn {
  color: #00acf4;
  background: none;
  border: none;
}

.flexDiv {
  flex: 1 1 0;
  margin-top: 30px;
  transition: all 1s;
}

.flexFull {
  flex: 3;
}

@keyframes fadeIn {
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
