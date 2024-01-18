<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Sepetim</a-breadcrumb-item>
  </a-breadcrumb>

  <a-divider></a-divider>

  <a-table :dataSource="cart" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'amount'">
        <a-input
          v-model:value="record.amount"
          type="number"
          @change="handleChangeAmount(record.amount, record)"
        />
      </template>

      <template v-if="column.dataIndex === 'actions'">
        <a-button type="primary" @click="handleRemove(record)">Sil</a-button>
      </template>
    </template>

    <template #footer
      ><strong>Toplam: {{ cartSum }} $</strong></template
    >
  </a-table>
</template>

<script lang="ts" setup>
import cartService from '@/services/cartService'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()

const cart = ref()

const columns = [
  {
    title: 'Product',
    dataIndex: ['products', 'title']
  },
  {
    title: 'Price',
    dataIndex: ['products', 'price'],
    width: '100px'
  },
  {
    title: '',
    dataIndex: ['products', 'currency'],
    width: '100px'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '100px'
  },
  {
    dataIndex: 'actions',
    width: '100px'
  }
]

const handleRemove = async (cartItem: any) => {
  await cartService.removeCartItem(authStore.userId, cartItem.id)
  await loadData()
}

const handleChangeAmount = async (amount: any, cartItem: any) => {
  await cartService.updateAmount(authStore.userId, cartItem.id, amount)
  await loadData()
}

const loadData = async () => {
  const { data } = await cartService.getCart(authStore.userId)
  cart.value = data
}

const cartSum = computed(() => {
  return cartService.calculateCartItemSum(cart.value)
})

onMounted(async () => {
  await loadData()
})
</script>
