<template>
    <h3>
        {{ 'Q' + (index + 1) }}
        {{ item.title }}
    </h3>

    <!--单/多选-->
    <ul v-if="item.type === 'radio' || item.type === 'checkbox'">
        <li v-for="value in item.items">
            <label>
                <input type="radio" v-if="item.type === 'radio'" :value="value" :name="uid + '-q' + index">
                <input type="checkbox" v-if="item.type === 'checkbox'" :value="value" :name="uid + '-q' + index + '[]'">
                {{ value }}
            </label>
        </li>
    </ul>

    <!--文本-->
    <textarea v-if="item.type === 'textarea'"></textarea>

</template>

<script>
    export default {
        props: ['item', 'index'],
        data () {
            return {
                uid: this.$parent.uid
            }
        }
    }
</script>