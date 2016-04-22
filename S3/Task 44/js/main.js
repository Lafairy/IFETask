(function(window, document) {

    function wowPhoto(param) {
        return new wowPhoto.prototype.init(param);
    }

    wowPhoto.prototype = {

        constructor: wowPhoto,
        wrapWidth: 0,
        col: 3,
        width: 0,
        margin: 16,
        imgPop: null,
        colHeight: [],
        currentIndex: 0,

        init: function(param) {

            var self = this,
                i = 0;

            self.wrap = $(param.wrap);
            self.wrapWidth = self.wrap.offsetWidth;
            self.col = param.col || 3;
            self.wrap.className += ' wowPhoto' + ' col-' + self.col;
            self.width = Math.floor(self.wrapWidth / self.col);

            //判断margin是否包含px
            if(param.margin) {
                self.margin = param.margin.indexOf('px') >= 0 ? parseInt(param.margin, 10) : param.margin;
            }

            //初始化各列高度并添加列div
            self.wrap.innerHTML = '';
            for(i = 0; i < self.col; i++) {
                self.colHeight[i] = 0;
                self.wrap.innerHTML += '<ul class="col-item"></ul>';
            }

            //弹出层初始化
            self.imgPop = $('#wowPhoto-pop') || null;
            if(!self.imgPop) {
                document.body.appendChild(create({id: "wowPhoto-pop"}));
                //self.wrap.innerHTML += '<div id="wowPhoto-pop"></div>'; 会导致self.wrap指向不正确
                self.imgPop = $('#wowPhoto-pop');
            }

            //弹出层点击黑色区域隐藏
            self.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'wowPhoto-pop') {
                    self.imgPop.className = self.imgPop.className.replace('show', '');
                }
            });

            $(param.wrap).addEventListener('click', function(event) {

                event = event || window.event;
                var target = event.target;

                //弹出大图
                if (target.tagName.toLowerCase() === 'img') {
                    self.pop({src: target.src});
                }
            });

            self.layout();

            return this;
        },

        layout: function() {

            var self = this,
                itemList = Array.prototype.slice.call($$('div,img', self.wrap));

            if(itemList.length > 0) {
                itemList.forEach(function(item) {
                    self.add(item);
                });
            }
        },

        add: function(item) {

            var self = this,
                colList,
                id = 'wow-item-' + self.currentIndex++,
                imgAreaStyle,
                imgStyle ,
                imgSrc,
                contentArea,
                itemClass,
                title,
                content,

                coverStyle = 'padding-left: ' + self.margin / 2 + 'px;' +
                             'padding-right: ' + self.margin / 2 + 'px;' +
                             'margin-bottom: ' + self.margin + 'px;',

                //完整的带插入元素的HTML
                fullFormat = '' +
                    '<li id="{0}" class="cover" style="{1}">' +
                        '<article class="item {2}">' +
                            '<div class="img-area" style="{3}">' +
                                '<img src="{4}" style="{5}">' +
                            '</div>' +
                            '<section class="content-area">' +
                                '<h3>{6}</h3>' +
                                '<p>{7}</p>' +
                            '</section>' +
                        '</article>' +
                    '</li>';

            //计算高度
            var itemWidth = parseInt(item.width || (item.style && item.style.width), 10),
                itemHeight = parseInt(item.height || (item.style && item.style.height), 10),
                calHeight = ((self.width - self.margin) / itemWidth) * itemHeight + self.margin;

            if(!item.nodeType) {

                //通过传入JSON插入元素
                switch (item.type) {

                    case 'img':

                        imgSrc = item.src;

                        imgAreaStyle = 'height: ' + calHeight + 'px; ' +
                                       'background-image: url(' + imgSrc + ');';

                        imgStyle = 'width:' + item.width + 'px; ' +
                                   'height:' + item.height + 'px';

                        //获取title和content
                        contentArea = self._getContent(item);
                        itemClass = contentArea.className;
                        title = contentArea.title;
                        content = contentArea.content;

                        break;

                    case 'html': break; //Todo

                    default: break;
                }

            } else {

                //判断元素是否为img
                if (item.tagName.toLowerCase() === 'img') {

                    imgSrc = item.src;

                    imgAreaStyle = 'height: ' + calHeight + 'px; ' +
                        'background-image: url(' + imgSrc + ');';

                    imgStyle = 'width:' + item.style.width + 'px; ' +
                        'height:' + item.style.height + 'px';

                    contentArea = self._getContent(item);
                    itemClass = contentArea.className;
                    title = contentArea.title;
                    content = contentArea.content;

                } else {
                   //Todo
                }
            }

            //替换字符串内指定位置的内容
            var html = fullFormat.replacer([
                id, coverStyle, itemClass,
                imgAreaStyle, imgSrc, imgStyle,
                title, content
            ]);

            //获取瀑布流中最短的一列
            var minKey = self.colHeight.min().index;
            self.colHeight[minKey] += parseInt(calHeight || 0, 10);

            //插入元素
            colList = $$('.col-item');
            colList[minKey].innerHTML += html;
        },

        pop: function (param) {

            var src,
                self = this,
                html = '<img src="{0}">';

            //判断传递过来的是图片src还是索引值
            src = param.src ? param.src : self.imgList[param].src;

            self.imgPop.innerHTML = html.replacer([src]);

            self.imgPop.className += ' show';

            return this;
        },

        load: function(url, dealWith) {

            var self = this;

            self.wrap.appendChild(create({className: 'loading'}));

            var xhr = new XMLHttpRequest();

            xhr.open('get', url, true);
            xhr.send(null);

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    if(xhr.status == 200) {

                        $('.loading', self.wrap).remove();

                        var retData = dealWith(JSON.parse(xhr.responseText));
                        for (var key in retData) {
                            self.add(retData[key]);
                        }
                    }
                }
            };

            return this;
        },

        _getContent: function(item) {

            var title,
                content,
                className;

            if(item.title) {
                title = item.title
            } else if(item.dataset && item.dataset.title) {
                title = item.dataset.title;
            } else {
                title = '';
            }

            if(item.content) {
                content = item.content
            } else if(item.dataset && item.dataset.content) {
                content = item.dataset.content;
            } else {
                content = '';
            }

            if(!title && !content) {
                className = 'no-title-content';
            } else {
                className = (!title ? 'no-title' : '') + (!content ? 'no-content' : '');
            }

            return {
                title: title,
                content: content,
                className: className
            }
        }
    };

    wowPhoto.prototype.init.prototype = wowPhoto.prototype;
    window.wowPhoto = wowPhoto;

    //生成指定元素
    function create(param) {

        param = param || {};

        var ele = document.createElement(param.tag || 'div'),
            key;

        if(param.id) {
            ele.id = param.id;
        }

        if (param.className) {
            ele.className = param.className;
        }

        if(param.style) {
            for(key in param.style) {
                ele.style[key] = param.style[key];
            }
        }

        if(param.attr) {
            for(key in param.attr) {
                ele.setAttribute(key, param.attr[key]);
            }
        }

        return ele;
    }

    //获取元素
    function $(selector, context) {

        if(context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }

    //获取元素列表
    function $$(selector, context) {

        if(context) {
            return context.querySelectorAll(selector);
        }
        return document.querySelectorAll(selector);
    }


    function log(command) {
        console.log(command);
    }

    String.prototype.replacer = function(arr) {

        var fullStr = this.toString();

        for(var i=0; i<arr.length; i++) {
            fullStr = fullStr.replace('{' + i + '}', arr[i]);
        }

        return fullStr;
    };
    Object.defineProperty(String.prototype, 'replacer', {
        enumerable: false
    });

    Array.prototype.min = function() {

        var minVal = this[0],
            index = 0;
        for (var key in this) {
            if(this[key] < minVal) {
                index = key;
                minVal = this[key];
            }
        }

        return {
            index: index,
            value: minVal
        };
    };

    Object.defineProperty(Array.prototype, 'min', {
        enumerable: false
    });

})(window, document);