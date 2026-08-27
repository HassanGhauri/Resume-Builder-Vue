<!-- src/components/common/AppHeader.vue -->
<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <router-link to="/" class="text-2xl font-bold text-indigo-600">
          Resume<span class="text-gray-800">Builder</span>
        </router-link>
        <div class="hidden md:flex space-x-4 ml-8">
          <router-link to="/builder" class="text-gray-600 hover:text-indigo-600 transition">
            Builder
          </router-link>
          <router-link to="/preview" class="text-gray-600 hover:text-indigo-600 transition">
            Preview
          </router-link>
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <span v-if="store.isSaving" class="text-sm text-gray-500">
          <span class="inline-block animate-pulse">Saving...</span>
        </span>
        <span class="text-sm text-gray-600">
          {{ store.completionPercentage }}% complete
        </span>
        <button @click="toggleDarkMode" class="p-2 rounded-lg hover:bg-gray-100">
          🌓
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
</script>