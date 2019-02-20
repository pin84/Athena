/**
 * 一个简单的promise的实现，还没有实现then的逻辑
 */

class SimplePromise {
  constructor(handler) {
    this._status = 'PENDING'
    handler(this._resolve.bind(this), this._reject.bind(this))
  }


  _resolve(val) {
    if (this._status === 'PENDING') {
      this._status = 'RESOLVED'
      this._value = val
    }
  }
  _reject(val) {
    if (this._status === 'PENDING') {
      this._status = 'REJECTED'
      this._value = val
    }
  }

  then(success, fail) {
    switch (this._status) {

      case 'PENDING':
        console.log('PENDING');
        break
      case 'RESOLVED':
        console.log('====RESOLVED');
        break
      case 'REJECTED':
        console.log('xxxxxxxxx===REJECTED');
        break
    }
  }
}

const pro = new SimplePromise(function (res, rej) {
  let random = Math.random() * 10
  if (random > 5) {
    res('success')
  } else {
    rej('fail')
  }
})


pro.then(function (data) {

  console.log(data)
}, function (err) {
  console.log(err);
})
