var myModule = {};
var moduleName = "common function";
var version = "1.0.0";
import store from './store'
import axios from 'axios'
//本地存储/删除存储
myModule = {

  handleStroage: {
    setLocalStorage: function (key, value) {
      value = JSON.stringify(value);
      localStorage.setItem(key, value);

    },
    getLocalStorage: function (key) {
      if (localStorage.getItem(key) == null) return null;
      var value = localStorage.getItem(key);
      return JSON.parse(value);

    },
    removeLocalStorage: function (key) {
      if (localStorage.getItem(key) == null) return;
      localStorage.removeItem(key)
    },

  },

  // 将后端返回的时间时间戳以纯数字的方式提取出来
  timeReg(timestamp) {
    let timeReg = /\d+/g;
    if (timeReg.exec(timestamp).length >= 1) {
      let time = timeReg.exec(timestamp)[0];
      return +time; //将字符串转为数字Number类型
    } else {
      return 0;
    }

  },
  // 时间戳转换为标准时间
  timeTrans(getDate) {
    let date = new Date(getDate);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D;
    // +h+m+s;
  },

  StrDateFormat(strDate, dataForm, accuracyTime = true) {
    if ([undefined, null, false, '',].includes(strDate)) {
      return
    }
    let strDateAry = strDate.split('T');
    let date = strDateAry[0];
    date = myModule.formatTime(new Date(date), dataForm);
    try {
      var hmsDate = strDateAry[1].slice(0, 8)
    } catch (e) {
      console.log(e)
    }
    if (accuracyTime) {
      return date + ' ' + hmsDate
    } else {
      return date
    }
  },

  formatTime(date, dataForm) {
    if (typeof date == 'string') {
      date = new Date(date);
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    };
    switch (dataForm) {
      case 0:
        return [year, month, day].map(formatNumber).join('/');
        break;
      case 1:
        return `${year}年${month}月${day}日`;
        break;
      case 2:
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        break;
      case 3:
        return `${year}年${month}月${day}日 ${[hour, minute, second].map(formatNumber).join(':')}`;
        break;
      case 4:
        return [year, month, day].map(formatNumber).join('-');
        break;
      default:
        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        break;
    }
  },

  // 该方法用于将得到的弹窗头部公司信息转换格式
  // 依赖于公共方法的 timeReg 和 timeTrans
  comHeadTrans(res) {

    let company = res.data.Result.rows.ListInfo[0];
    // company.CreationTime
    let timesNum = this.$commonFn.timeReg(company.CreationTime)
    if (company && timesNum != 0) {
      company.CreationTime = this.$commonFn.timeTrans(timesNum);
      this.company = company;
      this.$set(this, 'company', company);

      return company;

    }
    return null;
  },

  // 接收数组 且数组内所有元素为对象 按照各元素对象的对应属性值降序排序
  dataDesSort(arr, eleProp) {
    // eleProp: 需要对应排序的属性值
    // arr: 需排序的数组

    // 其实不return取值也可以 因为此方法会影响arr本身
    return Array.prototype.sort.call(arr, sortDesRule(eleProp));

    // 规则定义函数: 降序
    function sortDesRule(objProp) {
      return function (a, b) {
        let data1 = a[objProp];
        let data2 = b[objProp];
        return +data2 - +data1;
      }
    }

  },

  selfSort(arr, eleProp, eleDel = (ele) => ele, eleCompare = (data1, data2) => { return +data2 - +data1 }) {
    // eleProp: 需要对应排序的属性值
    // arr: 需排序的数组

    // 其实不return取值也可以 因为此方法会影响arr本身
    return Array.prototype.sort.call(arr, sortDesRule(eleProp));

    // 规则定义函数: 降序
    function sortDesRule(objProp) {
      return function (a, b) {
        let data1 = eleDel(a[objProp]);
        let data2 = eleDel(b[objProp]);
        return eleCompare(data1, data2);
      }
    }

  },


  // 检查电话号码是否符合规则
  checkMobile(sMobile) {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(sMobile))) {
      //   alert("不是完整的11位手机号或者正确的手机号前七位"); 
      return false;
    }
    return true;
  },
  floatObj: (function () {

    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
      return Math.floor(obj) === obj
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
      var ret = { times: 1, num: 0 };
      if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret
      }
      var strfi = floatNum + '';
      var dotPos = strfi.indexOf('.');
      var len = strfi.substr(dotPos + 1).length;
      var times = Math.pow(10, len);
      var intNum = parseInt(floatNum * times + 0.5, 10);
      ret.times = times;
      ret.num = intNum;
      return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
      var o1 = toInteger(a);
      var o2 = toInteger(b);
      var n1 = o1.num;
      var n2 = o2.num;
      var t1 = o1.times;
      var t2 = o2.times;
      var max = t1 > t2 ? t1 : t2;
      var result = null;
      switch (op) {
        case 'add':
          if (t1 === t2) { // 两个小数位数相同
            result = n1 + n2
          } else if (t1 > t2) { // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2)
          } else { // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2
          }
          return result / max;
        case 'subtract':
          if (t1 === t2) {
            result = n1 - n2
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2)
          } else {
            result = n1 * (t2 / t1) - n2
          }
          return result / max;
        case 'multiply':
          result = (n1 * n2) / (t1 * t2);
          return result;
        case 'divide':
          result = (n1 / n2) * (t2 / t1);
          return result
      }
    }

    // 加减乘除的四个接口
    function add(a, b) {
      return operation(a, b, 'add')
    }

    function subtract(a, b) {
      return operation(a, b, 'subtract')
    }

    function multiply(a, b) {
      return operation(a, b, 'multiply')
    }

    function divide(a, b) {
      return operation(a, b, 'divide')
    }
    function iToFixed(num, fractionDigits) {
      // 浮点数 保留位数
      return (Math.round(num * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits) + Math.pow(10, -(fractionDigits + 1))).toString().slice(0, -1)
    }
    // exports
    return {
      add: add,
      subtract: subtract,
      multiply: multiply,
      divide: divide,
      iToFixed,
    }
  })(),

  // 除法函数
  // accDiv(arg1,arg2){
  //     var t1=0,t2=0,r1,r2;
  //     try{t1=arg1.toString().split(".")[1].length}catch(e){}
  //     try{t2=arg2.toString().split(".")[1].length}catch(e){}
  //     with(Math){
  //         r1=Number(arg1.toString().replace(".",""))
  //         r2=Number(arg2.toString().replace(".",""))
  //         return (r1/r2)*pow(10,t2-t1);
  //     }
  // }

  // 去掉#
  directRightUrl() {
    let paths = window.location.href.split('#')
    paths[1] = paths[1] || '/'
    // 老式的#!分隔跳转
    if (paths[0].charAt(paths[0].length - 1) !== '?') {
      paths[0] = `${paths[0]}?`
    }
    if (paths[1].charAt(0) === '!') {
      paths[1] = paths[1].substr(1)
    }
    let url = `${paths[0]}#${paths[1]}`
    if (window.location.href !== url) {
      window.location.href = url
    }
  },

  // 用于添加路径记录
  addEndUrlArr() {
    let endUrlArr = JSON.parse(sessionStorage.getItem('endUrl'))
    if (!endUrlArr) {
      endUrlArr = [];
    }
    // endUrlArr.push(toPath);

    sessionStorage.setItem('endUrl', JSON.stringify(endUrlArr))
  },

  // 用于获取url上的参数 假如有参数则返回 没有则返回null
  getUrlParam(paramName) {
    let paramValue = "", isFound = !1;
    if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
      let arrSource = unescape(location.search).substring(1, location.search.length).split("&"), i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  },

  isObj(obj) {
    return obj instanceof Object;
  },

  // 对象深克隆
  deepCloneObj(fromObj, toObj) {
    for (var key in fromObj) {
      if (fromObj.hasOwnProperty(key)) {
        var fromValue = fromObj[key];
        // 如果是值类型，那么就直接拷贝赋值
        if (!myModule.isObj(fromValue)) {
          toObj[key] = fromValue;
        } else {
          // 如果是引用类型，那么就再调用一次这个方法，
          // 去内部拷贝这个对象的所有属性
          // fromValue是什么类型, 创建一个该类型的空对象
          var tmpObj = new fromValue.constructor;

          myModule.deepCloneObj(fromValue, tmpObj);
          toObj[key] = tmpObj;
        }
      }
    }
  },

  // 遍历Obj对象
  forEachObj(Obj, eachFn, deepClone = false) {
    // ↑遍历对象   ↑遍历运行时函数 ↑是否返回深克隆对象
    if (typeof Obj !== 'object') { throw new Error('the first param must be an Object!'); return; }
    if (typeof eachFn !== 'function') { throw new Error('the second param must be an function!'); return; }

    let ObjEach = Obj;
    if (deepClone) {
      myModule.deepCloneObj(Obj, ObjEach)
    }
    for (let objKey in ObjEach) {
      if (!Obj.hasOwnProperty(objKey)) continue;
      eachFn(objKey, Obj[objKey]);
    }
    return ObjEach;

  },



  provinceNameTrans(provinceName) {
    let paramProvince = provinceName.substr(0, 2);
    if ((['内蒙古', '黑龙江'].find((ele) => provinceName.indexOf(ele) !== -1)) !== undefined) {
      return provinceName.substr(0, 3);
    }
    return paramProvince;
  },

  // 安卓 ios 内核判断
  coreJudge() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      console.log("android");
      return 'android'
    } else if (isIOS) {
      console.log("ios");
      return 'ios'
    }

    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      console.log("微信");
      return 'computer'
    } else {
      console.log("非微信");
      return 'computer'
    }
  },

  os(){
      var ua = navigator.userAgent, 
      isWindowsPhone = /(?:Windows Phone)/.test(ua), 
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
      isAndroid = /(?:Android)/.test(ua), 
      isFireFox = /(?:Firefox)/.test(ua), 
      isChrome = /(?:Chrome|CriOS)/.test(ua), 
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)), 
      isPhone = /(?:iPhone)/.test(ua) && !isTablet, 
      isPc = !isPhone && !isAndroid && !isSymbian; 

      // if (isAndroid || isPhone) { 
      // alert("手机" ); 
      
      // } else if (isTablet) { 
      // alert("平板" ); 
      // } else if (isPc) { 
      // alert("电脑" ); 
      // }
      return { 
        isTablet: isTablet, 
        isPhone: isPhone, 
        isAndroid: isAndroid, 
        isPc: isPc
      };
  },

  // 标签转换
  businessScope(scope) {
    if (Array.isArray(scope)) { return scope }
    if (typeof scope == "string" && scope.length > 0 && scope !== "\r") {
      let checkArr = ['\r', ' '];
      if (scope.indexOf('|') == -1) {
        if (checkArr.find(checkItem => scope.indexOf(checkItem) !== -1) !== undefined) {
          return [];
        } else {
          return [scope]
        }
      }
      let spliteStrArray = scope.split("|");
      let setSpliteStrArray = new Set(spliteStrArray);
      setSpliteStrArray.forEach((ele, index, arr) => {
        checkArr.forEach(checkItem => {
          if (ele == checkItem) {
            setSpliteStrArray.delete(ele)
          }
        })
      })
      return Array.from(setSpliteStrArray);
    } else {
      return [];
    }
  },

  //第一次到访
  async isFirstVisit(url, urlName) {
    let token = store.state.loginInfo.userInfo.token;
    // let url_name = this.$route.meta.remark;
    let data = {
      token,
      url_name: urlName
    };

    let res = await axios.get(url, {
      params: data
    });

    if (res.data === 0) {
      return true;
    } else {
      return false;
    }
  },

  findArrItem(arr,propStr,hrefVal){
    // let propArr = propStr.split('.');
    
    let itemIndex = arr.findIndex(ele=>{
      let eleVal = myModule.getPropStrVal(ele,propStr);
      return eleVal === hrefVal
    });
    if(itemIndex !== -1){
      return itemIndex;
    }else{
      return undefined;
    }
  },

  getPropStrVal(Obj,propStr){
    let propArr = propStr.split('.');
    let val = Obj;
    propArr.find(propItem=>{
      try{
        val = val[propItem]
        return false;
      }catch(e){
        val = undefined;
        return true;
      }
    });

    return val;
  },

  async isCertifiedCom() {
    //页面初始化时拿到用户中心的数据（推荐、访问、已消费）
    let res = await axios.get(api.userCenterInfo, {
      params: {
        token: userInfo.token
      }
    });

    //未认证的状态检查是否有加入企业协同
    if (
      res.data.pay_status === 0 &&
      (res.data.status === 0 || res.data.status === 1)
    ) {
      let userInfo = {
        token: this.userInfo.token,
        user_id: this.userInfo.user_id
      };

      let res = await commonFN.isJoinCooperation(
        this.$api.getUserAuth,
        userInfo
      );
      if (res) {
        this.num = 2; //认证状态
        this.companyName = res.company_name;
      }
    } else {
      this.pay_status = res.data.pay_status;
      this.status = res.data.status;

      this.handleStatus(res);
    }
  },




  //是否加入了协同,
  async isJoinCooperation(url, token, user_id) {
    let d = {
      token,
      user_id
    };

    let { data } = await axios.get(url, {
      params: d
    });


    if (data.message === false) {
      return false
    } else {

      let user = data.message.find((item) => {
        return item.user_id === user_id;
      });

      let companyInfo = data.company_info

      return { user, companyInfo }
    }
  },



}


myModule.moduleName = moduleName;
myModule.version = version;

export default myModule;
