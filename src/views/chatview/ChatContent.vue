<template>
    <div class="msg-content">
        <div class="msg" :class="{self:msg.self}" v-for="msg in msgList" :key="msg.time">
            <div class="avater">
                <!--<img :src='msg.self?`${baseUrl}${self.avter}`:`${baseUrl}${friend.avater}`' width="100%" height="100%">-->
            </div>
            <div class="bubble">{{msg.msg}}</div>
        </div>
        <div ref="bottom">
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ChatContent",
        computed: mapState({
            // baseUrl:'baseUrl',
            friend: 'currentUser',
            // self: state=>state.data.self,
            msgList: state => state.currentUser.list
        })
    }

</script>

<style scoped>

.msg-content .msg {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 0;
}
.msg .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
}
.msg .bubble {
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
    padding: 10px;
    border-radius: 4px;
    line-height: 20px;
    max-width: 50%;
    word-wrap: break-word;
    font-size: 14px;
    background: #fff;
}
.msg.self {
    text-align: right;
}
.msg.self .avatar {
    float: right;
    margin-left: 5px;
}
.msg.self .bubble {
    background: #57c0e7;
    text-align: left;
    color: #fff;
}

</style>