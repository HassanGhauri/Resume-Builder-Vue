<!-- src/components/common/AppHeader.vue -->
<template>
  <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <router-link to="/" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Crescent<span class="text-gray-800 dark:text-gray-200">Resume</span>
        </router-link>
        <div class="hidden md:flex space-x-4 ml-8">
          <router-link to="/builder" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Builder
          </router-link>
          <router-link to="/preview" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Preview
          </router-link>
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <span v-if="store.isSaving" class="text-sm text-gray-500 dark:text-gray-400">
          <span class="inline-block animate-pulse">Saving...</span>
        </span>
        <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span v-if="isDark" class="text-2xl">☀️</span>
          <span v-else class="text-2xl">🌙</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Load saved theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>