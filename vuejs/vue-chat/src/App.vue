<template>
<div id="app">
    <div class="sidebar">
        <card></card>
        <list></list>
    </div>
    <div class="main">
        <message></message>
        <text></text>
    </div>
</div>
</template>

<script>
import { actions } from './store';

import Card from 'components/card';
import List from 'components/list';
import Text from 'components/text';
import Message from 'components/message';

export default {
    components: { Card, List, Text, Message },
    vuex: {
        actions: actions
    },
    created () {
        console.log("app.vue created: ", this);
        this.initData();
    }
}
</script>

<style lang="less" scoped>
#app {
    margin: 20px auto;
    width: 800px;
    height: calc(100%-5px);
    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 100px)';
    }
}
</style>
