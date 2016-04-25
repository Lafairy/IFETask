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
                    var oHeight = imgList[j].height,
                        oWidth = imgList[j].width,
                        imgRatio = height / oHeight,
                        item = create({
                            tag: 'li',
                            className: 'img-item',
                            id: 'xiuPhoto-item-' + self.imgCounter++,
                            style: {
                                'width': oWidth * imgRatio + 'px',
                                'padding': self.padding / 2 + 'px'
                            }
                        });

                    if((imgList.length - k) < 3) {
                        item.style.width = (self.minHeight / oHeight) * oWidth + 'px';
                    }

                    item.appendChild(imgList[j]);
                    imgRow.appendChild(item);
                }
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