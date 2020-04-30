<template>
  <div class="home">
    <router-view />
    <ul class="footer">
      <li class="icons"><router-link to="list">文章列表</router-link></li>
      <li class="icons"><router-link to="user">个人中心</router-link></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="scss">
.footer{
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-top: 1px solid #42b983;
}  
.icons{
  height: 60px;
  line-height: 60px;
  flex: 1;
  a{
    color: #42b983;
    display: block;
    &.active{
      color: #fff;
      background: #42b983;
    }
  }
}

</style>