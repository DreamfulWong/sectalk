import * as types from './mutation-types'

export default {
    // async getAllData({commit}, axios) {
    //     let self = await axios.get('api/self')
    //     self=self.data.data
    //     let friends = await axios.get('api/friends')
    //     friends=friends.data.data
    //     commit(types.RECEIVE_DATA,{self,friends})
    // },
    // 接收好友发的消息
    receiveMsg({commit},message){
        commit('RECEIVE_FRIENDS_MESSAGE',message)
        // commit('ADD_MESSAGE',message)
    },
    showChat({commit},item){
        // 获取当前用户聊天信息
        commit(types.OPEN_CURRENT_USER,item)
        // 打开聊天页面
        commit(types.TOGGLE_CHATVIEW,true)
    },
    closeChat({commit}){
        commit(types.TOGGLE_CHATVIEW,false)
    },
    sendMessage({commit},msg){
        commit(types.ADD_MESSAGE,msg)
    }
}