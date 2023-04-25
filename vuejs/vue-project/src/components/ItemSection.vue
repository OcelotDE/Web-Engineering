<template>
    <section>
        <ItemCard>
            <slot/>
        </ItemCard>
    </section>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";
export default {
    name: "ItemSection",
    props: ['isEven'],
    components: {ItemCard},

}
</script>


<style scoped>
section {
    height: 50vh;
    width: 100%;
    background-color: var(--color-background-soft);
}
</style>