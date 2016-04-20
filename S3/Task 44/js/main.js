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

            self.wrap = document.querySelector(param.wrap);
            self.wrapWidth = self.wrap.offsetWidth;
            self.col = param.col || 3;
            self.wrap.className += ' wowPhoto' + ' col-' + self.col;
            self.width = Math.floor(self.wrapWidth / self.col);

            //判断margin是否包含px
            if(param.margin) {
                self.margin = param.margin.indexOf('px') >= 0 ? parseInt(param.margin, 10) : param.margin;
            }

            self.itemList = this.wrap.querySelectorAll('div,img');
            self.itemList = Array.prototype.slice.call(self.itemList);
            self.wrap.innerHTML = '';

            //初始化各列高度并添加列div
            for(i = 0; i < self.col; i++) {

                self.colHeight[i] = 0;

                var div = document.createElement('div');

                div.className = 'col-item';

                self.wrap.appendChild(div);
            }

            //弹出层初始化
            self.imgPop = document.querySelector('#wowPhoto-pop') || null;
            if(!self.imgPop) {

                self.imgPop = document.createElement('div');
                self.imgPop.id = 'wowPhoto-pop';
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
                div = document.createElement('div'),
                cover = document.createElement('div'),
                id = 'wow-item-' + self.currentIndex++,
                colList = self.wrap.querySelectorAll('.col-item');

            div.className = 'item';
            div.id = id;

            cover.className = 'cover';
            cover.style.paddingLeft = self.margin / 2 + 'px';
            cover.style.paddingRight = self.margin / 2 + 'px';
            cover.style.marginBottom = self.margin + 'px';

            //判断是否为元素
            if(!item.nodeType) {

                switch (item.type) {

                    case 'img':

                        var img = document.createElement('img');
                        img.src = item.src;
                        img.style.width = item.width + 'px';
                        img.style.height = item.height + 'px';

                        div.appendChild(img);

                        item = img;

                        break;

                    case 'html':

                        var newDiv = document.createElement('div');

                        newDiv.innerHTML = item.html;

                        div.appendChild(newDiv);

                        item = newDiv;

                        break;

                    default: break;
                }



            } else {

                //判断元素是否为img
                item.tagName.toLowerCase() === 'img' ?
                    div.appendChild(item) :
                    div.innerHTML = item.innerHTML;
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

            cover.style.height = calHeight + 'px';
            cover.appendChild(div);
            colList[minKey].appendChild(cover);
            console.log(self.colHeight);
            /*console.log(itemWidth);
            console.log(itemHeight);
            console.log(self.colHeight);*/

        },

        pop: function (param) {

            var img = document.createElement('img'),
                self = this;

            self.imgPop.innerHTML = '';

            //判断传递过来的是图片src还是索引值
            img.src = param.src ? param.src : self.imgList[param].src;

            self.imgPop.appendChild(img);

            self.imgPop.className += ' show';
        },
    };

    wowPhoto.prototype.init.prototype = wowPhoto.prototype;
    window.wowPhoto = wowPhoto;

})(window, document);