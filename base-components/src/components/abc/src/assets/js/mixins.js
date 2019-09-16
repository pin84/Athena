

export let commonFnMixin = {

    methods: {

        getCompanyInfo() {
            return this.$axios.get(this.$api.companyInfo, {
                params: {
                    token: this.$store.state.loginInfo.userInfo.token
                }
            })
                .then(res => res.data)
                .then(rej => rej)
        },

        // 判断是否含有认证企业
        async identityAuth(identityFn, noCertified = () => { }, isShowToast = true) {
            //基于老接口 getCompanyInfo 的验证，现在修改为用全局变量 authComInfo 判断
            let indexInfo = await this.getCompanyInfo()

            let userInfo = this.$store.state.loginInfo.userInfo

            let user = await this.$commonFn.isJoinCooperation(this.$api.getUserAuth, userInfo.token, userInfo.user_id)

            console.log(`==identity_status || user=====`, identity_status, user);

            let { identity_status } = indexInfo
            if (identity_status || user) {
                
                console.log(identity_status, 'ok')
                identityFn()
            } else {
                if (isShowToast) {
                    this.$toast({
                        message: '您还未有认证企业，请认证后再发送'
                    })
                }
                noCertified()
            }
        },

        businessScope(scope) {
            return this.$commonFn.businessScope(scope);
        },

        // 微信签名
        wxSign(to) {
            return new Promise(async (res)=>{
            
                let url = location.href;
                let queryString = this.$qs.stringify(to.query);
                url =
                url.split("#")[0] +
                "#" +
                to.path +
                (queryString ? `?${queryString}` : "");
        
                let core = this.$commonFn.coreJudge();
                if (core == "ios") {
                    url = this.getFirstUrl();
                    this.$store.commit("loadFirstUrl", url);
                // url = 'http://www.shangxialian.net/js/'
                }
        
                let { data } = await this.$axios.get(this.$api.wxConfig, {
                    params: {
                        // url:'http://www.shangxialian.net/js/?#/'
                        url
                    }
                });
                
                let { appId, timestamp, nonceStr, signature } = data;
                
                wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp, // 必填，生成签名的时间戳
                nonceStr, // 必填，生成签名的随机串
                signature, // 必填，签名，见附录1
                jsApiList: [
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "onMenuShareAppMessage",
                    "onMenuShareTimeline",
                ]
                });
                res('ok');
                
            })
        },

        getFirstUrl() {
            let loadFirstUrl = this.$store.state.loginInfo.loadFirstUrl;
            return loadFirstUrl;
            // return sessionStorage.getItem('sxlFirstLink')
        },

    },

}

