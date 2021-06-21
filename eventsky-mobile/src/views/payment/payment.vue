<template>
    <div class="container">
        <Head :logoUrl="logoUrl" class="head"></Head>
        <div class="top">
            <p class="name">{{eventTit}}</p>
            <div class="date">
                <img src="../../assets/images/eventicon.png" alt="">
                <p class="time">{{eventTime}}</p>
            </div>
        </div>
        <section class="middle-tic" v-if="ticArr">
            <h5 class="sec-tit">门票信息</h5>
            <div class="sec-content" v-for="(item ,index) in ticArr" :key="index">
                <p class="name">{{item.title}} </p>
                <p class="price">售价：{{item.currency | filterCurrency}} {{item.amount}}</p>
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
                    
       
                    <el-row v-for="(item,idx) in infoForm.questionList" :key="idx">
                        <el-col :span="24" >
                            <el-form-item 
                            :label="item.type"  
                            :rules="rules.qsname" 
                            :prop="`questionList.${idx}.qsname`"  
                            >
                                <el-input v-model="item.qsname"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="留言" prop="message" >
                        <el-input v-model="infoForm.message" ></el-input>
                    </el-form-item>
                    <el-form-item >
                        <div class="payment">
                            <p class="type">
                                <span>总计</span>
                                <span class="num">{{ticArr[0].currency | filterCurrency}} {{ticArr[0].amount}}</span>
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
import {postOrderCreate} from '@/api/orderService'
import {getInfoPayment} from "@/api/eventService"
// import qs from 'qs'
    export default {
        data(){
            return{
                //活动id
                eventId:'',
                //活动名称 时间  
                eventTit:'',
                eventTime:'',
                //门票列表 报名问题列表
                ticArr:'',
                //主办方logo
                logoUrl:'',
                //门票ID
                ticId:'',
                //订单号
                orderNo:'',
                infoForm:{
                    name:'',
                    email:'',
                    compony:'',
                    position:'',
                    message:'',
                    questionList:[{
                        qsname:'',
                        type:'',
                        id:''
                    }],
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
                    qsname: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                    ]
                    
                }
            }
        },
        components:{
            Head,
        },
        
        filters:{
            filterCurrency(val){
                if(val === "人民币"){
                    return '¥'
                }else{
                    return '$'
                }
            },
        },
        methods:{
            getAccountInfo(){
                // this.$http.get('/event-service/event/info/'+this.eventId).then(res => {
                getInfoPayment(this.eventId).then(res => {
                    console.log(res)
                    if(res.data.rspCode == '1'){
                        let data = res.data.data
                        console.log(data)
                        this.logoUrl = data.logoUrl
                        this.eventTit=data.title
                        this.eventTime=data.beginDate
                        this.ticArr = data.priceList
                        this.infoForm.questionList = data.questionList
                        this.ticId = data.id
                        let questionArr = []
                        this.infoForm.questionList.forEach(function (item) {  
                            if(item.type == 'SOCIAL_WECHAT') item.type = '微信'
                            if(item.type == 'SOCIAL_LINKEDIN') item.type = '领英'
                            if(item.type == 'SOCIAL_DINGDING') item.type = '丁丁'
                            if(item.type == 'SOCIAL_ZHIHU') item.type = '知乎'
                            questionArr.push({'qsname':'','type':item.type,'id':item.id})
                        })
                        this.infoForm.questionList = questionArr
                    }
                    
                })
            },
            //订单信息及自定义问题 信息
            paymentForm(){
                let arr = [
                    {"titleKey":"name","title":"姓名","content":this.infoForm.name},
                    {"titleKey":"email","title":"邮箱","content":this.infoForm.email},
                    {"titleKey":"company","title":"公司","content":this.infoForm.compony},
                    {"titleKey":"position","title":"职位","content":this.infoForm.position},
                ]
                this.infoForm.questionList.forEach(function(item){
                    arr.push({"titleKey":item.id,"title":(item.type),"content":item.qsname})
                })
                return arr 
            },
            //提交订单信息
            createOrder(){
                let obj = {
                    webId:this.eventId,
                    items:this.ticId,
                    qvs:JSON.stringify(this.paymentForm()),
                    remark:this.infoForm.message
                }
                return obj
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // const formData = new FormData();
                        // Object.keys(this.createOrder()).forEach((key) => {
                        //     formData.append(key, this.createOrder()[key]);
                        // });
                        // this.$http.post("/order-service/order/create",formData).then(res =>{
                        postOrderCreate(this.createOrder()).then(res =>{
                            console.log(res)
                            if(res.data.rspCode == 1){
                                this.orderNo = res.data.data.orderNo
                                // window.location.href = 'http://192.168.1.250:9090/order-service/payment/pay/' +this.orderNo
                                window.location.href = 'https://order.eventsky.cn/payment/pay/' +this.orderNo
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        created(){
            this.eventId = this.$route.params.pathMatch
            this.getAccountInfo()
        },
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