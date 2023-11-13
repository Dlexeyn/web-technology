// Composables
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import Auction from "@/views/Auction.vue";
import HistoryGraphic from "@/views/HistoryGraphic.vue";

const routes = [
  {
    path: '/auction',
    name: 'Auction',
    component: Auction,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/history/:id',
    name: 'historyChart',
    component: HistoryGraphic
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
