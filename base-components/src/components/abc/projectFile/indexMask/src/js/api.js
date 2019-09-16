let baseUrl = '';
let suffix = '';
let apilink = {
    
    //工商信息
    gsinfo: baseUrl+'/gsinfo'+ suffix, 
    
    //股东信息
    gdlinfo: baseUrl+'/gdlinfo'+ suffix,
    
    // 主要人员信息
    zyryinfo: baseUrl + '/zyryinfo' + suffix,

    //行政许可【工商局】信息
    gsxkinfo: baseUrl+'/gsxkinfo'+ suffix,
    
    //行政许可【信用中国】信息	
    gsxyinfo: baseUrl+'/gsxyinfo'+ suffix,
    
    //行政处罚信息
    xzcfinfo: baseUrl+'/xzcfinfo'+ suffix,
    
    //税务信用
    swxyinfo: baseUrl+'/swxyinfo'+ suffix,
    
    //列入经营异常名录信息
    lrjyycmlxy: baseUrl+'/lrjyycmlxy'+ suffix,
    
    //裁判文书
    cpwsinfo: baseUrl+'/cpwsinfo'+ suffix,
    
    //开庭公告
    ktgginfo: baseUrl+'/ktgginfo'+ suffix,
    
    //商标信息
    sbinfo: baseUrl+'/sbinfo'+ suffix,


}

let baseInfo = [
    {
        name:'工商消息',
        api:apilink.gsinfo,
        apival:
        [
            {
                key:'Name',
                val:'企业名称'
            },
            {
                key:'OldName',
                val:'曾用名'
            },

        ]
        // {
        //     Name:"企业名称", //"企业名称"
        //     OldName:"曾用名",  //"曾用名"
        //     IsHeightNew:"是否是高新技术产业",  //"是否是高新技术产业"
        //     Code:"统一社会信用代码",  //"统一社会信用代码"
        //     Capital:"注册资本",  //"注册资本"
        //     OperaState:"经营状态",  //"经营状态"
        //     LegalReprese:"法定代表人",  //"法定代表人"
        //     Registration:"登记机关",  //"登记机关"
        //     creationTime:"成立日期",  //"成立日期"
        //     ComparryType:"类型",  //"类型"
        //     BLindustry:"所属行业",  //"所属行业"
        //     StaffSize:"人员规模",  //"人员规模"
        //     Phone:"电话",  //"电话"
        //     Email:"邮箱",  //"邮箱"
        //     Website:"官网",  //"官网"
        //     EnAddress:"企业地址",  //"企业地址"
        //     Scope:"经营范围",  //"经营范围"
        // }
    },
    {
        name:'股东信息',
        api:apilink.gdlinfo,
        apival:{
            Name:'股东名称', 
            Stake:'持股比例',
            SpandingMoney:'认缴额(万元)'
        }
    },
    {
        name:'主要人员信息',
        api:apilink.zyryinfo,
        apival:{
            Name:"姓名",
            Associate:"关联公司",
            Position:"职务",
        }
    },
    {
        name:'行政许可(工商局)信息',
        api:apilink.gsxkinfo,
        apival:{
            LicenseNo:'许可文件编号',  //许可文件编号
            LicenseName:'许可文件名称',  //许可文件名称
            StartTime:'有效期自',  //有效期自
            EndTime:'有效期至',  //有效期至
            PerAgency:'许可机关',  //许可机关
            PerContent:'许可内容',  //许可内容
        }
    },
    {
        name:'行政许可(信用中国)信息',
        api:apilink.gsxyinfo,
        apival:{
            ProName:"项目名称",  //项目名称
            Regional:"地域",  //地域、
            DecisionTime:"决定日期",  //决定日期
            Content:"内容",  //内容
        }
    },
    {
        name:'行政处罚信息',
        api:apilink.xzcfinfo,
        apival:{
            SerialNo:"序号", // 序号
            DecbookNo:"决定书文号", // 决定书文号
            IBehavType:"违法行为类型违法行为类型", //违法行为类型
            AdpContent:"行政处罚内容行政处罚内容", //行政处罚内容
            DecauName:"决定机关名称决定机关名称", //决定机关名称
            PenalyTime:"处罚决定日期", //处罚决定日期
            PublicTime:"公式日期", //公式日期
            Details:"详情", //详情
        }
    },
    {
        name:'税务信用',
        api:apilink.swxyinfo,
        apival:{
            EvalYear:"评价年度",  //评价年度
            TaxpayerNo:"纳税人识别号",  //纳税人识别号
            TaxcreLevel:"纳税信用等级",  //纳税信用等级
            EvalUnit:"评价单位",  //评价单位
        }
    },
    {
        name:'列入经营异常名录信息',
        api:apilink.lrjyycmlxy,
        apival:{
            ListInExcCause:"列入经营异常名录原因", // 列入经营异常名录原因
            ListInTime:"列入日期", // 列入日期
            ListInDec:"作出决定机关(列入)", // 作出决定机关(列入)
            RemoutExcCause:"移出经营异常名录原因", // 移出经营异常名录原因
            RemoutTime:"移出日期", // 移出日期
            RemoutDec:"作出决定机关(移出)", // 作出决定机关(移出)
        }
    },
    {
        name:'黑名单', //列入严重违法失信企业名单（黑名单）信息
        api:apilink.cpwsinfo,
        apival:{
            SerialNo:"序号", // INT,
            category:"类别", // nvarchar(100),
            ListInbCause:"列入严重违法失信企业名单(黑名单原因)", // nvarchar(1000),
            ListInTime:"列入日期", // date,
            ListInDec:"作出决定机关(列入)", // nvarchar(100),
            RemoutbCause:"移出严重违法失信企业名单(黑名单)原因", // nvarchar(1000),
            RemoutTime:"移出日期", // date,
            RemoutDec:"作出决定机关(移出)", // nvarchar(100),
        }
    }
]

