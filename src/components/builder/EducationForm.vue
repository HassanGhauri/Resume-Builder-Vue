<!-- src/components/builder/EducationForm.vue -->
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Education</h2>
      <button @click="addEducation" class="btn-primary">
        + Add Education
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="store.data.education.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <span class="text-6xl mb-4 block">🎓</span>
      <p class="text-gray-600">No education added yet. Add your educational background.</p>
    </div>

    <!-- Education Cards -->
    <div v-for="(edu, index) in store.data.education" :key="index" class="mb-6">
      <div class="border border-gray-200 rounded-lg p-6 relative hover:border-indigo-300 transition">
        <!-- Delete Button -->
        <button @click="removeEducation(index)" class="absolute top-3 right-3 text-red-500 hover:text-red-700 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <h3 class="font-semibold text-lg mb-4">Education #{{ index + 1 }}</h3>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Institution *</label>
            <input 
              v-model="edu.institution"
              type="text"
              class="form-input"
              placeholder="Stanford University"
            />
          </div>
          
          <div>
            <label class="form-label">Degree *</label>
            <select v-model="edu.degree" class="form-input">
              <option value="">Select Degree</option>
              <option value="High School">High School</option>
              <option value="Associate">Associate Degree</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="form-label">Field of Study *</label>
            <input 
              v-model="edu.field"
              type="text"
              class="form-input"
              placeholder="Computer Science"
            />
          </div>
          
          <div>
            <label class="form-label">GPA</label>
            <input 
              v-model="edu.gpa"
              type="text"
              class="form-input"
              placeholder="3.8"
            />
          </div>
          
          <div>
            <label class="form-label">Start Date *</label>
            <input 
              v-model="edu.startDate"
              type="date"
              class="form-input"
            />
          </div>
          
          <div>
            <label class="form-label">End Date</label>
            <input 
              v-model="edu.endDate"
              type="date"
              class="form-input"
              :disabled="edu.current"
            />
          </div>
        </div>

        <div class="mt-4 flex items-center space-x-4">
          <label class="flex items-center space-x-2">
            <input 
              v-model="edu.current"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span class="text-sm text-gray-700">Currently studying</span>
          </label>
        </div>

        <div class="mt-4">
          <label class="form-label">Description / Achievements</label>
          <textarea 
            v-model="edu.description"
            rows="3"
            class="form-input"
            placeholder="Describe your coursework, achievements, or activities..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const addEducation = () => {
  store.addEducation({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: ''
  })
}

const removeEducation = (index) => {
  if (confirm('Remove this education entry?')) {
    store.removeEducation(index)
  }
}
</script>