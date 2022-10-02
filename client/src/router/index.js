import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView'
import RegisterView from '../views/RegisterView'
import Search from '../views/SearchPage'
import SurveyView from '../views/SurveyView'
import LoginView from '../views/LoginView'
import ProfileView from '../views/ProfileView'
import EditProfileView from '../views/EditProfileView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/survey',
    name: 'survey',
    component: SurveyView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: EditProfileView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
