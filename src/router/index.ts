// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BuilderView from '../views/BuilderView.vue'
import PreviewView from '../views/PreviewView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/builder',
    name: 'Builder',
    component: BuilderView
  },
  {
    path: '/preview',
    name: 'Preview',
    component: PreviewView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router