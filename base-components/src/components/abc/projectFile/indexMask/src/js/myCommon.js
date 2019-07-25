let stateControl = new Vue();
// popIsShow 是否显示弹窗  主vue ---> comPop

// 子组件comPop
let comPop = {
    // 子组件comPop

    template:`
    <div class="g-pop" @click.stop :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}">
        <div class="u-mask"></div>
        <div class="m-bannerBg">
            <div class="u-close" @click="close">
                <img class="icon" src="./asset/icon/close@2x.png" alt="">
            </div>
            <div class="u-iconBlock">
                <!-- 头部固定图标 -->
                <div class="iconbg">
                    <img class="icon" src="./asset/icon/lian@2x.png" alt="链">
                </div>
            </div>

            <div class="m-content">
                <div class="content">
                    <!-- 内容预留插槽 -->
                    <slot name="pop-content">

                    </slot>
                </div>
                <div class="close" @click="full">关闭全屏</div>
            </div>
            <div class="m-footer">
                <!-- 底部预留插槽 -->
                <div class="com-flex fill">
                    <slot name="flex-left">
                        <div class="m-item" @click="close">
                        <span class="item-text">关闭</span>
                        </div>
                    </slot>
                        <div class="m-item m-itemcenter" @click="full">
                            <i class="iconfont-mask phone item-icon-block">&#xe786;</i>
                            <span class="item-text">全屏</span>
                        </div>
                    <slot name="flex-right">
                        <div class="m-item m-itemcenter" @click="">
                            <i class="iconfont-mask phone item-icon-block">&#xe6ff;</i>
                            <span class="item-text">分享</span>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    `,
    created(){
        // 是否显示
        stateControl.$on('popIsShow',(index)=>{
            if(this.myIndex+'' == index+''){
                this.item.isShow = !this.item.isShow;
            }
        });
    },
    props:{
        myIndex:{
            default:'symbol'
        }
    },
    data:function(){
        
        return{
            item:{
                isShow:false, //是否显示
                isFull:false  //是否全屏
            },
            index:this.myIndex, //绑定索引
        }
    },
    watch:{
    },
    methods:{
        close(){
            this.item.isShow = !this.item.isShow;
        },
        full(){
            this.item.isFull = !this.item.isFull;
        }
    },
    
    
}

// 子组件comPopTrans
let comPopTrans = {
    // 子组件comPop

    template:`
    <div class="g-pop-trans" @click.stop :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}">
        <div class="u-mask"></div>
        <div class="m-bannerBg">
            <div class="u-close" @click="close">
                <img class="icon" src="./asset/icon/close@2x.png" alt="">
            </div>

            <div class="m-content">
                <div class="content">
                    <!-- 内容预留插槽 -->
                    <slot name="pop-content">

                    </slot>
                </div>
                <div class="close" @click="full">关闭全屏</div>
            </div>
            <div class="m-footer">
                <div class="com-flex fill">
                    <slot name="flex-left">
                        <div class="m-item" @click="close">
                        <span class="item-text">关闭</span>
                        </div>
                    </slot>
                        <div class="m-item m-itemcenter" @click="full">
                            <i class="iconfont-mask phone item-icon-block">&#xe786;</i>
                            <span class="item-text">全屏</span>
                        </div>
                    <slot name="flex-right">
                        <div class="m-item m-itemcenter" @click="">
                            <i class="iconfont-mask phone item-icon-block">&#xe6ff;</i>
                            <span class="item-text">分享</span>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    `,
    created(){
        // 是否显示
        stateControl.$on('popIsShow',(index)=>{
            if(this.myIndex == index){
                this.item.isShow = !this.item.isShow;
            }
        });
    },
    props:{
        myIndex:{
            default:0
        }
    },
    data:function(){
        
        return{
            item:{
                isShow:false, //是否显示
                isFull:false  //是否全屏
            },
            index:this.myIndex, //绑定索引
        }
    },
    watch:{
    },
    methods:{
        close(){
            this.item.isShow = !this.item.isShow;
        },
        full(){
            this.item.isFull = !this.item.isFull;
        }
    },
    
}


