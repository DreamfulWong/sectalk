<template>
    <div class="bg">
        <div class="header">
            <mu-avatar size="80" right>
                <img>
            </mu-avatar>
            <div class="name">{{self.nickName}}</div>
            <div class="id">ID：{{self.username}}</div>
        </div>

        <div class="wallet">
            <mu-list dense>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>钱包</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </div>

        <div class="menu">
            <mu-list >
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>收藏</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>相册</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>卡包</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>表情</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </div>

        <div class="setting">
            <mu-list dense>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="settings"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>设置</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Mine",
        computed: mapState({
            self: function (state) {
                return state.data.self
            }
        })
    }
</script>

<style lang="scss" scoped>
    .bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: lightgray;
        .header {
            position: relative;
            background: white;
            margin-top: 20px;
            .mu-avatar {
                margin-left: 10px;
            }
            .name {
                font-size: 20px;
                display: inline-block;
                position: absolute;
                margin-left: 20px;
                margin-top: 10px;
            }
            .id {
                display: inline-block;
                position: absolute;
                margin-left: 20px;
                margin-top: 40px;
                font-size: 20px;
            }
        }
        .wallet{
            margin-top: 25px;
            background: white;
            i{
                font-size: 30px;
            }
            div{
                font-size: 20px;
            }
        }
        .menu{
            margin-top: 25px;
            background: white;
             >ul>li:nth-child(-n+3){
                border-bottom: lightgray 1px solid;
            }
            i{
                font-size: 30px;
            }
            div{
                font-size: 20px;
            }
        }
        .setting{
            background: white;
            margin-top: 25px;
        }
    }

</style>