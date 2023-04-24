<template>
  <ul>
      <li v-for="proposition in propositions" @click="propositionSelected(proposition.title)">{{ proposition.title }}</li>
  </ul>
</template>

<script>
export default {
    name: "PropositionsBox",
    props: ['propositions'],
    methods: {
        propositionSelected: function (propositionTitle) {
            this.$emit('propositionSelected', propositionTitle)
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    display: inline-block;
    padding: 5px;
    margin: 5px 0 5px 5px;
    border-radius: 5px;
    background-color: var(--color-background);
    cursor: pointer;
    font-size: 10px;
}
</style>