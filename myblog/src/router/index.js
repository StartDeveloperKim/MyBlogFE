import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardDetailView from '../views/board/BoardDetailView.vue'
import BoardListView from '../views/board/BoardListView.vue'
import TotalView from '../views/board/TotalView.vue'
import BoardEditView from '../views/board/BoardEditView.vue'

Vue.use(VueRouter)

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
        path: 'board/:id',
        name: 'BoardDetailView',
        component: BoardDetailView,
        props: true
      }
    ]
  },
  {
    path: '/edit',
    component: BoardEditView
  }
]

// {
//   path: '/board/:parentCategory/:page/:step',
//   name: 'BoardListView',
//   component: BoardListView,
//   props: true
// },
// {
//   path: '/board/:parentCategory/:childCategory/:page/:step',
//   name: 'BoardListView',
//   component: BoardListView,
//   props: true
// },
// {
//   path: '/board/:id',
//   name: 'BoardDetailView',
//   component: BoardDetailView,
//   props: true
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
