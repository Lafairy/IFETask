<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <h3>
        {{ 'Q' + (index + 1) }}
        <input type="text" v-model="item.title" placeholder="请填入问题" v-on:focus="console.log(this)">
    </h3>

    <!--单/多选-->
    <ul v-if="item.type === 'radio' || item.type === 'checkbox'">
        <li v-for="value in item.items">
            <label>
                <input type="radio" v-if="item.type === 'radio'">
                <input type="checkbox" v-if="item.type === 'checkbox' ">
                <input type="text" v-model="value" placeholder="请填入选项">
            </label>
            <span class="remove" title="删除" @click="remove($index)">x</span>
        </li>
    </ul>

    <!--文本-->
    <textarea v-if="item.type === 'textarea'"></textarea>

    <a href="javascript:;" v-if="item.type !== 'textarea'" @click="add">添加选项</a>

</template>

<script>
    export default {
        props: ['item', 'index'],
        data () {
            return {
                newItemIndex: 1
            }
        },
        methods: {
            add: function () {
                // Todo
                console.log(this.item.items)
                this.item.items.push('新选项' + this.newItemIndex++)
            },
            remove: function (index) {
                this.item.items.splice(index, 1)
            }
        }
    }
</script>