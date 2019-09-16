let svm = new Vue({
// 总vue
    el:'#app',
    // apilink baseInfo 来自 api.js
    store,
    data:{
        baseInfo:baseInfo,
        company:null, //该值用于传输到com-head显示
        infoList:null,
        popShow:{
            self:false, //企业自画像弹窗开关
        },
        certingVal:{
            name:'',
            code:'',
            linkman:'',
            linkphone:''
        },
        site:true,
        smspush:{
            phone:''
        },
        summaryTest:{
            msgCount:1,
            msgSend:2,
            videoCount:3,
            videoSend:4,
            spend:5
        },
        allDetailShow:false,
        recordItemInfoTest:[
            {
                date:'2019-02-13',
                sendType:'短信',
                sellType:'自动营销(山西省心血管病医招标公告)',
                spend:1,
                pushNum:2,
                sendNum:3,
                success:2154,
                unknow:2154,
                failed:2154,
                contentLink:'嘿嘿嘿',
                userImg:'./asset/icon/头像@2x.png',
                userName:'张某某'
            },
            {
                date:'2019-02-13',
                sendType:'短信',
                sellType:'自动营销(山西省心血管病医招标公告)',
                spend:1,
                pushNum:2,
                sendNum:3,
                success:2154,
                unknow:2154,
                failed:2154,
                contentLink:'嘿嘿嘿',
                userImg:'./asset/icon/头像@2x.png',
                userName:'张某某'
            },
            {
                date:'2019-02-13',
                sendType:'短信',
                sellType:'自动营销(山西省心血管病医招标公告)',
                spend:1,
                pushNum:2,
                sendNum:3,
                success:2154,
                unknow:2154,
                failed:2154,
                contentLink:'嘿嘿嘿',
                userImg:'./asset/icon/头像@2x.png',
                userName:'张某某'
            },
            {
                date:'2019-02-13',
                sendType:'短信',
                sellType:'自动营销(山西省心血管病医招标公告)',
                spend:1,
                pushNum:2,
                sendNum:3,
                success:2154,
                unknow:2154,
                failed:2154,
                contentLink:'嘿嘿嘿',
                userImg:'./asset/icon/头像@2x.png',
                userName:'张某某'
            },
        ],

        platForm:
        [
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:true
            },
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:false
            },
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:true
            },
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:false
            },
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:true
            },
            {
                title:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                content:'你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下你的发票已经寄出去，请留意一下',
                date:'2019-02-13',
                isCheck:false
            }

        ],


        // popShow:false, 
        // infoList:[], //只是为了不报错
        getGdList:{}, //只是为了不报错
        gslist:{} //只是为了不报错
    },
    components: {
        // comHeadEmpty,
        comPop,
        comHead,
        comContentLayout,
        // comFoot,
        footBtn,
        summaryData,
        recordDetailList,
        platformItem,
        comAddDel,
        tipsPop,

    },
    
    methods: {
        maskShow(item){
            // console.log(index);
            // 工商信息显示
            // console.log("this",this)
            // this.isShow = !isShow;
            // Object.defineProperty(this)
            // console.log('isShow',this.isShow)
            // // return this.isShow;
            item.isShow = !item.isShow;
            
            /*
            if(!this.company){
                this.company = true;
                console.log('company 为空')
                // this.company = true
                axios.get('/mock/5c888de2cecb1d3ecb3eb799/weiren/gsinfo',
                {
                    params:{
                        id:'123456'
                    }
                }
                )
                .then((res)=>{
                    this.company = res.data.data.company
                    console.log(this.company);
                })
                .catch((err)=>{
                    console.log(err);
                    this.company = null;
                })
            }
            */

                console.log(this.company);
        },
        // 公共弹窗组件是否显示
        popIsShow(index,...item){
            // index控制哪一个弹窗弹出
            // console.log('sendItem',stateControl);
            if(item.length>=1){
                console.error('不可以传入两个或以上的参数')
            }
            
            stateControl.$emit('popIsShow',index);
            
        },

        // 提示框
        tipsPopIsShow(){
            stateControl.$emit('tips')
        },

        //控制主页需要弹出的弹窗 非公共组件的
        infoPop(from){
            // 参数from表示 显示哪个窗口
            // 该方法用于控制自身部分的弹窗
            // 非公共组件的弹窗开关
                this.popShow[from] = !this.popShow[from];
            // this.popshow();
            // console.log(this.popShow);
            
        },

        search(){
            
        }
        
    },
    computed: Vuex.mapState({
        info(state){
            console.log('触发吧',state.infoPop);
            let from = state.infoPop.from;
            this.popShow[from] = !this.popShow[from];
            return state.infoPop.focus;
        }
    }),

    watch: {
        info(){},
    },
    created() {
        // 设置域名
        axios.defaults.baseURL = 'https://easy-mock.com/mock/5c888de2cecb1d3ecb3eb799/weiren/';
        
    },
})


// let uploadCount = 0;
// weui.uploader('#uploader', {
// url: 'http://127.0.0.1:8080/',
// auto: false,
// type: 'file',
// fileVal: 'fileVal',
// compress: {
//     width: 1600,
//     height: 1600,
//     quality: .8
// },
// onBeforeQueued: function(files) {
//     // `this` 是轮询到的文件, `files` 是所有文件

//     if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
//         weui.alert('请上传图片');
//         return false; // 阻止文件添加
//     }
//     if(this.size > 2 * 1024 * 1024){
//         weui.alert('请上传不超过2M的图片');
//         return false;
//     }
//     if (files.length > 5) { // 防止一下子选择过多文件
//         weui.alert('最多只能上传5张图片，请重新选择');
//         return false;
//     }
//     if (uploadCount + 1 > 5) {
//         weui.alert('最多只能上传5张图片');
//         return false;
//     }

//     ++uploadCount;

//     // return true; // 阻止默认行为，不插入预览图的框架
// },
// onQueued: function(){
//     // console.log(this);

//     // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
//     // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

//     this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
//     console.log('手动上传的',this.upload)
//     // this.stop(); // 中断上传

//     // return true; // 阻止默认行为，不显示预览图的图像
// },
// onBeforeSend: function(data, headers){
//     console.log(this, data, headers);
//     // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
//     // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

//     // return false; // 阻止文件上传
// },
// onProgress: function(procent){
//     console.log(this, procent);
//     // return true; // 阻止默认行为，不使用默认的进度显示
// },
// onSuccess: function (ret) {
//     console.log(this, ret);
//     // return true; // 阻止默认行为，不使用默认的成功态
// },
// onError: function(err){
//     console.log(this, err);
//     // return true; // 阻止默认行为，不使用默认的失败态
// }
// });






