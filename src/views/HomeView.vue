<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Ana Sayfa</a-breadcrumb-item>
  </a-breadcrumb>

  <a-divider></a-divider>

  <a-skeleton v-if="loading" />
  <div v-else>
    <a-empty v-if="!products" description="Bu kategoriye ait ürün bulunamadi." />

    <a-row :gutter="16" v-else>
      <a-col :span="4" v-for="product in products" :key="product.id">
        <product-item :product="product" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import productService from '@/services/productService'
import ProductItem from '@/components/ProductItem/index.vue'

const products = ref()
const loading = ref(true)

onMounted(async () => {
  const productsData = await productService.getAllProducts()
  products.value = productsData
  loading.value = false
})
</script>
