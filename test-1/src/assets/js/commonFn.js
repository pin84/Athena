var myModule = {}; 
var moduleName = "common function";
var version = "1.0.0";
//本地存储/删除存储
myModule={

    handleStroage :{
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

    timeReg(timestamp){
        let timeReg = /\d+/g;
        let time = timeReg.exec(timestamp)[0];
        return {
            then(success){
                success(time)
            }
        }
        // time;
    },

    timeTrans(getDate){
        let date = new Date(getDate);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D;
        // +h+m+s;
    },

    
}


myModule.moduleName = moduleName;
myModule.version = version;

export default myModule;
