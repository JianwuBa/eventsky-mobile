<template>
    <div class="container">
        <div class="live-video" >
            <header>
                <div class="left">
                    <div class="sky-logo">
                        <img width="100%" height="100%" src="@/assets/images/sky-logo.png"/>
                    </div>
                    <div class="user-profile">
                        <img :src="banUrl" alt="">
                    </div>
                    <div class="live-name">
                        <p class="name">{{eventTit}}</p>
                        <div class="num-views">
                            <p class="num">
                                <van-icon class="icon" name="friends" />
                                <span>9/10</span>
                            </p>
                            <p class="views">
                                <van-icon class="icon" name="eye" />
                                <span>210</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="live">
                        <van-badge content="live" class="nav-list cur">
                            <img src="@/assets/images/zb.png" alt="">
                            <div class="child" >直播</div>
                        </van-badge>
                    </div>  
                    <div class="live">
                        <van-badge content="" class="nav-list">
                        <img src="@/assets/images/yc-f.png" alt="">
                            <div class="child" >议程</div>
                        </van-badge>
                    </div> 
                     <div class="live">
                        <van-badge content="" class="nav-list">
                        <img src="@/assets/images/jb-f.png" alt="">
                            <div class="child" >嘉宾</div>
                        </van-badge>
                    </div> 
                    <div class="live">
                        <van-badge content="" class="nav-list">
                        <img src="@/assets/images/chz-f.png" alt="">
                            <div class="child" >参会者</div>
                        </van-badge>
                    </div>   
                </div>
            </header>
            <Live></Live>
            <div class="video-bar">
                <div class="progress">
                    <p class="text">时间：43:46</p>
                    
                </div>
                <ul class="bar">
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/yp.png" alt="">
                        <p class="text">音频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/sz.png" alt="">
                        <p class="text">设置</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/qp.png" alt="">
                        <p class="text">全屏</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/tl.png" alt="">
                        <p class="text">讨论</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/lk.png" alt="">
                        <p class="text">离开</p>
                    </li>
                </ul>
                <div class="what">
                    <p class="el-icon-question"></p>
                </div>
            </div>
        </div>
        <div class="bullet-chat" v-if="false">
        </div>
    </div>
</template>

<script>
import {getLiveHost} from '@/api/liveService.js'
import {getLiveHead} from '@/api/eventService.js'
import Live from '@/views/live/Live'
    export default {
       data(){
           return{
               eventId:'',
               banUrl:'',
               eventTit:''
           }
       },
       components:{
           Live
       },
        methods: {
            getInfo(){
                getLiveHost(this.eventId).then(res => {
                    console.log(res,'直播')
                })
            },
            getLiveHeadInfo(){
                getLiveHead(this.eventId).then(res => {
                    //console.log(res,'活动')
                    let data = res.data.data
                    this.eventId = data.webId
                    this.banUrl = data.bannelUrl
                    this.eventTit = data.title
                })
            }
        },
        created(){
            this.eventId = this.$route.params.pathMatch
            this.getInfo()
            this.getLiveHeadInfo()
        }
    }
</script>

<style lang="less" scoped>
.container{
    display: flex;
    height: 100%;
    .live-video{
        width: 100%;
        background: #0F5F54;
        header{
            background: #0F5F54;
            width: 100%;
            height: 110px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            top: 0;
            .left{
                display: flex;
                .sky-logo{
                    width: 66px;
                    height: 66px;
                    margin-right: 24px;
                }
                .user-profile{
                    height: 80px;
                    width: auto;
                    margin-right:20px;
                    img{
                        height: 100%;
                    }
                }
                .live-name{
                    height: 80px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .name{
                        font-size: 18px;
                        color: #fff;
                    }
                    .num-views{
                        display: flex;
                        .num{
                            background: #16463A;
                            border-radius: 6px;
                            padding: 0 6px;
                            background: #787E8C;
                            display: flex;
                            align-items: center;margin-right: 14px;
                            .icon{
                                font-size: 18px;
                                line-height: 32px;
                                color: #fff;
                                margin-right: 5px;
                            }
                            span{
                                display: inline-block; 
                                line-height: 32px;
                                color: #fff;
                                
                            }
                        }
                        .views{
                            .num
                        }
                    }
                }
            }
            .right{
                display: flex;
                .nav-list{
                    margin-left: 20px;
                    background: #16463A;
                    border-radius: 21px;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    line-height: 42px;
                    padding: 0 16px;
                    cursor: pointer;
                    img{
                        height: 20px;
                        margin-right: 10px;
                    }
                }
                .nav-list.cur{
                    background: #B6E4F4;
                    color: #333;
                }
            }
        }

        .video-bar{
            box-sizing: border-box;
            background: #0F5F54;
            padding: 50px 20px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            .progress{
                .text{
                    color: #fff;
                    font-size: 14px;
                }
            }
            .bar{
                display: flex;
                cursor: pointer;
                .bar-list{
                    margin: 0 15px;
                    img{
                        width: 44px;
                    }
                    .text{
                        color: #fff;
                        font-size: 14px;
                        margin-top: 8px;
                        text-align: center;
                    }
                }
            }
            .what{
                width: 44px;
                height: 44px;
                .el-icon-question{
                    width: 100%;
                    height: 100%;
                    font-size: 44px;
                    color: #fff;
                    display: block;
                }
            }
        }
    }
    .bullet-chat{
        width: 455px;
        background: #fff;
    }
    
}
</style>