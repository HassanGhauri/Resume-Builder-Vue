<!-- src/components/builder/ProjectsForm.vue -->
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Projects</h2>
      <button @click="addProject" class="btn-primary">
        + Add Project
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="store.data.projects.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <span class="text-6xl mb-4 block">🚀</span>
      <p class="text-gray-600">No projects added yet. Showcase your work by adding your projects.</p>
    </div>

    <!-- Project Cards -->
    <div v-for="(project, index) in store.data.projects" :key="index" class="mb-6">
      <div class="border border-gray-200 rounded-lg p-6 relative hover:border-indigo-300 transition">
        <!-- Delete Button -->
        <button @click="removeProject(index)" class="absolute top-3 right-3 text-red-500 hover:text-red-700 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <h3 class="font-semibold text-lg mb-4">Project #{{ index + 1 }}</h3>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Project Name *</label>
            <input 
              v-model="project.name"
              type="text"
              class="form-input"
              placeholder="Resume Builder App"
            />
          </div>
          
          <div>
            <label class="form-label">Status</label>
            <select v-model="project.status" class="form-input">
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
        </div>

        <div class="mt-4">
          <label class="form-label">Description *</label>
          <textarea 
            v-model="project.description"
            rows="3"
            class="form-input"
            placeholder="Describe what your project does, the problem it solves..."
          ></textarea>
        </div>

        <div class="mt-4">
          <label class="form-label">Technologies Used</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span 
              v-for="(tech, tIndex) in project.technologies" 
              :key="tIndex"
              class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {{ tech }}
              <button @click="removeTechnology(index, tIndex)" class="ml-2 text-indigo-600 hover:text-indigo-800">
                ×
              </button>
            </span>
          </div>
          <div class="flex space-x-2">
            <input 
              v-model="newTechnology"
              type="text"
              class="form-input flex-1"
              placeholder="Vue.js, Firebase, Tailwind..."
              @keyup.enter="addTechnology(index)"
            />
            <button @click="addTechnology(index)" class="btn-primary text-sm">
              Add
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="form-label">Project Link (Live Demo)</label>
            <input 
              v-model="project.link"
              type="url"
              class="form-input"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label class="form-label">GitHub Repository</label>
            <input 
              v-model="project.github"
              type="url"
              class="form-input"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()
const newTechnology = ref('')

const addProject = () => {
  store.addProject({
    name: '',
    description: '',
    technologies: [],
    link: '',
    github: '',
    status: 'Completed'
  })
}

const removeProject = (index) => {
  if (confirm('Remove this project?')) {
    store.removeProject(index)
  }
}

const addTechnology = (projectIndex) => {
  const tech = newTechnology.value.trim()
  if (tech) {
    store.data.projects[projectIndex].technologies.push(tech)
    newTechnology.value = ''
  }
}

const removeTechnology = (projectIndex, techIndex) => {
  store.data.projects[projectIndex].technologies.splice(techIndex, 1)
}
</script>