
const urlsPath = {
  auth:{
    login:'/auth/login',
  },
  dashboard:{
    default:'/user/profile/update',
  },
  profile: {
    title:'Profile',
    basePath: '/user',
    path: '/user/profile',
    tabPath: '/user/profile/:tab',
    defaultTabPath: '/user/profile/update',
    updatePath: '/user/profile/update',
    changePasswordPath: '/user/profile/chnage_password',
  },
  users:{
    title:'Users',
    basePath:'/users',
    createPath:'/users/create',
    listPath:'/users/list',
  }

};

export default  urlsPath
