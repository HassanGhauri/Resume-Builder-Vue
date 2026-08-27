<!-- src/components/templates/TemplatePreview.vue -->
<template>
  <div class="template-preview" :style="templateStyles">
    <div class="preview-content">
      <!-- Header -->
      <div class="preview-header" :style="{ borderBottom: `2px solid ${primaryColor}` }">
        <h2 :style="{ color: primaryColor }">John Doe</h2>
        <p class="text-sm">john@email.com • (123) 456-7890</p>
      </div>
      
      <!-- Content -->
      <div class="preview-body">
        <div class="preview-section">
          <h4 :style="{ color: primaryColor }">Experience</h4>
          <div class="preview-item">
            <div class="flex justify-between">
              <strong>Software Engineer</strong>
              <span class="text-xs">2020-Present</span>
            </div>
            <p class="text-xs">ABC Company</p>
          </div>
        </div>
        
        <div class="preview-section">
          <h4 :style="{ color: primaryColor }">Education</h4>
          <div class="preview-item">
            <strong>B.S. Computer Science</strong>
            <p class="text-xs">University of Technology</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  template: {
    type: String,
    default: 'modern'
  },
  primaryColor: {
    type: String,
    default: '#4F46E5'
  },
  fontFamily: {
    type: String,
    default: 'Inter'
  },
  fontSize: {
    type: String,
    default: 'medium'
  }
})

const primaryColor = computed(() => props.primaryColor)
const fontFamily = computed(() => props.fontFamily)

const fontSizeMap = {
  small: '0.75rem',
  medium: '0.875rem',
  large: '1rem'
}

const templateStyles = computed(() => {
  const styles = {
    fontFamily: fontFamily.value,
    fontSize: fontSizeMap[props.fontSize] || '0.875rem',
    color: '#1a1a1a'
  }
  
  // Template-specific styles
  if (props.template === 'modern') {
    return { ...styles, padding: '1rem', background: 'white' }
  } else if (props.template === 'classic') {
    return { ...styles, padding: '1.5rem', background: '#fafafa', border: '1px solid #ddd' }
  } else if (props.template === 'creative') {
    return { ...styles, padding: '1rem', background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)' }
  } else if (props.template === 'minimal') {
    return { ...styles, padding: '2rem', background: 'white', letterSpacing: '0.5px' }
  } else if (props.template === 'executive') {
    return { ...styles, padding: '1.5rem', background: '#f8fafc', borderLeft: `4px solid ${primaryColor.value}` }
  } else if (props.template === 'tech') {
    return { ...styles, padding: '1rem', background: '#0f172a', color: 'white' }
  }
  return styles
})
</script>

<style scoped>
.template-preview {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.preview-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.preview-header h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.preview-body {
  flex: 1;
}

.preview-section {
  margin-bottom: 0.5rem;
}

.preview-section h4 {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-item {
  margin-bottom: 0.25rem;
}

.preview-item strong {
  font-size: 0.8rem;
  display: block;
}

.preview-item p {
  margin: 0;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.text-xs {
  font-size: 0.7rem;
}

.text-sm {
  font-size: 0.75rem;
}
</style>