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
    templateSettings: useStorage('template-settings', {
      primaryColor: '#4F46E5',
      fontFamily: 'Inter',
      fontSize: 'medium'
    }),
    currentStep: 1,
    isSaving: false,
    hasPreviewed: useStorage('resume-previewed', false)
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
      setTimeout(() => {
        this.isSaving = false
      }, 500)
    },

    setTemplate(template) {
      this.activeTemplate = template
    },

    updateTemplateSettings(settings) {
      this.templateSettings = { ...this.templateSettings, ...settings }
    },

    setStep(step) {
      if (step >= 1 && step <= 6) {
        this.currentStep = step
        console.log('Step set to:', step)
      }
    },

    markPreviewed() {
      this.hasPreviewed = true
    },

    nextStep() {
      if (this.currentStep < 6) {
        this.currentStep++
        console.log('Next step:', this.currentStep)
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        console.log('Previous step:', this.currentStep)
      }
    },

    resetResume() {
      this.data = {
        personal: { firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', summary: '' },
        experience: [],
        education: [],
        skills: { technical: [], soft: [], languages: [] },
        projects: []
      }
      this.activeTemplate = 'modern'
      this.templateSettings = { primaryColor: '#4F46E5', fontFamily: 'Inter', fontSize: 'medium' }
      this.currentStep = 1
      this.hasPreviewed = false

      // Clear resume-related data from localStorage (theme is preserved)
      localStorage.removeItem('resume-data')
      localStorage.removeItem('active-template')
      localStorage.removeItem('template-settings')
      localStorage.removeItem('resume-previewed')
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
      
      const personalFields = Object.values(state.data.personal)
      total += personalFields.length
      filled += personalFields.filter(v => v !== '').length
      
      if (state.data.experience.length > 0) total++
      if (state.data.experience.length > 0) filled++
      
      if (state.data.education.length > 0) total++
      if (state.data.education.length > 0) filled++
      
      const allSkills = [...state.data.skills.technical, ...state.data.skills.soft, ...state.data.skills.languages]
      if (allSkills.length > 0) total++
      if (allSkills.length > 0) filled++
      
      if (state.data.projects.length > 0) total++
      if (state.data.projects.length > 0) filled++
      
      const percentage = Math.round((filled / total) * 100) || 0

      // Once the user has previewed the resume and all sections are filled,
      // the progress bar should read 100%
      const allSectionsComplete = state.data.experience.length > 0 &&
        state.data.education.length > 0 &&
        allSkills.length > 0 &&
        state.data.projects.length > 0 &&
        `${state.data.personal.firstName} ${state.data.personal.lastName}`.trim() !== ''

      return (state.hasPreviewed && allSectionsComplete) ? 100 : percentage
    }
  }
})