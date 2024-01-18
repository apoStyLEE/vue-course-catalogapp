<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { reactive } from 'vue'

const authStore = useAuthStore()

const loginForm = reactive({
  userName: '',
  password: ''
})

const handleLogin = async () => {
  const isAuth = await authStore.login(loginForm.userName, loginForm.password)

  if (isAuth) {
    location.href = '/'
  } else {
    alert('user not found')
  }
}
</script>

<template>
  <a-layout>
    <a-layout-header style="color: white"><h1>Login</h1></a-layout-header>
    <a-layout-content style="width: 500px; padding: 50px">
      <a-form name="basic" autocomplete="off" @submit="handleLogin">
        <a-form-item label="Username" name="username">
          <a-input v-model:value="loginForm.userName" />
        </a-form-item>

        <a-form-item label="Password" name="password">
          <a-input-password v-model:value="loginForm.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form></a-layout-content
    >
  </a-layout>
</template>
