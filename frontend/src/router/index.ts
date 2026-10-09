import { createRouter, createWebHistory } from 'vue-router'

import MainMenuView from '../views/MainMenuView.vue'
import GroupOrdersView from '../views/GroupOrdersView.vue'
import NewGroupOrderView from '../views/NewGroupOrderView.vue'
import TastingsView from '../views/TastingsView.vue'
import TheShelfView from '../views/TheShelfView.vue'
import MyCoffeeView from '@/views/MyCoffeeView.vue'
import WriteBrewNoteView from '@/views/WriteBrewNoteView.vue'

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
    },
    {
      path: '/the-shelf',
      name: 'the-shelf',
      component: TheShelfView
    },
    {
      path: '/my-bags',
      name: 'my-bags',
      component: MyCoffeeView
    },
    {
      path: '/write-brewnote',
      name: 'write-brewnote',
      component: WriteBrewNoteView
    }
  ]
})

export default router