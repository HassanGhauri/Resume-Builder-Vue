<!-- src/views/PreviewView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Resume Preview</h1>
      <div class="flex space-x-3">
        <button @click="exportPDF" class="btn-primary">
          📄 Download PDF
        </button>
        <router-link to="/builder" class="btn-secondary">
          ← Edit
        </router-link>
      </div>
    </div>

    <div id="resume-content" class="card bg-white">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">{{ store.fullName || 'Your Name' }}</h1>
        <p class="text-gray-600">
          {{ store.data.personal.email }} 
          <span v-if="store.data.personal.phone">• {{ store.data.personal.phone }}</span>
        </p>
        <p class="text-gray-600">
          {{ store.data.personal.location }}
          <span v-if="store.data.personal.linkedin">• {{ store.data.personal.linkedin }}</span>
        </p>
      </div>

      <div v-if="store.data.personal.summary" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Summary</h2>
        <p class="text-gray-700">{{ store.data.personal.summary }}</p>
      </div>

      <div v-if="store.data.experience.length" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
        <div v-for="(exp, index) in store.data.experience" :key="index" class="mb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">{{ exp.position }}</h3>
              <p class="text-indigo-600">{{ exp.company }}</p>
            </div>
            <p class="text-sm text-gray-500">
              {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
            </p>
          </div>
          <p class="text-gray-600 mt-1">{{ exp.description }}</p>
        </div>
      </div>

      <!-- Similar sections for Education, Skills, Projects -->
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../stores/resumeStore'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const store = useResumeStore()

const exportPDF = async () => {
  const element = document.getElementById('resume-content')
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('resume.pdf')
}
</script>