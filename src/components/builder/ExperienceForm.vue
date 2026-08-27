<!-- src/components/builder/ExperienceForm.vue -->
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Work Experience</h2>
      <button @click="addExperience" class="btn-primary">
        + Add Experience
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="store.data.experience.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <span class="text-6xl mb-4 block">💼</span>
      <p class="text-gray-600">No experience added yet. Click the button above to add your work experience.</p>
    </div>

    <!-- Experience Cards -->
    <div v-for="(exp, index) in store.data.experience" :key="index" class="mb-6">
      <div class="border border-gray-200 rounded-lg p-6 relative hover:border-indigo-300 transition">
        <!-- Drag Handle -->
        <div class="absolute top-3 right-3 flex space-x-2">
          <button @click="removeExperience(index)" class="text-red-500 hover:text-red-700 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <h3 class="font-semibold text-lg mb-4">Experience #{{ index + 1 }}</h3>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Company *</label>
            <input 
              v-model="exp.company"
              type="text"
              class="form-input"
              placeholder="Google"
            />
          </div>
          
          <div>
            <label class="form-label">Position *</label>
            <input 
              v-model="exp.position"
              type="text"
              class="form-input"
              placeholder="Senior Developer"
            />
          </div>
          
          <div>
            <label class="form-label">Start Date *</label>
            <input 
              v-model="exp.startDate"
              type="date"
              class="form-input"
            />
          </div>
          
          <div>
            <label class="form-label">End Date</label>
            <input 
              v-model="exp.endDate"
              type="date"
              class="form-input"
              :disabled="exp.current"
            />
          </div>
        </div>

        <div class="mt-4 flex items-center space-x-4">
          <label class="flex items-center space-x-2">
            <input 
              v-model="exp.current"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span class="text-sm text-gray-700">Currently working here</span>
          </label>
        </div>

        <div class="mt-4">
          <label class="form-label">Description</label>
          <textarea 
            v-model="exp.description"
            rows="3"
            class="form-input"
            placeholder="Describe your responsibilities and achievements..."
          ></textarea>
        </div>

        <!-- Achievements -->
        <div class="mt-4">
          <label class="form-label">Key Achievements</label>
          <div class="space-y-2">
            <div v-for="(achievement, aIndex) in exp.achievements" :key="aIndex" class="flex items-center space-x-2">
              <input 
                v-model="exp.achievements[aIndex]"
                type="text"
                class="form-input flex-1"
                placeholder="Achievement description"
              />
              <button @click="removeAchievement(index, aIndex)" class="text-red-500 hover:text-red-700">
                ✕
              </button>
            </div>
          </div>
          <button @click="addAchievement(index)" class="text-sm text-indigo-600 hover:text-indigo-800 mt-2">
            + Add Achievement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const addExperience = () => {
  store.addExperience({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  })
}

const removeExperience = (index) => {
  if (confirm('Remove this experience entry?')) {
    store.removeExperience(index)
  }
}

const addAchievement = (expIndex) => {
  store.data.experience[expIndex].achievements.push('')
}

const removeAchievement = (expIndex, achIndex) => {
  store.data.experience[expIndex].achievements.splice(achIndex, 1)
}
</script>