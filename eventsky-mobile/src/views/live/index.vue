<template>
  <div>
    <Head :logoUrl="logoUrl"></Head>
    <div class="container">
      <div class="banner">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="bannelUrl"
          v-if="false"
        />
        <Live></Live>
      </div>
      <div class="event-info">
        <p class="name">{{title}}</p>
       
        <div class="link">
          <div class="left">
            <span>活动链接：</span>
            <a :href="link">{{link}}</a>
          </div>
          <div class="qr-code" @click="showCode">
            <img :src="barcodeUrl" alt="">
          </div>
        </div>
      </div>

      <section class="event-sponsor">
        <h3 class="sec-tit">
          <p>主办方</p>
        </h3>
        <div class="event-sponsor-detail">
          <p class="sponsor-name">{{company}}</p>
          <img :src="logoUrl" class="sponsor-logo" alt="" />
        </div>
      </section>
    </div>
    <Footer class="footer"> </Footer>
    <van-dialog v-model="show" title="活动二维码" class="codeDialog">
      <img :src="barcodeUrl" />
    </van-dialog>
  </div>
</template>

<script>
import Head from '../../components/Head'
import Footer from '../../components/Footer'
import {getEventInfo} from '@/api/eventService'
import Live from './player'
  export default {
    data(){
      return{
        eventId:'',
        show:false,
        //活动链接
        url:'https://eventsky.cn/',
        showEventDetail:false,
        showArrow:null,
        bannelUrl:'',
        title:'',
        //活动链接
        link:'',
       
        logoUrl:'',
        company:'',
        views:'',
        barcodeUrl:'',


      }
    },
   
    methods:{
      showCode(){
        this.show = true
      },
      showetail(){
        this.showEventDetail = !this.showEventDetail
      },
      async getEventSetail(){
        
        // this.$http.get('/event-service/event/info/'+webId).then(res => {
           getEventInfo(this.eventId).then( res =>{
          if(res.data.rspCode == 1){
            let data = res.data.data
            console.log(data)
            this.bannelUrl = data.bannelUrl
            this.link = this.url+this.$route.path
            this.logoUrl = data.logoUrl
            this.title = data.title
            this.company = data.company
            this.views = data.views
            this.barcodeUrl=data.barcodeUrl
            this.eventId = data.webId
          }
        })
        
      }
    },
    components:{
      Head,
      Footer,
    Live
    },
    created(){
        this.eventId = this.$route.params.pathMatch
        this.getEventSetail()
            
    },
  
    
  }
</script>

<style lang="less" scoped>
  .container{
    width: 100%;
    padding: 38px 0 44px;
  }
  .banner{
    width: 100%;
    height: 227px;
  }
  .event-info{
    width: 100%;
    background: #fff;
    padding: 10px 14px 10px 10px;
    box-sizing: border-box;
   
    .name{
      font-size: 16px;
      color: #333;line-height: 20px;
      margin: 0 0 10px 0; white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .date{
      font-size: 14px;
      color: #4A4A4A;
      line-height: 20px;
      margin: 0 0 10px 0; white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .organizer{
      font-size: 14px;
      color: #4A4A4A;
      line-height: 20px;
      margin: 0 0 10px 0; white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .link{
      font-size: 14px;
      color: #4A4A4A;
      line-height: 20px;
      margin: 0 0 10px 0;white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        width: 85%;
        overflow: hidden;
      }
      .qr-code{
        width: 32px;
        height: 32px;
        background: #fff;
        padding: 2px;
        border-radius: 2px;
        margin-left: 6px;
        box-sizing: border-box;
        border: 1px dashed #333;
        img{
          width: 100%;
        }
      }
      a{
        font-size: 12px;
        color: #1E67EF;
        line-height: 20px;
        margin: 0;
        
      }
    }
  }
  section.event-detail{
    .sec-tit{
      background: #EEEEEE;
      line-height: 42px;
      padding: 0 10px;
      box-sizing: border-box;
      line-height: 42px;
      color: #000;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .views{
        font-size: 12px;
        color: #333;
      }
    }
    .event-detail-content{
      padding: 10px;
      overflow: hidden;
      img{
        max-width: 100%;
      }
    }
    .heightAuto{
      max-height: auto  !important;
    }
    .heightNum{
      max-height: 168px;
    }
    .showEventDetail{
      width: 100%;
      line-height: 45px;
      text-align: center;
      font-size: 22px;
    }
  }
  section.event-sponsor{
    .sec-tit{
      background: #EEEEEE;
      line-height: 42px;
      padding: 0 10px;
      box-sizing: border-box;
      line-height: 42px;
      color: #000;
      font-size: 14px;
    }
    .event-sponsor-detail{
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      .sponsor-name{
        font-size: 16px;
        color: #333;
        margin-bottom: 20px;
      }
      .sponsor-logo{
        width: 50%;
      }
    }
  }
  .footer{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
  }
  .codeDialog{
    text-align: center;
    img{
      width: 80%;
      margin-top: 15px;
    }
  }
</style>