<!-- src/components/preview/ResumePreview.vue -->
<template>
  <div id="resume-content" :style="containerStyles">
    <!-- Loading State -->
    <div v-if="!hasData" class="text-center py-16" :style="{ backgroundColor: '#ffffff' }">
      <span class="text-6xl mb-4 block">📄</span>
      <h3 class="text-xl font-semibold text-gray-700">No Resume Data</h3>
      <p class="text-gray-500 mt-2">Add your information to see the preview</p>
      <router-link to="/builder" class="btn-primary inline-block mt-4">
        Add Information →
      </router-link>
    </div>
    
    <!-- Render the selected template -->
    <TemplateRenderer v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'
import TemplateRenderer from './TemplateRenderer.vue'

const store = useResumeStore()

const hasData = computed(() => store.hasData)

const containerStyles = computed(() => {
  return { 
    background: '#ffffff',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    width: '210mm',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
</script>