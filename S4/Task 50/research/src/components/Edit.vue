<template>
    <div id="edit-item">

        <h1 class="edit">
            <input type="text" placeholder="这里是标题" value="{{ title }}" v-model="title">
        </h1>

        <div class="content">

            <div class="list" v-if="itemList.length">
                <ul>
                    <li v-for="item in itemList" class="edit list-item">

                        <Item :index="$index" :item="item"></Item>
                        <div class="control">
                            <label><input type="checkbox">必填</label>
                            <a href="javascript:;" @click="up($index)">上移</a>
                            <a href="javascript:;" @click="down($index)">下移</a>
                            <a href="javascript:;" @click="copy($index)">复用</a>
                            <a href="javascript:;" @click="del($index)">删除</a>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="add-list">
                <div :class="{ 'show': isAdding, 'item-option': true }">
                    <input type="button" value="单选" class="transparent" @click="addItem('radio')">
                    <input type="button" value="多选" class="transparent" @click="addItem('checkbox')">
                    <input type="button" value="文本题" class="transparent" @click="addItem('textarea')">
                </div>
                <p @click="addTriger">+ 添加问题</p>
            </div>

        </div>

        <div class="control">
            <div class="date">
                问卷截止日期： <input type="date">
            </div>
            <div class="btns">
                <input type="button" value="保存问卷" @click="save" v-if="!this.published">
                <input type="button" value="发布问卷" @click="publish" v-if="!this.published">
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    import Pop from '../lib/popuper'

    export default {
        components: {
            Item
        },
        data () {
            return {
                title: '',
                itemList: [],
                isAdding: false,
                uid: '',
                published: false
            }
        },
        ready () {
            if (this.$route && this.$route.params && this.$route.params.id) {
                let prevIndex = -1
                let previousData = JSON.parse(window.localStorage.getItem('research'))

                for (let i = previousData.length - 1; i >= 0; i--) {
                    if (previousData[i].uid === this.$route.params.id) {
                        prevIndex = i
                        this.title = previousData[prevIndex].title
                        this.itemList = previousData[prevIndex].itemList
                        this.uid = previousData[prevIndex].uid
                        this.published = previousData[prevIndex].published

                        break
                    }
                }
            } else {
                this.uid = this._uid(10)
            }
        },
        methods: {
            addTriger: function () {
                this.isAdding = !this.isAdding
            },
            addItem: function (type) {
                this.itemList.push({
                    type: type,
                    title: '',
                    items: type !== 'textarea' ? ['', '', ''] : null
                })
            },
            del: function (index) {
                this.itemList.splice(index, 1)
            },
            up: function (index) {
                console.log(this.itemList)
                if (index === 0) return

                let temp = this.itemList[index - 1]

                this.itemList.$set(index - 1, this.itemList[index])
                this.itemList.$set(index, temp)
            },
            down: function (index) {
                if (index === this.itemList.length - 1) return

                let temp = this.itemList[index + 1]

                this.itemList.$set(index + 1, this.itemList[index])
                this.itemList.$set(index, temp)
            },
            _uid: function (length) {
                let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                return ' '.repeat(length).split(' ').reduce(function (x, y) {
                    return x + possible.charAt(Math.floor(Math.random() * possible.length))
                })
            },
            save: function () {
                const data = {
                    uid: this.uid,
                    title: this.title,
                    itemList: this.itemList,
                    published: this.published
                }

                let previousData = JSON.parse(window.localStorage.getItem('research')) || []
                let prevIndex = -1

                for (let i = previousData.length - 1; i >= 0; i--) {
                    if (previousData[i].uid === this.uid) {
                        prevIndex = i
                        previousData[prevIndex] = data
                        break
                    }
                }
                if (!(prevIndex + 1)) {
                    previousData.push(data)
                }

                window.localStorage.setItem('research', JSON.stringify(previousData))

                if (!this.published) {
                    let pop = Pop({
                        wrap: '.popuper',
                        type: 'success',
                        confirm: function () {},
                        cancel: function () {}
                    })
                    pop.edit({
                        title: '保存成功！',
                        content: '问卷保存成功(*￣︶￣)y'
                    }).show()
                }
            },
            publish: function () {
                this.published = true
                this.save()

                let pop = Pop({
                    wrap: '.popuper',
                    type: 'success',
                    confirm: function () {},
                    cancel: function () {}
                })
                pop.edit({
                    title: '发布成功！',
                    content: '问卷发布成功(*￣︶￣)y'
                }).show()
            }
        }
    }
</script>