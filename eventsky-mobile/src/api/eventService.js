import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

let resquest = "/api/event-service"
    //个人中心 活动信息
export function getclientEvent(params) {
    return http.get(`${resquest}/event/list/`, params)
}
//活动详情
export function getEventInfo(id) {
    return http.get(`${resquest}/event/info/` + id)
}
//订单 活动信息
export function getInfoPayment(id) {
    return http.get(`${resquest}/event/info/` + id)
}