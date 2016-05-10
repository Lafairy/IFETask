<template>
    <div id="edit-item" class="check">

        <h1>{{ title }}</h1>

        <div class="content">

            <div class="list" v-if="itemList.length">
                <ul>
                    <li v-for="item in itemList" class="list-item">
                        <check-item :index="$index" :item="item"></check-item>
                    </li>

                </ul>
            </div>

        </div>

        <div class="control">
            <div class="date">
                问卷截止日期： <input type="date">
            </div>
        </div>
    </div>
</template>

<script>
    import CheckItem from './CheckItem'

    export default {
        components: {
            CheckItem
        },
        data () {
            return {
                title: '',
                itemList: [],
                isAdding: false,
                uid: '',
                published: false
            }
        },
        ready () {
            if (this.$route && this.$route.params && this.$route.params.id) {
                let prevIndex = -1
                let previousData = JSON.parse(window.localStorage.getItem('research'))

                for (let i = previousData.length - 1; i >= 0; i--) {
                    if (previousData[i].uid === this.$route.params.id) {
                        prevIndex = i
                        this.title = previousData[prevIndex].title
                        this.itemList = previousData[prevIndex].itemList
                        this.uid = previousData[prevIndex].uid
                        this.published = previousData[prevIndex].published

                        break
                    }
                }
            } else {
                this.uid = this._uid(10)
            }
        }
    }
</script>