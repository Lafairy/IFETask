# easyTable - 简单的表格插件



演示地址：
[Demo](http://geeku.work/ife/S3/Task%2038/)


## Usage

#### HTML结构：
```html
    <table class="et"></table>
```

#### 新建一个easyTable对象，并对指定项排序
```javascript
    var data = {
        header : ['表头1','表头2','表头3','表头4','表头5'],  //表头项
        sortable : [0,1,1,0,1], //可排序的列
        content: [  //表格数据
            ['A',3,5,6,7],
            ['B',2,6,8,77],
            ['C',35,6,6,88]
        ]
    };
    
    var et = easyTable({
        table: document.querySelector('table'), //表格元素
        data: data, //数据
        sticky: true //是否固定表头
    }).order({
        index: 1, //排序序号
        order: 'desc' //排序方式 desc asc
    });
   
```
