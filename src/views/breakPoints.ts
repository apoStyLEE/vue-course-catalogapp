import { ref, watch, reactive } from 'vue'

export function useBreakPoints() {
  const width = ref(window.innerWidth)

  const breakPoints = reactive({
    sm: false,
    md: false,
    lg: false
  })

  watch(width, (currentWindowWidth) => {
    breakPoints.sm = currentWindowWidth <= 800
    breakPoints.md = currentWindowWidth > 800 && currentWindowWidth < 1200
    breakPoints.lg = currentWindowWidth > 1200
  })

  window.addEventListener('resize', function () {
    const currentWindowWidth = window.innerWidth
    width.value = currentWindowWidth
  })

  return {
    breakPoints,
    width
  }
}
