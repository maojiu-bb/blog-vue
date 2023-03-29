import { ref } from 'vue'

export const useSwitch = () => {
  const value = ref(false)
  let theme = localStorage.getItem('theme')
    ? JSON.parse(localStorage.getItem('theme')!)
    : 'light'
  document.documentElement.setAttribute('theme', theme)
  const changeSwitch = () => {
    if (value.value === false) {
      document.documentElement.setAttribute('theme', 'light')
      localStorage.setItem('theme', JSON.stringify('light'))
    } else {
      document.documentElement.setAttribute('theme', 'dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    }
  }
  if (theme === 'light') {
    value.value = false
  } else if (theme === 'dark') {
    value.value = true
  }

  return {
    value,
    changeSwitch
  }
}
