import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/sys',
  //   component: Layout,
  //   redirect: '/sys/userList',
  //   name: 'User',
  //   meta: { title: '系统管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'userList',
  //       name: 'userList',
  //       component: () => import('@/views/system/user/index'),
  //       meta: { title: '用户', icon: 'table' }
  //     },
  //     {
  //       path: 'roleList',
  //       name: 'roleList',
  //       component: () => import('@/views/system/role/index'),
  //       meta: { title: '角色', icon: 'table' }
  //     },
  //     {
  //       path: 'resourcesList',
  //       name: 'resourcesList',
  //       component: () => import('@/views/system/resource/index'),
  //       meta: { title: '权限', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/item',
  //   component: Layout,
  //   redirect: '/item/list',
  //   name: 'Example',
  //   meta: { title: '商品管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'cat',
  //       name: 'Table',
  //       component: () => import('@/views/item/cat'),
  //       meta: { title: '商品类目', icon: 'table' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'Table',
  //       component: () => import('@/views/item/createitem'),
  //       meta: { title: '查询商品', icon: 'table' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       name: 'Table',
  //       component: () => import('@/views/item/index'),
  //       meta: { title: '查询商品', icon: 'table' }
  //     },
  //     {
  //       path: 'params',
  //       name: 'Table1',
  //       component: () => import('@/views/item/params'),
  //       meta: { title: '规格参数', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/list',
  //   name: 'Example',
  //   meta: { title: '订单管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'Table',
  //       component: () => import('@/views/order/index'),
  //       meta: { title: '订单管理', icon: 'table' }
  //     },
  //     {
  //       path: 'address',
  //       name: 'Table1',
  //       component: () => import('@/views/order/address'),
  //       meta: { title: '地址管理', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/content',
  //   component: Layout,
  //   redirect: '/content/list',
  //   name: 'Example',
  //   meta: { title: '内容管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'contentCategory',
  //       name: 'contentCategory',
  //       component: () => import('@/views/content/content_category/index'),
  //       meta: { title: '分类管理', icon: 'table' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'Table3',
  //       component: () => import('@/views/content/content/create'),
  //       meta: { title: '添加内容', icon: 'table' },
  //       hidden: true
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       name: 'Table2',
  //       component: () => import('@/views/content/content/edit'),
  //       meta: { title: '修改内容', icon: 'table' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       name: 'Table1',
  //       component: () => import('@/views/content/content/index'),
  //       meta: { title: '内容管理', icon: 'table' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
