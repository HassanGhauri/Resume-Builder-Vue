<!-- src/views/HomeView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center py-12">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">
        Build Your Professional Resume
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Create a stunning resume in minutes. Free, fast, and easy to use.
      </p>
      <div class="flex justify-center space-x-4">
        <router-link to="/builder" class="btn-primary text-lg">
          Start Building
        </router-link>
        <router-link to="/preview" class="btn-secondary text-lg">
          Preview
        </router-link>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mt-12">
      <div class="card text-center">
        <div class="text-4xl mb-4">📝</div>
        <h3 class="text-lg font-semibold mb-2">Easy to Use</h3>
        <p class="text-gray-600">Simple form-based interface with real-time preview</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-4">🎨</div>
        <h3 class="text-lg font-semibold mb-2">Multiple Templates</h3>
        <p class="text-gray-600">Choose from professional templates</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-4">💾</div>
        <h3 class="text-lg font-semibold mb-2">Auto-Save</h3>
        <p class="text-gray-600">Your data is saved automatically</p>
      </div>
    </div>
  </div>
</template>