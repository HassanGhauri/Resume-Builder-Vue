<!-- src/components/builder/PersonalInfoForm.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Personal Information</h2>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="form-label">First Name *</label>
        <input 
          v-model="store.data.personal.firstName"
          type="text"
          class="form-input"
          placeholder="John"
        />
      </div>
      
      <div>
        <label class="form-label">Last Name *</label>
        <input 
          v-model="store.data.personal.lastName"
          type="text"
          class="form-input"
          placeholder="Doe"
        />
      </div>
      
      <div>
        <label class="form-label">Email *</label>
        <input 
          v-model="store.data.personal.email"
          type="email"
          class="form-input"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label class="form-label">Phone</label>
        <input 
          v-model="store.data.personal.phone"
          type="tel"
          class="form-input"
          placeholder="+1 234 567 890"
        />
      </div>
      
      <div>
        <label class="form-label">Location</label>
        <input 
          v-model="store.data.personal.location"
          type="text"
          class="form-input"
          placeholder="New York, USA"
        />
      </div>
      
      <div>
        <label class="form-label">LinkedIn</label>
        <input 
          v-model="store.data.personal.linkedin"
          type="url"
          class="form-input"
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      
      <div class="md:col-span-2">
        <label class="form-label">Professional Summary</label>
        <textarea 
          v-model="store.data.personal.summary"
          rows="4"
          class="form-input"
          placeholder="Write a brief summary of your professional background..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '../../stores/resumeStore'

const store = useResumeStore()
</script>