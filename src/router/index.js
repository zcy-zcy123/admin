import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'name',
    component: () => import('../views/home.vue'),
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/home/index.vue'),
        meta: {
          header: true,
          title: 'Home'
        }
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('../views/home/shop.vue'),
        meta: {
          header: true,
          title: '商品管理'
        }
      },
      {
        path: 'classify',
        name: 'classify',
        component: () => import('../views/home/classify.vue'),
        meta: {
          header: true,
          title: '品类管理'
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/home/order.vue'),
        meta: {
          header: true,
          title: '订单管理'
        }
      },
      {
        path: 'shop_details',
        name: 'shop_details',
        component: () => import('../views/home/shop_details.vue'),
        meta: {
          header: true,
          title: '商品详情'
        }
      },
      {
        path: 'setShop',
        name: 'setShop',
        component: () => import('../views/home/setShop.vue'),
        meta: {
          header: false,
          title: '商品管理',
          item: '修改商品',
        }
      },
      {
        path: 'order_detail',
        name: 'order_detail',
        component: () => import('../views/home/order_detail.vue'),
        meta: {
          header: true,
          title: '订单详情',
        }
      },
      {
        path: 'classify_id',
        name: 'classify_id',
        component: () => import('../views/home/classify_id.vue'),
        meta: {
          header: true,
          title: '品类管理',
        }
      },
      {
        path: 'classify_add',
        name: 'classify_add',
        component: () => import('../views/home/classify_add.vue'),
        meta: {
          header: false,
          title: '品类管理',
          item: '添加品类'
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
