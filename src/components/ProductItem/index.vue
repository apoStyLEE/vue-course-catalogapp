<template>
  <a-card hoverable style="width: 240px">
    <template #cover>
      <img
        src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSjybbFJ99lz-EiAsE0XA5I8qPx5VdeyCdVUAX1o3Cnd6xTaZKBcaluujD2VsSwH1HoGWuTaLGa&usqp=CAE"
      />
    </template>
    <a-card-meta :title="product.title">
      <template #description> {{ product.price }} {{ product.currency }} </template>
    </a-card-meta>

    <template #actions v-if="authStore.isAuth">
      <a-button type="primary" @click="handleAddCart(product)">Sepete Ekle</a-button>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import type { IProduct } from '@/models/Product'
import cartService from '@/services/cartService'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

defineProps<{
  product: IProduct
}>()

const handleAddCart = async (product: IProduct) => {
  await cartService.addCartItem(authStore.userId, product.id)
  alert('ürün başariyla eklendi.')
}
</script>
