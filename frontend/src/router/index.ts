import { createRouter, createWebHistory } from 'vue-router'

import MainMenuView from '../views/MainMenuView.vue'
import GroupOrdersView from '../views/GroupOrdersView.vue'
import NewGroupOrderView from '../views/NewGroupOrderView.vue'
import TastingsView from '../views/TastingsView.vue'
import TheShelfView from '../views/TheShelfView.vue'
import MyCoffeeView from '@/views/MyCoffeeView.vue'
import WriteBrewNote from '@/components/WriteBrewNote.vue'
import BrewNoteView from '@/views/BrewNoteView.vue'
import HostTastingView from '../views/HostTastingView.vue'

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
      component: WriteBrewNote
    },
    {
      path: '/view-brewnote',
      name: 'view-brewnote',
      component: BrewNoteView
    },
    {
      path: '/host-tasting',
      name: 'host-tasting',
      component: HostTastingView // <-- Add this
    }
  ]
})

export default router