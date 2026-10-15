import { createRouter, createWebHistory } from 'vue-router'

import MainMenuView from '../views/MainMenuView.vue'
import GroupOrdersView from '../views/GroupOrdersView.vue'
import NewGroupOrderView from '../views/NewGroupOrderView.vue'
import TastingsView from '../views/TastingsView.vue'
import TheShelfView from '../views/TheShelfView.vue'
import WriteBrewNote from '@/components/WriteBrewNote.vue'
import ViewBrewNote from '../views/BrewNoteView.vue'
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
      path: '/write-brewnote/:bagId',
      name: 'write-brewnote',
      component: WriteBrewNote
    },
    {
      path: '/view-brewnote/:bagId',
      name: 'ViewBrewNotes',
      component: ViewBrewNote
    },
    {
      path: '/host-tasting',
      name: 'host-tasting',
      component: HostTastingView  
    }
  ]
})

export default router