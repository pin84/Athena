// let mock = true;
let mock = false;
let online = true;
// let online = false;

// 用于存放api
// http://192.168.31.109:80 my ip
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx326433af14961e48&redirect_uri=http%3A%2F%2Fwww.shangxialian.net%2Fjs%2F%23%2Foauth%2Fusers&response_type=code&scope=snsapi_userinfo&state=/&connect_redirect=1&uin=Mjg2OTMwNDgxNQ%3D%3D&key=21d78e7e7d15501c9354aa6bf6d5cde816a795df4c76b1b3fd066dd9712a3a17fb9fe2ac1e314b5fe46947e9c77cf5d0&pass_ticket=R95PqHlSZ07MsFEf0vs3KhlvN6B29zj7CHdgau1r5VQ+CXIKWwX//LUwOaLf2eZS2hCWAMt2O8sOx1MYWPE+pA==

// let baseUrl ='http://localhost:3434/Api/'; //线下路径
let baseUrl = '../../Api/';

let pyBaseUrl = 'http://192.168.31.89:8000/' //python线下路径
let dingyue = 'http://192.168.31.73:8000/'
let autoBaseUrl = 'http://192.168.31.73:8000/' //认证基本请求路径 家星ip
// /oauth/auth/
let mockBaseUrl = ' https://easy-mock.com/mock/5cbd2f950a586804260fcda0/api/' //mock数据路径
if (online) {
     pyBaseUrl = dingyue = autoBaseUrl = 'http://47.106.105.213:8000/'// python线上路径
     // pyBaseUrl = dingyue = autoBaseUrl = 'http://117.48.207.24:8000/'// python线上路径
     // pyBaseUrl = dingyue = autoBaseUrl = 'http://192.168.31.118:8000/'// python线上路径(金容)
     // pyBaseUrl = dingyue = autoBaseUrl = 'http://192.168.31.89:8000/'// python线上路径(金容)
     // pyBaseUrl = dingyue = autoBaseUrl = 'http://192.168.31.73:8000/'// python线上路径（家星）
     // pyBaseUrl = dingyue = autoBaseUrl = 'http://192.168.31.73:8001/'// python线上路径（家星）
}

