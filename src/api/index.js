import request from '../utils/request'
// 发送验证码
export const getCode = (data) =>{
    return request.post('/get/code',data)
}

// 注册用户
export const userAuthentication =(data) =>{
    return request.post('/user/authentication',data)
}

// 登录
export const login = (data) =>{
    return request.post('/login',data)
}

// 权限管理列表
export const authAdmin = (params) =>{
    return request.get('/auth/admin', {params})
}

// 菜单权限数据
export const userGetmenu = () =>{
    return request.get('user/getmenu')
}

// 菜单权限修改
export const userSetmenu = (data)=>{
    return request.post('/user/setmenu',data)
}

// 菜单权限列表
export const menuList = (params) => {
    return request.get('/menu/list',{params})
}

// 菜单权限下拉
export const menuSelectlist = () => {
    return request.get('/menu/selectlist')
}

// 用户信息修改
export const updateUser = () => {
    return request.post('/update/user',data)
}