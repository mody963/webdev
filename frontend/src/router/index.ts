import { createRouter, createWebHistory } from 'vue-router'

import MainMenuView from '../views/MainMenuView.vue'
import GroupOrdersView from '../views/GroupOrdersView.vue'
import NewGroupOrderView from '../views/NewGroupOrderView.vue'
import TastingsView from '../views/TastingsView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'main-menu',
      component: MainMenuView
    },
    {
      path: '/group-orders',
      name: 'group-orders',
      component: GroupOrdersView
    },
    {
      path: '/new-group-order',
      name: 'new-group-order',
      component: NewGroupOrderView
    },
    {
      path: '/tastings',
      name: 'tastings',
      component: TastingsView
    }
  ]
})

export default router