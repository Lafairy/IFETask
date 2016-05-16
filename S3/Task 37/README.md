# Popuper - 简单的浮出层提示框插件



演示地址：
[Demo](http://geeku.work/ife/S3/Task%2037/)


## Usage

#### HTML结构：
```html
    <div class="popuper">
        <div class="pop-wrap">
            <header class="pop-header">
                <h3>这是一个弹出层</h3>
            </header>
            <section class="pop-content">
                这是一个弹出层
            </section>
            <section class="pop-control">
                <input type="button" class="confirm" value="确定">
                <input type="button" class="cancel" value="取消">
            </section>
        </div>
    </div>
```
其中popuper以及pop-wrap是必须的，pop-header，pop-content以及两个按钮是可选的，如果没有添加则会缺失部分功能


#### 新建一个Popuper对象
```javascript
    var pop = Popuper({
    
        wrap: cover, //提示框元素 例如 var cover = document.querySelector('.popuper');
        type: 'error', //提示框类型，info[默认] error success warning
        confirm: function() {//确认按钮回调
            alert('success'); 
        },
        cancel: function() { //取消按钮回调
            alert('cancel');
        }
    });
```

#### Popuper的一些方法,支持链式调用
```javascript
pop
    .show() //显示
    .hide() //隐藏
    .toggle() //显示或隐藏
    .edit({
        title: 'custom title', //编辑标题
        content: 'cutom content<h1>3243</h1>' //编辑内容，支持html
    });
```