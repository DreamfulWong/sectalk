<template>
    <div class="bigbox">
        <mu-list>
            <mu-list-item avatar button v-for="name in friendsFun">
                <mu-list-item-action>
                    <mu-avatar>
                        <!--<img src="../../assets/images/avatar1.jpg">-->
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{name}}</mu-list-item-title>
            </mu-list-item>
        </mu-list>
        <mu-list v-for="item in friendsViewList">
                    <mu-sub-header>{{item.title}}</mu-sub-header>
                    <mu-list-item avatar button v-for="name in item.userList">
                        <mu-list-item-action>
                            <mu-avatar>
                                <!--<img src="../../assets/images/avatar1.jpg">-->
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-title>{{name}}</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon value="chat_bubble"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
        </mu-list>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "Friends",
        computed: {...mapState(['friendsList', 'friendsFun']), ...mapGetters(['friendsViewList'])},
        mounted() {
            console.log(this.friendsViewList)
        }
    }

</script>

<style scoped>
    .bigbox{
        width: 100%;
        height: 80%;
    }
</style>