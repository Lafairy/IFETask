<template>
    <h3>
        {{ 'Q' + (index + 1) }}
        <input type="text" value="{{ item.title }}" placeholder="请填入问题">
    </h3>

    <!--单选-->
    <ul v-if="item.type === 'radio'">
        <li v-for="value in item.items">
            <span class="remove" title="删除" @click="remove(value)">x</span>
            <label>
                <input type="radio">
                <input type="text" value="{{ value }}" placeholder="请填入选项">
            </label>
        </li>
    </ul>

    <!--多选-->
    <ul v-if="item.type === 'checkbox'">
        <li v-for="value in item.items">
            <span class="remove" title="删除" @click="remove(value)">x</span>
            <label>
                <input type="checkbox">
                <input type="text" value="{{ value }}" placeholder="请填入选项">
            </label>
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
            return {}
        },
        methods: {
            add: function () {
                this.item.items.push('')
            },
            remove: function (index) {
                this.item.items.$remove()
                console.log(this.item.items)
                this.item.items.splice(index, 1)
            }
        }
    }
</script>