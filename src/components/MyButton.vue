<template>
  <button :class="color" @click="clickMyButton">
    <slot>My button</slot>
    <span><slot name="icon"></slot></span>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  color: 'red' | 'blue' | 'yellow'
}>()

const emits = defineEmits(['onMyButtonClick'])

function clickMyButton() {
  emits('onMyButtonClick', '111')
}
</script>

<style scoped>
button {
  margin-top: 300px;
  font-size: 40px;
}

span {
  border: 2px solid red;
}

.yellow {
  background-color: yellow;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
</style>
