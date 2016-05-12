<template>

    <div class="no-item" v-if="!items.length">
        <input type="button" value="+ 新建问卷" class="add-new large" v-link="{name: 'edit', params: {id: 'new'}}">
    </div>
    <div id="research-list" v-else>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>标题</th>
                    <th>时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td><input type="checkbox"></td>
                    <td>{{ item.title }}</td>
                    <td>2016-04-12 20:22:34</td>
                    <td>{{ item.published ? '已发布' : '未发布' }}</td>
                    <td>
                        <input type="button" value="查看" v-link="{ name: 'check', params: { id: item.uid } }" v-if="item.published">
                        <input type="button" value="编辑" v-link="{ name: 'edit', params: { id: item.uid } }" v-else>
                        <input type="button" value="删除" @click="del($index)">
                        <input type="button" value="查看数据" v-if="{{ item.published }}">
                    </td>
                </tr>
            </tbody>
        </table>

        <input type="button" value="+ 新建问卷" class="add-new new" v-link="{name: 'edit', params: {id: 'new'}}">

    </div>
</template>

<script>
    export default {
        data () {
            return {
                items: []
            }
        },
        ready () {
            this.items = JSON.parse(window.localStorage.getItem('research')) || []
            console.log(this.items.length)
        }
    }
</script>

<style>

</style>