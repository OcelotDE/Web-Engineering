<script>
import { Configuration, OpenAIApi } from "openai";

import SearchBar from "@/components/SearchBar.vue";
import PageHeader from "@/components/PageHeader.vue";
import {ref} from "vue";
import PropositionsBox from "@/components/PropositionsBox.vue";
import ItemsContainer from "@/components/ItemsContainer.vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
    components: {NavigationBar, ItemsContainer, PropositionsBox, SearchBar, PageHeader},

    data() {
        return {
            propositionsTimer: 0,
            searchText: ""
        }
    },

    setup() {
        const searchResultsList = ref([])
        const propositions = ref([])

        return {
            searchResultsList,
            propositions
        }
    },

    methods: {
        runSearch: function () {
            this.fetchWikipedia()
        },

        fetchWikipedia: async function () {
            console.log("fetching...")
            const response = await fetch("https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&redirects=1&gpssearch=" + this.searchText + "&origin=*&prop=extracts")

            const json = await response.json()
            console.log(json)

            this.searchResultsList = json?.query?.pages
            console.log(this.searchResultsList)
        },

        getPropositions: async function (searchBarValue) {
            if (searchBarValue === "") return;

            if (this.propositionsTimer > 0) {
                this.propositionsTimer = 0
            } else {
                while(this.propositionsTimer < 10) {
                    await this.sleep(10)
                    this.propositionsTimer++
                }
                this.propositionsTimer = 0

                try {
                    const response = await fetch("https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&redirects=1&gpssearch=" + searchBarValue + "&origin=*")

                    const json = await response.json()

                    if (json.batchcomplete !== "") {
                        this.propositions = json.query.pages
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },

        changeSearchText: function(newText) {
            this.searchText = newText


            this.getPropositions(newText)
        },

        sleep: function(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
    }
}

</script>

<template>
    <NavigationBar/>
    <PageHeader/>
    <div class="searchDiv">
        <SearchBar @searchRequested="runSearch()" @searchValueChanged="changeSearchText($event)" :currentSearchText="this.searchText"/>
    </div>
    <div class="searchDiv">
        <PropositionsBox :propositions="propositions" @propositionSelected="changeSearchText($event)"></PropositionsBox>
    </div>
    <ItemsContainer :searchResultsList="searchResultsList"></ItemsContainer>
</template>

<style>
.searchDiv {
    display: flex;
    justify-content: center;
    background-color: var(--color-background-mute);
}
</style>