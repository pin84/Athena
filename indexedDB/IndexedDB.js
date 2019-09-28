import { Toast } from 'mint-ui'
var indexedDB

if (!indexedDB) {
 var request = window.indexedDB.open("MyTestDatabase",2);
}

request.onerror = function (event) {
  // Do something with request.errorCode!
  Toast(event)
};
request.onsuccess = function (event) {
  // Do something with request.result!
  indexedDB = event.target.result
  console.log(`=======`,indexedDB);
  debugger
  Toast(event)
};

const IDB = {

  save: (name, keyPath, data) => {

    let objectStore = indexedDB.createObjectStore(name, { keyPath })
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.transaction.oncomplete = function (event) {
      // 将数据保存到新创建的对象仓库
      var customerObjectStore = db.transaction(name, "readwrite").objectStore(name);
      data.forEach(function (customer) {
        customerObjectStore.add(customer);
      });
    };

  }

}




export { IDB }