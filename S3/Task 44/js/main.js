(function(window, document) {

    function wowPhoto(param) {
        return new wowPhoto.prototype.init(param);
    }

    wowPhoto.prototype = {

        constructor: wowPhoto,
        wrap: null,
        wrapWidth: 0,
        col: 3,
        width: 0,
        margin: 16,
        itemList: [],
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

            self.itemList = $$('div,img', this.wrap);
            self.itemList = Array.prototype.slice.call(self.itemList);
            self.wrap.innerHTML = '';

            //初始化各列高度并添加列div
            for(i = 0; i < self.col; i++) {

                self.colHeight[i] = 0;

                var div = create({tag: 'ul', className: 'col-item'});

                self.wrap.appendChild(div);
            }

            //弹出层初始化
            self.imgPop = $('#wowPhoto-pop') || null;
            if(!self.imgPop) {

                self.imgPop = create({id: 'wowPhoto-pop'});
                document.body.appendChild(self.imgPop);
            }

            //弹出层点击黑色区域隐藏
            self.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'wowPhoto-pop') {
                    self.imgPop.className = self.imgPop.className.replace('show', '');
                }
            });

            self.wrap.addEventListener('click', function(event) {

                event = event || window.event;

                var target = event.target;

                //弹出大图
                if (target.tagName.toLowerCase() === 'img') {

                    self.pop({src: target.src});
                }

            });

            self.layout();

            //窗口大小变化
            /*window.addEventListener('resize', function() {

                self.wrapWidth = self.wrap.offsetWidth;
                self.width = Math.floor(self.wrapWidth / self.col);

                self.layout();
            });*/
        },

        layout: function() {

            var self = this;

            this.itemList.forEach(function(item) {

                self.add(item);
            });
        },

        add: function(item) {

            var self = this,
                container,
                cover,
                contentEle,
                newDiv,
                imgArea = create({className: 'img-area'}),
                contentArea = create({tag: 'section', className: 'content-area'}),
                id = 'wow-item-' + self.currentIndex++,
                colList = $$('.col-item', self.wrap);


            cover = create({
                tag: 'li',
                id: id,
                className: 'cover',
                style: {
                    'paddingLeft': self.margin / 2 + 'px',
                    'paddingRight': self.margin / 2 + 'px',
                    'marginBottom': self.margin + 'px'
                }
            });
            container = create({tag: 'article', className: 'item'});

            //判断是否为元素
            if(!item.nodeType) {

                switch (item.type) {

                    case 'img':

                        var img = create({
                            tag: 'img',
                            style: {
                                'width': item.width + 'px',
                                'height': item.height + 'px'
                            },
                            attr: {
                                'src': item.src
                            }
                        });

                        imgArea.style.backgroundImage = 'url(' + item.src + ')';

                        imgArea.appendChild(img);
                        container.appendChild(imgArea);

                        //生成标题与描述模块
                        contentEle = self._createContent(contentArea, item);

                        if(contentEle) {
                            container.appendChild(contentEle);
                        }

                        item = img;

                        break;

                    case 'html':

                        newDiv = create('div');

                        newDiv.innerHTML = item.html;
                        container.appendChild(newDiv);
                        item = newDiv;

                        break;

                    default: break;
                }

            } else {

                //判断元素是否为img
                if (item.tagName.toLowerCase() === 'img') {

                    imgArea.style.backgroundImage = 'url(' + item.src + ')';
                    imgArea.appendChild(item);
                    container.appendChild(imgArea);

                    contentEle = self._createContent(contentArea, item);

                    if(contentEle) {
                        container.appendChild(contentEle);
                    }

                } else {

                    newDiv = create();

                    newDiv.innerHTML = item.html;
                    container.appendChild(newDiv);
                    item = newDiv;
                }
            }

            //判断高度最小的列
            var minVal = self.colHeight[0],
                minKey = 0;
            for(var key = 0; key < self.colHeight.length; key++) {
                minKey = self.colHeight[key] < minVal ? key : minKey;
            }

            //更新各列的高度
            var itemWidth = parseInt(item.style.width, 10),
                itemHeight = parseInt(item.style.height, 10),
                calHeight = ((self.width - self.margin) / itemWidth) * itemHeight;

            self.colHeight[minKey] += parseInt(calHeight || 0, 10);

            imgArea.style.minHeight = calHeight + 'px';

            cover.appendChild(container);

            colList[minKey].appendChild(cover);

        },

        pop: function (param) {

            var img = create({tag: 'img'}),
                self = this;

            self.imgPop.innerHTML = '';

            //判断传递过来的是图片src还是索引值
            img.src = param.src ? param.src : self.imgList[param].src;

            self.imgPop.appendChild(img);

            self.imgPop.className += ' show';
        },

        _createContent: function(contentArea, item) {

            var title, description;

            if(item.title || item.content || item.dataset.title || item.dataset.content) {

                if(!!item.title || !!item.dataset.title) {

                    title = create({tag: 'h3'});
                    title.innerText = item.title || item.dataset.title;
                    contentArea.appendChild(title);
                }

                if(!!item.content || !!item.dataset.content) {

                    description =create({tag: 'p'});
                    description.innerText = item.content || item.dataset.content;
                    contentArea.appendChild(description);
                }

                return contentArea;

            } else {
                return false;
            }
        }
    };

    wowPhoto.prototype.init.prototype = wowPhoto.prototype;
    window.wowPhoto = wowPhoto;

    //生成指定元素
    function create(param) {

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

})(window, document);