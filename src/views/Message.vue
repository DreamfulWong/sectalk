<template>
    <div>
        <mu-list textline="two-line">
            <div class="list" v-for="f in msgViewList" :key="f._id">
                <v-touch @swipeleft="onSwipeleft(f._id)" @swiperight="cancelRemove" @tap="itemClick(f)">
                    <mu-list-item avatar button class="item" :class="{remove:f._id===currentId}" :ripple="false">
                        <mu-list-item-action>
                            <mu-avatar :size="30">
                                <mu-icon value="folder"></mu-icon>
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title>{{f._id}}</mu-list-item-title>
                            <mu-list-item-sub-title>{{f.lastMessage.msg}}</mu-list-item-sub-title>
                        </mu-list-item-content>
                        <mu-list-item-action class="desc">
                            <mu-list-item-title><span class="time">{{f.lastMessage.time|getTime}}</span>
                            </mu-list-item-title>
                            <mu-list-item-sub-title>
                                <mu-badge :content="f.unreadNum+''" color="red" v-show="f.unreadNum"></mu-badge>
                            </mu-list-item-sub-title>
                        </mu-list-item-action>
                    </mu-list-item>
                </v-touch>
                <div class="delete-btn" @click="deleteMsg(f._id)">删除</div>
            </div>
        </mu-list>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import {timeDesc} from '../assets/js/tool'

    export default {
        name: "Message",
        data(){
            return{
                currentId:null
            }
        },
        computed: {
            ...mapGetters(['msgViewList'])
        },
        filters: {
            getTime(val) {
                return timeDesc(val)
            }
        },
        methods:{
            ...mapActions(['showChat']),
            onSwipeleft(id){
                this.currentId=id
                console.log(this.msgViewList)
            },
            cancelRemove(id){
                this.currentId=null
            },
            itemClick(friend){
                this.showChat(friend)
                this.cancelRemove()
            },
            deleteMsg(id){
                this.$store.commit('DELETD_MESSAGE',id)
                this.cancelRemove()
            }
        },
        created(){
            console.log(this.msgViewList)
        }
    }
</script>

<style scoped>
    .list {
        position: relative;
    }

    .item {
        background: #fff;
        position: relative;
        transition: all 0.5s linear;
        z-index: 2;
    }

    .item.remove {
        transform: translateX(-50px);
    }

    .list .delete-btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 100%;
        line-height: 72px;
        text-align: center;
        color: black;
        background: red;
        z-index: 1;
    }

    .list .desc .time {
        display: inline-block;
        width: 100%;
        text-align: right;
    }

    .list .desc {
        text-align: right;
    }
</style>