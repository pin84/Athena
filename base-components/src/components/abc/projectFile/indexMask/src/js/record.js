baseInfo:[
    {
        name:'工商消息',
        api:apilink.gsinfo,
    },
    {
        name:'股东信息',
        api:apilink.gdlinfo,
    },
    {
        name:'主要人员信息',
        api:apilink.zyryinfo,
    },
    {
        name:'行政许可(工商局)信息',
        api:apilink.gsxkinfo,
    },
    {
        name:'行政许可(信用中国)信息',
        api:apilink.gsxyinfo,
    },
    {
        name:'行政处罚信息',
        api:apilink.xzcfinfo,
    },
    {
        name:'税务信用',
        api:apilink.swxyinfo,
    },
    {
        name:'列入经营异常名录信息',
        api:apilink.lrjyycmlxy,
    },
    {
        name:'黑名单',
        api:apilink.cpwsinfo,
    }
    ],


baseInfo:[
    '工商消息',
    '股东信息',
    '主要人员信息',
    '行政许可(工商局)信息',
    '行政许可(信用中国)信息',
    '行政处罚信息',
    '税务信用',
    '列入经营异常名录信息',
    '黑名单',
],

// this.company = [{
        //     ID: "123456",
        //     Name: "深圳市XXX公司",
        //     OldName: "这是个oldname",
        //     IsHeightNew: "",
        //     Code: "9144xxxxxxx",
        //     BLindustry: "所属行业",
        //     Capital: "12456",
        //     Code: "9144xxxxxxx",
        //     ComparryType: "有限责任公司",
        //     Email: "xxxxxxxx@xx.com",
        //     EnAddress: "深圳市xxxxxxxxx",
        //     ID: "123456",
        //     IsHeightNew: "",
        //     LegalReprese: "陈冲",
        //     Name: "深圳市XXX公司",
        //     OldName: "这是个oldname",
        //     OperaState: "手机",
        //     Phone: "020-11111111",
        //     Registration: "龙岗局",
        //     Scope: "手机",
        //     StaffSize: "1000",
        //     Website: "www.xxx.com",
        //     creationTime: "2004-5-23"
        // }]

        // 工商信息
        // -- 工商信息表ID、企业名称、曾用名、是否是高新技术产业、统一社会信用代码、注册资本、经营状态、法定代表人、
        // -- 登记机关、成立日期、类型、所属行业、人员规模、电话、邮箱、官网、企业地址、经营范围
        this.infoList = [{
            ID:'1313131', //工商信息表id
            Name:'深圳市原道数码电子有限公司', //"企业名称"
            OldName:'这是oldname',  //"曾用名"
            IsHeightNew:true,  //"是否是高新技术产业"
            Code:'914403001922015366',  //"统一社会信用代码"
            Capital:'12456万元人命币',  //"注册资本"
            OperaState:'存续(在营、开业)',  //"经营状态"
            LegalReprese:"陈一一",  //"法定代表人"
            Registration:"龙岗局",  //"登记机关"
            creationTime:"1994-09-23",  //"成立日期"
            ComparryType:"有限责任公司",  //"类型"
            BLindustry:"制造业",  //"所属行业"
            StaffSize:"1000人以上",  //"人员规模"
            Phone:"020-25418745",  //"电话"
            Email:"444444444@qq.com",  //"邮箱"
            Website:"www.fdfddfg.com",  //"官网"
            EnAddress:"深圳市龙岗区龙岗街道56号",  //"企业地址"
            Scope:"手机",  //"经营范围"
        }] 



        this.getGdList = [
            {
                //股东名称、持股比例、认缴额(万元)
                Name:'张某某', 
                Stake:'56',
                SpandingMoney:'2154'

            },
            {
                //股东名称、持股比例、认缴额(万元)
                Name:'张某某', 
                Stake:'56',
                SpandingMoney:'2154'

            },
            {
                //股东名称、持股比例、认缴额(万元)
                Name:'张某某', 
                Stake:'56',
                SpandingMoney:'2154'

            }
        ]

        /**主要人员信息(key personnel information)**/
	// -- 表ID、姓名、关联公司、职务
        this.zyryinfo = [
            {
                Name:"张晓晓",
                Associate:"广州市XXXX有限公司",
                Position:"董事长",
            },
            {
                Name:"张晓晓",
                Associate:"广州市XXXX有限公司",
                Position:"董事长",
            },
            {
                Name:"张晓晓",
                Associate:"广州市XXXX有限公司",
                Position:"董事长",
            }
        ]
    
        
        // 行政许可【工商局】信息
        this.gslist = [
            {
                //许可文件编号、许可文件名称、有效期自、有效期至、许可机关、许可内容
                LicenseNo:'东公送xxxxx',  //许可文件编号
                LicenseName:'原道南方XXXXXXX',  //许可文件名称
                StartTime:'2016-09-23',  //有效期自
                EndTime:'2019-08-12',  //有效期至
                PerAgency:'深圳市公安消防',  //许可机关
                PerContent:'建设工程消防验收',  //许可内容
            },
            {
                //许可文件编号、许可文件名称、有效期自、有效期至、许可机关、许可内容
                LicenseNo:'东公送xxxxx',
                LicenseName:'原道南方XXXXXXX',
                StartTime:'2016-09-23',
                EndTime:'2019-08-12',
                PerAgency:'深圳市公安消防',
                PerContent:'建设工程消防验收',
            },
            {
                //许可文件编号、许可文件名称、有效期自、有效期至、许可机关、许可内容
                LicenseNo:'东公送xxxxx',
                LicenseName:'原道南方XXXXXXX',
                StartTime:'2016-09-23',
                EndTime:'2019-08-12',
                PerAgency:'深圳市公安消防',
                PerContent:'建设工程消防验收',
            },
            {
                //许可文件编号、许可文件名称、有效期自、有效期至、许可机关、许可内容
                LicenseNo:'东公送xxxxx',
                LicenseName:'原道南方XXXXXXX',
                StartTime:'2016-09-23',
                EndTime:'2019-08-12',
                PerAgency:'深圳市公安消防',
                PerContent:'建设工程消防验收',
            }
        ]

        // 行政许可【信用中国】信息
        /**行政许可【信用中国】信息(administrative license【Credit China】information)**/
	    // -- 序号、项目名称、地域、决定日期、内容
        this.gsxyList = [
           {
            ProName:"",  //项目名称
            Regional:"",  //地域、
            DecisionTime:"",  //决定日期
            Content:"",  //内容
           } 
        ]

        // 行政处罚信息
        /**行政处罚信息(企查查上的经营风险) (administrative punishment information)**/
	// -- 序号、决定书文号、违法行为类型、行政处罚内容、决定机关名称、处罚决定日期、公式日期、详情
        this.xzchList = [
            {
                SerialNo:"12121", // 序号
                DecbookNo:"12131", // 决定书文号
                IBehavType:"违法行为类型违法行为类型", //违法行为类型
                AdpContent:"行政处罚内容行政处罚内容", //行政处罚内容
                DecauName:"决定机关名称决定机关名称", //决定机关名称
                PenalyTime:"2018-10-10", //处罚决定日期
                PublicTime:"2018-10-10", //公式日期
                Details:"1121", //详情
            },
            {
                SerialNo:"12121", // 序号
                DecbookNo:"12131", // 决定书文号
                IBehavType:"违法行为类型违法行为类型", //违法行为类型
                AdpContent:"行政处罚内容行政处罚内容", //行政处罚内容
                DecauName:"决定机关名称决定机关名称", //决定机关名称
                PenalyTime:"2018-10-10", //处罚决定日期
                PublicTime:"2018-10-10", //公式日期
                Details:"1121", //详情
            }
        ]

        // 税务信用
        /**税务信用(tax credit)**/
	// -- 序号、评价年度、纳税人识别号、纳税信用等级、评价单位
        this.taxcredit = [
            {
                EvalYear:"4",  //评价年度
                TaxpayerNo:"45454545",  //纳税人识别号
                TaxcreLevel:"2",  //纳税信用等级
                EvalUnit:"广州市xxxxx",  //评价单位
            }
        ]

        /**列入经营异常名录信息(listin business exception infomation)**/
	// -- 序号、列入经营异常名录原因、列入日期、作出决定机关(列入)、
	// -- 移出经营异常名录原因、移出日期、作出决定机关(移出)
        this.BrokenPromisesList = [
            {
                ListInExcCause:"", // 列入经营异常名录原因
                ListInTime:"2018-10-10", // 列入日期
                ListInDec:"作出决定机关", // 作出决定机关(列入)
                RemoutExcCause:"是什么原因", // 移出经营异常名录原因
                RemoutTime:"2018-10-11", // 移出日期
                RemoutDec:"瓦卡卡卡卡", // 作出决定机关(移出)
            },
            {
                ListInExcCause:"", // 列入经营异常名录原因
                ListInTime:"2018-10-10", // 列入日期
                ListInDec:"作出决定机关", // 作出决定机关(列入)
                RemoutExcCause:"是什么原因", // 移出经营异常名录原因
                RemoutTime:"2018-10-11", // 移出日期
                RemoutDec:"瓦卡卡卡卡", // 作出决定机关(移出)
            },
            {
                ListInExcCause:"", // 列入经营异常名录原因
                ListInTime:"2018-10-10", // 列入日期
                ListInDec:"作出决定机关", // 作出决定机关(列入)
                RemoutExcCause:"是什么原因", // 移出经营异常名录原因
                RemoutTime:"2018-10-11", // 移出日期
                RemoutDec:"瓦卡卡卡卡", // 作出决定机关(移出)
            }
        ];

        /**列入严重违法失信企业名单(黑名单)信息(listin serious illegal  Broken promises  enterprise(blacklist) infomation)**/
	// -- 序号、类别、列入严重违法失信企业名单(黑名单原因)、列入日期、作出决定机关(列入)、
	// -- 移出严重违法失信企业名单(黑名单)原因、移出日期、作出决定机关(移出)
    this.blinfo = [
        {
            SerialNo:"序号", // INT,
            category:"类别", // nvarchar(100),
            ListInbCause:"列入严重违法失信企业名单(黑名单原因)", // nvarchar(1000),
            ListInTime:"列入日期", // date,
            ListInDec:"作出决定机关(列入)", // nvarchar(100),
            RemoutbCause:"移出严重违法失信企业名单(黑名单)原因", // nvarchar(1000),
            RemoutTime:"移出日期", // date,
            RemoutDec:"作出决定机关(移出)", // nvarchar(100),
    }],
    

        /**裁判文书(referee documents)**/
	// -- 序号、案件名称、案由、发布时间、案件编号、案件身份、执行法院
        this.RefereeDocuments = [
            {
                CaseName:"案件案件", //   案件名称 nvarchar(1000),
                CauseReason:"因为所以", //   案由 nvarchar(100),
                ReleaseTime:"2018-10-10", //   发布时间 date,
                CaseNumber:"有编号哦", //   案件编号 nvarchar(100),
                CaseStatus:"我是被告", //   案件身份 nvarchar(1000),
                PerformCourt:'XXX法院', //   执行法院nvarchar(100),
            },
            {
                CaseName:"案件案件", //   案件名称 nvarchar(1000),
                CauseReason:"因为所以", //   案由 nvarchar(100),
                ReleaseTime:"2018-10-10", //   发布时间 date,
                CaseNumber:"有编号哦", //   案件编号 nvarchar(100),
                CaseStatus:"我是被告", //   案件身份 nvarchar(1000),
                PerformCourt:'XXX法院', //   执行法院nvarchar(100),
            },
            {
                CaseName:"案件案件", //   案件名称 nvarchar(1000),
                CauseReason:"因为所以", //   案由 nvarchar(100),
                ReleaseTime:"2018-10-10", //   发布时间 date,
                CaseNumber:"有编号哦", //   案件编号 nvarchar(100),
                CaseStatus:"我是被告", //   案件身份 nvarchar(1000),
                PerformCourt:'XXX法院', //   执行法院nvarchar(100),
            },
        ];

        /**开庭公告(Court notice)**/
	// -- 序号、案号、开庭日期、案由、
	// -- 公诉人/原告/上诉人/申请人、被告人/被告/被上诉人/被申请人
        this.CourtNotice=[
            {
                CaseNo:"121", //  案号 nvarchar(100),
                OpenCourtTime:"2018-10-10", // 开庭日期  date,
                CauseReason:"因为asjhahdoado所以askjdkajdkajd", //  案由 nvarchar(100),
                Plaintiff:"我要告", //  公诉人/原告/上诉人/申请人 nvarchar(100),
                Defendant:"被告了", //  被告人/被告/被上诉人/被申请人  nvarchar(100),
            },
            {
                CaseNo:"121", //  案号 nvarchar(100),
                OpenCourtTime:"2018-10-10", // 开庭日期  date,
                CauseReason:"因为asjhahdoado所以askjdkajdkajd", //  案由 nvarchar(100),
                Plaintiff:"我要告", //  公诉人/原告/上诉人/申请人 nvarchar(100),
                Defendant:"被告了", //  被告人/被告/被上诉人/被申请人  nvarchar(100),
            },
            {
                CaseNo:"121", //  案号 nvarchar(100),
                OpenCourtTime:"2018-10-10", // 开庭日期  date,
                CauseReason:"因为asjhahdoado所以askjdkajdkajd", //  案由 nvarchar(100),
                Plaintiff:"我要告", //  公诉人/原告/上诉人/申请人 nvarchar(100),
                Defendant:"被告了", //  被告人/被告/被上诉人/被申请人  nvarchar(100),
            }
        ];

        /***
	知识产权：(Intellectual property rights)
***/

