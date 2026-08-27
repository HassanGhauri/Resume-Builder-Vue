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

    <!-- Use the ResumePreview component -->
    <div ref="resumeRef">
      <ResumePreview />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../stores/resumeStore'
import ResumePreview from '../components/preview/ResumePreview.vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const store = useResumeStore()
const resumeRef = ref(null)

const exportPDF = async () => {
  try {
    // Get the resume content element
    const element = document.querySelector('#resume-content')
    
    if (!element) {
      alert('No resume content to export. Please add information first.')
      return
    }

    // Show loading state
    const exportBtn = document.activeElement
    exportBtn.textContent = '⏳ Generating...'
    exportBtn.disabled = true

    // Generate canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    
    // Download PDF
    pdf.save(`${store.fullName || 'resume'}.pdf`)
    
    // Reset button
    exportBtn.textContent = '📄 Download PDF'
    exportBtn.disabled = false
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  }
}
</script>

<style scoped>
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>