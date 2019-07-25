<template>
  <div class="page">
    testetstertstete
    <button id="getToken">取token</button>
    <button id="payTest"> pay test</button>
  </div>
</template>

<script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
      
    // var vConsole = new VConsole();
    let getToken = document.getElementById('getToken')
    let payTest = document.getElementById('payTest')
    
    // let url = window.location.href
    // let token = url.split('?')[1].split('=')[1]
    // console.log('token====', url);


    function getUrlParam(paramName){
        let paramValue = "", isFound = !1; 
        if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) { 
            let arrSource = unescape(location.search).substring(1, location.search.length).split("&"), i = 0; 
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
        } 
        return paramValue == "" && (paramValue = null), paramValue 
    }

    // let token = getUrlParam('token');
    // console.log(token)
    // alert(token);


    let info = {}

    getToken.addEventListener('click', ()=>{
    //   console.log('==abc==html==token====',token);
    //   alert(token);

      this.$axios.get("http://192.168.31.73:8000/pay").then(res => {
      // axios.get("http://117.48.207.24:8000/pay/").then(res => {
        console.log(res);
        info = {
          appId: res.data.pay_info.appId,
          timeStamp: res.data.pay_info.timeStamp + '',
          nonceStr: res.data.pay_info.nonceStr,
          package: res.data.pay_info.package,
          signType: res.data.sign,
          paySign: res.data.sign_type
        };

        WeixinJSBridge.invoke('getBrandWCPayRequest', info, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            alert("支付成功");
            window.location.href = '/App/Member/MyOrder';
          }
          else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert("您已取消支付");
            window.location.href = '/App/Member/MyOrder';
          }
          else if (res.err_msg == "get_brand_wcpay_request:fail") {

            alert("支付失败，请稍后再试");
          }
          else {
            alert(JSON.stringify(res));
          }
        });
        
        console.log(info);
        
      });
    })
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
