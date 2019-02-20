/**
 * 1)一个简单的promise的实现，
 * 2)支持异步
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
    switch (this._status) {
      case 'PENDING':
        console.log(success, fail)
        this._onSuccess.push(success)
        this._onFail.push(fail)
        break
      // case 'RESOLVED':
      //   console.log('====RESOLVED')
      //   break
      // case 'REJECTED':
      //   console.log('xxxxxxxxx===REJECTED')
      //   break
    }
  }
}

const pro = new SimplePromise(function (res, rej) {
  let random = Math.random() * 10
  setTimeout(function () {
    if (random > 5) {
      res('aaa')
    } else {
      rej('bbb')
    }
  }, 2000)


  

})


pro.then(function (data) {
  console.log(data)
}, function (err) {
  console.log(err);
})
