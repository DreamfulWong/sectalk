import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTouch from 'vue-touch'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import {CHANGE_NAV_TITLE} from "./store/mutation-types";

require('./assets/webim.config.js')
let WebIM = require('easemob-websdk')
Vue.prototype.$webim = WebIM

const conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
})

Vue.prototype.update = function (user, pwd) {
    const options = {
        apiUrl: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
        appKey: '1109190110090428#sectalk-demo',
        user: user,
        pwd: pwd,
        success: function (mes) {
            console.log(mes)
            store.state.data.self.nickName=mes.user.nickname
            store.state.data.self.username=mes.user.username
        },
        error: function (err) {
            console.log(err)
        }
    }
    Vue.prototype.$imconn = conn
    Vue.prototype.$imoption = options
    conn.open(options)
    conn.listen({
        onOpened: function (message) {
            console.log('用户已上线')
            conn.getRoster({
                success: function ( roster ) {
                    console.log(roster)
                    var friendsName=[]
                    for ( var i = 0;i<roster.length; i++ ) {
                        var ros = roster[i];
                        //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
                        if ( ros.subscription === 'both' || ros.subscription === 'to' ) {
                            friendsName.push(ros.name)
                        }
                    }
                    store.state.receiveFriendsName=friendsName.reverse()

                    router.replace('/message')
                },
            });
        },
        onClosed: function (message) {
            console.log('用户已下线')
            console.log(message)
        },
        onTextMessage: function (message) {
            console.log(message)
            store.dispatch('receiveMsg',message)
        },
        onPresence: function (message) {
            console.log(message)
            switch (message.type) {
                case 'subscribe': // 对方请求添加好友
                    // 同意对方添加好友
                    document.getElementById('agreeFriends').onclick = function (message) {
                        conn.subscribed({
                            to: 'asdfghj',
                            message: "[resp:true]"
                        });
                        // 需要反向添加对方好友
                        conn.subscribe({
                            to: message.from,
                            message: "[resp:true]"
                        });
                    };
                    // 拒绝对方添加好友
                    document.getElementById('rejectFriends').onclick = function (message) {
                        conn.unsubscribed({
                            to: message.from,
                            message: "rejectAddFriend" // 拒绝添加好友回复信息
                        });
                    };

                    break;
                case 'subscribed': // 对方同意添加好友，已方同意添加好友
                    break;
                case 'unsubscribe': // 对方删除好友
                    break;
                case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
                    break;
                case 'joinChatRoomSuccess': // 成功加入聊天室
                    console.log('join chat room success');
                    break;
                case 'joinChatRoomFaild': // 加入聊天室失败
                    console.log('join chat room faild');
                    break;
                case 'joinPublicGroupSuccess': // 意义待查
                    console.log('join public group success', message.from);
                    break;
                case 'createGroupACK':
                    conn.createGroupAsync({
                        from: message.from,
                        success: function (option) {
                            console.log('Create Group Succeed');
                        }
                    });
                    break;
            }
        }
    })
}

Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.use(VueTouch,{name:'v-touch'})
Vue.use(MuseUI);

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// store.dispatch('getAllData', axios)

router.beforeEach((to, from, next) => {
    store.commit("CHANGE_NAV_TITLE", to.name)
    next()
})

router.replace('/welcome')
