export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile',
  component: './InterfaceInfo', hideInMenu: true},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    //这里的权限控制可以看官方文档，不用纠结为什么这里这么写
    access: 'canAdmin',
/*    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],*/
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '用户管理', icon: 'table', path: '/admin/user', component: './Admin/User' },
    ],

  },
//  { name: '查询表格', icon: 'table', path: '/list', component: './InterfaceInfo' },
//  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
