import layout from '@/page/layout'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/page/home/index')
      }
    ]
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/index'),
    meta: {
      isAuth: false
    }
  },
  {
    path: '/user',
    component: layout,
    children: [
      {
        path: 'info',
        name: '用户信息',
        component: () => import('@/views/user/info/index')
      }
    ]
  },
  {
    path: '/dayIframe',
    component: layout,
    redirect: '/dayIframe/index',
    children: [
      {
        path: 'index',
        name: 'iframe',
        component: () => import('@/components/Iframe')
      }
    ]
  }
]
