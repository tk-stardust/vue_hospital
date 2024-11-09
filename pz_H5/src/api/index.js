import request from '../utils/request'

export default {
    login(data){
        return request.post('/login',data)
    },

    // 首页数据
    index(){
        return request.get('/Index/index')
    },

    //陪护师列表
    h5Companion(){
        return request.get('/h5/companion')
    },
    // 提交订单
    createOrder(data){
        return request.post('/createOrder',data)
    }


}