<template>
    <div class="container">
        <Head :logoUrl="logoUrl" class="head"></Head>
        <div class="header">
            <van-image width="100%" height="100%" class="blur-img"   :src="headerUrl"  />
            <div class="head-img">
                <van-image  width="100%"  height="100%" cover  :src="headerUrl" />
            </div>
        </div>
        <section class="sec-live">
            <h4 class="sec-tit">我参与的活动直播（{{totalLives}}）</h4>
            <ul class="live-list">
                <li class="live" v-for="(item,index) in liveArr" :key="index">
                    <div class="top">
                        {{eventsLists[item.goodsId].title}}
                        <p class="name"></p>
                        <p class="date">
                            <img src="../../assets/images/eventicon.png" alt="">
                            <span>时间：2018年1月9日 周二 21:00-周五 23:45</span>
                        </p>
                        <div class="bottom">
                            <div class="left">
                                <p class="sponsor">
                                    <img src="../../assets/images/eventicon.png" alt="">
                                    <span>主办：北京恒知动奇科技有限公司</span>
                                </p>
                                <p class="link">
                                    <img src="../../assets/images/eventicon.png" alt="">
                                    <span>活动链接： <a href="https://fEventSky.cn/1581102859">https://fEventSky.cn/1581102859</a> </span>
                                </p>
                            </div>
                            <div class="right">
                                <img src="../../assets/images/code.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="middle">

                    </div>
                    <div class="sign-in">
                        <div class="sign-in-btn">
                            <span class="txt">签到密码：</span>
                            <span class="code">TY231341</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import Head from '../../components/Head'
    export default {
        components:{
            Head,
        },
        data(){
            return{
                logoUrl:'',
                headerUrl:'https://img01.yzcdn.cn/vant/cat.jpeg',
                //参与的直播数组
                liveArr:[],
                totalLives:'',
                pageSize:100,
                //直播列表ID
                goodsId:[],
                // 活动信息 列表
                eventsLists:{},
            }
        },
        
        methods:{
            getclientInfo(){
                this.$http.get("/order-service/order/mine").then(res =>{
                    let data = res.data.data
                    this.liveArr = data.results
                    this.totalLives = data.totalRows
                    this.liveArr.forEach(item => {
                        this.goodsId.push(item.goodsId) 
                    })
                    console.log(this.liveArr)
                    this.$http.get("/event-service/event/list/",{params:{eventId:this.goodsId.toString()}}).then(res => {
                        // console.log(res)
                        res.data.data.forEach((item) =>{
                             console.log(item)
                            this.eventsLists[item.id] = item
                        })
                        console.log(this.eventsLists)
                    })
                })
            }
        },
        created(){
            this.getclientInfo()
            // this.getclientEventInfo()
        },
    }
</script>

<style lang="less" scoped>
.container{
    padding-top: 38px;
    .header{
        width: 100%;
        height: 150px;
        position: relative;
        overflow: hidden;
        .blur-img{
            filter: blur(20px); 
            position: absolute;
            left: 0;
            top: 0;
        }
        .head-img{
            width: 92px;
            height: 92px;
            overflow: hidden;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border: 4px solid rgba(255, 255, 255, .1);
        }
    }
    .sec-live{
        .sec-tit{
            padding:0 10px;
            background: #FFFFFF;
            box-shadow: 0px 1px 0px 0px #DDDDDD;
            font-size: 14px;
            color: #333;
            line-height: 40px;
        }
    }
    .live-list{
        background: #F2F3F7;
        padding: 10px 14px 20px;
        .live{
            
            box-shadow: 0px 2px 4px 0px #A0A0A0;
            overflow: hidden;
            border-radius: 8px;
            .top{
                padding: 13px;background: #FFFFFF;
            }
            .name{
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
            }
            .date{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                span{
                    font-size: 12px;
                    color: #4A4A4A;
                    display: block;
                    line-height: 18px;
                    margin-left: 5px;
                }
                img{
                    height: 18px;
                }
            }
            .bottom{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left{
                    width: 90%;
                    .sponsor{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            font-size: 12px;
                            color: #4A4A4A;
                            display: block;
                            line-height: 18px;
                            margin-left: 5px;
                        }
                        img{
                            height: 18px;
                        }
                    }
                    .link{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            font-size: 12px;
                            color: #4A4A4A;
                            display: block;
                            line-height: 18px;
                            margin-left: 5px;
                            a{
                                font-size: 12px;
                                color: #1E67EF;
                            }
                        }
                        img{
                            height: 18px;
                        }
                    }
                }
                .right{
                    width: 32px;
                    height: 32px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .sign-in{
               padding: 13px;background: #FFFFFF;
            }
            .sign-in-btn{
                width: 70%;
                background: linear-gradient(180deg, #82BBFF 0%, #197DF4 100%);
                border-radius: 3px;
                text-align: center;
                margin: 0 auto;
                .txt{
                    font-size: 14px;
                    color: #fff;
                    line-height: 36px;
                }
                .code{
                    display: inline-block;
                    padding: 0 15px;
                    background: #E1EEFD;
                    line-height: 20px;
                    vertical-align: middle;
                    color: #4A4A4A;
                    font-size: 12px;
                }
            }
        }
        
    }
}
</style>