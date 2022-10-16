import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView'
import RegisterView from '../views/RegisterView'
import Search from '../views/SearchPage'
import SurveyView from '../views/SurveyView'
import LoginView from '../views/LoginView'
import UserBehaviour from "../views/UserBehaviourView"
import ProfileView from '../views/ProfileView'
import TrackView from '../views/TrackView'
import RegisterModelView from '../views/RegisterModelView'
import ErrorView from '../views/ErrorView'
// import { userStore } from '../store/store'
import ModelRegistryView from "../views/ModelRegistryView"

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
    name: 'search',
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
    path: '/user-behaviour',
    name: 'user-behaviour',
    component: UserBehaviour
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/track',
    name: 'track',
    component: TrackView
  },
  {
    path: '/register-model',
    name: 'register-model',
    component: RegisterModelView
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView
  },
  {
    path: '/model-registry',
    name: 'model-registry',
    component: ModelRegistryView
  },
  {
    path: '/model-performance',
    name: 'model-performance',
    component: UserBehaviour
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'error',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to) => {
//   const store = userStore()

//   // users who are not logged in will be redirected to log in page
//   if (!store.isUserLoggedIn) {
//     if (to.name != 'login' && to.name != 'register') {
//       return '/login'
//     }
//   } else {
//     // non admin users cant access /user-behaviour 
//     if (!store.user.admin_user) {
//       if (to.name == 'user-behaviour' || to.name == 'model-performance' || to.name == 'model-registry') {
//         return '/error'
//       }
//       // logged in users will be redirected to landing page, skip log in/ register pages
//       if (to.name == 'login' || to.name == 'register') {
//         return '/search'
//       }
//     } else {
//       // logged in users will be redirected to landing page, skip log in/ register pages
//       if (to.name == 'login' || to.name == 'register') {
//         return '/model-performance'
//       }
//     }

//   }

// })

export default router
