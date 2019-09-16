### GetDimensionName  获取维度信息

```JavaScript
method ： get  
params :  {
    pageIndex:'1', //无此参数不影响 有可能写了默认值1
    pageSize:'30', //若失去该参数 返回结果的rows为空 该参数暂且写大 若写小了 有可能出现超过30 不显示30以后的数值
    where:[{
        name:'title',
        value:""
    }]
}

// 获取的数据

{
	"IsResult": true,
	"Result": {
		"total": 14,
		"rows": [{
			"id": 1,
			"name": "基本信息"
		}, {
			"id": 2,
			"name": "股东信息"
		}, {
			"id": 3,
			"name": "主要人员信息"
		}, {
			"id": 4,
			"name": "对外投资"
		}, {
			"id": 5,
			"name": "采购需求"
		}, {
			"id": 6,
			"name": "主营产品"
		}, {
			"id": 7,
			"name": "税务信用"
		}, {
			"id": 8,
			"name": "商标信息"
		}, {
			"id": 9,
			"name": "专利信息"
		}, {
			"id": 10,
			"name": "证书信息"
		}, {
			"id": 11,
			"name": "作品著作权"
		}, {
			"id": 12,
			"name": "软件著作权"
		}, {
			"id": 13,
			"name": "网站信息"
		}, {
			"id": 14,
			"name": "招聘信息"
		}],
		"PageIndex": 1,
		"PageSize": 100
	}
}
```





### GetUpEnterpriseList  获取上链企业信息(注意 这不是原始数据 这是程序处理完毕后的数据)

```javascript
{
    PageIndex: 1
    PageSize: 1
    rows: {
        ID: "daa9326c-e1c1-4df6-b46b-2226134cd91b",
        txtName: "安庆市华盛物资贸易有限责任公司",
        Up: 0: {
            ClassName: {
                ID: "c5c43dac-c44e-e911-8fce-005056c00008"
				Name: "食品"
            }
            Province: {
            			Count: 20
                        ID: 1
                        Name: "北京市"
                        cId: "daa9326c-e1c1-4df6-b46b-2226134cd91b"
                        insId: "c5c43dac-c44e-e911-8fce-005056c00008"
                        offset: 0
                        pId: 1
                        point: "up"
                        segment: 1
                        slice: 1
                        value: 20
                        valueOfTag: "2.94%"
            }
            id: "c5c43dac-c44e-e911-8fce-005056c00008-up"
            index: 1
            name: "食品-up"
            point: "up"
            proTotal: 680
            vx: 0.1093302105233646
            vy: 0.05778767190766271
            x: 1144.1105425333585
            y: 1094.5073422589712
        }
            1: {…}
            2: {…}
            3: {…}
            4: {…}
            5: {…}
            6: {…}
            7: {…}
    }
    total: 13
}
```



![1554273625311](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1554273625311.png)



### GetDownEnterpriseList 获取下链企业信息 （与上方的获取上链企业信息基本一致）



# 













