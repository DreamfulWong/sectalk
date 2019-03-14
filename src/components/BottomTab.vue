<template>
    <div>
        {{tab}}
        <mu-bottom-nav :value.sync="tab" @change="change">
            <mu-bottom-nav-item ripple value="message" title="秒聊" icon="chat_bubble"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="friends" title="通信录" icon="favorite"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="discover" title="发现" icon="location_on"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="mine" title="我" icon="location_on"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </div>
</template>

<script>
    export default {
        name: "BottomTab",
        data(){
            return{
                tab:'message'
            }
        },
        methods:{
            change(value){
                this.$router.push(value)
            }
        }
    }
</script>

<style scoped>

</style>