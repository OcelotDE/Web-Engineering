<template>
  <div class="itemsContainer">
      <ItemCard v-for="searchResult in searchResultsList" :title="searchResult.title" :description="searchResult.extract" :pageid="searchResult.pageid"></ItemCard>
  </div>
</template>

<script>
import ItemCard from "@/components/wikiSearch/ItemCard.vue";

export default {
    name: "ItemsContainer",
    components: {ItemCard},
    props: ['searchResultsList']
}
</script>

<style scoped>
.itemsContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
}
</style>