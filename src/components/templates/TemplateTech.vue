<!-- src/components/templates/TemplateTech.vue -->
<template>
  <div class="template-tech" :style="styles">
    <div class="flex flex-col md:flex-row gap-4 md:gap-6" :style="contentStyles">
      <!-- Left Column - Dark Section -->
      <div class="md:w-1/3" :style="leftColumnStyles">
        <div class="text-center mb-4">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto flex items-center justify-center text-xl md:text-2xl font-bold"
               :style="{ backgroundColor: primaryColor + '40', color: primaryColor }">
            {{ initials }}
          </div>
          <h1 class="text-lg md:text-xl font-bold mt-2" :style="{ color: darkTextColor }">{{ fullName }}</h1>
          <p class="text-xs md:text-sm" :style="{ color: darkMutedTextColor }">{{ personal.summary }}</p>
        </div>
        
        <div class="mb-4">
          <h3 class="text-xs font-semibold uppercase tracking-wider mb-2" :style="{ color: primaryColor }">
            Contact
          </h3>
          <div class="space-y-1 text-xs md:text-sm" :style="{ color: darkTextColor }">
            <p v-if="personal.email" class="break-all">📧 {{ personal.email }}</p>
            <p v-if="personal.phone">📱 {{ personal.phone }}</p>
            <p v-if="personal.location">📍 {{ personal.location }}</p>
            <p v-if="personal.linkedin" class="break-all">🔗 {{ personal.linkedin }}</p>
          </div>
        </div>
        
        <div v-if="hasSkills">
          <h3 class="text-xs font-semibold uppercase tracking-wider mb-2" :style="{ color: primaryColor }">
            Skills
          </h3>
          <div class="space-y-2">
            <div v-if="skills.technical.length">
              <div class="flex flex-wrap gap-1">
                <span v-for="skill in skills.technical" :key="skill"
                      class="px-2 py-0.5 rounded text-xs"
                      :style="{ backgroundColor: primaryColor + '30', color: primaryColor }">
                  {{ skill }}
                </span>
              </div>
            </div>
            <div v-if="skills.soft.length">
              <div class="flex flex-wrap gap-1">
                <span v-for="skill in skills.soft" :key="skill"
                      class="px-2 py-0.5 rounded text-xs"
                      :style="{ backgroundColor: primaryColor + '30', color: primaryColor }">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column - White Background -->
      <div class="md:w-2/3" :style="rightColumnStyles">
        <!-- Summary -->
        <div v-if="personal.summary" class="mb-4">
          <h2 class="text-base font-semibold border-b-2 pb-1 mb-2" 
              :style="{ borderColor: primaryColor, color: primaryColor }">
            Summary
          </h2>
          <p class="text-sm" :style="{ color: lightTextColor }">{{ personal.summary }}</p>
        </div>
        
        <!-- Experience -->
        <div v-if="experience.length" class="mb-4">
          <h2 class="text-base font-semibold border-b-2 pb-1 mb-2" 
              :style="{ borderColor: primaryColor, color: primaryColor }">
            Experience
          </h2>
          <div v-for="exp in experience" :key="exp.id" class="mb-3">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h4 class="font-semibold text-sm" :style="{ color: lightTextColor }">{{ exp.position }}</h4>
                <p class="text-sm" :style="{ color: primaryColor }">{{ exp.company }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: lightMutedTextColor }">
                {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
              </p>
            </div>
            <p class="text-sm mt-1" :style="{ color: lightTextColor }">{{ exp.description }}</p>
          </div>
        </div>
        
        <!-- Education -->
        <div v-if="education.length" class="mb-4">
          <h2 class="text-base font-semibold border-b-2 pb-1 mb-2" 
              :style="{ borderColor: primaryColor, color: primaryColor }">
            Education
          </h2>
          <div v-for="edu in education" :key="edu.id" class="mb-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h4 class="font-semibold text-sm" :style="{ color: lightTextColor }">{{ edu.institution }}</h4>
                <p class="text-sm" :style="{ color: lightTextColor }">{{ edu.degree }} {{ edu.field }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: lightMutedTextColor }">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Projects -->
        <div v-if="projects.length">
          <h2 class="text-base font-semibold border-b-2 pb-1 mb-2" 
              :style="{ borderColor: primaryColor, color: primaryColor }">
            Projects
          </h2>
          <div v-for="project in projects" :key="project.id" class="mb-3">
            <h4 class="font-semibold text-sm" :style="{ color: lightTextColor }">{{ project.name }}</h4>
            <p class="text-sm" :style="{ color: lightTextColor }">{{ project.description }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span v-for="tech in project.technologies" :key="tech"
                    class="px-2 py-0.5 rounded text-xs"
                    :style="{ backgroundColor: primaryColor + '20', color: primaryColor }">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  personal: Object,
  experience: Array,
  education: Array,
  skills: Object,
  projects: Array,
  fullName: String,
  primaryColor: String,
  fontFamily: String,
  fontSize: String,
  isPreview: { type: Boolean, default: false }
})

// Colors for the dark left column
const darkTextColor = computed(() => '#f1f5f9')
const darkMutedTextColor = computed(() => '#94a3b8')

// Colors for the light right column
const lightTextColor = computed(() => '#1a1a1a')
const lightMutedTextColor = computed(() => '#6b7280')

const initials = computed(() => {
  if (!props.fullName) return '?'
  return props.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const hasSkills = computed(() => {
  return props.skills?.technical?.length > 0 || props.skills?.soft?.length > 0
})

const fontSizeMap = { small: '0.7rem', medium: '0.8rem', large: '0.9rem' }

const styles = computed(() => ({
  fontFamily: props.fontFamily || 'Inter',
  fontSize: fontSizeMap[props.fontSize] || '0.8rem',
  padding: props.isPreview ? '0.5rem' : '1.5rem',
  backgroundColor: '#ffffff', // White background for the whole template
  borderRadius: props.isPreview ? '4px' : '12px',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  width: '100%',
  maxWidth: '210mm',
  margin: '0 auto',
  boxSizing: 'border-box'
}))

const contentStyles = computed(() => ({
  minHeight: props.isPreview ? 'auto' : '297mm',
  padding: props.isPreview ? '0' : '0.5rem'
}))

const leftColumnStyles = computed(() => ({
  backgroundColor: '#0f172a', // Dark background for left column
  borderRadius: '8px',
  padding: '1rem',
  color: '#f1f5f9'
}))

const rightColumnStyles = computed(() => ({
  backgroundColor: '#ffffff', // White background for right column
  padding: '0.5rem',
  color: '#1a1a1a'
}))
</script>