// '../../Api/' 线上路径 
// 'http://localhost:3434/Api/'  线下路径
// 不知何种原因 本地服务器无法开启代理进行登录
// 用法 
// this.$api.GetCheckdimension
// .net 旧api
let api = {

     GetDimensionName: baseUrl + 'SxChain/GetDimensionName', //获取企业维度名称  mark
     /** 
      *  !获取企业维度名称
      *  @method GET 
      *  @params 
      *   *pageIndex:'1', //无此参数不影响 有可能写了默认值1
      *   *  pageSize:'30', //若失去该参数 返回结果的rows为空 该参数暂且写大 若写小了 有可能出现超过30 不显示30以后的数值
      *      where:[{
      *          name:'title',
      *          value:""
      *     }]
      */
     GetDownPreciseList: baseUrl + 'SxChain/GetDownPreciseList', //获取下链列表
     GetUpEnterpriseList: baseUrl + 'SxChain/GetUpEnterpriseList', //获取上链企业信息
     GetDownEnterpriseList: baseUrl + 'SxChain/GetDownEnterpriseList', //获取下链企业信息



     GetCheckdimension: baseUrl + 'SxChain/GetCheckdimension',  //查询已勾选的企业维度
     /** 
      * !查询已勾选的企业维度
      * @GetCheckdimension 
      * @method POST
      * @params  
      * * pageIndex:1,
      *   PageSize: 30,
      *    Where: [{
      *      name: "userid",
      *      value: 11
      *    }]
      */


     GetUpPreciseList: baseUrl + 'SxChain/GetUpPreciseList', // 上链列表
     /**
      * !获取上链列表信息
      * @GetUpPreciseList
      * @params
      * * PageIndex:Number
      * * PageSize:Number
      *   where:[{
      *       name:'provinceid',
      *       value:"什么鬼ID"
      *   }]
      */
     GetEnterpriseSearch: baseUrl + 'SxChain/GetEnterpriseSearch', // 搜索企业名称

     GetFirstSave: baseUrl + 'SxChain/GetFirstSave', //当前端判断该用户为首次登陆 数据库进行新增操作 
     // 该操作完成后 再次调用 GetCheckdimension 获取的已勾选的企业维度完整信息

     SaveCheckdimension: baseUrl + 'SxChain/SaveCheckdimension', // 保存勾选维度
     /**
      * !保存勾选维度
      * @SaveCheckdimension
      * @params 
      *  *info{
      *    hidSxUserID:11, //userID
           EntIndustState : false,
           EntShareState : true,
           EntPersonState : false,
           EntForeignState : true,
           SxProKeywordState : false,
           WfKeywordState : true,
           EntTaxCreditState : false,
           EntIprTradeState : true,
           EntIprPatentState : false,
           EntIprCertState : true,
           EntIprWorksState : false,
           EntIprSoftState : true,
           EntIprWebsiteState : false,
           EntRecruitState : true,
      *  }
      */

     GetRandomEnterpriseList: baseUrl + 'SxChain/GetRandomEnterpriseList', // 随机获取企业名称
     /**
      * !随机获取企业信息
      * @params
      * !假如传入特定ID 则会获取该企业信息
      */

     // GetCheckdimension : baseUrl + 'SxChain/GetCheckdimension', // 获取查询勾选维度（第一次进入 用户第一次登陆 默认保存基本资料维度）
     // SelectDimDetial: baseUrl + 'SxChain/SelectDimDetial', //获取 勾选自画像信息集合
     /**
      * !获取企业维度链接
      * @method POST
      * @params
      * * "PageIndex": 1,
      *   "PageSize": 30,
      *   "Where": [{
      *     "name": "id", //企业维度标题ID
      *     "value": "3"  //对应值 （上方）
      *     },
      *     {
      *       "name": "enterpriseid", //企业维度对应的链接ID
      *     "value": "d5adee6f-3125-458d-9da1-0002ebd22f72" // 企业ID
      *     }]
      */
     LoginTest: baseUrl + 'Sx/LoginTest', //登录测试
     GetUserInfo: baseUrl + 'Sx/GetUserInfo', //获取用户信息


     SaveVisitCount: baseUrl + 'SxChain/SaveVisitCount', //查询企业访问次数
     /**
      * @params
      * enterpriseid : //企业ID
      */

     SaveRecommendNumber: baseUrl + 'SxChain/SaveRecommendNumber', //我推荐
     /**
      * @params
      * enterpriseid : //企业ID
      * userid // 用户ID
      */

     SaveDefault: baseUrl + 'SxChain/SaveDefault', //默认为首页
     /**
      * @params
      * enterpriseid //企业ID
      * userid //用户ID
      */
}

