
const urlsPath = {
  baseURL: 'http://3.130.13.32:3000/',
  admin: {
    login:{
      url:'/users/login',
      method: 'post'
    },
    update:{
      url:'/users/update',
      getURL:()=>{
        return '/users/update';
      },
      method: 'patch'
    }
  },
  users:{
    create:{
      url:'/admin/users/create',
      getURL:()=>{
        return '/admin/users/create';
      },
      method: 'post'
    },
    detail:{
      url:'/admin/users/get',
      getURL:(userId)=>{
        return '/admin/users/get/'.concat(userId);
      },
      method: 'get'
    },
    update:{
      url:'/admin/users/update',
      getURL:()=>{
        return '/admin/users/update';
      },
      method: 'patch'
    },
    delete:{
      url:'/admin/users/delete',
      getURL:(userId)=>{
        return '/admin/users/get/'.concat(userId);
      },
      method: 'post'
    },
    list:{
      url:'/admin/users/getMany',
      getURL:(limit, skip)=>{
        return `/admin/users/getMany/${limit}/${skip}`;
      },
      method: 'get'
    }
  }

};

export default urlsPath
