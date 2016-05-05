<template>
    <div id="edit-item">

        <h1 class="edit">
            <input type="text" placeholder="这里是标题">
        </h1>

        <div class="content">

            <div class="list" v-if="itemList.length">
                <ul>
                    <li v-for="item in itemList" class="edit list-item">
                        <h3>
                            {{ 'Q' + ($index + 1) }}
                            <input type="text" value="{{ item.title }}" placeholder="请填入问题">
                        </h3>

                        <ul v-if="item.type === 'checkbox'">
                            <li v-for="value in item.items">
                                <label>
                                    <input type="checkbox">
                                    <input type="text" value="{{ value }}" placeholder="请填入选项">
                                </label>
                            </li>
                        </ul>
                        
                        <div class="control">
                            <label><input type="checkbox"> 必填</label>
                            <a href="javascript:;">上移</a>
                            <a href="javascript:;">下移</a>
                            <a href="javascript:;">复用</a>
                            <a href="javascript:;">删除</a>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="add-list">
                <div :class="{ 'show': isAdding, 'item-option': true }">
                    <input type="button" value="单选" class="transparent">
                    <input type="button" value="多选" class="transparent" @click="addCheckbox">
                    <input type="button" value="文本题" class="transparent">
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
    export default {
        data () {
            return {
                itemList: [
                    {
                        type: 'checkbox',
                        title: 'Title Title TitleTitle 1',
                        items: [
                            '选项1', '选项二', '轩轩轩轩选项333'
                        ]
                    }
                ],
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
            }
        }
    }
</script>