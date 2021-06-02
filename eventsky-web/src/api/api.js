import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let userResquest = "/user-service"
let eventResquest = "/event-service/"
    // get请求
export default {
    getEventAPI(id) {
        return http.get(`${eventResquest}/id` + id)
    },
    sendVerifyCode(params) {
        return http.post(`${userResquest}/auth/send`, params)
    }
}