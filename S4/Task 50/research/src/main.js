import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Home from './components/Home'
import Edit from './components/Edit'
import Data from './components/Data'

/* eslint-disable no-new */
/*
new Vue({
    el: 'body',
    components: { App }
})
*/

Vue.use(Router)

let router = new Router()

router.map({
    '/home': {
        name: 'home',
        component: Home
    },
    '/edit/:id': {
        name: 'edit',
        component: Edit
    },
    '/data/:id': {
        name: 'data',
        component: Data
    }
})

router.redirect({
    '*': '/home'
})

router.start(App, 'body')
