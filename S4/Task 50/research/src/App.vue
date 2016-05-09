<template>
    <div id="app">
        <Menu></Menu>
        <div class="wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Menu from './components/Menu'

export default {
    components: {
        Menu
    }
}
</script>
