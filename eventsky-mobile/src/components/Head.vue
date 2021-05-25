<template>
  <div>
    <header>
      <div class="left">
          <div class="logo">
            <img :src="logoUrl" alt="">
          </div>
      </div>
      <div class="right">
        <div class="my-event">
          <van-icon name="contact" class="contact" />
          <span>我的活动</span>
          
        </div>
        <div class="lang">
          <span @click="changeLang('zh')">中</span>
          <span>|</span>
          <span @click="changeLang('en')">EN</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import {langEn,langZh} from '@/api/lang.js'
  export default {
    props:['logoUrl'],
    methods:{
      changeLang(lang){
        if(lang === 'zh'){
          langZh()
        }else if (lang === 'en'){
          langEn()
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  header{
    width: 100%;
    height: 38px;
    background: #fff;
    display: flex;
    padding: 0 10px;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
     box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    .left{
      .logo{
        height: 26px;
        img{
          height: 100%;
        }
      }
    }
    .right{
      display: flex;
      align-items: center;
      .my-event{
        margin-right: 18px;
       display: flex;
      align-items: center;
        .contact{
          color: #333;
          font-size: 20px;
          line-height: 38px;
        }
        span{
          font-size: 12px;
          color: #333;
          line-height: 38px;
          display: inline-block;
        }
      }
      .lang{
        line-height: 38px;
        font-size: 14px;
        color: #666;
        span{
          margin: 0 2px;
        }
      }
    }
  }
</style>