/**商标信息(trademark infomation)**/
	// -- 序号、商标、商标名、状态、申请时间、注册号、国际分类、内容
        this.trademarkInfomation = [
            {
                Trademark:"",  // 商标 nvarchar(100),
                TrademarkName:"",  //商标名  nvarchar(100),
                Tstate:"",  // 状态、 nvarchar(100),
                RequestTime:"",  // 申请时间 date,
                RegisterNo:"",  // 注册号 nvarchar(100),
                InternClass:"",  // 国际分类 nvarchar(100),
                Content:"",  //  内容 nvarchar(1000),
            },
            {
                Trademark:"",  // 商标 nvarchar(100),
                TrademarkName:"",  //商标名  nvarchar(100),
                Tstate:"",  // 状态、 nvarchar(100),
                RequestTime:"",  // 申请时间 date,
                RegisterNo:"",  // 注册号 nvarchar(100),
                InternClass:"",  // 国际分类 nvarchar(100),
                Content:"",  //  内容 nvarchar(1000),
            },
            {
                Trademark:"",  // 商标 nvarchar(100),
                TrademarkName:"",  //商标名  nvarchar(100),
                Tstate:"",  // 状态、 nvarchar(100),
                RequestTime:"",  // 申请时间 date,
                RegisterNo:"",  // 注册号 nvarchar(100),
                InternClass:"",  // 国际分类 nvarchar(100),
                Content:"",  //  内容 nvarchar(1000),
            }
        ]
     
        



        // stateControl.$on('popclose',(item,index)=>{
        //     this.baseInfo[index] = item;
        //     console.log('index get',item,index);
        // })




        // apilink api对象
            // if(this.company === null){
            //     // 这部分是头部获取接口信息
            //     console.log('common run');
            //     axios.get(apilink.gsinfo)
            //     .then((res)=>{
            //         console.log('common res',res);
            //         this.$set(this,'company',res.data.data.company)
            //         // this.company = 
            //         console.log('this.company',this.company);
            //     })
            //     .catch((rej)=>{
            //         console.log('common rej',rej);
            //     })
            // }
            
            // // 这部分是内容获取接口信息
            // // item 来自 baseInfo
            // axios.get(item.api)
            // .then((res)=>{
            //     console.log(res);
            //     let data = res.data.data;
            //     let apival = this.baseInfo[index].apival;
            //     console.log('data',data);
            // }).catch((rej)=>{
            //     console.log(rej);
            // });