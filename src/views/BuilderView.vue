<!-- src/views/BuilderView.vue -->
<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar with steps -->
      <div class="lg:w-64">
        <div class="card">
          <h3 class="font-semibold text-lg mb-4">Progress</h3>
          <div class="space-y-2">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              @click="store.setStep(index + 1)"
              class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition"
              :class="[
                store.currentStep === index + 1 ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50',
                index + 1 < store.currentStep ? 'text-green-600' : ''
              ]"
            >
              <span class="w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold"
                :class="[
                  store.currentStep === index + 1 ? 'bg-indigo-600 text-white' : 
                  index + 1 < store.currentStep ? 'bg-green-500 text-white' : 
                  'bg-gray-200 text-gray-600'
                ]"
              >
                {{ index + 1 }}
              </span>
              <span>{{ step }}</span>
              <span v-if="index + 1 < store.currentStep" class="ml-auto">✅</span>
            </div>
          </div>
          
          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Completion</span>
              <span>{{ store.completionPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                :style="{ width: store.completionPercentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex-1">
        <div class="card">
          <div v-if="store.currentStep === 1">
            <PersonalInfoForm />
          </div>
          <div v-else-if="store.currentStep === 2">
            <ExperienceForm />
          </div>
          <div v-else-if="store.currentStep === 3">
            <EducationForm />
          </div>
          <div v-else-if="store.currentStep === 4">
            <SkillsForm />
          </div>
          <div v-else-if="store.currentStep === 5">
            <ProjectsForm />
          </div>

          <!-- Navigation buttons -->
          <div class="flex justify-between mt-8 pt-6 border-t">
            <button 
              @click="store.prevStep"
              v-if="store.currentStep > 1"
              class="btn-secondary"
            >
              ← Previous
            </button>
            <button 
              @click="store.nextStep"
              v-if="store.currentStep < 5"
              class="btn-primary ml-auto"
            >
              Next →
            </button>
            <router-link 
              v-if="store.currentStep === 5"
              to="/preview"
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
import PersonalInfoForm from '../components/builder/PersonalInfoForm.vue'
import ExperienceForm from '../components/builder/ExperienceForm.vue'
import EducationForm from '../components/builder/EducationForm.vue'
import SkillsForm from '../components/builder/SkillsForm.vue'
import ProjectsForm from '../components/builder/ProjectsForm.vue'

const store = useResumeStore()
const steps = ['Personal Info', 'Experience', 'Education', 'Skills', 'Projects']
</script>