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
                    <input type="button" value="单选" class="transparent" @click="addRadio">
                    <input type="button" value="多选" class="transparent" @click="addCheckbox">
                    <input type="button" value="文本题" class="transparent" @click="addTextarea">
                </div>
                <p @click="addTriger">+ 添加问题</p>
            </div>

        </div>

        <div class="control">
            <div class="date">
                问卷截止日期： <input type="date">
            </div>
            <div class="btns">
                <input type="button" value="保存问卷">
                <input type="button" value="发布问卷">
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    export default {
        components: {
            Item
        },
        data () {
            return {
                title: '',
                itemList: [],
                isAdding: false
            }
        },
        methods: {
            addTriger: function () {
                this.isAdding = !this.isAdding
            },
            addCheckbox: function () {
                this.itemList.push({
                    type: 'checkbox',
                    title: '',
                    items: [
                        '', '', ''
                    ]
                })
            },
            addRadio: function () {
                this.itemList.push({
                    type: 'radio',
                    title: '',
                    items: [
                        '', '', ''
                    ]
                })
            },
            addTextarea: function () {
                this.itemList.push({
                    type: 'textarea',
                    title: ''
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
            add: function (index) {
                // console.log(index)
                // this.itemList.$set(index, )
                // this.itemList[index].items.push('')
                // this.itemList[index].items.push('aaa')
                // console.log(this.itemList)
            }
        }
    }
</script>