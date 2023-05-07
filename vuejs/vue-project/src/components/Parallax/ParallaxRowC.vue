<template>
    <div :class="{ filledBg: filledBackground }" class="sectionDiv">
        <div class="contentDiv">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: "ParallaxRowC",
    props: {
        filledBackground: Boolean
    }
}
</script>

<style scoped>
.contentDiv {
    /*height: 100%;*/
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 10%;
}

.sectionDiv {
    z-index: 10;
    /*height: 80vh;*/
  height: 80vw;
}

.filledBg {
    background-color: var(--color-background-mute);
  height: 40vw;
}
</style>