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

            this.wrap = document.querySelector(param.wrap);
            this.imgList = this.wrap.querySelectorAll('img');

            this.wrap.className += ' yoPhoto';
            this.wrap.style.width = this.width = param.width || '960px';
            this.wrap.style.height = this.height = param.height || '400px';

            this.imgPop = document.querySelector('#yoPhoto-pop') || null;
            if(!this.imgPop) {

                this.imgPop = document.createElement('div');
                this.imgPop.id = 'yoPhoto-pop';
                document.body.appendChild(this.imgPop);
            }
            this.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'yoPhoto-pop') {
                    self.imgPop.className = self.imgPop.className.replace('show', '');
                }
            });

            this.layout(this.imgList.length);

        },

        layout: function(count) {

            count = parseInt(count, 10);

            var divList = [],
                self = this,
                width = parseInt(this.width, 10),
                height = parseInt(this.height, 10),
                i;

            for(i = 0; i<this.imgList.length; i++) {

                var div = document.createElement('div');

                div.className = 'imgCover';
                div.style.backgroundImage = 'url(' + this.imgList[i].src　+　')';
                div.dataset.src = this.imgList[i].src;
                div.dataset.alt = this.imgList[i].alt || '';

                //this.wrap.removeChild(imgList[i]);
                divList.push(div);
            }

            divList.forEach(function(item) {
                item.addEventListener('click', function() {

                    var img = document.createElement('img');

                    self.imgPop.className += ' show';
                    self.imgPop.innerHTML = '';
                    img.src = item.dataset.src;

                    self.imgPop.appendChild(img);
                });
            });

            switch (count) {

                case 1:
                {
                    this.wrap.className +=  ' ' + this.prefix + '-1';

                    divList.forEach(function(item) {
                        self.wrap.appendChild(item);
                    });

                } break;

                case 2:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-2';

                    divList.forEach(function(item) {

                        if(!('clip-path' in document.body.style)) {
                            item.style.width = width / 2 + 'px';
                        }

                        self.wrap.appendChild(item);
                    });

                } break;

                case 3:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-3';

                    i = 0;
                    divList.forEach(function(item) {

                        switch (i++) {
                            case 0:
                                item.style.width = width - (height / 2) + 'px';
                                break;
                            case 1:
                                item.style.width = item.style.height = height / 2 + 'px';
                                break;
                            case 2:
                                item.style.width = item.style.height = height / 2 + 'px';
                                break;
                        }

                        self.wrap.appendChild(item);
                    });

                } break;

                case 4:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-4';

                    divList.forEach(function(item) {
                        self.wrap.appendChild(item);
                    });

                } break;
                case 5:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-5';

                    i = 0;
                    divList.forEach(function(item) {

                        switch (i++) {

                            case 0:
                                item.style.height = height * 2 / 3  + 'px';
                                item.style.width = width * 2 / 3 + 'px';
                                break;
                            case 1:
                                item.style.height = width / 3 + 'px';
                                item.style.width = width / 3 + 'px';
                                break;
                            case 2:
                                item.style.height = height - width / 3 + 'px';
                                item.style.width = width / 3 + 'px';
                                break;
                            case 3:
                            case 4:
                                item.style.height =  height / 3 + 'px';
                                item.style.width = width / 3 + 'px';
                                break;
                        }

                        self.wrap.appendChild(item);
                    });

                } break;
                case 6:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-6';

                    i = 0;
                    divList.forEach(function(item) {

                        switch (i++) {

                            case 0:
                                item.style.height = height * 2 / 3  + 'px';
                                item.style.width = width * 2 / 3 + 'px';
                                break;
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                item.style.height =  height / 3 + 'px';
                                item.style.width = width / 3 + 'px';
                                break;
                        }

                        self.wrap.appendChild(item);
                    });

                } break;
                default: console.warn('Doesn\'t support.'); break;
            }

        },

        pop: function (index) {

            var img = this.imgPop.querySelector('img');

            this.imgPop.className += ' show';
            img.src = this.imgList[index].src;
        }
    };

    yoPhoto.prototype.init.prototype = yoPhoto.prototype;
    window.yoPhoto = yoPhoto;

})(window, document);