import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardDetailView from '../views/board/BoardDetailView.vue'
import BoardListView from '../views/board/BoardListView.vue'
import TotalView from '../views/board/TotalView.vue'
import BoardEditView from '../views/board/BoardEditView.vue'
import BoardSearchView from '../views/board/BoardSearchView.vue'
import SocialLogin from '../views/login/SocialLogin.vue'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (token && role === 'ROLE_ADMIN') {
    return next()
  } else {
    alert('접근 권한이 없습니다.')
    next('/')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        component: TotalView
      },
      {
        path: 'board/:parentCategory/:page/:step',
        name: 'BoardListView',
        component: BoardListView,
        props: true
      },
      {
        path: 'board/:parentCategory/:childCategory/:page/:step',
        name: 'BoardListView',
        component: BoardListView,
        props: true
      },
      {
        path: 'board/search/',
        component: BoardSearchView
      },
      {
        path: 'board/:id',
        name: 'BoardDetailView',
        component: BoardDetailView,
        props: true
      }
    ]
  },
  {
    path: '/edit',
    component: BoardEditView,
    beforeEnter: requireAuth()
  },
  {
    path: '/edit/:id',
    component: BoardEditView,
    beforeEnter: requireAuth(),
    props: true
  },
  {
    path: '/login',
    component: SocialLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
