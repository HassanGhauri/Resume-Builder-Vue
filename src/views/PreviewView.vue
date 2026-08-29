<!-- src/views/PreviewView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Resume Preview</h1>
      <div class="flex space-x-3">
        <button @click="exportPDF" class="btn-primary">
          ⬇️ Download Resume
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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const store = useResumeStore()

const exportPDF = async () => {
  const source = document.querySelector('#resume-content')

  if (!source) {
    alert('No resume content to export. Please add information first.')
    return
  }

  if (!source.innerHTML || source.innerHTML.trim() === '') {
    alert('Resume content is empty. Please add information first.')
    return
  }

  try {
    // Force Vue to fully render before capture
    await new Promise(resolve => setTimeout(resolve, 500))

    // Step 1: Capture the resume as a canvas image
    const canvas = await html2canvas(source, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: 794,
      windowHeight: 1123
    })

    // Step 2: Get canvas dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const renderedHeightMm = (canvasHeight * imgWidth) / canvasWidth
    const toleranceMm = 2

    // Step 3: Create PDF
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    })

    // Step 4: Split a tall capture into A4-sized slices so the PDF does not repeat the same resume on multiple pages.
    // A small tolerance avoids generating a blank second page for content that is visually a single page.
    const shouldSplitPages = renderedHeightMm > pageHeight + toleranceMm

    if (!shouldSplitPages) {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, renderedHeightMm)
    } else {
      const maxSliceHeightPx = Math.ceil((pageHeight / renderedHeightMm) * canvasHeight)
      const totalPages = Math.ceil(canvasHeight / maxSliceHeightPx)

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startY = pageIndex * maxSliceHeightPx
        const remainingHeight = canvasHeight - startY
        const sliceHeight = Math.min(maxSliceHeightPx, remainingHeight)

        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvasWidth
        pageCanvas.height = sliceHeight

        const ctx = pageCanvas.getContext('2d')
        ctx.drawImage(canvas, 0, startY, canvasWidth, sliceHeight, 0, 0, canvasWidth, sliceHeight)

        const pageImgData = pageCanvas.toDataURL('image/png')
        const pageImgHeightMm = (sliceHeight * imgWidth) / canvasWidth

        if (pageIndex > 0) {
          pdf.addPage()
        }

        pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, pageImgHeightMm)
      }
    }

    // Step 5: Save PDF
    pdf.save(`${(store.fullName || 'resume').trim() || 'resume'}.pdf`)
  } catch (error) {
    console.error('PDF export error:', error)
    alert('Failed to generate PDF. Error: ' + error.message)
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
</style>