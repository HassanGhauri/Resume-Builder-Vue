<!-- src/components/templates/TemplateClassic.vue -->
<template>
  <div class="template-classic" :style="styles">
    <div class="max-w-3xl mx-auto" :style="contentStyles">
      <!-- Header -->
      <div class="text-center  pb-3 mb-4" :style="{ borderColor: primaryColor }">
        <h1 class="text-2xl md:text-3xl font-bold" :style="{ color: textColor }">{{ fullName }}</h1>
        <div class="flex flex-wrap justify-center gap-2 text-xs md:text-sm mt-1" :style="{ color: mutedTextColor }">
          <span v-if="personal.email" class="break-all">{{ personal.email }}</span>
          <span v-if="personal.phone">• {{ personal.phone }}</span>
          <span v-if="personal.location">• {{ personal.location }}</span>
        </div>
        <div class="flex flex-wrap justify-center gap-2 text-xs md:text-sm mt-1" :style="{ color: mutedTextColor }">
          <span v-if="personal.linkedin" class="break-all">🔗 {{ personal.linkedin }}</span>
          <span v-if="personal.portfolio" class="break-all">🌐 {{ personal.portfolio }}</span>
        </div>
      </div>
      
      <!-- Single Column Content -->
      <div class="space-y-4">
        <!-- Summary -->
        <div v-if="personal.summary">
          <h2 class="text-base md:text-lg font-semibold border-b-2 pb-1" :style="{ borderColor: primaryColor, color: primaryColor }">
            Professional Summary
          </h2>
          <p class="text-sm mt-2" :style="{ color: textColor }">{{ personal.summary }}</p>
        </div>
        
        <!-- Experience -->
        <div v-if="experience.length">
          <h2 class="text-base md:text-lg font-semibold border-b-2 pb-1" :style="{ borderColor: primaryColor, color: primaryColor }">
            Experience
          </h2>
          <div v-for="exp in experience" :key="exp.id" class="mt-3">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-bold text-sm md:text-base" :style="{ color: textColor }">{{ exp.position }}</h3>
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
        <div v-if="education.length">
          <h2 class="text-base md:text-lg font-semibold border-b-2 pb-1" :style="{ borderColor: primaryColor, color: primaryColor }">
            Education
          </h2>
          <div v-for="edu in education" :key="edu.id" class="mt-3">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div class="flex-1">
                <h3 class="font-bold text-sm md:text-base" :style="{ color: textColor }">{{ edu.institution }}</h3>
                <p class="text-sm" :style="{ color: textColor }">{{ edu.degree }} {{ edu.field }}</p>
              </div>
              <p class="text-xs whitespace-nowrap" :style="{ color: mutedTextColor }">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Skills -->
        <div v-if="hasSkills">
          <h2 class="text-base md:text-lg font-semibold border-b-2 pb-1" :style="{ borderColor: primaryColor, color: primaryColor }">
            Skills
          </h2>
          <div class="mt-3 space-y-2">
            <div v-if="skills.technical.length">
              <p class="font-medium text-sm" :style="{ color: textColor }">Technical</p>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="skill in skills.technical" :key="skill"
                      class="px-2 py-0.5 rounded text-xs"
                      :style="{ backgroundColor: primaryColor + '20', color: primaryColor }">
                  {{ skill }}
                </span>
              </div>
            </div>
            <div v-if="skills.soft.length">
              <p class="font-medium text-sm" :style="{ color: textColor }">Soft Skills</p>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="skill in skills.soft" :key="skill"
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
          <h2 class="text-base md:text-lg font-semibold border-b-2 pb-1" :style="{ borderColor: primaryColor, color: primaryColor }">
            Projects
          </h2>
          <div v-for="project in projects" :key="project.id" class="mt-3">
            <h3 class="font-bold text-sm md:text-base" :style="{ color: textColor }">{{ project.name }}</h3>
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

const fontSizeMap = { small: '0.7rem', medium: '0.8rem', large: '0.9rem' }

const styles = computed(() => ({
  fontFamily: props.fontFamily || 'Inter',
  fontSize: fontSizeMap[props.fontSize] || '0.8rem',
  padding: props.isPreview ? '0.5rem' : '2rem',
  backgroundColor: '#ffffff', // Changed from #fafafa to #ffffff (white)
  borderRadius: props.isPreview ? '4px' : '4px',
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
  padding: props.isPreview ? '0' : '1rem'
}))
</script>