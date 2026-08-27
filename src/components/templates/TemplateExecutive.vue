<!-- src/components/templates/TemplateExecutive.vue -->
<template>
  <div class="template-executive" :style="styles">
    <div class="flex gap-4 md:gap-6">
      <!-- Left Accent Bar -->
      <div class="w-1 flex-shrink-0" :style="{ backgroundColor: primaryColor }"></div>
      
      <!-- Content -->
      <div class="flex-1">
        <div class="mb-4">
          <h1 class="text-2xl md:text-3xl font-bold" :style="{ color: textColor }">{{ fullName }}</h1>
          <p class="text-sm" :style="{ color: primaryColor }">{{ personal.summary }}</p>
          <div class="flex flex-wrap gap-2 text-xs md:text-sm mt-1" :style="{ color: mutedTextColor }">
            <span v-if="personal.email" class="break-all">{{ personal.email }}</span>
            <span v-if="personal.phone">• {{ personal.phone }}</span>
            <span v-if="personal.location">• {{ personal.location }}</span>
          </div>
          <div class="flex flex-wrap gap-2 text-xs md:text-sm mt-1" :style="{ color: mutedTextColor }">
            <span v-if="personal.linkedin" class="break-all">🔗 {{ personal.linkedin }}</span>
            <span v-if="personal.portfolio" class="break-all">🌐 {{ personal.portfolio }}</span>
          </div>
        </div>
        
        <!-- Summary -->
        <div v-if="personal.summary" class="mb-4">
          <h2 class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: primaryColor }">
            Professional Summary
          </h2>
          <p class="text-sm" :style="{ color: textColor }">{{ personal.summary }}</p>
        </div>
        
        <!-- Experience -->
        <div v-if="experience.length" class="mb-4">
          <h2 class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: primaryColor }">
            Professional Experience
          </h2>
          <div v-for="exp in experience" :key="exp.id" class="mb-3">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-bold text-sm" :style="{ color: textColor }">{{ exp.position }}</h3>
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
          <h2 class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: primaryColor }">
            Education
          </h2>
          <div v-for="edu in education" :key="edu.id" class="mb-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-bold text-sm" :style="{ color: textColor }">{{ edu.institution }}</h3>
                <p class="text-sm" :style="{ color: textColor }">{{ edu.degree }} {{ edu.field }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Skills -->
        <div v-if="hasSkills" class="mb-4">
          <h2 class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: primaryColor }">
            Skills
          </h2>
          <div class="flex flex-wrap gap-1">
            <span v-for="skill in allSkills" :key="skill"
                  class="px-2 py-0.5 rounded text-xs"
                  :style="{ backgroundColor: primaryColor + '20', color: primaryColor }">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <!-- Projects -->
        <div v-if="projects.length">
          <h2 class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: primaryColor }">
            Projects
          </h2>
          <div v-for="project in projects" :key="project.id" class="mb-2">
            <h3 class="font-bold text-sm" :style="{ color: textColor }">{{ project.name }}</h3>
            <p class="text-sm" :style="{ color: textColor }">{{ project.description }}</p>
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

const textColor = computed(() => '#1a1a1a')
const mutedTextColor = computed(() => '#6b7280')

const allSkills = computed(() => {
  return [...(props.skills?.technical || []), ...(props.skills?.soft || [])]
})

const hasSkills = computed(() => allSkills.value.length > 0)

const fontSizeMap = { small: '0.75rem', medium: '0.875rem', large: '1rem' }

const styles = computed(() => ({
  fontFamily: props.fontFamily || 'Inter',
  fontSize: fontSizeMap[props.fontSize] || '0.875rem',
  padding: props.isPreview ? '0.5rem' : '2rem',
  backgroundColor: '#f8fafc',
  borderRadius: '4px',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  overflowWrap: 'break-word'
}))
</script>