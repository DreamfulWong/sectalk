import * as types from './mutation-types'

export default {
    [types.CHANGE_NAV_TITLE](state, title) {
        state.headerTitle = title
    },
    // [types.RECEIVE_DATA](state, data) {
    //     state.data = data
    // },
    [types.ADD_MESSAGE](state, msg) {
        state.currentUser.list.push(msg)
        console.log(state.messageList)
    },
    [types.RECEIVE_FRIENDS_MESSAGE](state, message) {
        let record = state.messageList.find(m => m._id === message.from)    //判断接收到的信息本地有没有
        // let nameAndMsg=JSON.parse(message.data)
        if (!record) {
            record = {
                _id: message.from,
                // name:message.name,
                list: [
                    {msg: (message.data), time: message.ext.sendtime, read: false}
                ]
            }
            console.log('没有这id')
            state.messageList.push(record)
        } else {
            console.log('有这id')
            // record.list.forEach(m=>m.read=true)
            record.list.push({msg: (message.data), time: message.ext.sendtime, read: false})
        }
        // state.currentMsgList=record
    },
    [types.TOGGLE_CHATVIEW](state, val) {
        state.chat = val
    },
    [types.OPEN_CURRENT_USER](state, item) {
        item.list.forEach(m => m.read = true)
        state.currentUser=item
    },
    [types.DELETD_MESSAGE](state, id) {
        let record = state.messageList.find(m => m._id === id)
        if (!record) {
            return
        }
        console.log(record)
        let index = state.messageList.indexOf(record)
        this.state.messageList.splice(index, 1)
    }
}