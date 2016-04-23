(function(window, document){

    function xiuPhoto(param) {
        return new xiuPhoto.prototype.init(param);
    }

    xiuPhoto.prototype = {

        constructor: xiuPhoto,
        minImgCount: 3,
        maxImgCount: 6,

        init: function(param) {

            var self = this;

            self.minHeight = 400;
            self.scope = 50;

            self.wrap = $(param.wrap);
            self.width = self.wrap.offsetWidth;
            self.imgList = $$('img', self.wrap);

            self.createCol(self.imgList);

        },

        createCol: function(imgList) {

            var self = this,
                tempList = [],
                i, j, k = 0, widthSum, colCount = 0, imgCounter = 0;

            if(imgList.type && imgList.type.toLowerCase() === 'json') {

                imgList.data.forEach(function(item) {
                    var img = create({
                        tag: 'img',
                        attr: {
                            src: item.src,
                            width: item.width,
                            height: item.height
                        }
                    });

                    if(item.content) {
                        img.dataset.content = item.content;
                    }
                    if(item.title) {
                        img.dataset.title = item.title;
                    }

                    tempList.push(img);
                });

                imgList = tempList;
            }

            for(; k < imgList.length; k = i + 1) {

                widthSum = 0;
                imgCounter = 0;

                for (i = k; i < imgList.length; i++) {

                    imgCounter++;

                    //如果图片超过6个则退出循环
                    if(imgCounter > self.maxImgCount) {
                        break;
                    }

                    //先按最小高度叠加
                    widthSum += (self.minHeight / imgList[i].height) * imgList[i].width;

                    log(widthSum);
                    log(self.width - self.scope);
                    //如果缩放后的宽度加起来超过了宽度 - 范围则退出循环
                    if(widthSum >= (self.width - self.scope)) {

                        //如果图片数量少于3个则继续添加
                        if(imgCounter < self.minImgCount) {
                            continue;
                        }

                        break;
                    }
                }

                for(j=k; j<=i; j++) {

                    //计算宽度缩放到容器宽度时的缩放比例，并计算此时的实际高度
                    var ratio = widthSum / self.width,
                        height = self.minHeight / ratio;

                    //图片按比例缩放
                    var oHeight = imgList[j].height,
                        oWidth = imgList[j].width,
                        imgRatio = height / oHeight;

                    imgList[j].style.height = height + 'px';
                    imgList[j].style.width = oWidth * imgRatio + 'px';

                    log(imgList[j]);
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
                        for (var key in retData) {
                            self.add(retData[key]);
                        }
                    }
                }
            };

            return this;
        },
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