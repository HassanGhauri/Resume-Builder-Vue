<!-- src/components/preview/TemplateRenderer.vue -->
<template>
  <div
    class="template-renderer"
    :style="{
      '--resume-primary-color': primaryColor,
      '--resume-font-family': fontFamily,
      '--resume-font-size': fontSizeMap[fontSize] || '0.8rem',
      color: '#1a1a1a',
      fontFamily: fontFamily,
      fontSize: fontSizeMap[fontSize] || '0.8rem'
    }"
  >
    <component 
      :is="currentTemplate"
      :personal="personal"
      :experience="experience"
      :education="education"
      :skills="skills"
      :projects="projects"
      :full-name="fullName"
      :primary-color="primaryColor"
      :font-family="fontFamily"
      :font-size="fontSize"
    />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

// Lazy load templates for better performance
const templateComponents = {
  modern: defineAsyncComponent(() => import('../templates/TemplateModern.vue')),
  classic: defineAsyncComponent(() => import('../templates/TemplateClassic.vue')),
  creative: defineAsyncComponent(() => import('../templates/TemplateCreative.vue')),
  minimal: defineAsyncComponent(() => import('../templates/TemplateMinimal.vue')),
  executive: defineAsyncComponent(() => import('../templates/TemplateExecutive.vue')),
  tech: defineAsyncComponent(() => import('../templates/TemplateTech.vue'))
}

const currentTemplate = computed(() => {
  return templateComponents[store.activeTemplate] || templateComponents.modern
})

const personal = computed(() => store.data.personal)
const experience = computed(() => store.data.experience)
const education = computed(() => store.data.education)
const skills = computed(() => store.data.skills)
const projects = computed(() => store.data.projects)
const fullName = computed(() => store.fullName)
const primaryColor = computed(() => store.templateSettings.primaryColor)
const fontFamily = computed(() => store.templateSettings.fontFamily)
const fontSize = computed(() => store.templateSettings.fontSize)
const fontSizeMap = {
  small: '0.72rem',
  medium: '0.9rem',
  large: '1.08rem'
}
</script>