// src/stores/resumeStore.js
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    data: useStorage('resume-data', {
      personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: {
        technical: [],
        soft: [],
        languages: []
      },
      projects: []
    }),
    activeTemplate: useStorage('active-template', 'modern'),
    currentStep: 1,
    isSaving: false
  }),

  actions: {
    updatePersonal(field, value) {
      this.data.personal[field] = value
      this.autoSave()
    },

    addExperience(experience) {
      this.data.experience.push(experience)
      this.autoSave()
    },

    updateExperience(index, field, value) {
      this.data.experience[index][field] = value
      this.autoSave()
    },

    removeExperience(index) {
      this.data.experience.splice(index, 1)
      this.autoSave()
    },

    addEducation(education) {
      this.data.education.push(education)
      this.autoSave()
    },

    updateEducation(index, field, value) {
      this.data.education[index][field] = value
      this.autoSave()
    },

    removeEducation(index) {
      this.data.education.splice(index, 1)
      this.autoSave()
    },

    addProject(project) {
      this.data.projects.push(project)
      this.autoSave()
    },

    updateProject(index, field, value) {
      this.data.projects[index][field] = value
      this.autoSave()
    },

    removeProject(index) {
      this.data.projects.splice(index, 1)
      this.autoSave()
    },

    addSkill(category, skill) {
      this.data.skills[category].push(skill)
      this.autoSave()
    },

    removeSkill(category, index) {
      this.data.skills[category].splice(index, 1)
      this.autoSave()
    },

    autoSave() {
      this.isSaving = true
      // The useStorage automatically saves to localStorage
      setTimeout(() => {
        this.isSaving = false
      }, 500)
    },

    setTemplate(template) {
      this.activeTemplate = template
    },

    setStep(step) {
      this.currentStep = step
    },

    nextStep() {
      if (this.currentStep < 4) this.currentStep++
    },

    prevStep() {
      if (this.currentStep > 1) this.currentStep--
    },

    resetResume() {
      this.data = {
        personal: { firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', summary: '' },
        experience: [],
        education: [],
        skills: { technical: [], soft: [], languages: [] },
        projects: []
      }
    }
  },

  getters: {
    fullName: (state) => {
      return `${state.data.personal.firstName} ${state.data.personal.lastName}`.trim()
    },
    hasData: (state) => {
      return state.data.personal.firstName !== '' || state.data.experience.length > 0
    },
    completionPercentage: (state) => {
      let total = 0
      let filled = 0
      
      // Personal info
      const personalFields = Object.values(state.data.personal)
      total += personalFields.length
      filled += personalFields.filter(v => v !== '').length
      
      // Experience
      if (state.data.experience.length > 0) total++
      if (state.data.experience.length > 0) filled++
      
      // Education
      if (state.data.education.length > 0) total++
      if (state.data.education.length > 0) filled++
      
      // Skills
      const allSkills = [...state.data.skills.technical, ...state.data.skills.soft, ...state.data.skills.languages]
      if (allSkills.length > 0) total++
      if (allSkills.length > 0) filled++
      
      return Math.round((filled / total) * 100)
    }
  }
})