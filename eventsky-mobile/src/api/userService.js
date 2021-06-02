import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
//登陆
export function postLogin(phone, authCode) {
    return http.post("/user-service/account/login_p?phone=" + phone + "&authCode=" + authCode + "")
}
//注册
export function postSignup(phone) {
    return http.post("/user-service/auth/send?target=" + phone + "&type=PHONE_LOGIN")
}