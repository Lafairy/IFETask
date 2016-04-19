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

        init: function(param) {

            var self = this;

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

            self.layout();

            //窗口大小变化
            window.addEventListener('resize', function() {

                self.wrapWidth = self.wrap.offsetWidth;
                self.width = Math.floor(self.wrapWidth / self.col);

                self.layout();
            });
        },

        layout: function() {

            var self = this,
                currentIndex = 0,
                colHeight = [],
                i = 0;

            //初始化各列高度
            for(i = 0; i < self.col; i++) {
                colHeight[i] = 0;
            }

            self.wrap.innerHTML = '';
            this.itemList.forEach(function(item) {

                var div = document.createElement('div'),
                    id = 'wow-item-' + currentIndex;

                div.className = 'item';
                div.id = id;

                //判断元素是否为img
                item.tagName.toLowerCase() === 'img' ?
                    div.appendChild(item) :
                    div.innerHTML = item.innerHTML;

                div.style.padding = self.margin / 2 + 'px';

                //判断高度最小的列
                var minVal = colHeight[0],
                    minKey = 0;
                for(var key = 0; key < colHeight.length; key++) {
                    minKey = colHeight[key] < minVal ? key : minKey;
                }

                //设置元素的位置
                div.style.left = self.width * (minKey) + 'px';
                div.style.top = colHeight[minKey] + 'px';
                //div.style.visibility = 'hidden';

                this.wrap.appendChild(div);

                //更新各列的高度
                colHeight[minKey] += parseInt(getComputedStyle(div).height, 10);

                currentIndex++;

                div.style.visibility = 'visible';
            });


        },

        pop: function (index) {


        }
    };

    wowPhoto.prototype.init.prototype = wowPhoto.prototype;
    window.wowPhoto = wowPhoto;

})(window, document);