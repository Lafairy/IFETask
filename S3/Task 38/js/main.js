/**
 * Created by Gong on 2016/4/12.
 */
(function(window, document) {

    function easyTable(param) {
        return new easyTable.prototype.init(param);
    }

    easyTable.prototype = {

        constructor: easyTable,
        table: null,
        tData: {
            header: null,
            content: null
        },

        init: function(param) {

            var self = this;

            if(!param.table || !param.data) {
                console.error('请传入表格元素以及数据');
                return;
            }

            this.table = param.table;
            this.tData.header = param.data.header || null;
            this.tData.content = param.data.content || null;

            if(!this.tData.header || !this.tData.content) {
                console.error('传入的数据格式不正确');
                return;
            }

            this.create(this.tData);

            property(data, 'content', {
                get: function() {
                    return self.tData.content;
                },
                set: function(content) {
                    self.tData.content = content;
                    self.create(self.tData);
                }
            });

            property(data, 'header', {
                get: function() {
                    return self.tData.header;
                },
                set: function(content) {
                    self.tData.header = content;
                    self.create(self.tData);
                }
            });

            this.table.addEventListener('click', function(event) {

                event = event || window.event;

                var cellIndex = 0,
                    target = event.target,
                    className = target.className,
                    content,
                    order = { index: 0, order: ''};

                if(target.tagName.toLocaleLowerCase() === 'th') {

                    order.index = cellIndex = target.cellIndex;

                    if(className.indexOf('asc') < 0 && className.indexOf('desc') < 0) {

                        order.order = 'asc';

                        content = self.tData.content;
                        content.sort(function(x, y) {
                            return x[cellIndex] - y[cellIndex];
                        });

                    } else {

                        if(className.indexOf('asc') >= 0) {

                            order.order = 'desc';

                            content = self.tData.content;
                            content.sort(function(x, y) {
                                return y[cellIndex] - x[cellIndex];
                            });
                        }
                        if(className.indexOf('desc') >= 0) {

                            order.order = 'asc';

                            content = self.tData.content;
                            content.sort(function(x, y) {
                                return x[cellIndex] - y[cellIndex];
                            });
                        }
                    }

                    data.content = content;
                    self.table.querySelectorAll('th')[order.index].className = order.order;

                }
            });

        },

        create: function(data, order) {

            var thead = document.createElement('thead'),
                tbody = document.createElement('tbody'),
                theadtr = document.createElement('tr');

            this.table.innerHTML = '';

            //生成表头
            data.header.forEach(function(item) {

                var th = document.createElement('th');
                th.innerText = item;
                theadtr.appendChild(th);

            });
            thead.appendChild(theadtr);

            //生成表内容
            data.content.forEach(function(col) {
                var tr = document.createElement('tr');
                col.forEach(function(item) {
                    var td = document.createElement('td');
                    td.innerText = item;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            //将内容添加到表内
            this.table.appendChild(thead);
            this.table.appendChild(tbody);
        }
    };

    function property(obj, propName, conf) {

        try {
            Object.defineProperty(obj, propName, conf);
        } catch (error) {

        }
    }

    easyTable.prototype.init.prototype = easyTable.prototype;
    window.easyTable = easyTable;

})(window, document);