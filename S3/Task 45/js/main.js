(function(window, document){

    function xiuPhoto(param) {
        return new xiuPhoto.prototype.init(param);
    }

    xiuPhoto.prototype = {

        constructor: xiuPhoto,
        minImgCount: 3,
        maxImgCount: 6,
        imgCounter: 0,

        init: function(param) {

            var self = this;

            self.minHeight = 300;
            self.scope = 50;

            self.wrap = $(param.wrap);
            self.width = self.wrap.offsetWidth;
            self.wrap.className += ' xiuPhoto';
            self.imgList = Array.prototype.slice.call($$('img', self.wrap));
            self.padding = param.padding ? param.padding.replace('px', '') : 0;

            //弹出层初始化
            self.imgPop = $('#xiuPhoto-pop') || null;
            if(!self.imgPop) {
                document.body.appendChild(create({id: "xiuPhoto-pop"}));
                //self.wrap.innerHTML += '<div id="wowPhoto-pop"></div>'; 会导致self.wrap指向不正确
                self.imgPop = $('#xiuPhoto-pop');
            }

            //弹出层点击黑色区域隐藏
            self.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'xiuPhoto-pop') {
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

            self.createCol(self.imgList);

        },

        createCol: function(imgList) {

            var self = this,
                tempList = [],
                i, j, k = 0, widthSum, rowCount = 0, rowImgCounter = 0, prevImg;

            if(imgList.type && imgList.type.toLowerCase() === 'json') {

                var data = imgList.data;
                for (var key in data) {

                    var img = create({
                        tag: 'img',
                        attr: {
                            src: data[key].src,
                            width: data[key].width,
                            height: data[key].height
                        }
                    });

                    if(data[key].content) {
                        img.dataset.content = data[key].content;
                    }
                    if(data[key].title) {
                        img.dataset.title = data[key].title;
                    }

                    tempList.push(img);
                }

                imgList = tempList;
            }

            var notFull = $('.not-full', self.wrap);
            if(notFull) {
                prevImg = Array.prototype.slice.call($$('img', notFull));
                prevImg.reverse().forEach(function(item) {
                    imgList.unshift(item);
                });
                notFull.remove();
            }

            for(; k < imgList.length; k = i + 1) {

                widthSum = 0;
                rowImgCounter = 0;

                for (i = k; i < imgList.length; i++) {

                    rowImgCounter++;

                    //如果图片超过6个则退出循环
                    if(rowImgCounter > self.maxImgCount) {
                        break;
                    }

                    //先按最小高度叠加
                    widthSum += (self.minHeight / imgList[i].height) * imgList[i].width;

                    //如果缩放后的宽度加起来超过了宽度 - 范围则退出循环
                    if(widthSum >= (self.width - self.scope)) {

                        //如果图片数量少于3个则继续添加
                        if(rowImgCounter < self.minImgCount) {
                            continue;
                        }

                        break;
                    }
                }

                //计算宽度缩放到容器宽度时的缩放比例，并计算此时的实际高度
                var ratio = widthSum / self.width,
                    height = self.minHeight / ratio,
                    imgRow = create({
                        tag: 'ul',
                        className: 'img-row',
                        id: 'xiuPhoto-row-' + rowCount++,
                        style: {
                            'height': height + 'px'
                        }
                    });

                if((imgList.length - k) < 3) {
                    imgRow.style.height = self.minHeight + 'px';
                    imgRow.className += ' not-full';
                }
                self.wrap.appendChild(imgRow);

                for(j = k; j <= i; j++) {

                    //图片按比例缩放
                    if(!imgList[j]) {
                        return;
                    }

                    //获取title和content
                    var contentArea = self._getContent(imgList[j]),
                        oHeight = imgList[j].height,
                        oWidth = imgList[j].width,
                        imgRatio = height / oHeight,
                        item = create({
                            tag: 'li',
                            className: 'img-item ',
                            id: 'xiuPhoto-item-' + self.imgCounter++,
                            style: {
                                'width': oWidth * imgRatio + 'px',
                                'padding': self.padding / 2 + 'px'
                            }
                        }),
                        header = create({
                            tag: 'header',
                            className: 'item-header ' + contentArea.className,
                        });


                    var headerHTML = "<h3>{0}</h3><p>{1}</p>";
                    header.innerHTML = headerHTML.replacer([contentArea.title, contentArea.content]);

                    if((imgList.length - k) < 3) {
                        item.style.width = (self.minHeight / oHeight) * oWidth + 'px';
                    }

                    item.appendChild(imgList[j]);
                    item.appendChild(header);
                    imgRow.appendChild(item);
                }
            }

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

                        self.createCol(retData);
                    }
                }
            };

            return this;
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
        }
    };

    xiuPhoto.prototype.init.prototype = xiuPhoto.prototype;
    window.xiuPhoto = xiuPhoto;

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

})(window, document);