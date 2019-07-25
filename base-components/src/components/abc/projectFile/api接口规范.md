# 页面模块 首页 未完成

#### 页面：未认证访问 

​	设为我的企业

```javascript
前端 => 后端 请求方式 POST
 API地址:
前端发送请求
    @params:{
        userId:String, //    用户ID
        companyId:String //  该企业的企业ID
    }

后端接收请求 并返回前端状态是否成功
    @result:{
		result：Boolean
    }

```

### 页面：上链 / 下链

​	精准检索查询企业接口

```javascript
前端 => 后端 请求方式 GET
 API地址:
前端发送请求
    @params:{
        key:String // 搜索用到的 关键字
    }

后端接收请求 并返回前端企业信息
    @result:{
        data：[
            //因为将会返回多个结果 故需以数组形式返回结果集 数组内存储结果集的每个个体 每个个体用{}形式保存
            {
                companyName:String,
                companyId：String
            }，
            {
            	...
            }
        ]
    }

```

搜索完毕后(获得了需要关注的企业ID后)

关注企业的接口

```javascript
前端 => 后端 请求方式 POST
 API地址:
前端发送请求
    @params:{
        companyId:String // 搜索后获得的企业ID
        userId:String    // 关注该企业的用户ID
    }

后端接收请求 并返回前端企业信息
    @result:{
        result:Boolean
    }
```

#### 页面：机器人 显示 企业主营产品/服务关键词

#### (!warn 需求不明确 请问清楚后再定规范)

查询关键词 (!warn 需求不明确 请问清楚后再定规范)

```javascript
前端 => 后端 请求方式 GET
 API地址:
前端发送请求
    @params:{
        companyId:String //查询的企业对应ID
    }

后端接收请求 并返回前端匹配信息
!warn: 需求为语音播放和文字显示 需确定语音播放需求如何实现
    @result:{
        info:String/Array   //该企业所有相关的采招信息 !warn 请明确需求 是多条还是单条
    }
```

！warn: 需要用到上方的接口 (!warn 需求不明确 请问清楚后再定规范)

  查询完信息后 前端显示关键词 客户点击关键词 匹配窝米采招信息匹配信息

```javascript

```



# 页面模块： 推送功能（！该模块需要充分了解）



### 页面：短信推送 (!warn 模板规格写死 后端存储内容作为模板

###  敏感词后端做接口)

### 敏感词接口 (!warm 前端传内容给后端匹配)

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        content:[
            "xxxxx标题",
            "XXXX内容",
        ]
    }
后端返回信息:
    @result:{
        result:Boolean // 返回结果是否可用
    }
```

### (!warn 模板设置接口在下方的设置模块)

短信推送 需要沟通定义 （！warn请留意模板需求）

```javascript
前端=>后端 请求方式 POST
API地址
前端发送请求：
    @params:{
        userId:String //要知道是谁发送短信
        title:String // 短信标题
        content:String // 短信内容
        companyId:Array  //群发 !warn 请明确需求 估计是群发
        telNumber:Number // 我的号码用于体验
    }
后端返回信息:
    @result:{
		result:Boolean
    }
```

视频短信推送 需要沟通定义 该模板需要由运营商审核通过后才可使用 （！warn请留意模板需求）

```javascript
前端=>后端 请求方式 POST 通过表单形式传输
API地址
前端代码如下
var formData = new FormData();
formData.append("userID", Number); //用户ID
formData.append("title", String); //标题
formData.append("telNumber", Number); //我的号码 用于体验

formData.append("userfile", fileInputElement.files[0]); //userfile为视频

前端发送请求：
    @params:{
        data：formData
    }
后端返回信息:
    @result:{
		result:Boolean
    }
```



# 页面模块：企业认证（！warn 企业认证需要扣费 接口列表并未提及 需注意 另外 付费接口需另起）

### 页面：企业认证  

### （!warn 该接口需要传图片）该接口会在付费成功后将数据上传至后台

```javascript
前端=>后端 请求方式 POST 通过表单形式传输
API地址
前端代码如下
var formData = new FormData();
//数字会被立即转换成字符串
formData.append("userID", Number); //企业认证时的用户ID
formData.append("companyName", String); //企业名称
formData.append("companyCode", Number); //统一社会信用代码
formData.append("contactName", Number); //联系人名字
formData.append("contactTel", Number); //联系人电话
formData.append("userfile", fileInputElement.files[0]); //companyPic为营业执照

