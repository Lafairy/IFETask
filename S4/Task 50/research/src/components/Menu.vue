<template>
    <div id="main-menu">
        <div class="cover">
            <div class="logo"><a v-link="{name: 'home'}"><span>?</span>问卷调查</a></div>
            <nav>
                <ul>
                    <li><a v-link="{name: 'home'}">我的问卷</a></li>
                    <li><a v-link="{name: 'edit', params: { id: 'new' }}">新建问卷</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {}
</script>