<template>
    <div class="container">
        <div class="live-video" >
            <header>
                <div class="left">
                    <div class="sky-logo">
                        <van-image width="100%" height="100%" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                    </div>
                    <div class="user-profile">
                        <img src="@/assets/images/banner.jpg" alt="">
                    </div>
                    <div class="live-name">
                        <p class="name">2021年春季线上展览会</p>
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
                            <van-icon name="friends-o" />
                            <div class="child" >直播</div>
                        </van-badge>
                    </div>  
                    <div class="live">
                        <van-badge content="" class="nav-list">
                        <van-icon name="friends-o" />
                            <div class="child" >议程</div>
                        </van-badge>
                    </div> 
                     <div class="live">
                        <van-badge content="" class="nav-list">
                        <van-icon name="friends-o" />
                            <div class="child" >嘉宾</div>
                        </van-badge>
                    </div> 
                    <div class="live">
                        <van-badge content="" class="nav-list">
                        <van-icon name="friends-o" />
                            <div class="child" >参会者</div>
                        </van-badge>
                    </div>   
                </div>
            </header>

            <div class="video-box">
                <video src="@/assets/1321.mp4" width="100%" autoplay controls height="600px"></video>
            </div>
            <div class="video-bar">
                <div class="progress">
                    <p class="text">时间：43:46</p>
                    <el-progress :percentage="50" :stroke-width="20"></el-progress>
                </div>
                <ul class="bar">
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                    <li class="bar-list">
                        <img src="@/assets/images/video.png" alt="">
                        <p class="text">视频</p>
                    </li>
                </ul>
                <div class="what">
                    <p class="el-icon-question"></p>
                </div>
            </div>
        </div>
        <div class="bullet-chat" v-if="false">
            <h3>讨论  参会者</h3>
        </div>
    </div>
</template>

<script>
    export default {
       data(){
           return{
               percentage:20
           }
       },
            methods: {
                format(percentage) {
                    return percentage === 100 ? '满' : `${percentage}%`;
                }
            }
    }
</script>

<style lang="less" scoped>
.container{
    display: flex;
    height: 100%;
    background: #0F5F54;
    .live-video{
        width: 100%;
        background: #0F5F54;
        header{
            width: 100%;
            height: 110px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
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
                }
                .nav-list.cur{
                    background: #B6E4F4;
                    color: #333;
                }
            }
        }
        .video-box{
            width: 100%;
            padding: 10px 20px 10px;
            background: #0F5F54;
            box-sizing: border-box;
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
                    font-size: 12px;
                }
            }
            .bar{
                display: flex;
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