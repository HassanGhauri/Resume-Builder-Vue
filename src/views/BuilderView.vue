<!-- src/views/BuilderView.vue -->
<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar with steps -->
      <div class="lg:w-64">
        <div class="card">
          <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-4">Progress</h3>
          <div class="space-y-2">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              @click="store.setStep(index + 1)"
              class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition"
              :class="[
                store.currentStep === index + 1 ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                index + 1 < store.currentStep ? 'text-green-600 dark:text-green-400' : ''
              ]"
            >
              <span class="w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold"
                :class="[
                  store.currentStep === index + 1 ? 'bg-indigo-600 text-white' : 
                  index + 1 < store.currentStep ? 'bg-green-500 text-white' : 
                  'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                ]"
              >
                {{ index + 1 }}
              </span>
              <span class="text-gray-700 dark:text-gray-300">{{ step }}</span>
              <span v-if="index + 1 < store.currentStep" class="ml-auto">✅</span>
            </div>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="clearProgress" 
              class="flex items-center space-x-2 text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition py-1"
              title="Clear all resume data"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Progress</span>
            </button>

            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Completion</span>
                <span>{{ store.completionPercentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-indigo-600 dark:bg-indigo-500 rounded-full h-2 transition-all duration-500"
                  :style="{ width: store.completionPercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex-1">
        <div class="card">
          <!-- Template Selector as Step 1 -->
          <div v-if="store.currentStep === 1">
            <TemplateSelector />
          </div>
          <div v-else-if="store.currentStep === 2">
            <PersonalInfoForm />
          </div>
          <div v-else-if="store.currentStep === 3">
            <ExperienceForm />
          </div>
          <div v-else-if="store.currentStep === 4">
            <EducationForm />
          </div>
          <div v-else-if="store.currentStep === 5">
            <SkillsForm />
          </div>
          <div v-else-if="store.currentStep === 6">
            <ProjectsForm />
          </div>

          <!-- Navigation buttons -->
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="store.prevStep"
              v-if="store.currentStep > 1"
              class="btn-secondary"
            >
              ← Previous
            </button>
            <button 
              @click="store.nextStep"
              v-if="store.currentStep < 6"
              class="btn-primary ml-auto"
            >
              Next →
            </button>
            <router-link 
              v-if="store.currentStep === 6"
              to="/preview"
              @click="store.markPreviewed()"
              class="btn-primary ml-auto"
            >
              Preview Resume 🎯
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../stores/resumeStore'
import TemplateSelector from '../components/templates/TemplateSelector.vue'
import PersonalInfoForm from '../components/builder/PersonalInfoForm.vue'
import ExperienceForm from '../components/builder/ExperienceForm.vue'
import EducationForm from '../components/builder/EducationForm.vue'
import SkillsForm from '../components/builder/SkillsForm.vue'
import ProjectsForm from '../components/builder/ProjectsForm.vue'

const store = useResumeStore()
const steps = ['Choose Template', 'Personal Info', 'Experience', 'Education', 'Skills', 'Projects']

const clearProgress = () => {
  if (confirm('Clear all resume data? This action cannot be undone.')) {
    store.resetResume()
  }
}
</script>