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
            propositionsTimer: 0
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
            const searchText = document.getElementById("searchBar").value

            this.fetchWikipedia(searchText)
        },

        fetchWikipedia: async function (searchText) {
            console.log("fetching...")
            const response = await fetch("https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&redirects=1&gpssearch=" + searchText + "&origin=*&prop=extracts")

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
                    console.log(this.propositionsTimer)
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
            document.getElementById("searchBar").value = newText

            this.getPropositions(newText)
        },

        sleep: function(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        },

        chatgpt: async function () {
            const configuration = new Configuration({
                apiKey: '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'
            })
            const openai = new OpenAIApi(configuration)
            let conversationLog = [{ role: 'system', content: "You are a friendly chatbot." }]

            conversationLog.push({
                role: 'user',
                content: "How are you?"
            })

            const result = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: conversationLog
            })

            console.log(result.data.choices)
        }
    },
    mounted: function () {
        this.chatgpt()
    }
}

</script>

<template>
    <NavigationBar/>
    <PageHeader/>
    <div class="searchDiv">
        <SearchBar @searchRequested="runSearch()" @searchValueChanged="getPropositions($event)"/>
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