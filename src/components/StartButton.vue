<script setup>
import { ref } from "vue";

const emit = defineEmits(['select'])

const show = ref(true)

function handleClick() {

    show.value = false

    emit('click')

}
</script>

<template>
    <Transition name="button">
        <button v-if="show" @click="handleClick">
            <slot>Button Text</slot>
        </button>
    </Transition>
</template>

<style scoped>
.button-enter-from,
.button-leave-to {
    opacity: 0;
    transform: scale(1.5);
}
.button-enter-active,
.button-leave-active {
  transition: all 0.5s ease;
}
</style>