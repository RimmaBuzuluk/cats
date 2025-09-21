import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Facts from '../views/Facts.vue'
import Fact from '../views/Fact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/facts',
    name: 'Facts',
    component: Facts
  },
  {
    path: '/fact/:id',
    name: 'Fact',
    component: Fact,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
