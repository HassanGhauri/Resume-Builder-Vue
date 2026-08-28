<!-- src/views/PreviewView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Resume Preview</h1>
      <div class="flex space-x-3">
        <button @click="exportPDF" class="btn-primary" :disabled="isGeneratingPDF">
          {{ isGeneratingPDF ? '⏳ Generating...' : '📄 Download PDF' }}
        </button>
        <router-link to="/builder" class="btn-secondary">
          ← Edit
        </router-link>
      </div>
    </div>

    <!-- Use the ResumePreview component -->
    <div ref="resumeRef" class="resume-wrapper">
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
const isGeneratingPDF = ref(false)

const exportPDF = async () => {
  if (isGeneratingPDF.value) return
  
  try {
    isGeneratingPDF.value = true
    
    // Get the resume content element
    const element = document.querySelector('#resume-content')
    
    if (!element) {
      alert('No resume content to export. Please add information first.')
      isGeneratingPDF.value = false
      return
    }

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true)
    
    // Remove all unnecessary styles from the clone
    clone.style.boxShadow = 'none'
    clone.style.borderRadius = '0'
    clone.style.padding = '0'
    clone.style.margin = '0'
    clone.style.width = '210mm'
    clone.style.minHeight = '297mm'
    clone.style.backgroundColor = '#ffffff'
    clone.style.overflow = 'visible'
    clone.style.transform = 'none'
    clone.style.transformOrigin = 'none'
    clone.style.position = 'relative'
    clone.style.top = '0'
    clone.style.left = '0'
    
    // Remove any background gradients or extra styling
    clone.style.background = '#ffffff'
    
    // Create a temporary container positioned off-screen
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.style.width = '210mm'
    container.style.backgroundColor = '#ffffff'
    container.style.padding = '0'
    container.style.margin = '0'
    container.style.zIndex = '9999'
    container.style.boxSizing = 'border-box'
    
    // Append the clone to the container
    container.appendChild(clone)
    document.body.appendChild(container)
    
    // Wait for the clone to render
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Generate canvas from the clone
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
      allowTaint: false,
      useCORS: true,
      onclone: (document) => {
        // Ensure all elements are visible
        const elements = document.querySelectorAll('*')
        elements.forEach(el => {
          el.style.visibility = 'visible'
          el.style.opacity = '1'
        })
      }
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate image dimensions to fill the entire A4 page
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // Add image to PDF - filling the entire page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    
    // Download PDF
    pdf.save(`${store.fullName || 'resume'}.pdf`)
    
    // Clean up
    document.body.removeChild(container)
    isGeneratingPDF.value = false
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
    isGeneratingPDF.value = false
  }
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

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>