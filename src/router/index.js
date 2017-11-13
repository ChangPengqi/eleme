import {index,goods,ratings,seller} from './asyncComponents.js'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
      {
      path: '/goods',
      name: 'goods',
      component: goods
     },
     {
      path: '/ratings',
      name: 'ratings',
      component: ratings
     },
     {
      path: '/seller',
      name: 'seller',
      component: seller
     }]
    },
    
  ]
})
