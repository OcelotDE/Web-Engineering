<template>
  <div>
    <h1>Top 10 Tagesschau Nachrichten</h1>
    <div v-for="(newsItem, index) in newsItems" :key="index" class="item">
      <p>Veröffentlicht am {{ newsItem.published }}</p>
      <h2>{{ newsItem.title }}</h2>
      <p>{{ newsItem.description }}</p>
      <br />
      <img :src="newsItem.imageUrl" alt="News Image" />
      <a class="default-button" :href="newsItem.link">Weitere Details</a>
    </div>
    <h1>Top 10 Heise Nachrichten</h1>
    <div v-for="(newsItem, index) in heiseItems" :key="index" class="item">
      <p>Veröffentlicht am {{ newsItem.published }}</p>
      <h2>{{ newsItem.title }}</h2>
      <p>{{ newsItem.description }}</p>
      <br />
      <img :src="newsItem.imageUrl" alt="News Image" />
      <a class="default-button" :href="newsItem.link">Weitere Details</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsItems: [],
      heiseItems: [],
    };
  },
  mounted() {
    this.fetchNews();
    this.fetchHeise();
  },
  methods: {
    fetchNews() {
      const apiUrl = "https://www.tagesschau.de/api2/news";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const items = data.news.slice(0, 10); // Begrenze auf die Top 10 Nachrichten
          items.forEach((item) => {
            const title = item.title;
            const description = item.firstSentence;
            const link = item.detailsweb;
            const published = item.date;
            const imageUrl = item.teaserImage.imageVariants["16x9-384"];
            this.newsItems.push({
              title: title,
              description: description,
              published: published,
              imageUrl: imageUrl,
              link: link,
            });
          });
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Nachrichten:", error);
        });
    },
    fetchHeise: async function () {
      try {
        const response = await fetch("https://www.heise.de/rss/heise-atom.xml");
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const items = xmlDoc.getElementsByTagName("entry");

        console.log(items);

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const title = item.getElementsByTagName("title")[0].textContent;
          const link = item
            .getElementsByTagName("link")[0]
            .outerHTML.split('"')[3];
          const published =
            item.getElementsByTagName("published")[0].textContent;
          const description =
            item.getElementsByTagName("summary")[0].textContent;
          const content = item.getElementsByTagName("content")[0].textContent;
          const imageUrl = this.extractImageUrlFromDescription(content);

          this.heiseItems.push({
            title: title,
            description: description,
            published: published,
            imageUrl: imageUrl,
            link: link,
          });

          if (this.heiseItems.length >= 10) {
            break; // Begrenze auf die Top 10 Nachrichten
          }
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Heise-Nachrichten:", error);
      }
    },
    extractImageUrlFromDescription: function (description) {
      const parser = new DOMParser();
      const descriptionDoc = parser.parseFromString(description, "text/html");
      const imgElement = descriptionDoc.querySelector("img");

      if (imgElement) {
        return imgElement.src;
      }

      return "";
    },
  },
};
</script>

<style scoped>
a {
  margin: 0;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
}

a:hover {
  margin: 0;
}

h1,
h2,
p {
  text-align: center;
}

img {
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-background);
  border-radius: 10px;
  margin: 30px 0;
  padding-top: 10px;
  animation: fadeIn ease-in-out 2000ms;
  border: 1px solid var(--accent-c-pink-full-visibility);
  box-shadow: 0px 0 15px var(--accent-c-pink-verylow-visibility);
}

.item {
  background-color: var(--color-background-mute);
  margin: 5%;
  width: 90%;
  border-radius: var(--border-radius);
}
</style>
