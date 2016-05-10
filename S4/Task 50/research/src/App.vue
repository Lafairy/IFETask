<template>
    <div id="app">
        <Menu></Menu>
        <div class="wrap">
            <router-view></router-view>
        </div>
        <div class="popuper">
            <div class="pop-wrap">
                <header class="pop-header">
                    <h3>Loading</h3>
                </header>
                <section class="pop-content">
                    Loading
                </section>
                <section class="pop-control">
                    <input type="button" class="confirm" value="确定">
                </section>
            </div>
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
