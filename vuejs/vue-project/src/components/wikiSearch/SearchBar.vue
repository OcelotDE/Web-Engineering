<template>
  <form>
    <input
      type="text"
      name="requestText"
      id="searchBar"
      v-model="searchBarText"
      autocomplete="off"
    />
    <button type="button" @click="runSearch()"><div class="icon"></div></button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  components: {},
  props: ["currentSearchText"],
  data() {
    return {
      searchBarText: "",
    };
  },
  methods: {
    runSearch: function () {
      console.log("search requested");
      this.$emit("searchRequested");
    },
  },
  watch: {
    searchBarText: function () {
      console.log("changed");
      this.$emit("searchValueChanged", this.searchBarText);
    },
    currentSearchText: function () {
      this.searchBarText = this.currentSearchText;
    },
  },
};
</script>

<style scoped>
form {
  background-color: var(--color-background);
  border-radius: 30px;
  padding: 10px;
  margin: 10px;
  border: 1px solid var(--accent-c-pink-full-visibility);
  box-shadow: 0px 0 15px var(--accent-c-pink-low-visibility);
}
input {
  color: var(--color-text);
  font-family: SFPro, serif;
  font-weight: 200;
  font-size: 15px;
  background: none;
  border: none;
  line-height: 20px;
  text-align: center;
  outline: none;
}

.icon {
  height: 20px;
  width: 20px;
  background-color: var(--color-text);
  -webkit-mask: url(../../assets/search.svg) no-repeat center;
  mask: url(../../assets/search.svg) no-repeat center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-100%, -50%);
  box-shadow: none;
}
</style>
