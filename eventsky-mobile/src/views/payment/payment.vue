<template>
    <div class="container">
        <Head :logoUrl="logoUrl" class="head"></Head>
        <div class="top">
            <p class="name">2021国际能源发展高峰论坛- 伙伴坛- 伙伴专用坛- 伙伴专用专用报名</p>
            <div class="date">
                <img src="../../assets/images/eventicon.png" alt="">
                <p class="time">2017年9月18日 星期一 09:00 至 24日 星期日 18:00</p>
            </div>
        </div>
        <section class="middle-tic">
            <h5 class="sec-tit">门票信息</h5>
            <div class="sec-content">
                <p class="name">Festival Ticket 音乐节门票 </p>
                <p class="price">售价：¥ 598</p>
            </div>
        </section>
        <section class="middle-info">
            <h5 class="sec-tit">门票信息</h5>
            <div class="sec-content">
                <el-form ref="infoForm"  :rules="rules" :model="infoForm">
                    <el-form-item label="姓名" prop="name" >
                        <el-input v-model="infoForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" >
                        <el-input v-model="infoForm.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="compony" >
                        <el-input v-model="infoForm.compony" ></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="position" >
                        <el-input v-model="infoForm.position" ></el-input>
                    </el-form-item>
                    <el-form-item label="留言" prop="message" >
                        <el-input v-model="infoForm.message" ></el-input>
                    </el-form-item>
                    <el-form-item >
                        <div class="payment">
                            <p class="type">
                                <span>总计</span>
                                <span class="num">¥598</span>
                            </p>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="payment-btn" @click="submitForm('infoForm')" >付款</el-button>
                    </el-form-item>
                </el-form>

                
            </div>
        </section>
    </div>
</template>

<script>
import Head from '../../components/Head'
    export default {
        data(){
            
            return{
                logoUrl:'',
                infoForm:{
                    name:'',
                    email:'',
                    compony:'',
                    position:'',
                    message:''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' },
                    ],
                    compony: [
                        { required: true, message: '请填写公司', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请填写职位', trigger: 'blur' },
                    ],
                    message: [
                        { required: false, message: '请填写留言', trigger: 'blur' },
                    ],
                }
            }
        },
        components:{
            Head,
        },
        created(){
            this.getAccountInfo()
        },
        methods:{
            getAccountInfo(){
                console.log(1)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        padding-top:38px;
        .top{
            width: 100%;
            background: #fff;
            padding: 12px 12px 19px 10px;
            box-sizing: border-box;
            .name{
                font-size: 16px;
                color: #4A4A4A;
                line-height: 24px;
            }
            .date{
                display: flex;
                align-items: center;
                margin-top: 10px;
                .time{
                    font-size: 12px;
                    color: #4A4A4A;
                }
                img{
                    width: 16px;
                    margin-right: 5px;
                }
            }
        }
        section.middle-tic{
            
            .sec-tit{
                width: 100%;
                background: #F2F3F7;
                padding: 0 10px;
                box-sizing: border-box;
                line-height: 38px;
                font-size: 14px;
                color: #000;
            }
            .sec-content{
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;     
                box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
                .name{
                    font-size: 18px;
                    color: #323C47;
                    line-height: 64px;
                }
                .price{
                    font-size: 12px;
                    color: #027AFF;
                }
            }
        }
        section.middle-info{
            .sec-tit{
                width: 100%;
                background: #F2F3F7;
                padding: 0 10px;
                box-sizing: border-box;
                line-height: 38px;
                font-size: 14px;
                color: #000;
            }
            .sec-content{
                background: #FFFFFF;
                box-shadow: 0px 1px 0px 0px #DDDDDD;
                padding: 10px 12px 16px;
            }
            /deep/ .el-form-item__label{
                font-size: 14px;
                color: #333;
                line-height: 30px;
            }
            /deep/ .el-input__inner{
                height: 34px;
                line-height: 34px;
            }
            /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
                content: "";
            }
            /deep/ .el-form-item{
                margin-bottom: 10px;
            }
            .payment{
                background: #fff;
                padding: 0;
                .type{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 18px;
                    .num{
                        color: #027AFF;
                    }
                }
            }
            .payment-btn{
                width: 100%;
                background: #027AFF;
                color: #fff;
                text-align: center;
                line-height: 34px;
                padding: 0;
                font-size: 14px;
            }
        }
    }
</style>  