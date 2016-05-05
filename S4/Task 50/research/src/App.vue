<template>
    <div id="app">
        <Menu></Menu>
        <router-view></router-view>
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

<style>

</style>
