<template>
    <div>
        <mu-appbar style="width: 100%;" color="black" textColor="white">
            <div class="title">{{navTitle}}</div>

            <mu-button flat slot="right" icon>
                <mu-icon  value="search"></mu-icon>
            </mu-button>
            <mu-menu slot="right">
                <mu-button flat>
                    <mu-icon value="menu"></mu-icon>
                </mu-button>
                <mu-list slot="content">
                    <mu-list-item button>
                        <mu-list-item-content>
                            <mu-list-item-title>发起群聊</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item button>
                        <mu-list-item-content>
                            <mu-list-item-title>添加好友</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item button>
                        <mu-list-item-content>
                            <mu-list-item-title>帮助与反馈</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
        </mu-appbar>
    </div>
</template>

<script>
    import {mapGetters,mapState} from 'vuex'
    export default {
        name: "TopNav",
        data(){
            return{
            }
        },
        computed:mapGetters(['navTitle'])
    }
</script>

<style scoped>
    .mu-icon{
        font-size: 35px;
    }
</style>