import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardDetailView from '../views/board/BoardDetailView.vue'
import BoardListView from '../views/board/BoardListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/board',
    name: 'BoardListView',
    component: BoardListView
  },
  {
    path: '/board/:id',
    name: 'BoardDetailView',
    component: BoardDetailView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
