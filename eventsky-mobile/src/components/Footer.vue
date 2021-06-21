<template>
    <div>
         <el-button type="primary" class="register" @click="login">报名</el-button>
    </div>
</template>

<script>
import {getSingUp} from "@/api/userService.js"
    export default {

        methods:{
            login(){
                let eventId = this.$route.params.pathMatch
                // this.$http.get("/user-service/account/current").then(res => {
                getSingUp().then(res => {
                    console.log(res)
                    // if(res.data.rspCode == "400002"){
                    //     this.$router.push('/login')
                    // }else if(res.data.rspCode == "1"){
                    //     this.$router.push('/payment/'+eventId+'')
                    // }
                    this.$router.push('/payment/'+eventId+'')
                })
                //this.$router.push('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
    .register{
        width: 100%;
        background: #197DF4;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        color: #fff;
        line-height: 44px;
        padding: 0;
        border: none;
        text-align: center;
        border-radius: 0;
    }
</style>