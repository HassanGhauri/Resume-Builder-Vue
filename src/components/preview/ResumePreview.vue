<!-- src/components/preview/ResumePreview.vue -->
<template>
  <div id="resume-content" class="bg-white rounded-xl shadow-lg p-8 print:p-0 print:shadow-none">
    <!-- Loading State -->
    <div v-if="!store.hasData" class="text-center py-16">
      <span class="text-6xl mb-4 block">📄</span>
      <h3 class="text-xl font-semibold text-gray-700">No Resume Data</h3>
      <p class="text-gray-500 mt-2">Add your information to see the preview</p>
      <router-link to="/builder" class="btn-primary inline-block mt-4">
        Add Information →
      </router-link>
    </div>

    <!-- Resume Content -->
    <div v-else>
      <!-- Header -->
      <div class="text-center mb-8" :style="{ color: primaryColor }">
        <h1 class="text-4xl font-bold" :style="{ fontFamily: fontFamily }">
          {{ store.fullName || 'Your Name' }}
        </h1>
        <div class="flex flex-wrap justify-center gap-3 mt-2 text-gray-600">
          <span v-if="store.data.personal.email">
            📧 {{ store.data.personal.email }}
          </span>
          <span v-if="store.data.personal.phone">
            📱 {{ store.data.personal.phone }}
          </span>
          <span v-if="store.data.personal.location">
            📍 {{ store.data.personal.location }}
          </span>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mt-1 text-sm text-gray-500">
          <a v-if="store.data.personal.linkedin" 
             :href="store.data.personal.linkedin" 
             target="_blank"
             class="text-indigo-600 hover:underline"
          >
            🔗 LinkedIn
          </a>
          <a v-if="store.data.personal.portfolio" 
             :href="store.data.personal.portfolio" 
             target="_blank"
             class="text-indigo-600 hover:underline"
          >
            🌐 Portfolio
          </a>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="store.data.personal.summary" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 pb-2 mb-3"
            :style="{ borderColor: primaryColor, color: primaryColor }">
          Professional Summary
        </h2>
        <p class="text-gray-700 leading-relaxed">{{ store.data.personal.summary }}</p>
      </div>

      <!-- Experience -->
      <div v-if="store.data.experience.length > 0" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 pb-2 mb-3"
            :style="{ borderColor: primaryColor, color: primaryColor }">
          Work Experience
        </h2>
        <div v-for="(exp, index) in store.data.experience" :key="index" class="mb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-lg">{{ exp.position }}</h3>
              <p class="text-indigo-600 font-medium">{{ exp.company }}</p>
            </div>
            <p class="text-sm text-gray-500 whitespace-nowrap ml-4">
              {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
            </p>
          </div>
          <p class="text-gray-600 mt-1">{{ exp.description }}</p>
          <ul v-if="exp.achievements && exp.achievements.length > 0" class="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li v-for="(achievement, aIndex) in exp.achievements" :key="aIndex" class="text-sm">
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Education -->
      <div v-if="store.data.education.length > 0" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 pb-2 mb-3"
            :style="{ borderColor: primaryColor, color: primaryColor }">
          Education
        </h2>
        <div v-for="(edu, index) in store.data.education" :key="index" class="mb-3">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">{{ edu.institution }}</h3>
              <p class="text-gray-600">{{ edu.degree }} in {{ edu.field }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </p>
              <p v-if="edu.gpa" class="text-sm text-gray-600">GPA: {{ edu.gpa }}</p>
            </div>
          </div>
          <p v-if="edu.description" class="text-gray-600 text-sm mt-1">{{ edu.description }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="hasSkills" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 pb-2 mb-3"
            :style="{ borderColor: primaryColor, color: primaryColor }">
          Skills
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-if="store.data.skills.technical.length > 0">
            <h4 class="font-medium text-gray-700 mb-1">Technical</h4>
            <div class="flex flex-wrap gap-1">
              <span v-for="skill in store.data.skills.technical" :key="skill"
                    class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {{ skill }}
              </span>
            </div>
          </div>
          <div v-if="store.data.skills.soft.length > 0">
            <h4 class="font-medium text-gray-700 mb-1">Soft Skills</h4>
            <div class="flex flex-wrap gap-1">
              <span v-for="skill in store.data.skills.soft" :key="skill"
                    class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {{ skill }}
              </span>
            </div>
          </div>
          <div v-if="store.data.skills.languages.length > 0">
            <h4 class="font-medium text-gray-700 mb-1">Languages</h4>
            <div class="flex flex-wrap gap-1">
              <span v-for="lang in store.data.skills.languages" :key="lang"
                    class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                {{ lang }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="store.data.projects.length > 0" class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 pb-2 mb-3"
            :style="{ borderColor: primaryColor, color: primaryColor }">
          Projects
        </h2>
        <div v-for="(project, index) in store.data.projects" :key="index" class="mb-4">
          <div class="flex justify-between items-start">
            <h3 class="font-semibold">{{ project.name }}</h3>
            <span v-if="project.status" 
                  class="text-xs px-2 py-1 rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': project.status === 'Completed',
                    'bg-yellow-100 text-yellow-800': project.status === 'In Progress',
                    'bg-gray-100 text-gray-800': project.status === 'Planned'
                  }">
              {{ project.status }}
            </span>
          </div>
          <p class="text-gray-600 text-sm">{{ project.description }}</p>
          <div v-if="project.technologies.length > 0" class="flex flex-wrap gap-1 mt-1">
            <span v-for="tech in project.technologies" :key="tech"
                  class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
              {{ tech }}
            </span>
          </div>
          <div v-if="project.link || project.github" class="flex gap-3 mt-1 text-sm">
            <a v-if="project.link" :href="project.link" target="_blank"
               class="text-indigo-600 hover:underline">🔗 Live Demo</a>
            <a v-if="project.github" :href="project.github" target="_blank"
               class="text-indigo-600 hover:underline">💻 GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const primaryColor = '#4F46E5'
const fontFamily = 'Inter, sans-serif'

const hasSkills = computed(() => {
  return store.data.skills.technical.length > 0 || 
         store.data.skills.soft.length > 0 || 
         store.data.skills.languages.length > 0
})
</script>