<template>
    <div class="chat">
        <mu-appbar color="gray" style="width: 100%">
            <mu-button icon large slot="left" @click="closeChat">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>

            <div class="nav-title">
                {{currentUser._id}}
            </div>
            <mu-button icon slot="right">
                <mu-icon value="call"></mu-icon>
            </mu-button>
        </mu-appbar>

        <div class="content" ref="msgView">
            <chat-content ref="chatContent"></chat-content>
        </div>

        <div class="footer">
            <div class="top">
                <div class="input-wrapper">
                    <mu-text-field class="input" full-width v-model="value"></mu-text-field>
                </div>
                <mu-button icon @click="sendMsg">
                    <mu-icon value="send"></mu-icon>
                </mu-button>
            </div>
            <div class="bottom">
                <mu-icon class="icon" value="settings_voice"></mu-icon>
                <mu-icon class="icon" value="photo_size_select_actual"></mu-icon>
                <mu-icon class="icon" value="touch_app"></mu-icon>
                <mu-icon class="icon" value="camera_alt"></mu-icon>
                <mu-icon class="icon" value="videocam"></mu-icon>
                <mu-icon class="icon" value="tag_faces"></mu-icon>
                <mu-icon class="icon" value="add_circle_outline"></mu-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import ChatContent from './ChatContent'
    import BScroll from 'better-scroll'

    export default {
        name: "ChatView",
        components: {ChatContent},
        computed: mapState(['currentUser', 'CloseChat']),
        data() {
            return {
                value: ''
            }
        },
        created() {
            this.$nextTick(() => {
                this._initMsgViewScroll()
            })
        },
        methods: {
            _initMsgViewScroll() {
                if (!this.msgScroll) {
                    this.msgScroll = new BScroll(
                        this.$refs.msgView, {
                            click: true
                        })
                }else{
                    this.msgScroll.refresh()
                }
            },
            ...mapActions(['closeChat','sendMessage','getNewMessage']),
            sendMsg() {
                if (!this.value.trim()) {
                    return
                }
                let msg = this.value
                let time = new Date().getTime()
                let msgItem = {msg, time, self: true, read: true}
                console.log(msgItem)
                this.sendMessage(msgItem)
                this.value = ''
                this.scrollToBottom()
                // // 将当前消息发送给服务器,等待好友回复的消息
                // this.getNewMessage({id: this.currentUser._id, msg, axios: this.axios})
                //     .then(() => {
                //         // 将action封装成promise对象保证 网络数据请求完毕更新vuex的store后,调用then方法
                //         this.scrollToBottom()
                //     })
                var timestamp=new Date().getTime()
                var id = this.$imconn.getUniqueId(); // 生成本地消息id
                var mes = new this.$webim.message('txt', id); // 创建文本消息
                mes.set({
//				msg: '{"name":"'+nickName+'","msg":"'+document.querySelector('.inputContent').value+'"}', // 消息内容
                    msg: msg,
                    to: this.currentUser._id, // 接收消息对象（用户id）
                    roomType: false,
                    ext:{'sendtime':timestamp},
                    success: function(id, serverMsgId) {
                        console.log('send private text Success'+msg);
                        console.log(msg)
                    }
                });
                mes.body.chatType = 'singleChat';
                this.$imconn.send(mes.body);
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    // 当聊天消息增加时(发生改变时)会引起页面重新渲染,$nextTick等待页面及子组件因数据发生该变重新渲染完毕时
                    // 重新计算better-scroll内容高度
                    this.msgScroll.refresh()
                    let bottomEl = this.$refs.chatConten
                    //使用better-scroll的scrollToElement API滑动到聊天内容区的最底部
                    this.msgScroll.scrollToElement(bottomEl, 3000)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .chat {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: 10;
        .nav-title {
            text-align: center;
        }
        .content {
            position: absolute;
            left: 0;
            right: 0;
            top: 56px;
            bottom: 50px;
            overflow: hidden;
            background: #eee;
        }
        .footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f6f6f6;
        }

        .footer .top {
            display: flex;
        }

        .footer .input-wrapper {
            padding: 5px 10px;
            flex: 1;
        }

        .footer .input {
            margin: 0;
            padding-bottom: 0;
            min-height: 32px;
        }

        .footer .bottom {
            display: flex;
        }

        .footer .icon {
            flex: 1;
            text-align: center;
            display: inline-block;
            line-height: 48px;
        }
    }
</style>