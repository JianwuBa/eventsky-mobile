<template>
    <div class="container">
        <div class="top-bg">
            <div class="lang">
                <span @click="changeLang('zh')">中</span>
                <span>|</span>
                <span @click="changeLang('en')">EN</span>
            </div>
            <img src="@/assets/images/logo.png" class="logo" alt="">
        </div>
        <div class="content">
            <div class="card">
                <van-field v-model="phone" class="phone" placeholder="请输入手机号" />
                <van-field v-model="sms" class="sms"  placeholder="请输入验证码" use-button-slot>
                    <van-button slot="button" class="get-codebtn" size="small" @click="gainCode">{{time}} </van-button>
                </van-field>
                <van-button class="register-btn" @click="registerAccount">登录</van-button>
            </div>

            <p class="login" @click="register">去注册</p>
        </div>
    </div>
</template>

<script>
import {langEn,langZh} from '@/api/lang.js'
import { Toast } from 'vant';
// import api from '@/api/api'
    export default {
        data(){
            return{
                checkbox: false,
                checkboxGroup: [],
                isClick: true,
                time: '获取验证码',
                phone: '',
                sms: '',
            }
        },
        methods:{
            changeLang(lang){
                if(lang === 'zh'){
                    langZh()
                }else if (lang === 'en'){
                    langEn()
                }
            },
            gainCode() {
                if (this.isClick) {
                    
                    if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.phone)) {
                        this.$http.post("/user-service/auth/send?target="+this.phone+"&type=PHONE_LOGIN").then(res =>{
                            console.log(res)
                        })
                        this.isClick = false
                        let s = 60
                        this.time = s + 's'
                        let interval = setInterval(() => {
                            s--
                            this.time = s + 's'
                            if (s < 0) {
                            this.time = '重新获取'
                            this.isClick = true
                            clearInterval(interval)
                            }
                        }, 1000)
                    } else {
                        Toast.fail('请输入正确的手机号码')
                    }
                }
            },
            register(){
                this.$router.push('/signup')
            },
            registerAccount(){
                this.$http.post("/user-service/account/login_p?phone="+this.phone+"&authCode="+this.sms+"").then(res =>{
                    if(res.data.rspCode == 1){
                        setTimeout(()=>{
                            this.$router.push('/payment')
                        },1000)
                    }
                })
            }
        } 
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        position: relative;
        .top-bg{
            width: 100%;
            position: relative;
            height: 226px;
            background-image: url('../../assets/images/top-bg.png');
            background-size: 100%;
            .lang{
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
                text-align: right;
                padding: 0 10px;
                box-sizing: border-box;
                color: #fff;
                font-size: 14px;
                line-height: 30px;
                span{
                    margin: 0 3px;
                }
            }
            .logo{
                width: 160px;
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .content{
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 134px;
            .card{
                width: 100%;
                height: 250px;
                background: #FFFFFF;
                box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
                border-radius: 20px;
                overflow: hidden;
                box-sizing: border-box;
                padding: 40px 12px 30px; 
            }
            .get-codebtn{
                border: none;
                color: #1F6DF0;
                font-size: 14px;
                height: 20px;
                line-height: 20px;
            }
            .sms{
                box-sizing: border-box;
                border-bottom: 1px solid #ebedf0;
                padding: 10px 0;
            }
            .phone{
                padding: 10px 0;border-bottom: 1px solid #ebedf0;
                box-sizing: border-box;
            }
            .register-btn{
                width: 100%;
                height: 44px;
                background: linear-gradient(136deg, #5097FD 0%, #2171F9 100%);
                box-shadow: 0px 2px 30px 0px rgba(145, 135, 254, 0.3);
                border-radius: 44px;
                color: #fff;
                margin-top: 32px;
                margin-bottom: 10px;
            }
            /deep/ .van-checkbox__label{
                font-size: 12px;
                color: #000;
                line-height: 30px;
            }
            /deep/ .van-checkbox__icon .van-icon{
                width: 14px;
                height: 14px;
                margin-top: 2px; font-size: 12px;
                
            }
            .login{
                width: 100%;
                text-align: center;
                color: #408AFC;
                font-size: 16px;
                margin-top: 40px;
            }
        }
    }
</style>