// python 新api
let pythonApi = {

     // 判断用户是否拥有管理员权限 @param [token] 0拥有权限 1没有权限
     Administrator: pyBaseUrl + 'center/users/administrator/',

     // 随机弹窗
     randomCompany: pyBaseUrl + 'index/column',

     //上链接口 @params 无 @method:GET
     upData: pyBaseUrl + 'index/up/industrys',  //isMock

     //下链接口 @params 无 @method:GET
     downData: pyBaseUrl + 'index/industry',  //isMock

     singleData: pyBaseUrl + 'index/single',

     // @params enterpriseid[企业ID] industryid[行业ID] 当搜索出企业信息后获取公司id及行业id 并获取对应信息
     comInfo: pyBaseUrl + "index/basic", //维度弹窗基本信息 公共部分 isMock

     // @params industryid[行业id] provinces[省份名] logo[ up / down ] up_industry[上链行业名称]!仅上链需要  区分上下链
     searchPrinceCom: pyBaseUrl + 'index/list', //点击图谱省份 弹出列表时所需数据 搜索公司列表 上下链行业初始数据

     // @params 无 有异议
     inbatch: pyBaseUrl + 'index/batch/inbatch', //换一批

     // @params : industryid[行业ID] province[省份名称] page[分页]
     precise: pyBaseUrl + 'industry/precise',//精准搜索 isMock

     // @method[POST] company_id[企业id] token
     Recommend: pyBaseUrl + 'index/recommended/function/', //我推荐 

     // @params : token
     companyInfo: pyBaseUrl + 'index/info',

     // @params : company_name[公司名称] page_size[搜索结果的返回数]
     indexSearch: pyBaseUrl + 'industry/search', // 首页搜索

     // @params : 
     accuracySearch: pyBaseUrl + 'users/accurate', //精准检索
     // @params:  industryid[行业id] provinces[省份名] logo[ up / down ] up_industry[上链行业名称]!仅上链需要  区分上下链
     phoneCount: pyBaseUrl + 'index/singles/mobile/count', //手机号码总计
     // @params: company_id[公司ID] industrysid[行业ID]
     searchFunc: pyBaseUrl + 'index/searchfunction', //获取公司访问人数 推荐数

     searchCompany: pyBaseUrl + 'index/search/data/info', //获取公司访问人数

     // @params: username[用户名称]
     selectTemplate: pyBaseUrl + 'users/template', //选择模板

     getAuditTemList: pyBaseUrl + 'users/get/update/reviewer/', //审核短信模板列表

     // 审核 认证企业用到的接口
     // @params token 获取数据 [page] 分页
     companyCertData: pyBaseUrl + 'users/obtain/',

     // @params token 获取图片
     companyCertPicture: pyBaseUrl + 'users/picture',

     /**审核短信模板 同意或不同意
      * @method [POST]
      * @params [state] 状态
      *         [template_name] 模板名
      *         [id] 模板列表
      */
     setauditTemState: pyBaseUrl + 'users/updates/reviewers/', //审核短信模板 同意或不同意

     /**
      * @method [POST]
      * @params [identity_status]状态
      *         [opinion]审核意见
      */
     auditUsers: pyBaseUrl + 'users/audit/', // 公司认证审核

     /**添加信息模板
      * @method [POST]
      * @param [template_name] 模板名
      *        [sms_type] 短信类型
      *        [user] 用户
      *        [content] 内容
      */
     addSmsTem: pyBaseUrl + 'users/change',

     /**删除信息模板
      * @method [DELETE]
      * @param [template_name] 模板名
      *        [sms_type] 短信类型
      *        [user] 用户
      *        [content] 内容
      */
     delSmsTem: pyBaseUrl + 'users/change',

     // 模板信息推送
     /**
      * @method [POST] 
      * @params [template_name] 模板名称
      *         [mobile] 手机号
      *         [bussiness] 主营
      *         [token]
      */
     pushSms: pyBaseUrl + 'users/sms',

     // 发送短信 → 步骤一 → 余额查询
     // @params provinces[省份] ,industryid[行业],business[主营],mobile[手机号] token
     sendSms: pyBaseUrl + 'users/info/money/',

     //订阅
     // isHasKeyword: dingyue + 'subscribe/search', //进入首页，查访是否设置关键词 （有重复，待检查）

     /**
      * 我的订阅
      * BidsAreaID: , Title: ,page: "1",page_size: "5"
      */
     mySubscript: dingyue + 'subscribe/search',

     /**
      * 随便逛逛一开始随机获取数据
      *  page: 1,page_size: 8
      */
     randomData: dingyue + 'subscribe/casual/',

     /**
      * 采招推荐第一闪访问获取数据 
      * 
      */
     recommanInitData: pyBaseUrl + 'subscribe/random/ntoe',

     selectArea: dingyue + 'index/areas', //选择区域


     selectIndustry: dingyue + 'index/industrys/',


     /**
      * 从后台拿token（这个接口只在采招推荐用到得）
      * GET
      * @param
      * token
      */
     isShowTipsStep_1: pyBaseUrl + 'subscribe/sub/token',


     /**
      * 用户是否是第一次访问页面。
      */
     isShowTips: pyBaseUrl + 'monitor/instructions',

     /**
      * 设置和获取 关键字
      * @method
      * POST:为设置关键词
      * @params
      * areas_id: 1,
      * keywords_array: "ABC,DEF",
      * is_remind: 1,
      * remind_long_time: 7
      * 
      * @method
      * GET:获取关键词
      * @params
      * token:用户token
      */
     setSubKeyword: dingyue + 'subscribe/info/',

     /**
      * 历史搜索 (查询和删除)
      * 两个接口同一个路径，
      * @method
      * POST 请求查询当前是否有搜索的历史，有就显示搜索的历史关键词
      * DELETE 请求为删除历史搜索的关键词
      * @params
      * token
      */
     isHashistoryKerword: dingyue + 'subscribe/history/',

     // 获取微信code码
     getCode: autoBaseUrl + 'oauth',

     // 认证接口
     getUserInfo: autoBaseUrl + 'oauth/users',

     /**
      * 关键字查询，
      * 输入关键词搜索,要四个参数
      * token
      * Title:keyword，
      * page:'1',
      * page_size:'5'
      */
     keywordSearch: dingyue + 'subscribe/fastseeks/',
     //关键字查询结果详情，返回结果的内容
     detailContent: dingyue + 'subscribe/fastseek/',
     /**
      * //根据区域和关键字筛选
      * token:
      * Title:关键字，传多个则以 ',' 号隔开
      * BidsAreaID：区域id,传多个则以 ',' 号隔开
      */
     screen: dingyue + 'subscribe/search/',

     /**
      * 认证公司，微支付前保存用户信息
      * @method:post
      * @param
      * name, //公司名
      * code, // 社会统一代码
      * contacts //用户名
      * phone //手机号
      * avatar //营业执照图片
      * user // 用户id
      */
     certification: dingyue + 'users/certification/',

     // 微信确认支付
     /**
      * @method[POST]
      * @params [pay_info]
      * 
      */
     certificationPay: pyBaseUrl + 'users/certifications/pay/',

     /**
      * 微信支付
      * @param
      * token:'' //微信受权后，会拿到
      */
     pay: dingyue + 'pay/',

     /**
      * @method [POST]
      * 微信充值
      * 调用微信支付
      * @params
      * token
      *  [total_fee] !充值金额 单位:分 type:string
      */
     recharge: pyBaseUrl + 'pay/recharge/',


     /**
      * 重新调起支付，获取用户之前填写过的信息
      * GET
      * token
      * identity_status  用户的审核状态
      * pay_status 用户的支付状态
      */
     reCertification: pyBaseUrl + 'users/get/pay/goods/info/',


     /**
      * 获取个人中心的推荐、访问、已消费数
      * GET
      * @param
      * token
      */
     userCenterInfo: pyBaseUrl + 'center/user/info',

     /**
      * 年审接口
      * GET
      * @param
      * token
      */
     certificationYears:pyBaseUrl+'center/certification/years/pay',


     /**
      * 触客+
      * 获取页面多少个人在使用的数据 
      * GET
      * @param
      * token
      */
     useNum: pyBaseUrl + 'users/number/',

     /**
      * 个人自画像 
      * 取标签：GET,存标签：POST
      * @param
      * token
      * tags
      */
     perTags: pyBaseUrl + 'center/a/self/people',

     /**
      * 企业自画像
      */
     comTags: pyBaseUrl + 'center/self/portrait',
     /**
      * 精准短信触客
      * GET
      * @params
      * provinces=&industryid&business（可为空值）&page
      */
     accSearch: pyBaseUrl + 'contact/search',

     /**
      * 用于获取微信sdk
      */
     wxConfig: pyBaseUrl + 'center/js/sdk/',

     /**
      * 用于从微信服务器获取图片并上传回本地服务器
      */
     getWxPic: pyBaseUrl + 'center/image',

     /**
      * 用户离开记录
      */
     leaveRecord: pyBaseUrl + 'monitor/log/user/leave/url',
     
     // 精准短信触客  provinces，industryid，business ，token
     chukeMsgInfo: pyBaseUrl + 'contact/balance/info',
     
     // [POST] 精准短信触客 短信发送 token，provinces，industryid，business，template_name,
     chukeMsgSend: pyBaseUrl + 'contact/sms/',


     /**
      * 用户反馈
      * POST请求为提交反馈，
      * 请求参数   types, content, contact_name, mobile, media_id，token
      * GET请求为获取反馈历史
      * token
      */
     feedback: pyBaseUrl + 'center/feedback/info/',

     /**
      * 反馈获取图片
      * avatar
      */
     feedbackGetImg: pyBaseUrl+'center/getfeedbackinfo/image',

     /**
      * 反馈后台，初始化获取数据
      * GET
      * @param
      * types,
      * functional_areas
      * audit_state
      */
     feedbackBakInitData:pyBaseUrl+'center/feedback/infos/audit/',

     /**
      * 反馈后台提交回复
      * PUT
      * @param
      * id
      * audit_content
      */
     feedbackResponse:pyBaseUrl+'center/audit',


     //  获取退款信息 @method [GET] @params [none]
     refundInfo: pyBaseUrl + 'center/refund/audit/',
     
     // 退款接口 @method [POST] [company_name]企业名称 [main_order_id]单号  [token]
     refundAudit: pyBaseUrl + 'center/refund/audit/',
     
     inspirationalText: pyBaseUrl + 'center/text',
}

