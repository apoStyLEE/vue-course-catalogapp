import { ref } from 'vue'

export function useFetch<T>(path: string) {
  const response = ref<T>()
  const loading = ref<boolean>(true)
  const error = ref<Error>()

  fetch(`https://jsonplaceholder.typicode.com${path}`)
    .then((response) => response.json())
    .then((jsonData) => {
      response.value = jsonData
      loading.value = false
    })
    .catch((e) => (error.value = e))

  return {
    response,
    loading,
    error
  }
}
