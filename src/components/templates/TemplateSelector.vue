<!-- src/components/templates/TemplateSelector.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Template</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Select a template that best represents your professional style.</p>

    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="template in templates" 
        :key="template.id"
        @click="selectTemplate(template.id)"
        class="template-card border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
        :class="[
          store.activeTemplate === template.id ? 'border-indigo-600 ring-2 ring-indigo-600 dark:ring-indigo-400' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500'
        ]"
      >
        <!-- Template Preview Card with Gradient -->
        <div class="preview-container bg-gray-50 dark:bg-gray-800 relative overflow-hidden" style="height: 260px;">
          <!-- Gradient Preview -->
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br" :class="template.previewGradient">
            <div class="text-center text-white p-4">
              <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span class="text-3xl">{{ template.icon }}</span>
              </div>
              <h3 class="font-bold text-lg">{{ template.name }}</h3>
              <p class="text-white/80 text-sm mt-1">{{ template.description }}</p>
              <div class="mt-3 flex justify-center gap-2">
                <span v-for="tag in template.tags" :key="tag"
                      class="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Selected Badge -->
          <div v-if="store.activeTemplate === template.id" 
               class="absolute top-2 left-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded-full text-[8px] font-semibold shadow-md z-10">
            ✓ Selected
          </div>
          
          <!-- Preview PDF Button - Eye Icon with Loading State -->
          <button 
            @click.stop="previewTemplate(template.id)"
            class="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition z-10 group"
            :class="{ 'pointer-events-none opacity-50': loadingTemplate === template.id }"
            :title="loadingTemplate === template.id ? 'Generating PDF...' : 'Preview as PDF'"
          >
            <!-- Loading Spinner -->
            <svg v-if="loadingTemplate === template.id" 
                 class="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" 
                 fill="none" 
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <!-- Eye Icon -->
            <svg v-else class="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        <div class="p-3 bg-white dark:bg-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-xs text-gray-900 dark:text-white">{{ template.name }}</h3>
              <p class="text-[10px] text-gray-500 dark:text-gray-400">{{ template.category }}</p>
            </div>
            <div class="flex items-center space-x-1.5">
              <button 
                v-if="store.activeTemplate === template.id"
                class="bg-indigo-600 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-medium"
              >
                ✓ Selected
              </button>
              <button 
                v-else
                @click.stop="selectTemplate(template.id)"
                class="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-2.5 py-0.5 rounded-lg text-[10px] font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay (Optional - shows when any template is loading) -->
    <div v-if="loadingTemplate" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div class="text-center">
          <!-- Spinner -->
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-4">Generating PDF Preview</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Please wait while we prepare your template...</p>
          <div class="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-600 h-1.5 rounded-full animate-pulse" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Customization -->
    <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-4">Template Customization</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Customize the look of your resume. Changes are applied in real-time.
      </p>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <label class="form-label">Primary Color</label>
          <div class="flex items-center space-x-2">
            <input 
              :value="store.templateSettings.primaryColor"
              @input="updateColor($event.target.value)"
              type="color"
              class="w-12 h-12 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
            />
            <input 
              :value="store.templateSettings.primaryColor"
              @input="updateColor($event.target.value)"
              type="text"
              class="form-input flex-1"
              placeholder="#4F46E5"
            />
          </div>
        </div>
        
        <div>
          <label class="form-label">Font Family</label>
          <select :value="store.templateSettings.fontFamily" @change="updateFont($event.target.value)" class="form-input">
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>
        
        <div>
          <label class="form-label">Font Size</label>
          <select :value="store.templateSettings.fontSize" @change="updateSize($event.target.value)" class="form-input">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div class="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <p class="text-sm text-indigo-700 dark:text-indigo-300">
          💡 Changes are saved automatically and will appear in your final resume preview.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'
import { createApp, h } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Import all template components for PDF preview
import TemplateModern from './TemplateModern.vue'
import TemplateClassic from './TemplateClassic.vue'
import TemplateCreative from './TemplateCreative.vue'
import TemplateMinimal from './TemplateMinimal.vue'
import TemplateExecutive from './TemplateExecutive.vue'
import TemplateTech from './TemplateTech.vue'

const store = useResumeStore()
const loadingTemplate = ref(null)

