import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {auth: true},
      component: Home
    },
    {
      path: '/note/:id',
      name: 'note',
      component: () => import('./views/Note.vue')
    },
  ]
})

export default router