请求头设为

前端发送请求：
    @params:{
        data：formData
    }
后端返回信息:
    @result:{
		result:Boolean
    }
```



### 消费模块

```javascript
前端=>后端 请求方式 POST
API地址
前端发送请求：
    @params:{
        userId:String // 付费的用户ID
        payModel:Number //付费模式 这里需要协商不同的数字对应不同的消费模式 有几种 如短信推送 视频短信推送 认证扣费等
        unit:Number //单位 消费的模式对应的单位也不同 如年/条
        state:Boolean 

        //文档并未提及取消该消费的模式的情况 我认为每个用户的各个消费模式都应该有对应的状态 来确保是否执行该模式 后期也可通过传入state false来确定是否取消该消费模式 消费模式取决于你是选择什么服务来进行消费 比如 短信推送需要付费这是一次性付费 企业认证需要付费 但这是每年都要付费 等 此处需要沟通 看假如说像短信推送按理应是按条收费 那么 不同的模式对应的参数估计不同 参数可能需要进一步斟酌
        
        
    }
后端返回信息:
    @result:{
		//此处 将返回支付接口 
    }
```





### 自画像

列表 已完成



# 页面模块：缴费(充值) ！warn 前端限制最低金额数为200元 

### 页面：充值

金额充值接口

```javascript
前端=>后端 请求方式 POST/PUT
API地址
前端发送请求：
    @params:{
        money：Number,//充值多少钱
        userId:String //充值用户ID
    }
后端返回信息:
    @result:{
        result:Boolean,//充值是否成功 成功时返回余额 失败返回false即可
		balance:Number // 充值后账户余额 若失败 返回NULL
    }
```

### 页面：充值记录 

充值记录

```JavaScript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //充值用户ID
    }
后端返回信息:
    @result:{
        record:[
            // 充值记录是多条记录 用数组存储返回
            {
                recordId:String // 充值记录ID
                money:Number // 充值金额
                time：String // 申请时间
                state: Number // 发票类型 0 未开票 1申请中 2已开票 3已过期
                
            }
        ]
    }
```



### 开票记录 (发票记录)

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //充值用户ID
    }
后端返回信息:
    @result:{
        record:[
            {
                invoiceID：Number //发票记录ID
                time:String //申请日期
                money:Number // 金额
                type:Number // 发票类型
                state:Number // 状态 0申请中 1已处理
                delTime:String //处理日期 申请中时为null
                remark:String // 备注（显示后台输入的快递公司和单号）申请中时为null
            }
        ]
    }
```

|

----- 将上方获取的 invoiceID  发票记录ID 传入到下方的api 

|

### 发票记录明细

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        invoiceID:String //该条的发票记录ID
    }
后端返回信息:
    @result:{
        record:[
            {
                detailID：String //明细记录ID
                money:Number // 金额
                date:String //申请日期
                type:Number // 类型 0充值类型
            }
        ]
    }
```



### 发票申请 (!warn 图片上显示是点击充值记录页面跳转至发票申请页面 并同时获得开票金额 那么 这个开票金额 是只能选择充值记录的某一项进行开票申请还是可以选择多项后再进行发票申请呢？需要沟通 结合发票记录与发票记录明细 预计是多种消费记录开具一张发票 )

```javascript
前端=>后端 请求方式 POST
API地址
前端发送请求：
    @params:{
        userId:String //充值用户ID
        recordID：Number?Array //充值记录ID 还是多个
        type：Number //0 普通发票 1 增值税专用发票
        regAddress:String // 注册地址
        regTel:Number //注册电话
        bank：String //开户银行
        account:Number //银行账号
        name:String //发票人姓名
        tel:Number //发票人电话
        address:String // 发票人地址
        
    }
后端返回信息:
    @result:{
        record:[
            {
               	result:Boolean
            }
        ]
    }
```



### 推送记录

推送汇总数据

```JavaScript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        
    }
后端返回信息:
    @result:{
        record:[
            {
                recordId:String // 该条信息对应的ID
            	smsNum:Number // 短信发送号码数量
                smsSend:Number // 短信发送数量
                movNum:Number // 视频短信发送号码数量
                movSend:Number // 视频短信发送数量
                cost:Number // 消费金额
        	}，
            .... 
            // 索引0-4 分别代表 
            //今日推送 昨日推送 一周推送 月推送 累计推送
        ]
    }
