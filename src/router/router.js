import Vue from 'vue'
import Router from 'vue-router'
import Message from '../views/Message.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
      {
          path: '/welcome',
          name: 'welcome',
          component: ()=>import('../components/Welcome.vue')
      },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
        path: '/friends',
        name: 'friends',
        // this generates a separate chunk (about.[hash].js) for this route
        // route level code-splitting
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Friends.vue')
    },
      {
          path: '/discover',
          name: 'discover',
          // this generates a separate chunk (about.[hash].js) for this route
          // route level code-splitting
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Discover.vue')
      },
      {
          path: '/mine',
          name: 'mine',
          // this generates a separate chunk (about.[hash].js) for this route
          // route level code-splitting
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
      }
  ]
})
