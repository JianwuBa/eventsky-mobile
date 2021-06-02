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
                <li class="live" v-for="(item,index) in liveArr" :key="index" >
                    <div class="top" v-if="eventsLists[item.goodsId]">
                        <p class="name">{{eventsLists[item.goodsId]["title"]}}</p>
                        <p class="date">
                            <img src="../../assets/images/eventicon.png" alt="">
                            <span >时间：{{eventsLists[item.goodsId]["beginDate"]}}</span>
                        </p>
                        <div class="bottom">
                            <div class="left">
                                <p class="sponsor">
                                    <img src="../../assets/images/eventicon.png" alt="">
                                    <span>主办：{{eventsLists[item.goodsId]["company"]}}</span>
                                </p>
                                <p class="link">
                                    <img src="../../assets/images/eventicon.png" alt="">
                                    <span>活动链接： <a :href="link+eventsLists[item.goodsId]['webId']">http://eventsky.cn/{{eventsLists[item.goodsId]["webId"]}}</a> </span>
                                </p>
                            </div>
                            <div class="right" @click="showCodePopup(eventsLists[item.goodsId]['barcodeUrl'])">
                                <img :src="eventsLists[item.goodsId]['barcodeUrl']" alt="">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <van-popup v-model="showCode" closeable position="bottom" :style="{ height: '50%' }">
            <van-image width="70%" height="70%" style="margin:15% auto 0;display:block" :src="codeUrl"/>
        </van-popup>
    </div>
</template>

<script>
import Head from '../../components/Head'
import {getclientOrder} from '@/api/orderService'
import {getclientEvent} from '@/api/eventService'
    export default {
        components:{
            Head,
        },
        data(){
            return{
                headerUrl:'https://img01.yzcdn.cn/vant/cat.jpeg',
                //参与的直播数组
                liveArr:[],
                totalLives:'',
                pageSize:100,
                //直播列表ID
                goodsId:[],
                // 活动信息 列表
                eventsLists:{},
                showCode:false,
                link:'http://eventsky.cn/',
                codeUrl:'',
                logoUrl: require('../../assets/images/logo-blue.png')
            }
        },
        
        methods:{
            showCodePopup(url){
                this.showCode = true
                this.codeUrl = url
            },
            async getclientInfo(){
                // await this.$http.get("/order-service/order/mine").then(orderRes =>{
                    await getclientOrder().then(orderRes =>{
                    const orderData =  orderRes.data.data
                    this.liveArr = orderData.results
                    this.totalLives = orderData.totalRows
                    this.liveArr.forEach(item => {
                        this.goodsId.push(item.goodsId) 
                    })
                    // console.log(this.liveArr)
                })
                // await this.$http.get("/event-service/event/list/",{params:{eventId:this.goodsId.toString()}}).then(eventRes => {
                    await getclientEvent({eventId:this.goodsId.toString()}).then(eventRes =>{
                    // console.log(res)
                    const eventData =  eventRes.data.data
                    let list = {}
                    eventData.forEach((item) =>{
                        //  console.log(item)
                        list[item.id] = item
                    })
                    this.eventsLists = list
                })
            },
        },
        created(){
            this.getclientInfo()
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
            margin-bottom: 20px;
            .top{
                padding: 13px 13px 10px;
                background: #FFFFFF;
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
        }
    }
}
</style>