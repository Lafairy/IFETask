<template>

    <div class="no-item" v-if="!items.length">
        <input type="button" value="+ 新建问卷" class="add-new large" v-link="{name: 'edit', params: {id: 'new'}}">
    </div>
    <div id="research-list" v-if="items.length">

        <div class="add-new">新建问卷</div>
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
                <tr>
                    <td><input type="checkbox"></td>
                    <td>这是我的第一份问卷</td>
                    <td>2016-04-12 20:22:34</td>
                    <td>未发布</td>
                    <td>
                        <input type="button" value="编辑">
                        <input type="button" value="删除">
                        <input type="button" value="查看数据">
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                items: []
            }
        }
    }
</script>

<style>

</style>