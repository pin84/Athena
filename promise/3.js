/**
 * 1)一个简单的promise的实现，
 * 2)支持异步
 * 3)链式调用-->需要then返回的也是一个Promise
 */

class SimplePromise {
  constructor(handler) {
    this._status = 'PENDING'
    this._onSuccess = []
    this._onFail = []
    handler(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(val) {
    if (this._status === 'PENDING') {
      this._status = 'RESOLVED'
      let temp
      while (this._onSuccess.length > 0) {
        temp = this._onSuccess.shift()
        temp(val)
      }
    }
  }
  _reject(val) {
    if (this._status === 'PENDING') {
      this._status = 'REJECTED'
      let temp
      while (this._onSuccess.length > 0) {
        temp = this._onSuccess.shift()
        temp(val)
      }
    }
  }

  then(success, fail) {

    return new SimplePromise((nextSuccess, nextFail) => {
      const onFullfil = function (val) {
        const res = success(val)
        nextSuccess(res)
      }

      const onReject = function (val) {
        const res = fail(val)
        nextSuccess(res)
      }

      switch (this._status) {
        case "PENDING":
          this._onSuccess.push(onFullfil)
          this._onFail.push(onReject)
          break;
        // case "RESOLVED":
        //   onFullfil(this._value)
        //   break;

        // case "REJECTED":
        //   onReject(this._value)
        //   break;
      }
    })
  }
}

const sp = new SimplePromise(function (res, rej){
  setTimeout(function(){
    let random = Math.random() * 10
    random > 5 ? res(random) : rej(random)
  }, 1000)
})

sp.then(data => {
  console.log("more than 5 " + data)
  return data
}, err =>{
  console.log("less than 5 " + err)
  return err
}).then((data) => {
  console.log(data)

})