// Sample data for PDF preview
const sampleData = {
  personal: {
    email: 'john@email.com',
    phone: '(123) 456-7890',
    location: 'NY, USA',
    summary: 'Creative problem solver with 5+ years experience.'
  },
  experience: [
    { 
      id: 1, 
      position: 'Senior Engineer', 
      company: 'Tech Corp', 
      startDate: '2020', 
      endDate: 'Present', 
      description: 'Building amazing products.'
    }
  ],
  education: [
    { 
      id: 1, 
      institution: 'University of Tech', 
      degree: 'BS', 
      field: 'CS', 
      startDate: '2016', 
      endDate: '2020' 
    }
  ],
  skills: {
    technical: ['JS', 'Vue', 'Python'],
    soft: ['Leadership'],
    languages: ['English']
  },
  projects: [
    { 
      id: 1, 
      name: 'Resume Builder', 
      description: 'Vue.js app', 
      technologies: ['Vue', 'Tailwind'] 
    }
  ],
  fullName: 'John Doe'
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'Professional',
    icon: '💼',
    description: 'Clean and contemporary design',
    previewGradient: 'from-blue-500 to-indigo-600',
    tags: ['Popular', 'Clean'],
    component: TemplateModern
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Traditional',
    icon: '📄',
    description: 'Timeless professional layout',
    previewGradient: 'from-gray-700 to-gray-900',
    tags: ['Formal', 'Elegant'],
    component: TemplateClassic
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Design',
    icon: '🎨',
    description: 'Stand out with unique design',
    previewGradient: 'from-pink-500 to-purple-600',
    tags: ['Unique', 'Colorful'],
    component: TemplateCreative
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Clean',
    icon: '✨',
    description: 'Simple and focused layout',
    previewGradient: 'from-emerald-400 to-teal-500',
    tags: ['Simple', 'Elegant'],
    component: TemplateMinimal
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'Leadership',
    icon: '👔',
    description: 'Designed for senior roles',
    previewGradient: 'from-amber-700 to-orange-600',
    tags: ['Executive', 'Leadership'],
    component: TemplateExecutive
  },
  {
    id: 'tech',
    name: 'Tech',
    category: 'Modern',
    icon: '⚡',
    description: 'Perfect for developers',
    previewGradient: 'from-cyan-500 to-blue-600',
    tags: ['Tech', 'Developer'],
    component: TemplateTech
  }
]

const selectTemplate = (templateId) => {
  store.setTemplate(templateId)
}

const updateColor = (color) => {
  store.updateTemplateSettings({ primaryColor: color })
}

const updateFont = (font) => {
  store.updateTemplateSettings({ fontFamily: font })
}

const updateSize = (size) => {
  store.updateTemplateSettings({ fontSize: size })
}

const previewTemplate = async (templateId) => {
  // Find the template
  const template = templates.find(t => t.id === templateId)
  if (!template) return
  
  // Set loading state
  loadingTemplate.value = templateId
  
  try {
    // Create a temporary container to render the template for PDF
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.style.width = '800px'
    container.style.backgroundColor = '#ffffff'
    container.style.padding = '40px'
    container.style.zIndex = '9999'
    document.body.appendChild(container)
    
    // Create a temporary Vue app to render the template
    const app = createApp({
      render() {
        return h(template.component, {
          personal: sampleData.personal,
          experience: sampleData.experience,
          education: sampleData.education,
          skills: sampleData.skills,
          projects: sampleData.projects,
          fullName: sampleData.fullName,
          primaryColor: store.templateSettings.primaryColor,
          fontFamily: store.templateSettings.fontFamily,
          fontSize: 'medium'
        })
      }
    })
    app.mount(container)
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: container.scrollWidth,
      height: container.scrollHeight,
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    
    // Open PDF in new tab
    const pdfOutput = pdf.output('bloburl')
    window.open(pdfOutput, '_blank')
    
    // Clean up
    document.body.removeChild(container)
    app.unmount()
    
  } catch (error) {
    console.error('Error generating PDF preview:', error)
    alert('There was an error generating the PDF preview. Please try again.')
  } finally {
    // Clear loading state
    loadingTemplate.value = null
  }
}
</script>

<style scoped>
.preview-container {
  height: 260px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
}

/* Dark mode background */
.dark .preview-container {
  background: #1a1a2e;
}

/* Template card hover effect */
.template-card {
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-2px);
}

.template-card:hover .preview-container {
  box-shadow: inset 0 0 30px rgba(79, 70, 229, 0.03);
}

/* Ensure cards don't overflow */
.template-card {
  min-width: 0;
  max-width: 100%;
}

/* Spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation for loading bar */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .preview-container {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .preview-container {
    height: 180px;
  }
}
</style>