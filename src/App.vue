<template>
    <div id="app">
        <!--<div v-if="welIsShow">-->
            <!--<Welcome></Welcome>-->
        <!--</div>-->
        <!--<div v-if="!welIsShow">-->
        <ChatView v-if="chat"></ChatView>
            <div class="top-nav">
                <top-nav></top-nav>
            </div>
            <router-view/>
            <div class="tabbar">
                <bottom-tab></bottom-tab>
            </div>
        </div>
    <!--</div>-->
</template>
<script>
    import Welcome from './components/Welcome'
    import BottomTab from './components/BottomTab'
    import TopNav from './components/TopNav'
    import ChatView from './views/chatview/ChatView'

    import {mapState} from 'vuex'

    export default {
        name: 'App',
        data(){
            return{
                welIsShow:true
            }
        },
        components: {
            Welcome,
            TopNav,
            BottomTab,
            ChatView
        },
        computed:mapState(['chat']),
        methods: {}
    }
</script>

<style>
    .tabbar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
