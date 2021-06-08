<template>
    <div>
        <div ref="page" class="live">
            <div id="local-player" class="player-box">
                <div class="player-btn" @click="livePrestart" v-if="isLive">
                    <img src="@/assets/images/video-start.png" class="video" alt="">
                    <p class="text">开始直播</p>
                </div>
                <div class="endBtn" v-if="!isLive" @click="endSkyLive">直播中，结束直播</div>
            </div>
        </div>
    </div>
</template>

<script>
import {postPrestart,postSkyStartLive,postSkyEndLive} from '@/api/liveService.js'
import AgoraRTC from "agora-rtc-sdk-ng"

import {MixIns} from "@/api/mixins.js"
    export default {
        mixins:[MixIns],
        data(){
            return{
                //直播按钮
                isLive:true,
                //屏幕高度
                clientHeight:'',
                //活动ID
                eventId:'',
                //声网 项目ID
                appid: "",
                //直播房间
                channel: "", //webId
                //房间内 用户ID
                uid: 0,
                //本次直播  ID
                lhid: 0,
                //声网token
                token: "",
                //角色 （主播和观众）
                role: "host",
                //声网  直播客户端
                client :null,
                //当前 轨道
                localTracks :{
                    videoTrack: null,
                    audioTrack: null
                },
                //麦克风
                mics : [], // all microphones devices you can use
                //摄像头
                cams : [], // all cameras devices you can use
                // 当前麦克风和摄像头
                currentMic:null, // the microphone you are using
                currentCam:null, // the camera you are using
                //直播分辨率
                videoProfiles : [
                    { label: "480p_1", detail: "640×480, 15fps, 500Kbps", value: "480p_1" },
                    { label: "480p_2", detail: "640×480, 30fps, 1000Kbps", value: "480p_2" },
                    { label: "720p_1", detail: "1280×720, 15fps, 1130Kbps", value: "720p_1" },
                    { label: "720p_2", detail: "1280×720, 30fps, 2000Kbps", value: "720p_2" },
                    { label: "1080p_1", detail: "1920×1080, 15fps, 2080Kbps", value: "1080p_1" },
                    { label: "1080p_2", detail: "1920×1080, 30fps, 3000Kbps", value: "1080p_2" },
                    { label: "200×640", detail: "200×640, 30fps", value: { width: 200, height: 640, frameRate: 30 } } // custom video profile
                ],
                // 当前分辨率
                curVideoProfile:null
            }
        },
        methods:{
            //准备直播
            async livePrestart(){
                await postPrestart(this.eventId).then(res => {
                    console.log(res)
                    if(res.data.rspCode == 1){
                        let data = res.data.data
                        this.appid = data.appId
                        this.channel = data.channel
                        this.uid = data.uid
                        this.lhid = data.historyId
                        this.token = data.token
                        this.lives()
                    }
                })
            },

            async lives(){
                 try {
                    await this.startLive()
                    //开始直播
                    // this.skyStartLive()
                    //volumeAnimation = requestAnimationFrame(setVolumeWave);
                    this.isLive = false
                }
                catch (error) {
                    console.error('start live failed!');
                    console.error(error);
                    // this.leaveLive();
                    var errorCode = error.code;
                    var errMsg = "开启直播失败,";
                    if (errorCode === 'DEVICE_NOT_FOUND') {
                        errMsg += "未找到摄像头或麦克风设备!";
                    }
                    errMsg += "\n详细错误信息\n" + error;
                    alert(errMsg);
                } finally {
                    //$("#btn-stop-live").attr("disabled", false);
                    //$("#enable-beauty").attr("disabled", false);
                    //$("#disable-beauty").attr("disabled", true);
                }
            },
            //声网开始直播
            async startLive() {
                console.log("startlive")
                // create Agora client
                this.client.setClientRole(this.role);
                console.log(this.appid, this.channel, this.token,this.uid)
                // join the channel
                this.uid = await this.client.join(this.appid, this.channel, this.token || null, this.uid);
                console.log("end-join:"+this.uid)
                // create local audio and video tracks
                this.localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                this.localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack({ encoderConfig: this.curVideoProfile.value });
                this.localTracks.audioTrack.setVolume(200);
                const level = this.localTracks.audioTrack.getVolumeLevel();
                console.log("local stream audio level", level);
                // // play local video track
                this.localTracks.videoTrack.play("local-player");
                
                // //$("#local-player-name").text(`localTrack(${options.uid})`);
                // // publish local tracks to channel
                await this.client.publish([this.localTracks.audioTrack, this.localTracks.videoTrack]);
                console.log("publish success");
                // client.on("user-left", handleUserLeft);
                // client.on("connection-state-change", handleStateChange);
                // client.on("token-privilege-will-expire", function() {
                //     console.log("onTokenPrivilegeWillExpire");
                //     //进行重新申请 Token 操作后
                //     //client.renewToken(token);
                // });
                // client.on("token-privilege-did-expire", function() {
                //     console.log("onTokenPrivilegeDidExpire");
                //     $("#verification-dialog-3").modal("show");
                //     leaveLive();
                //     //进行重新申请 Token 操作后
                //     //client.renewToken(token);
                // });
                //initStats();
            },
            //活动星空开始直播
             skyStartLive(){
                 postSkyStartLive(this.eventId,this.lhid).then(res => {
                    console.log(res)

                    if(res.data.rspCode == 1){
                        console.log(res,'开始直播')
                    }
                })
            },
      
            //声网结束直播
            async leaveLive(){
                if (this.localTracks.audioTrack) {
                    this.localTracks.audioTrack.stop();
                    this.localTracks.audioTrack.close();
                    this.localTracks.audioTrack = undefined;
                }

                if (this.localTracks.videoTrack) {
                    this.localTracks.videoTrack.stop();
                    this.localTracks.videoTrack.close();
                    this.localTracks.videoTrack = undefined;
                }

                await this.client.unpublish();
                // leave the channel
                await this.client.leave();
            },
            //初始化直播 分辨率   
            initVideoProfiles() {
                this.curVideoProfile = this.videoProfiles[3];
            },
            //活动星空结束直播
            endSkyLive(){
                this.leaveLive()
                postSkyEndLive(this.eventId,this.lhid).then(res => {
                    console.log(res)
                    if(res.data.rspCode == 1){
                        console.log(res,'结束直播')
                    }
                })
            }
        },
        created(){
            this.eventId = this.$route.params.pathMatch

            var browerSupport = AgoraRTC.checkSystemRequirements();
            if (browerSupport) {
                this.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
                //screenShareClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
            } else {
                alert("The Brower is not support live!");
                return;
            }
            this.initVideoProfiles();
        },
    }
</script>

<style lang="less" scoped>
    .live{
        padding: 120px 0 150px;
        box-sizing: border-box;
        background: #0F5F54;
    }
    .player-box{
        width: 90%;
        height: 600px;
        margin: 0 auto;
        position: relative;
        .player-btn{
            display: inline-block;
            position: absolute;
            margin: auto;
            left: 50%;
            transform: translate3d(-50%,-50%,0);
            cursor: pointer;
            top: 50%;
            .video{
                width: 115px;
                margin:0 auto 40px;
                display: block;
            }
            .text{
                background: #027AFF;
                border-radius: 6px;
                border: 1px solid #979797;
                color: #fff;
                line-height: 42px;
                display: inline-block;
                padding: 0 30px;
            }
        }
        .endBtn{
            display: inline-block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 18px;
            padding: 0 30px;
            color: #fff;
            cursor: pointer;
            line-height: 44px;
            background: #FF5755;
            border-radius: 6px;
            border: 1px solid #979797;
        }
    }
</style>