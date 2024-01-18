import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCardStore = defineStore('shoppingcard', () => {
  const items = ref([] as any)

  function addItem(item: any) {
    items.value.push(item)
  }

  function getCount() {
    return items.value.length
  }

  return { items, addItem, getCount }
})
