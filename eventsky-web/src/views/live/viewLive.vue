<template>
    <div  class="live">
        <div id="remote-playerlist">
        </div>
    </div>
</template>
<script>
import {getLiveViews} from '@/api/liveService.js'
import AgoraRTC from "agora-rtc-sdk-ng"
    export default {
        data(){
            return{
                //活动ID
                eventId:'',
                //声网 项目ID
                appid: "",
                //直播房间
                channel: "", //webId
                //房间内 用户ID
                uid: 0,
               
                //声网token
                token: "",
                //角色 （主播和观众）
                role: "audience",
                //声网  直播客户端
                client :null,
                
                //直播状态
                isLive:null,
                //
                remoteUsers:{},
                // 多人观看video 数组
                videoArr:[],
            }
        },
        methods:{
            async liveViews(){
                await getLiveViews(this.eventId).then(res => {
                    if(res.data.rspCode== 1){
                        let data = res.data.data
                        console.log(data)
                        this.appid = data.appId
                        this.channel = data.webId
                        this.isLive = data.status
                        this.lhid = data.historyId
                        this.token = data.token


                        if(this.isLive == 3) {
                            var browerSupport =  AgoraRTC.checkSystemRequirements();
                            if(browerSupport) {
                                this.client =   AgoraRTC.createClient({ mode: "live", codec: "vp8" });
                                //screenShareClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
                            } else {
                                // $("#notice_content").html("微信直播暂不支持<br/> 请复制直播链接，到手机浏览器里观看<br/> https://yoopay.cn/live/audience/${liveroom.webId}");
                                // $("#notice_dialog").modal('show');
                            // return;
                            }
                            try {
                                this.join();
                            } catch (error) {
                                console.error('join error');
                                console.error(error);
                            } finally {
                                console.log('finally')
                            }
                        }
                    }
                    
                })
            },
            async join() {
                // create Agora client
                this.client.setClientRole(this.role);

                // join the channel
                this.uid = await this.client.join(this.appid, this.channel, this.token || null);
                console.log("audience uid:" + this.uid);
                // add event listener to play remote tracks when remote user publishs.
                this.client.on("user-published", this.handleUserPublished);
                this.client.on("user-unpublished", this.handleUserUnpublished);
                //直播场景下，该回调提示有主播加入了频道，并返回该主播的 ID。如果在加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调
                this.client.on("user-joined", this.handleUserJoined);

                this.client.on("token-privilege-did-expire", function(){
                    console.log("onTokenPrivilegeWillExpire");
                    //进行重新申请 Token 操作后
                    //client.renewToken(token);
                });
                this.client.on("token-privilege-did-expire", function(){
                    console.log("onTokenPrivilegeDidExpire");
                    //进行重新申请 Token 操作后
                    //client.renewToken(token);
                });
                //initStats();
            },

                            
           

      
            
            //活动星空结束直播
        },
        async created(){
            this.eventId = this.$route.params.pathMatch
            this.liveViews()
          
            
        },
        handleUserJoined(user) {
            const id = user.uid;
                console.log("handleUserJoined:" + id);
        },
        handleUserPublished(user, mediaType) {
            console.log("handleUserPublished");
            const id = user.uid;
            this.remoteUsers[id] = user;
            this.subscribe(user, mediaType);
            // $("#cover-div").hide();
            //controls="controls"
            //$("#live-status").html("Living...");
        },
        handleUserUnpublished(user) {
            console.log("handleUserUnpublished");
            const id = user.uid;
            delete this.remoteUsers[id];
            // $(`#player-wrapper-${id}`).remove();
            // $("#cover-div").show();
            //$("#live-status").html("No Live");
        },
        async subscribe(user, mediaType) {
            const uid = user.uid;
            // subscribe to a remote user
            await this.client.subscribe(user, mediaType);
            console.log("subscribe success");
            if (mediaType === 'video') {
                const player = this.$(`
                <div id="player-wrapper-${uid}">
                    <div id="player-${uid}" class="player"></div>
                </div>  `);
                this.$("#remote-playerlist").append(player);
                user.videoTrack.play(`player-${uid}`);
                // $(".agora_video_player").attr("controls", true);
                // $(".player").show();
            }
            if (mediaType === 'audio') {
                user.audioTrack.play();
            }
        },
        async leave() {
            // remove remote users and player views
            this.remoteUsers = {};
            this.$("#remote-playerlist").html("");
            // leave the channel
            await this.client.leave();
            //$("#local-player-name").text("");
            //$("#btn-look").attr("disabled", false);
            //$("#btn-leave").attr("disabled", true);
            //destructStats();
            console.log("client leaves channel success");
        }
    }
</script>

<style lang="less" scoped>
    .live{
        width: 100%;
        height: 227px;
    }
</style>