<!-- src/components/templates/TemplateMinimal.vue -->
<template>
  <div class="template-minimal" :style="styles">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-light tracking-wide" :style="{ color: textColor }">{{ fullName }}</h1>
        <div class="flex flex-wrap gap-2 text-xs md:text-sm mt-1" :style="{ color: mutedTextColor }">
          <span v-if="personal.email" class="break-all">{{ personal.email }}</span>
          <span v-if="personal.phone">{{ personal.phone }}</span>
          <span v-if="personal.location">{{ personal.location }}</span>
        </div>
        <p class="text-sm mt-2" :style="{ color: textColor }">{{ personal.summary }}</p>
      </div>
      
      <!-- Content -->
      <div class="space-y-4">
        <!-- Summary -->
        <div v-if="personal.summary">
          <h2 class="text-xs font-medium uppercase tracking-wider" :style="{ color: primaryColor }">Summary</h2>
          <p class="text-sm mt-1" :style="{ color: textColor }">{{ personal.summary }}</p>
        </div>
        
        <!-- Experience -->
        <div v-if="experience.length">
          <h2 class="text-xs font-medium uppercase tracking-wider" :style="{ color: primaryColor }">Experience</h2>
          <div v-for="exp in experience" :key="exp.id" class="mt-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-medium text-sm" :style="{ color: textColor }">{{ exp.position }}</h3>
                <p class="text-xs" :style="{ color: primaryColor }">{{ exp.company }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
                {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
              </p>
            </div>
            <p class="text-sm mt-1" :style="{ color: textColor }">{{ exp.description }}</p>
          </div>
        </div>
        
        <!-- Education -->
        <div v-if="education.length">
          <h2 class="text-xs font-medium uppercase tracking-wider" :style="{ color: primaryColor }">Education</h2>
          <div v-for="edu in education" :key="edu.id" class="mt-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-medium text-sm" :style="{ color: textColor }">{{ edu.institution }}</h3>
                <p class="text-xs" :style="{ color: textColor }">{{ edu.degree }} {{ edu.field }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Skills -->
        <div v-if="hasSkills">
          <h2 class="text-xs font-medium uppercase tracking-wider" :style="{ color: primaryColor }">Skills</h2>
          <div class="mt-1 space-y-1">
            <div v-if="skills.technical.length">
              <div class="flex flex-wrap gap-1">
                <span v-for="skill in skills.technical" :key="skill"
                      class="px-2 py-0.5 rounded text-xs"
                      :style="{ backgroundColor: primaryColor + '20', color: primaryColor }">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Projects -->
        <div v-if="projects.length">
          <h2 class="text-xs font-medium uppercase tracking-wider" :style="{ color: primaryColor }">Projects</h2>
          <div v-for="project in projects" :key="project.id" class="mt-2">
            <h3 class="font-medium text-sm" :style="{ color: textColor }">{{ project.name }}</h3>
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

const hasSkills = computed(() => {
  return props.skills?.technical?.length > 0 || props.skills?.soft?.length > 0
})

const fontSizeMap = { small: '0.75rem', medium: '0.875rem', large: '1rem' }

const styles = computed(() => ({
  fontFamily: props.fontFamily || 'Inter',
  fontSize: fontSizeMap[props.fontSize] || '0.875rem',
  padding: props.isPreview ? '0.5rem' : '2.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  letterSpacing: '0.3px',
  lineHeight: '1.6',
  wordWrap: 'break-word',
  overflowWrap: 'break-word'
}))
</script>