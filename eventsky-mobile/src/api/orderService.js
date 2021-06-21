import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/api/order-service"
import qs from 'qs'
//个人中心 订单
export function getclientOrder() {
    return http.get(`${resquest}/order/mine`)
}
//订单提交
export function postOrderCreate(params) {
    return http.post(`${resquest}/order/create`, qs.stringify(params))
}