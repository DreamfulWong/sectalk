const navTitleObj={
    message:'秒聊',
    friends:'通讯录',
    discover:'发现',
    mine:'我的'
}
export const navTitle = state=>navTitleObj[state.headerTitle]

//根据state消息生成message页面列表数据
export const msgViewList = state => {
    let result=[]
    // let friends=state.data.friends
    // if (!friends.length){
    //     return result
    // }
    state.messageList.forEach(item=>{
        let friendData=item
        // let friendData = friends.find(f=>f._id===item._id)
        let unreadNum=0
        let lastMessage={}
        item.list.forEach(m =>{
            if (!m.read){
                unreadNum++
            }
            lastMessage=m
        })
        result.push({
            ...friendData,
            unreadNum,
            lastMessage,
        })
    })
    result.sort((a,b)=>{return b.lastMessage.time-a.lastMessage.time})
    return result
}
export const friendsViewList = state => {
    let result=[]
    let letterListArr=[]
    let otherListArr=[]
    state.receiveFriendsName.forEach(item=>{
        let firstPlace=item.slice(0,1)
        let engRule = /[a-z]/i
        if(engRule.test(firstPlace)){
            let letterList=letterListArr.find(m=>m.title==firstPlace)
            if(!letterList){
                letterList={
                    title:firstPlace,
                    userList:[item]
                }
                letterListArr.push(letterList)
                console.log(letterListArr)
            }else{
                letterList.userList.push(item)
            }
        }else {
            let otherList = otherListArr.find(m=>m.title=='#')
            if (!otherList) {
                otherList={
                    title: '#',
                    userList: [item]
                }
                otherListArr.push(otherList)
            }else {
                otherList.userList.push(item)
                otherList.userList.sort()
            }
        }
        let letRule = /[a-z]/i
        // if (letRule.test(firstPlace)){
        //     result.push({
        //         title:firstPlace,
        //         item
        //     })
        // }
    })
    letterListArr.sort((a,b)=>{return a.title.charCodeAt()-b.title.charCodeAt()})
    result=letterListArr.concat(otherListArr)
    console.log(result)
    return result
}