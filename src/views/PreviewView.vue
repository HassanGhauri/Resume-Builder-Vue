<!-- src/views/PreviewView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Resume Preview</h1>
      <div class="flex space-x-3">
        <button @click="exportPDF" class="btn-primary">
          🖨️ Print / Save as PDF
        </button>
        <router-link to="/builder" class="btn-secondary">
          ← Edit
        </router-link>
      </div>
    </div>

    <!-- Use the ResumePreview component -->
    <div class="resume-wrapper">
      <ResumePreview />
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../stores/resumeStore'
import ResumePreview from '../components/preview/ResumePreview.vue'

const store = useResumeStore()

const exportPDF = () => {
  if (!document.querySelector('#resume-content')) {
    alert('No resume content to export. Please add information first.')
    return
  }
  window.print()
}
</script>

<style scoped>
.resume-wrapper {
  background: #e5e7eb;
  padding: 2rem;
  border-radius: 12px;
}

/* Dark mode */
.dark .resume-wrapper {
  background: #1a1a2e;
}
</style>