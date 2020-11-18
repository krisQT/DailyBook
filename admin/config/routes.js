export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            name: '用户管理',
            icon: 'user',
            path: '/member',
            routes: [
              {
                
                name: '用户列表',
                icon: 'smile',
                path: '/member/list',
                component: './member',
              }
            ]
          },
          {
            name: '管理中心',
            icon: 'table',
            path: '/manage',
            routes: [
              {
                
                name: '账号管理',
                icon: 'smile',
                path: '/manage/account',
                component: './manage/account',
              },
              {
                
                name: '分类管理',
                icon: 'smile',
                path: '/manage/classify',
                component: './manage/classify',
              },
              {
                
                name: '成员管理',
                icon: 'smile',
                path: '/manage/personnel',
                component: './manage/personnel',
              },
              {
                
                name: 'list',
                icon: 'smile',
                path: '/manage/list',
                component: './ListTableList',
              },
            ]
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