// 头部组件 comHead
let comHead = {
    template:`
    <div class="main-header">
    <div class="title">
    <div class="flex-layout line-1">
    <div class="icon"></div>
    <div class="main">
    <div v-if="company == null" class="name signalLine">
    数据正在载入中
    </div>
    <div v-else class="name signalLine">
    {{company.Name}}
    </div>
    <div class="flex-layout tag">
    <div class="tag-group">
    <div class="tag-state" v-if="true">存续</div>
    <div class="tag-oldname" v-if="company == null">曾用名</div>
    <div class="tag-oldname" v-else-if="company.OldName">曾用名</div>
    <div class="tag-new" v-if="company == null">高新技术企业</div>
    <div class="tag-new" v-else-if="company.IsHeightNew">高新技术企业</div>
    </div>
    <div class="view">浏览:1254</div>
    </div>
    </div>
    </div>
    <div class="line-2">
    <div class="info">
    <div v-if="company == null" class="info-represe">
    法定代表人:XXX
    </div>
    <div v-else class="info-represe">
    法定代表人:{{company.LegalReprese}}
    </div>
    <div class="info-ctime">
    成立日期:2004年12月23日
    </div>
    <div v-if="company == null" class="info-capital">
    注册资本:未知
    </div>
    <div v-else class="info-capital">
    注册资本:{{company.Capital}}
    </div>
    </div>
    <a v-if="company == null" class="phoneBlock" :href="'tel:'">
    <i class="iconfont-mask phone">&#xe601;</i>
    </a>
    <a v-else class="phoneBlock" :href="'tel:'">
    <i class="iconfont-mask phone">&#xe601;</i>
    </a>
    </div>
    </div>
    </div>
    `,
    created(){
    },
    props:{
        getCompany:{
            type:Object,
            default:null
        }
    },
    data:function(){
        
        return{
            company:this.getCompany
        }
    },
    watch:{
        getCompany(){
            console.log(this.getCompany)
            this.$set(this,'company',this.getCompany)
        }
    },
    methods:{
        
    },
    created(){
        
    }
}


// 弹窗内容通用的flex左右布局
let comContentLayout = {
    
    template:`
    <div class="com-info-layout">
        <slot name="layou-title">
            <div class="info-title">
                {{infoTitle}}:
            </div>
        </slot>
        <slot name="layout-content">
            <div class="info-list" v-for="items in infoList">
                <div class="info-item" v-for="(item,key) in items">
                    <div class="item-name">
                        {{key}}
                    </div>
                    <div class="item-value">
                        {{item}}
                    </div>
                </div>
            </div>
        </slot>
    </div>
    `,

    created(){
        
    },
    props:{
        getInfoList:{
            type:Array,
            default: ()=>{
                return[{
                        name:'',
                        value:''
                }]
                
            }
        },
        getInfoTitle:{
            default:''
        },
        myIndex:{
            default:0
        }
    },
    data:function(){
        
        return{
            infoList:this.getInfoList, //内容
            infoTitle:this.getInfoTitle,
        }
    },
    watch:{
        getInfoList(){
            this.$set(this,'infoList',this.getInfoList);
        },
        getInfoTitle(){
            this.infoTitle = this.getInfoTitle;
        }
    },
    methods:{
        
    },
}

let footBtn = {

    template:`
    <div class="m-item footbtn">
        <slot></slot>
    </div>
    `,
    created(){
       
    },
    props:{
        
    },
    data:function(){
        
        return{
           
        }
    },
    watch:{
        
    },
    methods:{
        
    },
}

