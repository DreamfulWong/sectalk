import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import  mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      headerTitle:'',
      baseUrl: process.env.BASE_URL,
      friendsList:[],
      currentUser:{},   //当前聊天对象
      currentMsgList:{}, //当前聊天对象记录
      chat:false,       //聊天页面是否展示
      friendsFun:['发现朋友','群聊','标签','公众号'],
      userName:'',
      data:{
          self:{nickName:'',userName: ''},
          friends:{}
      },
      talkMsg:[],
      messageList:[
          {
              _id:111,
              list:[
                  {msg: '你可以和我聊天',time:1541051132303,read:false}
              ]
          }
      ]
  },
    getters,
  mutations,
  actions
})
