import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/live-service"
    // 直播信息  观众端
export function getLiveViews(id) {
    return http.get(`${resquest}/live/audience/` + id)
}
//直播直播
export function postPrestart(id) {
    return http.post(`${resquest}/live/prestart/` + id)
}
//开始直播
export function postSkyStartLive(id, lhid) {
    return http.post(`${resquest}/live/start/` + id + '?historyId=' + lhid)
}
//结束直播
export function postSkyEndLive(id, lhid) {
    return http.post(`${resquest}/live/end/` + id + '?historyId=' + lhid)
}