(function(window, document) {

    function yoPhoto(param) {
        return new yoPhoto.prototype.init(param);
    }

    yoPhoto.prototype = {

        constructor: yoPhoto,
        wrap: null,
        imgList: null,
        prefix: 'layout',
        width: 0,
        height: 0,
        imgPop: null,

        init: function(param) {

            var self = this;

            self.wrap = document.querySelector(param.wrap);
            self.imgList = this.wrap.querySelectorAll('img');

            self.wrap.className += ' yoPhoto';
            self.wrap.style.width = self.width = param.width || '960px';
            self.wrap.style.height = self.height = param.height || '400px';

            self.imgPop = document.querySelector('#yoPhoto-pop') || null;
            if(!self.imgPop) {

                self.imgPop = document.createElement('div');
                self.imgPop.id = 'yoPhoto-pop';
                document.body.appendChild(self.imgPop);
            }
            self.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'yoPhoto-pop') {
                    self.imgPop.className = self.imgPop.className.replace('show', '');
                }
            });

            self.layout(self.imgList.length);

            //弹出大图
            self.wrap.addEventListener('click', function(event) {

                event = event || window.event

                if (event.target.className.indexOf('imgCover') >= 0) {
                    var img = document.createElement('img');

                    self.imgPop.className += ' show';
                    self.imgPop.innerHTML = '';
                    img.src = event.target.dataset.src;

                    self.imgPop.appendChild(img);
                }

                if(event.target.id === 'yoPhoto-grid-close') {
                    self.wrap.className = self.wrap.className.replace('grid', '').trim();
                }

            });

        },

        layout: function(count) {

            count = parseInt(count, 10);

            var self = this,
                width = parseInt(this.width, 10),
                height = parseInt(this.height, 10),
                i;

            self.wrap.className +=  ' ' + self.prefix + '-' + count;

            for(i = 0; i < self.imgList.length; i++) {

                var div = document.createElement('div');

                div.className = 'imgCover';
                div.style.backgroundImage = 'url(' + self.imgList[i].src　+　')';
                div.dataset.src = self.imgList[i].src;
                div.dataset.alt = self.imgList[i].alt || '';

                div.appendChild(self.imgList[i]);

                switch (count) {

                    case 3:
                    {
                        switch (i) {
                            case 0:
                                div.style.width = (width - (height / 2)) * 100 / width + '%';
                                break;
                            case 1:
                            case 2:
                                div.style.width = (height / 2) * 100 / width + '%';
                                break;
                        }

                    } break;

                    case 5:
                    {
                        switch (i) {

                            case 0:
                                div.style.width = (width * 2 / 3) * 100 / width + '%';
                                break;
                            case 1:
                                div.style.height = (width / 3) * 100 / height + '%';
                                break;
                            case 2:
                                div.style.height = (height - width / 3) * 100 / height + '%';
                                break;
                        }

                    } break;

                    default: break;
                }

                self.wrap.appendChild(div);
            }
        },

        pop: function (index) {

            var img = this.imgPop.querySelector('img');

            this.imgPop.className += ' show';
            img.src = this.imgList[index].src;
        },

        grid: function(status) {

            status = status || true;

            var close = document.createElement('div');
            close.id = 'yoPhoto-grid-close';
            close.innerText = '×';
            close.title = '退出网格全屏';

            if(status) {
                this.wrap.className += ' grid';
                this.wrap.appendChild(close);
            } else {

            }
        }
    };

    yoPhoto.prototype.init.prototype = yoPhoto.prototype;
    window.yoPhoto = yoPhoto;

})(window, document);