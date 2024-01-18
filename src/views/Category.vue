<template>
  <a-breadcrumb v-if="category">
    <a-breadcrumb-item>Kategoriler</a-breadcrumb-item>
    <a-breadcrumb-item active>{{ category.title }}</a-breadcrumb-item>
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

<script setup lang="ts">
import type { IProduct } from '@/models/Product'
import categoryService from '@/services/categoryService'
import productService from '@/services/productService'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductItem from '@/components/ProductItem/index.vue'

const route = useRoute()
const products = ref<IProduct[] | null>()
const loading = ref(true)

const category = ref()

const loadProducts = async () => {
  loading.value = true

  const categoryId = route.params.id
  const productsData = await productService.getProducts(categoryId)
  const { data: categoryData } = await categoryService.getCategory(categoryId)

  products.value = productsData
  category.value = categoryData

  loading.value = false
}

watch(
  () => route.params.id,
  async () => await loadProducts()
)

onMounted(async () => {
  await loadProducts()
})
</script>
