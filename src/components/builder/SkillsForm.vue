<!-- src/components/builder/SkillsForm.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Skills</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Technical Skills -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="font-semibold text-lg mb-4 flex items-center">
          <span class="text-blue-600 mr-2">💻</span> Technical Skills
        </h3>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="(skill, index) in store.data.skills.technical" 
            :key="index"
            class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {{ skill }}
            <button @click="removeSkill('technical', index)" class="ml-2 text-blue-600 hover:text-blue-800">
              ×
            </button>
          </span>
        </div>
        
        <div class="flex space-x-2">
          <input 
            v-model="newTechnicalSkill"
            type="text"
            class="form-input flex-1"
            placeholder="JavaScript, Python, React..."
            @keyup.enter="addSkill('technical')"
          />
          <button @click="addSkill('technical')" class="btn-primary">
            Add
          </button>
        </div>
        
        <div class="mt-3">
          <p class="text-xs text-gray-500">Press Enter or click Add to add a skill</p>
        </div>
      </div>

      <!-- Soft Skills -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="font-semibold text-lg mb-4 flex items-center">
          <span class="text-green-600 mr-2">🤝</span> Soft Skills
        </h3>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="(skill, index) in store.data.skills.soft" 
            :key="index"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {{ skill }}
            <button @click="removeSkill('soft', index)" class="ml-2 text-green-600 hover:text-green-800">
              ×
            </button>
          </span>
        </div>
        
        <div class="flex space-x-2">
          <input 
            v-model="newSoftSkill"
            type="text"
            class="form-input flex-1"
            placeholder="Communication, Leadership..."
            @keyup.enter="addSkill('soft')"
          />
          <button @click="addSkill('soft')" class="btn-primary">
            Add
          </button>
        </div>
        
        <div class="mt-3">
          <p class="text-xs text-gray-500">Press Enter or click Add to add a skill</p>
        </div>
      </div>

      <!-- Languages -->
      <div class="md:col-span-2 border border-gray-200 rounded-lg p-6">
        <h3 class="font-semibold text-lg mb-4 flex items-center">
          <span class="text-purple-600 mr-2">🌐</span> Languages
        </h3>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="(lang, index) in store.data.skills.languages" 
            :key="index"
            class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {{ lang }}
            <button @click="removeSkill('languages', index)" class="ml-2 text-purple-600 hover:text-purple-800">
              ×
            </button>
          </span>
        </div>
        
        <div class="flex space-x-2">
          <input 
            v-model="newLanguage"
            type="text"
            class="form-input flex-1"
            placeholder="English (Native), Spanish (Fluent)..."
            @keyup.enter="addSkill('languages')"
          />
          <button @click="addSkill('languages')" class="btn-primary">
            Add
          </button>
        </div>
        
        <div class="mt-3">
          <p class="text-xs text-gray-500">Press Enter or click Add to add a language</p>
        </div>
      </div>
    </div>

    <!-- Skill Suggestions -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 class="font-medium text-sm text-gray-600 mb-2">Popular Skills Suggestions:</h4>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="suggestion in popularSkills" 
          :key="suggestion"
          @click="addSuggestedSkill(suggestion)"
          class="text-xs bg-white px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()

const newTechnicalSkill = ref('')
const newSoftSkill = ref('')
const newLanguage = ref('')

const popularSkills = [
  'JavaScript', 'Python', 'React', 'Vue.js', 'Node.js',
  'HTML/CSS', 'SQL', 'Git', 'TypeScript', 'Java',
  'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
  'Project Management', 'Adaptability', 'Critical Thinking'
]

const addSkill = (category) => {
  let skill = ''
  
  if (category === 'technical') {
    skill = newTechnicalSkill.value.trim()
    if (skill) {
      store.addSkill(category, skill)
      newTechnicalSkill.value = ''
    }
  } else if (category === 'soft') {
    skill = newSoftSkill.value.trim()
    if (skill) {
      store.addSkill(category, skill)
      newSoftSkill.value = ''
    }
  } else if (category === 'languages') {
    skill = newLanguage.value.trim()
    if (skill) {
      store.addSkill(category, skill)
      newLanguage.value = ''
    }
  }
}

const removeSkill = (category, index) => {
  store.removeSkill(category, index)
}

const addSuggestedSkill = (skill) => {
  // Check if skill already exists in technical skills
  if (!store.data.skills.technical.includes(skill) && 
      !store.data.skills.soft.includes(skill) &&
      !store.data.skills.languages.includes(skill)) {
    // Add to technical skills by default
    store.addSkill('technical', skill)
  }
}
</script>