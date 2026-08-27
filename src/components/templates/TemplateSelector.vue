<!-- src/components/templates/TemplateSelector.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Choose Your Template</h2>
    <p class="text-gray-600 mb-6">Select a template that best represents your professional style.</p>

    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="template in templates" 
        :key="template.id"
        @click="selectTemplate(template.id)"
        class="border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
        :class="[
          store.activeTemplate === template.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200 hover:border-indigo-300'
        ]"
      >
        <div class="aspect-[3/4] bg-gray-100 relative overflow-hidden">
          <!-- Template Preview Image -->
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br"
               :class="template.previewGradient">
            <div class="text-center text-white p-4">
              <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span class="text-2xl">{{ template.icon }}</span>
              </div>
              <h3 class="font-bold text-lg">{{ template.name }}</h3>
              <p class="text-white/80 text-sm mt-1">{{ template.description }}</p>
            </div>
          </div>
          
          <!-- Template Tags -->
          <div class="absolute top-2 right-2 flex gap-1">
            <span v-for="tag in template.tags" :key="tag"
                  class="text-xs bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700">
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">{{ template.name }}</h3>
              <p class="text-sm text-gray-500">{{ template.category }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                v-if="store.activeTemplate === template.id"
                class="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                ✓ Selected
              </button>
              <button 
                v-else
                @click.stop="selectTemplate(template.id)"
                class="border border-indigo-600 text-indigo-600 px-3 py-1 rounded-lg text-sm hover:bg-indigo-50 transition"
              >
                Select
              </button>
            </div>
          </div>
          <div class="mt-2 flex items-center space-x-1 text-xs text-gray-400">
            <span>⭐ {{ template.rating }}</span>
            <span>•</span>
            <span>👤 {{ template.usedBy }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Customization -->
    <div v-if="store.activeTemplate" class="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 class="font-semibold text-lg mb-4">Template Customization</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <label class="form-label">Primary Color</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="customColor"
              type="color"
              class="w-12 h-12 rounded-lg cursor-pointer border border-gray-300"
            />
            <input 
              v-model="customColor"
              type="text"
              class="form-input flex-1"
              placeholder="#4F46E5"
            />
          </div>
        </div>
        
        <div>
          <label class="form-label">Font Family</label>
          <select v-model="customFont" class="form-input">
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>
        
        <div>
          <label class="form-label">Font Size</label>
          <select v-model="customFontSize" class="form-input">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <button @click="applyCustomization" class="btn-primary mt-4">
        Apply Customization
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const customColor = ref('#4F46E5')
const customFont = ref('Inter')
const customFontSize = ref('medium')

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'Professional',
    icon: '💼',
    description: 'Clean and contemporary design',
    previewGradient: 'from-blue-500 to-indigo-600',
    tags: ['Popular', 'Clean'],
    rating: 4.8,
    usedBy: '12.4k'
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Traditional',
    icon: '📄',
    description: 'Timeless professional layout',
    previewGradient: 'from-gray-700 to-gray-900',
    tags: ['Formal', 'Elegant'],
    rating: 4.6,
    usedBy: '8.7k'
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Design',
    icon: '🎨',
    description: 'Stand out with unique design',
    previewGradient: 'from-pink-500 to-purple-600',
    tags: ['Unique', 'Colorful'],
    rating: 4.9,
    usedBy: '5.2k'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Clean',
    icon: '✨',
    description: 'Simple and focused layout',
    previewGradient: 'from-emerald-400 to-teal-500',
    tags: ['Simple', 'Elegant'],
    rating: 4.7,
    usedBy: '9.1k'
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'Leadership',
    icon: '👔',
    description: 'Designed for senior roles',
    previewGradient: 'from-amber-700 to-orange-600',
    tags: ['Executive', 'Leadership'],
    rating: 4.5,
    usedBy: '3.8k'
  },
  {
    id: 'tech',
    name: 'Tech',
    category: 'Modern',
    icon: '⚡',
    description: 'Perfect for developers',
    previewGradient: 'from-cyan-500 to-blue-600',
    tags: ['Tech', 'Developer'],
    rating: 4.9,
    usedBy: '6.3k'
  }
]

const selectTemplate = (templateId) => {
  store.setTemplate(templateId)
}

const applyCustomization = () => {
  // In a real app, you would update the CSS variables or pass these to the preview
  console.log('Customizing with:', {
    color: customColor.value,
    font: customFont.value,
    size: customFontSize.value
  })
  alert('Customization applied! (This is a demo)')
}
</script>