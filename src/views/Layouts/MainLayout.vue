<template>
  <a-layout style="height: 100vh">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div class="logo"><router-link to="/">Catalog</router-link></div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item :key="category.id" v-for="category in categories">
          <user-outlined />
          <router-link :to="'/category/' + category.id" class="nav-text">{{
            category.title
          }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        :style="{ background: '#fff', padding: 0, 'text-align': 'right', 'margin-right': '10px' }"
      >
        <a-dropdown-button v-if="authStore.isAuth">
          {{ authStore.user?.displayName }}
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <router-link to="/cart" type="primary">Sepet</router-link>
              </a-menu-item>
              <a-menu-item key="2" @click="handleLogout"> Logout </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown-button>
        <a-button v-else type="primary" @click="$router.push('/login')">Login</a-button>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { onMounted } from 'vue'
import categoryService from '@/services/categoryService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const categories = ref()

const handleLogout = async () => {
  await authStore.logout()
}

onMounted(async () => {
  const { data } = await categoryService.getCategories()
  categories.value = data
})
</script>
<style scoped>
.logo {
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: white;
  font-size: 24px;
  padding: 5px;
  border-radius: 5px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>