// 推送数据汇总 组件
let summaryData = {
    template:`
    <div class="con-group">
        <div class="summary-title">
            {{title}}
        </div>
        <div class="summary-list">
            <div class="summary-group">
                <div class="summary-icon summary-icon-bg">
                    <i class="iconfont-mask summary-icon">&#xe6b1;</i>
                </div>
                <div class="summary-item">
                    <div class="summary-item-line">
                        <div class="summary-des">短信发送号码数量</div>
                        <div class="summary-number">{{summaryData.msgCount}}</div>
                    </div>
                    <div class="summary-item-line">
                        <div class="summary-des">短信发送数量</div>
                        <div class="summary-number">{{summaryData.msgSend}}</div>
                    </div>
                </div>
            </div>

            <div class="summary-group">
                <div class="summary-icon summary-icon-bg">
                    <i class="iconfont-mask summary-icon">&#xe6b2;</i>
                </div>
                <div class="summary-item">
                    <div class="summary-item-line">
                        <div class="summary-des">视频短信发送号码数量</div>
                        <div class="summary-number">{{summaryData.videoCount}}</div>
                    </div>
                    <div class="summary-item-line">
                        <div class="summary-des">视频短信发送数量</div>
                        <div class="summary-number">{{summaryData.videoSend}}</div>
                    </div>
                </div>
            </div>

            <div class="summary-group">
                <div class="summary-icon summary-icon-bg">
                    <i class="iconfont-mask summary-icon">&#xe67c;</i>
                </div>
                <div class="summary-item">
                    <div class="summary-item-line">
                        <div class="summary-des">消费金额</div>
                        <div class="summary-number summary-money">{{summaryData.spend}}元</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    created(){
       
    },
    props:{
        title:{
            type: String,
            default:''
        },
        summaryData:{
            type:Object,
            default:{
                msgCount:0,
                msgSend:0,
                videoCount:0,
                videoSend:0,
                spend:0
            }
        }
    },
    data:function(){
        
        return{
           
        }
    },
    watch:{
        
    },
    methods:{
        
    },
}

// 明细记录组件
// 成功：{{recordItemInfo.success}} 未知：{{recordItemInfo.unknow}} 失败：{{recordItemInfo.failed}}
let recordDetailList={
    template:`
    <div class="record-detail-content">
        <div class="record-summary" @click="isShow=!isShow">
        <div class="record-summary-item">{{recordItemInfo.date}}</div>
                <div class="record-summary-item">{{recordItemInfo.sendType}}</div>
                <div class="record-summary-item record-spend">{{recordItemInfo.spend}}元</div>
                <div class="record-summary-item iconfont-mask" :class="{'record-show':isShow}">&#xe602;</div>
                <!--<div class="record-summary-item" v-show="isShow" @click="isShow=!isShow">&#xe602;</div>-->
        </div>
        <transition name="record-detail-item">
        <ul v-show="isShow" class="con-group record-detail-list">
        <!--<li class="record-item"><span class="record-des">日期:</span><span class="record-val">{{recordItemInfo.date}}</span></li>-->
            <li class="record-item"><span class="record-des">发送类型:</span><span class="record-val">{{recordItemInfo.sendType}}</span></li>
            <li class="record-item"><span class="record-des">营销类型:</span><span class="record-val">{{recordItemInfo.sellType}}</span></li>
            <li class="record-item"><span class="record-des">消费金额:</span><span class="record-val record-spend">{{recordItemInfo.spend}}元</span></li>
            <li class="record-item"><span class="record-des">推送号码数量:</span><span class="record-val">{{recordItemInfo.pushNum}}</span></li>
            <li class="record-item"><span class="record-des">发送短信数量:</span><span class="record-val">{{recordItemInfo.sendNum}}</span></li>
            <li class="record-item"><span class="record-des">发送成功:</span><span class="record-val">{{recordItemInfo.success}}</span></li>
            <li class="record-item"><span class="record-des">状态未知:</span><span class="record-val">{{recordItemInfo.unknow}}</span></li>
            <li class="record-item"><span class="record-des">发送失败:</span><span class="record-val">{{recordItemInfo.failed}}</span></li>
            <li class="record-item"><span class="record-des">内容：</span><span class="record-val record-check">点击查看</span></li>
            <li class="record-item record-handlers">
                <img :src="recordItemInfo.userImg" alt="" class="record-des record-img">
                <span class="record-val">{{recordItemInfo.userName}}</span>
            </li>
        </ul>
        </transition>
    </div>
    `,
    created(){
        if(this.record==0){
            this.isShow = true;
        }
    },
    props:{
        record:{
            type:Number,
            default:0,
        },
        
        recordItemInfo:{
            type:Object,
            default:{
                date:'2019-02-13',
                sendType:'短信',
                sellType:'自动营销(山西省心血管病医招标公告)',
                spend:0,
                pushNum:0,
                sendNum:0,
                contentLink:'嘿嘿嘿',
                userImg:'./asset/icon/头像@2x.png',
                userName:'张某某'
            }
        }
    },
    data(){
        
        return{
            isShow:false,
        }
    },
    watch:{
        
    },
    computed:{
        // initShow(){
        //     // return true;
        //     console.log('computed');
        //     if(this.recordIndex==0){
        //         this.isShow=true;
        //     }
        //     else{
        //         this.isShow=false;
        //     }
        // }
    },
    methods:{
        
    },
}

// 平台消息
let platformItem = {
    template: `
    <div class="platform-item">

        <div class="item-title" :class="{'unread-point':!info.isCheck}" @click="check">
            <div class="text" :class="{'unread':!info.isCheck}">{{info.title}}</div>
            <div class="date">{{info.date}}</div>
            <div class="iconfont-mask arrow" :class="{'platform-info-show':isShow}">&#xe602;</div>
        </div>
        <transition name="platform-info">
        <div class="item-content" v-show="isShow">
                {{info.content}}
        </div>
        </transition>
    </div>
    `,

    props:{
       platformInfo:{
           type:Object,
           default:{
               title:'',
               date:'',
               content:'',
               isCheck:false,
           }
       }

    },
    data(){
        
        return{
            isShow:false,
            info:this.platformInfo,
            
        }
    },
    watch:{
        
    },
    computed:{
        
    },
    methods:{
        check(){
            this.isShow = !this.isShow;
            if(!this.info.isCheck){
                this.info.isCheck = true;
            }
        }
    },
}

// input框增删组件
let comAddDel = {
    
    template:`
    <div class="com-add-del con-group">
        <div class="edit-list">
            <div v-for="(item,index) of editNum" :key="item.id" class="edit-item">
                <i class="fa fa-minus-circle fa-lg del-icon" @click="del(index)"></i>
                <input class="edit" v-model="item.val" :placeholder="placeHolder">
            </div>
        </div>
        <div class="add-item" @click="add">
            <i class="fa fa-plus-circle fa-lg add-icon"></i>
            <div class="add-text">{{addVal}}</div>
        </div>
    </div>
    `,

    props:{
        setPlaceHolder:{
            type:String,
            default:'请输入'
        },

        setAddVal:{
            type:String,
            default:'添加'
        },


        getEditNum:{
            type:Array,
            default:()=>{
                return [
                        {
                            id:0,
                            val:'',
        
                        }
                    ]
            }
        }
 
     },
     data(){
         
         return{
             editNum:this.getEditNum,
             idIndex:0,
             addVal:this.setAddVal,
             placeHolder:this.setPlaceHolder

         }
     },
     watch:{
         
     },
     computed:{
         
     },
     methods:{

         add(){
            this.editNum.push(
                {
                    id:++this.idIndex,
                    val:''
                }
            )

         },

         del(index){
            if(this.editNum.length > 1){
                this.editNum.splice(index,1);
            }
         }
     },
}


let tipsPop = {
    template:`
    <div class="tips-pop" @click.stop :class="{'tips-show':isShow}">
        <div class="u-mask"></div>
        <div class="m-bannerBg">
            <div class="u-close" @click="close">
                <img class="icon" src="./asset/icon/close@2x.png" alt="">
            </div>
                <div class="m-content">
                    <slot></slot>
                </div>
                <slot name="tips-btn">
                    <a href="javascript:;" class="u-reset weui-btn weui-btn_primary">确认</a>
                </slot>
        </div>
    </div>
    `,
    props:{

    },
    data(){
        
        return{
            editNum:this.getEditNum,
            idIndex:0,
            addVal:this.setAddVal,
            placeHolder:this.setPlaceHolder,
            isShow:false

        }
    },
    created(){
      stateControl.$on('tips',()=>{
          this.isShow = !this.isShow;
      })  
    },
    computed:{
        
    },
    methods:{
        
        close(){
            this.isShow = !this.isShow;
        }
    },
}


// https://blog.csdn.net/Dong8508/article/details/82863183
// weui uploader
var uploadCount = 0;
weui.uploader('#uploader', {
   url: 'http://localhost:8081',
   auto: true,
   type: 'file',
   fileVal: 'fileVal',
   compress: {
       width: 1600,
       height: 1600,
       quality: .8
   },
   onBeforeQueued: function(files) {
       // `this` 是轮询到的文件, `files` 是所有文件

       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
           weui.alert('请上传图片');
           return false; // 阻止文件添加
       }
       if(this.size > 10 * 1024 * 1024){
           weui.alert('请上传不超过10M的图片');
           return false;
       }
       if (files.length > 5) { // 防止一下子选择过多文件
           weui.alert('最多只能上传5张图片，请重新选择');
           return false;
       }
       if (uploadCount + 1 > 5) {
           weui.alert('最多只能上传5张图片');
           return false;
       }

       ++uploadCount;

       // return true; // 阻止默认行为，不插入预览图的框架
   },
   onQueued: function(){
       console.log(this);

       // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
       // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

       // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
       // this.stop(); // 中断上传

       // return true; // 阻止默认行为，不显示预览图的图像
   },
   onBeforeSend: function(data, headers){
       console.log(this, data, headers);
       // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
       // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

       // return false; // 阻止文件上传
   },
   onProgress: function(procent){
       console.log(this, procent);
       // return true; // 阻止默认行为，不使用默认的进度显示
   },
   onSuccess: function (ret) {
       console.log(this, ret);
       // return true; // 阻止默认行为，不使用默认的成功态
   },
   onError: function(err){
       console.log(this, err);
       // return true; // 阻止默认行为，不使用默认的失败态
   }
});