let mockApi = {
     lian: mockBaseUrl + 'index/industry',
     upData: mockBaseUrl + 'index/up/industrys',
     downData: mockBaseUrl + 'index/industry',
     singleData: mockBaseUrl + 'index/single',
     searchPrinceCom: mockBaseUrl + 'index/list',
     nextGroup: mockBaseUrl + 'index/list/inbatch',
     industry: mockBaseUrl + 'index/industry',
     selfInfo: mockBaseUrl + 'index/self/inbatch',
     randomCompany: mockBaseUrl + 'index/column',
     companyInfo: mockBaseUrl + 'index/info',
     accuracySearch: mockBaseUrl + 'users/accurate', //精准检索
     indexSearch: mockBaseUrl + 'index/search',
     searchFunc: mockBaseUrl + 'index/searchfunction', //获取公司访问人数 推荐数
     selectIndustry: mockBaseUrl + 'index/industrys/', //选择行业
     selectTemplate: mockBaseUrl + 'users/template', //选择模板
     //订阅

}

let dingyueMock = {
     //订阅
     isHasKeyword: mockBaseUrl + 'subscribe/search', //进入首页，查访是否设置关键词
     selectArea: mockBaseUrl + 'index/areas', //选择区域
     setSubKeyword: mockBaseUrl + 'subscribe/info',

     //以下方法没有mock
     //是否有搜索历史 ，有就显示搜索的历史关键词
     isHashistoryKerword: mockBaseUrl + 'subscribe/history/',
     //输入关键词搜索
     keywordSearch: mockBaseUrl + 'subscribe/fastseeks/',
     //全屏时的内容详情
     detailContent: mockBaseUrl + 'subscribe/fastseek/',
}

const baseInfo = {

}


if (mock) {
     api = Object.assign(api,
          // pythonApi,
          mockApi,
          dingyueMock,
          baseInfo);
} else {
     api = Object.assign(api,
          pythonApi,
          baseInfo

     );
}



export default api;