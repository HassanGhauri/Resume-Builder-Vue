<!-- src/components/templates/TemplateTech.vue -->
<template>
  <div class="template-tech" :style="styles">
    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
      <!-- Left Column -->
      <div class="md:w-1/3">
        <div class="text-center mb-4">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto flex items-center justify-center text-xl md:text-2xl font-bold"
               :style="{ backgroundColor: primaryColor + '30', color: primaryColor }">
            {{ initials }}
          </div>
          <h1 class="text-lg md:text-xl font-bold mt-2" :style="{ color: textColor }">{{ fullName }}</h1>
          <p class="text-xs md:text-sm" :style="{ color: mutedTextColor }">{{ personal.summary }}</p>
        </div>
        
        <div class="mb-4">
          <h3 class="text-xs font-semibold uppercase tracking-wider mb-2" :style="{ color: primaryColor }">
            Contact
          </h3>
          <div class="space-y-1 text-xs md:text-sm" :style="{ color: textColor }">
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
      
      <!-- Right Column -->
      <div class="md:w-2/3">
        <!-- Summary -->
        <div v-if="personal.summary" class="mb-4">
          <h2 class="text-base font-semibold border-b-2 pb-1 mb-2" 
              :style="{ borderColor: primaryColor, color: primaryColor }">
            Summary
          </h2>
          <p class="text-sm" :style="{ color: textColor }">{{ personal.summary }}</p>
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
                <h4 class="font-semibold text-sm" :style="{ color: textColor }">{{ exp.position }}</h4>
                <p class="text-sm" :style="{ color: primaryColor }">{{ exp.company }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
                {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
              </p>
            </div>
            <p class="text-sm mt-1" :style="{ color: textColor }">{{ exp.description }}</p>
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
                <h4 class="font-semibold text-sm" :style="{ color: textColor }">{{ edu.institution }}</h4>
                <p class="text-sm" :style="{ color: textColor }">{{ edu.degree }} {{ edu.field }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
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
            <h4 class="font-semibold text-sm" :style="{ color: textColor }">{{ project.name }}</h4>
            <p class="text-sm" :style="{ color: textColor }">{{ project.description }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span v-for="tech in project.technologies" :key="tech"
                    class="px-2 py-0.5 rounded text-xs"
                    :style="{ backgroundColor: primaryColor + '30', color: primaryColor }">
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

const textColor = computed(() => '#f1f5f9')
const mutedTextColor = computed(() => '#94a3b8')

const initials = computed(() => {
  if (!props.fullName) return '?'
  return props.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const hasSkills = computed(() => {
  return props.skills?.technical?.length > 0 || props.skills?.soft?.length > 0
})

const fontSizeMap = { small: '0.75rem', medium: '0.875rem', large: '1rem' }

const styles = computed(() => ({
  fontFamily: props.fontFamily || 'Inter',
  fontSize: fontSizeMap[props.fontSize] || '0.875rem',
  padding: props.isPreview ? '0.5rem' : '1.5rem',
  backgroundColor: '#0f172a',
  borderRadius: '12px',
  color: '#f1f5f9',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  overflowWrap: 'break-word'
}))
</script>