```

推送记录 （明细记录）

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        
    }
后端返回信息:
    @result:{
        record:[
            {
                recordId:String // 该条记录对应ID
            	date:String // 日期
                sendType:Number // 发送类型 0 短信 1 短信视频
                sellType:Number
                // !warn 示例图有 XXX公告字样 请对该字段进行沟通
                // 0自动营销
                // 1上链配套
                // 2下链配套
                // 3其他
                cost:Number // 消费金额
                sendNumCount:Number // 推送号码数量
                sendSMSCount：Number // Number
                successNum：Number //成功数
                unknownNum：Number //未知数
                failNum：Number //失败数
                
                //!warn 明细记录页面点击 点击查看 按钮可查看内容
                //需要直接返回下面的内容还是另写api进行操作 需沟通
                content:{
                 // 对应的内容
                	title：String // 标题
                	msgContent:String // 内容
            	}
        	}，
            .... 
            // 索引0-4 分别代表 
            //今日推送 昨日推送 一周推送 月推送 累计推送
        ]
    }
```



# 平台消息

平台消息

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        
    }
后端返回信息:
    @result:{
        record:[
            {
                id：String //平台消息id
                title:String //标题
                content:String //内容
                isRead:Boolean //是否已读
                date:String //日期
        	}，
          	...
        ]
    }
```



# 自动营销

#### ！warn 此处应该是推送用户已认证的企业的产品 还是未认证也可以推送？估计是企业层级的操作 需要再次了解沟通确认

### 若是企业层级的操作 那么是否会设计权限的限制 比如是否只有管理层成员才能进行自动营销的操作？ 这里的接口需要再次确认

查看用户已设置了的自动营销列表



# 企业采购

查看设置了的 我的采购 里面采购信息

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        
    }
后端返回信息:
    @result:{
        record:[
            {
                id：String //我的采购id
                title:String //标题
                content:String //内容
                keys:Array // 关键词
                tradeId:String // 发送的行业 有固定的行业选择
                //！warn 需要考虑这里是否需要让用户自行添加自定义的行业
                province:String //发送的省份
                beginTime:String //发布日期
                endTime:String // 截止日期
                img:String // 上传了的图片的路径
                file：Object || Array // 这里的附件的数量是否限定是只有一个还是可以有很多个？
                
        	}，
          	...
        ]
    }
```

### 发布采购

```javascript
前端=>后端 请求方式 POST

前端代码如下
var formData = new FormData();
//数字会被立即转换成字符串
formData.append("userId", String); // 发布采招时的用户ID
formData.append("title", String); // 采招标题
formData.append("content", String); // 采招内容
formData.append("keys", Array?); // 采招关键词
formData.append("tradeId", Number); // 行业ID 
formData.append("provinceId", Number); // 省份ID
shformData.append("beginTime", String); // 发布日期
formData.append("endTime", String); // 截止日期
formData.append("img", fileInputElement.files[0]);); //图片 
formData.append("file", fileInputElement.files[1]);); // 附件


请求头设为

前端发送请求：
    @params:{
        data：formData
    }
后端返回信息:
    @result:{
		result:Boolean
    }
```



# 链圈

链圈



# 协同

### ！warn 注意权限管理 分为管理员权限和普通用户权限

### 管理员方:

邀请同事加入

```JavaScript

```



# 主营

### 主营

用户设置自己企业的产品/服务内容 多条记录 认证企业的微信用户可修改 其余未有权限只能查看

该接口是查询企业产品/服务内容的接口

```JavaScript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        companyId:String //判断当前公司是否该用户认证企业的公司
        
    }
后端返回信息:
    @result:{
        isAccess:Boolean //该用户是否拥有修改权限
        record:[
            {
                id：String //公司主营产品 服务列表记录ID
                name:String // 产品 服务名称
        	}，
          	...
        ]
    }
```

该接口是修改公司主营产品 服务列表的接口

```javascript
前端=>后端 请求方式 GET
API地址
前端发送请求：
    @params:{
        userId:String //用户ID
        companyId:String //被修改公司主营产品 服务列表的公司ID
    }
后端返回信息:
    @result:{
        result:Boolean //修改是否成功
    }
```



# 设置

### 企业资料设置

### 推送模板

### 企业联系信息

### 主营面向行业和区域 已完成

### 需求配套设置 已完成



