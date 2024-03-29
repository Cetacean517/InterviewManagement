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
  {
    path: '/Magic',
    component: () => import('@/views/Magic/index'),
    hidden: true
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/curdHR', // 面包屑重定位要去的地址
    meta: { roles: ['ROLE_EMPLOYER'] },
    children: [{
      path: 'curdHR', // url中字地址的名称
      name: 'CurdHR',
      component: () => import('@/views/hr/curd_hr/index'),
      hidden: false,
      meta: { title: '发布招聘信息', icon: 'dashboard', roles: ['ROLE_EMPLOYER'] }
    }]
  },
  // HR 和 User公用的路由部分
  {
    path: '/Util', // url中字地址的名称
    component: Layout,
    redirect: '/Util/detailPage',
    meta: { roles: ['ROLE_EMPLOYER', 'ROLE_EMPLOYEE'] },
    children: [{
      path: 'detailPage',
      name: 'DetailPage',
      // hidden: true, // 用户查看招聘信息详细页，不能从侧边栏导航进入
      component: () => import('@/views/user/detailPage/index'),
      meta: { title: '最新招聘需求', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYER', 'ROLE_EMPLOYEE'] }
    },
    {
      path: 'resumeBrief',
      name: 'ResumeBrief',
      hidden: true, // 用户查看招聘信息详细页，不能从侧边栏导航进入
      component: () => import('@/views/hr/resume_brief_hr/index'),
      meta: { title: '查看简历概要', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYER'] }
    }, {
      path: 'userResume',
      name: 'UserResume',
      hidden: true, // 用户查看招聘信息详细页，不能从侧边栏导航进入
      component: () => import('@/views/hr/userResume_hr/index'),
      meta: { title: '应聘者简历详情', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYER'] }
    }]
  },
  {
    path: '/User',
    component: Layout,
    redirect: '/User/checkMSG', // 面包屑重定位要去的地址
    meta: { roles: ['ROLE_EMPLOYEE'] },
    children: [{
      path: 'checkMSG', // url中字地址的名称
      name: 'CheckMSG',
      component: () => import('@/views/user/checkmsg/index'),
      meta: { title: '查看招聘信息', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYEE'] }
    }]
  },
  {
    path: '/User/userCenter',
    component: Layout,
    redirect: '/User/userCenter', // 面包屑重定位要去的地址
    name: '',
    meta: { title: '个人中心', icon: 'table', meta: { roles: ['ROLE_EMPLOYEE'] }},
    children: [{
      path: 'doResume', // url中字地址的名称
      name: 'DoResume',
      component: () => import('@/views/user/userCenter/doResume/index'),
      meta: { title: '编写简历', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYEE'] }
    },
    {
      path: 'checkResume', // url中字地址的名称
      name: 'CheckResume',
      component: () => import('@/views/user/userCenter/checkResume/index'),
      meta: { title: '查看状态', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYEE'] }
    }]
  },
  {
    path: '/HR',
    component: Layout,
    redirect: '/HR/manageHR', // 面包屑重定位要去的地址
    meta: { roles: ['ROLE_EMPLOYER'] },
    children: [{
      path: 'manageHR', // url中字地址的名称
      name: 'ManageHR',
      component: () => import('@/views/hr/manage_hr/index'),
      meta: { title: '简历管理', icon: 'el-icon-s-help', roles: ['ROLE_EMPLOYER'] }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true, roles: ['ROLE_EMPLOYER', 'ROLE_EMPLOYEE'] }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: window.APP_CONFIG.routeBase,
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
